import React from 'react';
import { View, Text, Pressable, StyleSheet } from 'react-native';
import { Image } from 'expo-image';
import { Track } from './types';
import { WaveformPlayer } from './WaveformPlayer';
import {
  VerifiedBadge,
  HeartIcon,
  CommentIcon,
  RemixIcon,
  SlidersIcon,
} from './Icons';

interface TrackCardProps {
  track: Track;
  onTogglePlay?: (id: string) => void;
  onLike?: (id: string) => void;
  onComment?: (id: string) => void;
  onAction?: (id: string) => void;
  onSeek?: (id: string, ratio: number) => void;
}

export function TrackCard({
  track,
  onTogglePlay,
  onLike,
  onComment,
  onAction,
  onSeek,
}: TrackCardProps) {
  const { author } = track;
  const isRemix = track.actionType === 'remix';
  const initial = author.name ? author.name.charAt(0).toUpperCase() : 'S';

  return (
    <View
      className="bg-[#16171e] border border-[#23242c] rounded-3xl p-4 mb-3.5"
      style={styles.card}
    >
      {/* Header Row: Author Info & BPM/Duration */}
      <View
        className="flex-row items-center justify-between"
        style={styles.headerRow}
      >
        {/* Author Left */}
        <View className="flex-row items-center gap-3" style={styles.authorRow}>
          <View
            className="w-11 h-11 rounded-full overflow-hidden border border-[#2b2c37] bg-[#22232d] items-center justify-center"
            style={styles.avatarContainer}
          >
            {author.avatarUrl ? (
              <Image
                source={{ uri: author.avatarUrl }}
                style={styles.avatarImage}
                contentFit="cover"
              />
            ) : (
              <Text className="text-[#a78bfa] font-bold text-base">{initial}</Text>
            )}
          </View>
          <View>
            <View
              className="flex-row items-center gap-1.5"
              style={styles.nameRow}
            >
              <Text
                className="text-white font-bold text-base"
                style={styles.authorName}
              >
                {author.name}
              </Text>
              {author.isVerified && <VerifiedBadge size={14} />}
            </View>
            <Text
              className="text-[#8e8f99] text-xs font-normal mt-0.5"
              style={styles.authorHandle}
            >
              {author.handle}
            </Text>
          </View>
        </View>

        {/* Top-Right Badges: BPM & Duration */}
        <View className="flex-row items-center gap-2" style={styles.metaRow}>
          {track.genre ? (
            <View
              className="bg-purple-950/40 border border-purple-500/30 px-2 py-0.5 rounded-full"
              style={{ backgroundColor: 'rgba(139, 92, 246, 0.15)', paddingHorizontal: 8, paddingVertical: 2, borderRadius: 999 }}
            >
              <Text className="text-[#c4b5fd] text-[10px] font-semibold">
                {track.genre}
              </Text>
            </View>
          ) : null}
          <View
            className="bg-[#22232c] px-2.5 py-1 rounded-full"
            style={styles.bpmBadge}
          >
            <Text
              className="text-[#a1a1aa] text-xs font-semibold"
              style={styles.bpmText}
            >
              {track.bpm} BPM
            </Text>
          </View>
          <Text
            className="text-[#8e8f99] text-xs font-medium"
            style={styles.durationText}
          >
            {track.duration}
          </Text>
        </View>
      </View>

      {/* Track Title */}
      <Text
        className="text-white font-bold text-lg mt-3.5 mb-3"
        style={styles.trackTitle}
      >
        {track.title}
      </Text>

      {/* Audio Waveform Player */}
      <WaveformPlayer
        isPlaying={track.isPlaying}
        onTogglePlay={() => onTogglePlay?.(track.id)}
        waveformBars={track.waveformBars}
        playedRatio={track.playedRatio}
        onSeek={(ratio) => onSeek?.(track.id, ratio)}
      />

      {/* Bottom Actions Row */}
      <View
        className="flex-row items-center justify-between mt-3.5 px-1"
        style={styles.actionsRow}
      >
        {/* Left: Likes & Comments */}
        <View className="flex-row items-center gap-5" style={styles.statsRow}>
          <Pressable
            onPress={() => onLike?.(track.id)}
            className="flex-row items-center gap-1.5 active:opacity-75"
            style={styles.statButton}
          >
            <HeartIcon
              size={17}
              color={track.isLiked ? '#f43f5e' : '#8e8f99'}
              filled={track.isLiked}
            />
            <Text
              className={`text-xs font-medium ${
                track.isLiked ? 'text-[#f43f5e]' : 'text-[#8e8f99]'
              }`}
              style={[
                styles.statText,
                { color: track.isLiked ? '#f43f5e' : '#8e8f99' },
              ]}
            >
              {track.likes}
            </Text>
          </Pressable>

          <Pressable
            onPress={() => onComment?.(track.id)}
            className="flex-row items-center gap-1.5 active:opacity-75"
            style={styles.statButton}
          >
            <CommentIcon size={16} color="#8e8f99" />
            <Text
              className="text-[#8e8f99] text-xs font-medium"
              style={styles.statText}
            >
              {track.comments}
            </Text>
          </Pressable>
        </View>

        {/* Right: Contextual Action Button (Remix or Usar) */}
        <Pressable
          onPress={() => onAction?.(track.id)}
          className="bg-[#22232d] px-3.5 py-1.5 rounded-full flex-row items-center gap-1.5 active:opacity-80 border border-[#2b2c37]"
          style={styles.actionButton}
        >
          {isRemix ? (
            <>
              <RemixIcon size={14} color="#ffffff" />
              <Text
                className="text-white text-xs font-medium"
                style={styles.actionButtonText}
              >
                {track.actionLabel || 'Remix'}
              </Text>
            </>
          ) : (
            <>
              <SlidersIcon size={13} color="#ffffff" />
              <Text
                className="text-white text-xs font-medium"
                style={styles.actionButtonText}
              >
                {track.actionLabel || 'Usar'}
              </Text>
            </>
          )}
        </Pressable>
      </View>
    </View>
  );
}

const styles = StyleSheet.create({
  card: {
    backgroundColor: '#16171e',
    borderWidth: 1,
    borderColor: '#23242c',
    borderRadius: 24,
    padding: 16,
    marginBottom: 14,
  },
  headerRow: {
    flexDirection: 'row',
    alignItems: 'center',
    justifyContent: 'space-between',
  },
  authorRow: {
    flexDirection: 'row',
    alignItems: 'center',
    gap: 12,
  },
  avatarContainer: {
    width: 44,
    height: 44,
    borderRadius: 22,
    overflow: 'hidden',
    borderWidth: 1,
    borderColor: '#2b2c37',
    backgroundColor: '#22232d',
  },
  avatarImage: {
    width: '100%',
    height: '100%',
  },
  nameRow: {
    flexDirection: 'row',
    alignItems: 'center',
    gap: 6,
  },
  authorName: {
    color: '#ffffff',
    fontWeight: '700',
    fontSize: 16,
  },
  authorHandle: {
    color: '#8e8f99',
    fontSize: 12,
    marginTop: 2,
  },
  metaRow: {
    flexDirection: 'row',
    alignItems: 'center',
    gap: 8,
  },
  bpmBadge: {
    backgroundColor: '#22232c',
    paddingHorizontal: 10,
    paddingVertical: 4,
    borderRadius: 9999,
  },
  bpmText: {
    color: '#a1a1aa',
    fontSize: 12,
    fontWeight: '600',
  },
  durationText: {
    color: '#8e8f99',
    fontSize: 12,
    fontWeight: '500',
  },
  trackTitle: {
    color: '#ffffff',
    fontWeight: '700',
    fontSize: 18,
    marginTop: 14,
    marginBottom: 12,
  },
  actionsRow: {
    flexDirection: 'row',
    alignItems: 'center',
    justifyContent: 'space-between',
    marginTop: 14,
    paddingHorizontal: 4,
  },
  statsRow: {
    flexDirection: 'row',
    alignItems: 'center',
    gap: 20,
  },
  statButton: {
    flexDirection: 'row',
    alignItems: 'center',
    gap: 6,
  },
  statText: {
    fontSize: 12,
    fontWeight: '500',
    color: '#8e8f99',
  },
  actionButton: {
    backgroundColor: '#22232d',
    paddingHorizontal: 14,
    paddingVertical: 6,
    borderRadius: 9999,
    flexDirection: 'row',
    alignItems: 'center',
    gap: 6,
    borderWidth: 1,
    borderColor: '#2b2c37',
  },
  actionButtonText: {
    color: '#ffffff',
    fontSize: 12,
    fontWeight: '500',
  },
});
