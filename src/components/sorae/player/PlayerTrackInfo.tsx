import React from 'react';
import { View, Text, Pressable, StyleSheet } from 'react-native';
import { HeartIcon } from '../Icons';

interface PlayerTrackInfoProps {
  title: string;
  artist: string;
  bpm?: number;
  musicalKey?: string;
  genre?: string;
  isLiked?: boolean;
  onToggleLike?: () => void;
}

export function PlayerTrackInfo({
  title,
  artist,
  bpm = 84,
  musicalKey = 'F# Min',
  genre = 'Synthwave',
  isLiked = false,
  onToggleLike,
}: PlayerTrackInfoProps) {
  return (
    <View
      className="px-6 py-2 flex-row items-center justify-between"
      style={styles.container}
    >
      {/* Left Metadata Column */}
      <View className="flex-1 mr-4" style={styles.textColumn}>
        <Text
          className="text-white text-xl font-bold tracking-tight"
          numberOfLines={1}
          style={styles.title}
        >
          {title}
        </Text>

        <Text
          className="text-[#8e8f99] text-sm font-normal mt-1"
          numberOfLines={1}
          style={styles.artist}
        >
          {artist}
        </Text>

        {/* Tags Row: BPM, Key, Genre */}
        <View className="flex-row items-center gap-2 mt-2.5" style={styles.tagsRow}>
          {bpm && (
            <View
              className="bg-[#1e1f29] border border-[#2b2c3a] px-2.5 py-0.5 rounded-full"
              style={styles.tag}
            >
              <Text
                className="text-[#a1a1aa] text-[11px] font-semibold"
                style={styles.tagText}
              >
                {bpm} BPM
              </Text>
            </View>
          )}

          {musicalKey && (
            <View
              className="bg-[#1e1f29] border border-[#2b2c3a] px-2.5 py-0.5 rounded-full"
              style={styles.tag}
            >
              <Text
                className="text-[#a78bfa] text-[11px] font-semibold"
                style={styles.keyTagText}
              >
                {musicalKey}
              </Text>
            </View>
          )}

          {genre && (
            <View
              className="bg-[#1e1f29] border border-[#2b2c3a] px-2.5 py-0.5 rounded-full"
              style={styles.tag}
            >
              <Text
                className="text-[#8e8f99] text-[11px] font-medium"
                style={styles.tagText}
              >
                {genre}
              </Text>
            </View>
          )}
        </View>
      </View>

      {/* Right Like Button */}
      <Pressable
        onPress={onToggleLike}
        hitSlop={12}
        className="w-12 h-12 rounded-full bg-[#181920] border border-[#252631] items-center justify-center active:opacity-75"
        style={styles.likeBtn}
      >
        <HeartIcon
          size={22}
          color={isLiked ? '#f43f5e' : '#8e8f99'}
          filled={isLiked}
        />
      </Pressable>
    </View>
  );
}

const styles = StyleSheet.create({
  container: {
    paddingHorizontal: 24,
    paddingVertical: 8,
    flexDirection: 'row',
    alignItems: 'center',
    justifyContent: 'space-between',
  },
  textColumn: {
    flex: 1,
    marginRight: 16,
  },
  title: {
    color: '#ffffff',
    fontSize: 20,
    fontWeight: '700',
    letterSpacing: -0.4,
  },
  artist: {
    color: '#8e8f99',
    fontSize: 14,
    marginTop: 3,
  },
  tagsRow: {
    flexDirection: 'row',
    alignItems: 'center',
    gap: 8,
    marginTop: 8,
  },
  tag: {
    backgroundColor: '#1e1f29',
    borderWidth: 1,
    borderColor: '#2b2c3a',
    paddingHorizontal: 10,
    paddingVertical: 3,
    borderRadius: 9999,
  },
  tagText: {
    color: '#a1a1aa',
    fontSize: 11,
    fontWeight: '600',
  },
  keyTagText: {
    color: '#a78bfa',
    fontSize: 11,
    fontWeight: '600',
  },
  likeBtn: {
    width: 46,
    height: 46,
    borderRadius: 23,
    backgroundColor: '#181920',
    borderWidth: 1,
    borderColor: '#252631',
    alignItems: 'center',
    justifyContent: 'center',
  },
});
