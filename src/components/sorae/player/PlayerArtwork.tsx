import React from 'react';
import { View, Text, StyleSheet, Dimensions } from 'react-native';
import { Image } from 'expo-image';
import { FeedWaveIcon } from '../Icons';

interface PlayerArtworkProps {
  artworkUrl?: string;
  stemTag?: string;
  qualityBadge?: string;
}

const { width } = Dimensions.get('window');
const ARTWORK_SIZE = Math.min(width - 64, 300);

export function PlayerArtwork({
  artworkUrl = 'https://images.unsplash.com/photo-1598488035139-bdbb2231ce04?w=600&auto=format&fit=crop&q=80',
  stemTag = 'Stem A (Master)',
  qualityBadge = 'LOSSLESS 24-BIT',
}: PlayerArtworkProps) {
  return (
    <View className="items-center my-4" style={styles.container}>
      <View
        className="rounded-3xl overflow-hidden border border-[#2b2c3a] shadow-2xl shadow-purple-950/60 bg-[#16171e]"
        style={[styles.artworkWrapper, { width: ARTWORK_SIZE, height: ARTWORK_SIZE }]}
      >
        <Image
          source={{ uri: artworkUrl }}
          style={styles.artworkImage}
          contentFit="cover"
        />

        {/* Stem Badge Overlay */}
        <View
          className="absolute top-3 left-3 bg-[#0d0e12]/80 backdrop-blur-md px-3 py-1 rounded-full flex-row items-center gap-1.5 border border-white/10"
          style={styles.stemBadge}
        >
          <FeedWaveIcon size={12} color="#8b5cf6" />
          <Text
            className="text-white text-[10px] font-semibold tracking-wider uppercase"
            style={styles.stemText}
          >
            {stemTag}
          </Text>
        </View>

        {/* Audio Quality Badge Overlay */}
        <View
          className="absolute bottom-3 right-3 bg-[#0d0e12]/80 backdrop-blur-md px-2.5 py-0.5 rounded-full border border-white/10"
          style={styles.qualityBadge}
        >
          <Text
            className="text-[#a78bfa] text-[9px] font-bold tracking-widest"
            style={styles.qualityText}
          >
            {qualityBadge}
          </Text>
        </View>
      </View>
    </View>
  );
}

const styles = StyleSheet.create({
  container: {
    alignItems: 'center',
    marginVertical: 14,
  },
  artworkWrapper: {
    borderRadius: 24,
    overflow: 'hidden',
    borderWidth: 1,
    borderColor: '#2b2c3a',
    backgroundColor: '#16171e',
    shadowColor: '#8b5cf6',
    shadowOffset: { width: 0, height: 12 },
    shadowOpacity: 0.25,
    shadowRadius: 20,
    elevation: 12,
  },
  artworkImage: {
    width: '100%',
    height: '100%',
  },
  stemBadge: {
    position: 'absolute',
    top: 12,
    left: 12,
    backgroundColor: 'rgba(13, 14, 18, 0.85)',
    paddingHorizontal: 10,
    paddingVertical: 4,
    borderRadius: 9999,
    flexDirection: 'row',
    alignItems: 'center',
    gap: 6,
    borderWidth: 1,
    borderColor: 'rgba(255, 255, 255, 0.1)',
  },
  stemText: {
    color: '#ffffff',
    fontSize: 10,
    fontWeight: '600',
    letterSpacing: 0.5,
  },
  qualityBadge: {
    position: 'absolute',
    bottom: 12,
    right: 12,
    backgroundColor: 'rgba(13, 14, 18, 0.85)',
    paddingHorizontal: 8,
    paddingVertical: 3,
    borderRadius: 9999,
    borderWidth: 1,
    borderColor: 'rgba(255, 255, 255, 0.1)',
  },
  qualityText: {
    color: '#a78bfa',
    fontSize: 9,
    fontWeight: '700',
    letterSpacing: 0.8,
  },
});
