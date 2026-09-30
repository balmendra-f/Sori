import React, { useState } from 'react';
import { Alert, Platform, StyleSheet, View } from 'react-native';
import { SafeAreaView } from 'react-native-safe-area-context';
import {
  ProfileView,
  useAudioPlayer,
  CommentsModal,
  UserProfileData,
} from '@/components/sorae';
import { useAuth } from '@/context/AuthContext';

export default function ProfileTabScreen() {
  const {
    profileTracks,
    togglePlayTrack,
    toggleLike,
    seekTo,
    commentsMap,
    addComment,
    expandPlayer,
  } = useAudioPlayer();
  const { user, signOut } = useAuth();

  const [activeCommentTrackId, setActiveCommentTrackId] = useState<string | null>(null);

  // Derived user metadata from Supabase
  const initialName =
    user?.user_metadata?.display_name ||
    user?.user_metadata?.full_name ||
    user?.email?.split('@')[0] ||
    'Elena Synth';

  const [customProfile, setCustomProfile] = useState<UserProfileData>({
    name: initialName,
    handle: `@${initialName.toLowerCase().replace(/[^a-z0-9_]/g, '') || 'sorae_user'}`,
    bio:
      user?.user_metadata?.bio ||
      'Electronic Music Producer & Sound Designer 🎹 | Synthwave, Cyberpunk & Deep Melodic Vibes ✨',
    location: user?.user_metadata?.location || 'Buenos Aires, Argentina',
    avatarUrl: user?.user_metadata?.avatar_url || '',
  });

  const handleLogout = () => {
    if (Platform.OS === 'web') {
      const confirmed = window.confirm('¿Deseas cerrar sesión en Sorae?');
      if (confirmed) {
        signOut();
      }
      return;
    }

    Alert.alert(
      'Cerrar Sesión',
      '¿Estás seguro de que deseas cerrar tu sesión en Sorae?',
      [
        { text: 'Cancelar', style: 'cancel' },
        {
          text: 'Cerrar Sesión',
          style: 'destructive',
          onPress: () => signOut(),
        },
      ]
    );
  };

  const activeCommentTrack = profileTracks.find((t) => t.id === activeCommentTrackId);
  const currentComments = activeCommentTrackId ? commentsMap[activeCommentTrackId] || [] : [];

  return (
    <View className="flex-1 bg-[#0d0e12]" style={styles.screen}>
      <SafeAreaView edges={['top']} className="flex-1" style={styles.safeArea}>
        <ProfileView
          tracks={profileTracks}
          userProfile={customProfile}
          onTogglePlay={togglePlayTrack}
          onLike={toggleLike}
          onSeek={(_, ratio) => seekTo(ratio)}
          onComment={(id) => setActiveCommentTrackId(id)}
          onAction={(id) => {
            togglePlayTrack(id);
            expandPlayer();
          }}
          onLogoutPress={handleLogout}
          onProfileUpdated={(updated) => {
            setCustomProfile((prev) => ({
              ...prev,
              name: updated.name,
              handle: `@${updated.name.toLowerCase().replace(/[^a-z0-9_]/g, '')}`,
              bio: updated.bio,
              location: updated.location,
            }));
          }}
        />
      </SafeAreaView>

      {/* Interactive Comments Modal */}
      <CommentsModal
        visible={!!activeCommentTrackId}
        trackTitle={activeCommentTrack?.title || 'Track'}
        comments={currentComments}
        onClose={() => setActiveCommentTrackId(null)}
        onAddComment={(text) => {
          if (activeCommentTrackId) {
            addComment(activeCommentTrackId, text, customProfile.name);
          }
        }}
      />
    </View>
  );
}

const styles = StyleSheet.create({
  screen: {
    flex: 1,
    backgroundColor: '#0d0e12',
  },
  safeArea: {
    flex: 1,
    backgroundColor: '#0d0e12',
  },
});
