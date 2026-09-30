import React from 'react';
import { View, Text, Pressable, StyleSheet } from 'react-native';
import { NowPlayingTrack } from './types';
import { PauseIcon, PlayIcon, CloseIcon, FeedWaveIcon } from './Icons';

interface MiniPlayerProps {
  track: NowPlayingTrack;
  onTogglePlay?: () => void;
  onClose?: () => void;
  onPress?: () => void;
}

export function MiniPlayer({
  track,
  onTogglePlay,
  onClose,
  onPress,
}: MiniPlayerProps) {
  const progressPercent = Math.round(track.progress * 100);

  return (
    <Pressable
      onPress={onPress}
      className="mx-3.5 mb-2 bg-[#202128] border border-[#2d2e3b] rounded-2xl px-3.5 py-2.5 flex-row items-center shadow-lg shadow-black/40 active:opacity-95"
      style={styles.container}
    >
      {/* Wave Thumbnail */}
      <View
        className="w-10 h-10 rounded-xl bg-[#28253a] border border-[#3b3457] items-center justify-center mr-3"
        style={styles.thumbnail}
      >
        <FeedWaveIcon size={18} color="#8b5cf6" />
      </View>

      {/* Info & Progress */}
      <View className="flex-1 mr-3" style={styles.infoContainer}>
        <Text
          className="text-white font-semibold text-xs tracking-tight"
          numberOfLines={1}
          style={styles.title}
        >
          {track.title}
        </Text>
        <Text
          className="text-[#8e8f99] text-[11px] font-normal mt-0.5"
          numberOfLines={1}
          style={styles.subtitle}
        >
          {track.subtitle}
        </Text>

        {/* Progress Bar */}
        <View
          className="h-1 bg-[#323442] rounded-full overflow-hidden mt-1.5 w-full"
          style={styles.progressTrack}
        >
          <View
            style={[styles.progressFill, { width: `${progressPercent}%` }]}
            className="h-full bg-[#8b5cf6] rounded-full"
          />
        </View>
      </View>

      {/* Controls: Pause & Dismiss */}
      <View className="flex-row items-center gap-3" style={styles.controlsRow}>
        <Pressable
          onPress={onTogglePlay}
          className="p-1 active:opacity-70"
          hitSlop={8}
          style={styles.controlBtn}
        >
          {track.isPlaying ? (
            <PauseIcon size={13} color="#ffffff" />
          ) : (
            <PlayIcon size={12} color="#ffffff" />
          )}
        </Pressable>

        <Pressable
          onPress={onClose}
          className="p-1 active:opacity-70"
          hitSlop={8}
          style={styles.controlBtn}
        >
          <CloseIcon size={14} color="#8e8f99" />
        </Pressable>
      </View>
    </Pressable>
  );
}

const styles = StyleSheet.create({
  container: {
    marginHorizontal: 14,
    marginBottom: 8,
    backgroundColor: '#202128',
    borderWidth: 1,
    borderColor: '#2d2e3b',
    borderRadius: 16,
    paddingHorizontal: 14,
    paddingVertical: 10,
    flexDirection: 'row',
    alignItems: 'center',
    shadowColor: '#000000',
    shadowOffset: { width: 0, height: 4 },
    shadowOpacity: 0.4,
    shadowRadius: 8,
    elevation: 6,
  },
  thumbnail: {
    width: 40,
    height: 40,
    borderRadius: 12,
    backgroundColor: '#28253a',
    borderWidth: 1,
    borderColor: '#3b3457',
    alignItems: 'center',
    justifyContent: 'center',
    marginRight: 12,
  },
  infoContainer: {
    flex: 1,
    marginRight: 12,
  },
  title: {
    color: '#ffffff',
    fontWeight: '600',
    fontSize: 13,
    letterSpacing: -0.2,
  },
  subtitle: {
    color: '#8e8f99',
    fontSize: 11,
    marginTop: 2,
  },
  progressTrack: {
    height: 4,
    backgroundColor: '#323442',
    borderRadius: 9999,
    overflow: 'hidden',
    marginTop: 6,
    width: '100%',
  },
  progressFill: {
    height: '100%',
    backgroundColor: '#8b5cf6',
    borderRadius: 9999,
  },
  controlsRow: {
    flexDirection: 'row',
    alignItems: 'center',
    gap: 12,
  },
  controlBtn: {
    padding: 4,
  },
});
