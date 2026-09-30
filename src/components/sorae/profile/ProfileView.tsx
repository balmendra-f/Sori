import React, { useState } from 'react';
import { View, ScrollView, Text, Pressable, StyleSheet } from 'react-native';
import { Track } from '../types';
import { TrackCard } from '../TrackCard';
import { ProfileHeader } from './ProfileHeader';
import { ProfileHero } from './ProfileHero';
import { ProfileStats } from './ProfileStats';
import { ProfileActions } from './ProfileActions';
import { ProfileTabs } from './ProfileTabs';
import { EditProfileModal } from './EditProfileModal';

export interface UserProfileData {
  name: string;
  handle: string;
  bio?: string;
  location?: string;
  avatarUrl?: string;
}

interface ProfileViewProps {
  tracks: Track[];
  userProfile?: UserProfileData;
  onTogglePlay?: (id: string) => void;
  onLike?: (id: string) => void;
  onComment?: (id: string) => void;
  onAction?: (id: string) => void;
  onSeek?: (id: string, ratio: number) => void;
  onLogoutPress?: () => void;
  onProfileUpdated?: (updated: { name: string; bio: string; location: string }) => void;
}

export function ProfileView({
  tracks,
  userProfile,
  onTogglePlay,
  onLike,
  onComment,
  onAction,
  onSeek,
  onLogoutPress,
  onProfileUpdated,
}: ProfileViewProps) {
  const [activeTab, setActiveTab] = useState('Mis Tracks');
  const [isEditModalOpen, setIsEditModalOpen] = useState(false);

  const profileName = userProfile?.name || 'Elena Synth';
  const profileHandle = userProfile?.handle || '@elena_synth';
  const profileBio =
    userProfile?.bio ||
    'Electronic Music Producer & Sound Designer 🎹 | Synthwave, Cyberpunk & Deep Melodic Vibes ✨';
  const profileLocation = userProfile?.location || 'Buenos Aires, Argentina';
  const profileAvatar = userProfile?.avatarUrl;

  // Filter tracks based on active tab
  const displayedTracks = tracks.filter((t) => {
    if (activeTab === 'Likes') {
      return !!t.isLiked;
    }
    if (activeTab === 'Remixes') {
      return t.actionType === 'remix';
    }
    if (activeTab === 'Colección') {
      return true;
    }
    // "Mis Tracks"
    return true;
  });

  return (
    <View className="flex-1 bg-[#0d0e12]" style={styles.container}>
      {/* Top Header */}
      <ProfileHeader
        handle={profileHandle}
        onSettingsPress={() => setIsEditModalOpen(true)}
        onSharePress={() => {}}
        onLogoutPress={onLogoutPress}
      />

      <ScrollView
        className="flex-1"
        style={styles.scrollView}
        contentContainerStyle={styles.scrollContent}
        showsVerticalScrollIndicator={false}
      >
        {/* Hero Section */}
        <ProfileHero
          name={profileName}
          handle={profileHandle}
          avatarUrl={profileAvatar}
          isVerified={true}
          roleTag="PRODUCER & SOUND DESIGNER"
          bio={profileBio}
          location={profileLocation}
        />

        {/* Creator Stats */}
        <ProfileStats />

        {/* Action Buttons */}
        <ProfileActions
          onEditPress={() => setIsEditModalOpen(true)}
          onSharePress={() => {}}
        />

        {/* Tabs */}
        <ProfileTabs
          activeTab={activeTab}
          onSelectTab={setActiveTab}
        />

        {/* Creator Tracks List */}
        <View className="px-3.5 pt-3" style={styles.tracksList}>
          {displayedTracks.length === 0 ? (
            <View className="items-center justify-center py-12 px-6" style={styles.emptyContainer}>
              <Text className="text-[#8e8f99] text-sm text-center">
                No hay pistas en la sección &quot;{activeTab}&quot; aún.
              </Text>
            </View>
          ) : (
            displayedTracks.map((track) => (
              <TrackCard
                key={track.id}
                track={track}
                onTogglePlay={onTogglePlay}
                onLike={onLike}
                onComment={onComment}
                onAction={onAction}
                onSeek={onSeek}
              />
            ))
          )}
        </View>
      </ScrollView>

      {/* Edit Profile Modal */}
      <EditProfileModal
        visible={isEditModalOpen}
        onClose={() => setIsEditModalOpen(false)}
        currentName={profileName}
        currentBio={profileBio}
        currentLocation={profileLocation}
        onProfileUpdated={(updated) => {
          onProfileUpdated?.(updated);
        }}
      />
    </View>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: '#0d0e12',
  },
  scrollView: {
    flex: 1,
  },
  scrollContent: {
    paddingBottom: 24,
  },
  tracksList: {
    paddingHorizontal: 14,
    paddingTop: 12,
  },
  emptyContainer: {
    alignItems: 'center',
    justifyContent: 'center',
    paddingVertical: 36,
  },
});
