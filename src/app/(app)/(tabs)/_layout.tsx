import React, { useState } from 'react';
import { StyleSheet, View } from 'react-native';
import { Tabs, usePathname, useRouter } from 'expo-router';
import {
  BottomNavBar,
  FullPlayerModal,
  MiniPlayer,
  CreateTrackModal,
  useAudioPlayer,
} from '@/components/sorae';
import { useAuth } from '@/context/AuthContext';

export default function TabsLayout() {
  const pathname = usePathname();
  const router = useRouter();
  const { user } = useAuth();
  const [isCreateModalOpen, setIsCreateModalOpen] = useState(false);

  const {
    nowPlaying,
    isPlayerExpanded,
    togglePlayNowPlaying,
    closeNowPlaying,
    expandPlayer,
    closePlayer,
    nextTrack,
    previousTrack,
    addTrack,
    togglePlayTrack,
  } = useAudioPlayer();

  const isProfile = pathname.includes('profile');
  const activeTab: 'feed' | 'perfil' = isProfile ? 'perfil' : 'feed';

  const handleSelectTab = (tab: 'feed' | 'perfil') => {
    if (tab === 'feed') {
      router.navigate('/');
    } else {
      router.navigate('/profile');
    }
  };

  const userName =
    user?.user_metadata?.display_name ||
    user?.user_metadata?.full_name ||
    user?.email?.split('@')[0] ||
    'Sorae Creator';

  const userHandle = `@${userName.toLowerCase().replace(/[^a-z0-9_]/g, '') || 'sorae_user'}`;

  return (
    <View className="flex-1 bg-[#0d0e12]" style={styles.container}>
      <Tabs
        screenOptions={{
          headerShown: false,
          tabBarStyle: { display: 'none' },
        }}
      >
        <Tabs.Screen name="index" options={{ title: 'Feed' }} />
        <Tabs.Screen name="profile" options={{ title: 'Perfil' }} />
      </Tabs>

      {/* Persistent Docked Mini Player */}
      {nowPlaying && (
        <MiniPlayer
          track={nowPlaying}
          onPress={expandPlayer}
          onTogglePlay={togglePlayNowPlaying}
          onClose={closeNowPlaying}
        />
      )}

      {/* Custom Bottom Navigation Bar */}
      <BottomNavBar
        activeTab={activeTab}
        onSelectTab={handleSelectTab}
        onFabPress={() => setIsCreateModalOpen(true)}
      />

      {/* Full Expanded Audio Player Modal */}
      <FullPlayerModal
        visible={isPlayerExpanded}
        track={nowPlaying}
        onClose={closePlayer}
        onTogglePlay={togglePlayNowPlaying}
        onNext={nextTrack}
        onPrevious={previousTrack}
      />

      {/* Create Track Studio Modal */}
      <CreateTrackModal
        visible={isCreateModalOpen}
        onClose={() => setIsCreateModalOpen(false)}
        onCreateTrack={(trackData) => {
          addTrack(trackData);
        }}
        creatorName={userName}
        creatorHandle={userHandle}
      />
    </View>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: '#0d0e12',
  },
});
