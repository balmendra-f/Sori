import React, { useState, useMemo } from 'react';
import {
  ScrollView,
  StyleSheet,
  View,
  Text,
  Pressable,
  RefreshControl,
} from 'react-native';
import { SafeAreaView } from 'react-native-safe-area-context';
import { useRouter } from 'expo-router';
import {
  FilterTabs,
  TrackCard,
  useAudioPlayer,
  SoraeHeader,
  CommentsModal,
} from '@/components/sorae';
import { useAuth } from '@/context/AuthContext';

export default function FeedTabScreen() {
  const router = useRouter();
  const { user } = useAuth();
  const [activeFilter, setActiveFilter] = useState('Para Ti');
  const [searchQuery, setSearchQuery] = useState('');
  const [refreshing, setRefreshing] = useState(false);
  const [activeCommentTrackId, setActiveCommentTrackId] = useState<string | null>(null);

  const {
    feedTracks,
    togglePlayTrack,
    toggleLike,
    seekTo,
    commentsMap,
    addComment,
    expandPlayer,
  } = useAudioPlayer();

  const userName =
    user?.user_metadata?.display_name ||
    user?.user_metadata?.full_name ||
    user?.email?.split('@')[0] ||
    'Creador Sorae';

  // Dynamic filter logic
  const filteredTracks = useMemo(() => {
    let result = [...feedTracks];

    // Category filter
    if (activeFilter === 'Tendencias') {
      // Sort by likes
      result = [...result].sort((a, b) => {
        const valA = a.likes.endsWith('k') ? parseFloat(a.likes) * 1000 : parseInt(a.likes, 10);
        const valB = b.likes.endsWith('k') ? parseFloat(b.likes) * 1000 : parseInt(b.likes, 10);
        return valB - valA;
      });
    } else if (activeFilter === 'Nuevos') {
      result = result.filter((t) => t.category === 'Nuevos' || t.id.startsWith('tr_'));
    } else if (activeFilter === 'Remixes') {
      result = result.filter((t) => t.actionType === 'remix' || t.category === 'Remixes');
    } else if (activeFilter === 'Stems') {
      result = result.filter((t) => t.actionType === 'use' || t.category === 'Stems');
    }

    // Search query filter
    if (searchQuery.trim()) {
      const q = searchQuery.toLowerCase().trim();
      result = result.filter((t) => {
        const matchTitle = t.title.toLowerCase().includes(q);
        const matchName = t.author.name.toLowerCase().includes(q);
        const matchHandle = t.author.handle.toLowerCase().includes(q);
        const matchGenre = t.genre?.toLowerCase().includes(q);
        const matchBpm = `${t.bpm}`.includes(q);
        return matchTitle || matchName || matchHandle || matchGenre || matchBpm;
      });
    }

    return result;
  }, [feedTracks, activeFilter, searchQuery]);

  const onRefresh = () => {
    setRefreshing(true);
    setTimeout(() => {
      setRefreshing(false);
    }, 700);
  };

  const activeCommentTrack = feedTracks.find((t) => t.id === activeCommentTrackId);
  const currentComments = activeCommentTrackId ? commentsMap[activeCommentTrackId] || [] : [];

  return (
    <View className="flex-1 bg-[#0d0e12]" style={styles.screen}>
      <SafeAreaView edges={['top']} className="flex-1" style={styles.safeArea}>
        {/* Top Header */}
        <SoraeHeader
          searchQuery={searchQuery}
          onSearchChange={setSearchQuery}
          onAvatarPress={() => router.navigate('/profile')}
          userName={userName}
        />

        {/* Filter Category Tabs */}
        <FilterTabs activeTab={activeFilter} onSelectTab={setActiveFilter} />

        {/* Feed Cards ScrollView */}
        <ScrollView
          className="flex-1 px-3.5 pt-1.5"
          style={styles.scrollView}
          contentContainerStyle={styles.scrollContent}
          showsVerticalScrollIndicator={false}
          refreshControl={
            <RefreshControl
              refreshing={refreshing}
              onRefresh={onRefresh}
              tintColor="#8b5cf6"
              colors={['#8b5cf6']}
            />
          }
        >
          {filteredTracks.length === 0 ? (
            <View className="items-center justify-center py-16 px-6" style={styles.emptyContainer}>
              <View className="w-16 h-16 rounded-full bg-[#181922] items-center justify-center mb-4 border border-[#272836]">
                <Text className="text-2xl">🔍</Text>
              </View>
              <Text className="text-white text-base font-bold text-center mb-1">
                No se encontraron pistas
              </Text>
              <Text className="text-[#8e8f99] text-xs text-center mb-5 max-w-xs">
                No hay resultados que coincidan con &quot;{searchQuery || activeFilter}&quot;. Intenta con otro término o género.
              </Text>
              <Pressable
                onPress={() => {
                  setSearchQuery('');
                  setActiveFilter('Para Ti');
                }}
                className="bg-[#22232e] border border-[#303140] px-4 py-2 rounded-full active:opacity-80"
                style={styles.resetBtn}
              >
                <Text className="text-white text-xs font-semibold">
                  Restablecer filtros
                </Text>
              </Pressable>
            </View>
          ) : (
            filteredTracks.map((track) => (
              <TrackCard
                key={track.id}
                track={track}
                onTogglePlay={togglePlayTrack}
                onLike={toggleLike}
                onSeek={(_, ratio) => seekTo(ratio)}
                onComment={(id) => setActiveCommentTrackId(id)}
                onAction={(id) => {
                  togglePlayTrack(id);
                  expandPlayer();
                }}
              />
            ))
          )}
        </ScrollView>
      </SafeAreaView>

      {/* Interactive Comments Modal */}
      <CommentsModal
        visible={!!activeCommentTrackId}
        trackTitle={activeCommentTrack?.title || 'Track'}
        comments={currentComments}
        onClose={() => setActiveCommentTrackId(null)}
        onAddComment={(text) => {
          if (activeCommentTrackId) {
            addComment(activeCommentTrackId, text, userName);
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
  scrollView: {
    flex: 1,
    paddingHorizontal: 14,
    paddingTop: 6,
  },
  scrollContent: {
    paddingBottom: 24,
    flexGrow: 1,
  },
  emptyContainer: {
    alignItems: 'center',
    justifyContent: 'center',
    paddingVertical: 64,
    paddingHorizontal: 24,
  },
  resetBtn: {
    backgroundColor: '#22232e',
    borderWidth: 1,
    borderColor: '#303140',
    paddingHorizontal: 16,
    paddingVertical: 9,
    borderRadius: 9999,
  },
});
