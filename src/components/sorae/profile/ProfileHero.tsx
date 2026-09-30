import React from 'react';
import { View, Text, StyleSheet } from 'react-native';
import { Image } from 'expo-image';
import { VerifiedBadge } from '../Icons';

interface ProfileHeroProps {
  name: string;
  handle: string;
  avatarUrl?: string;
  isVerified?: boolean;
  roleTag?: string;
  bio?: string;
  location?: string;
  link?: string;
}

export function ProfileHero({
  name,
  handle,
  avatarUrl,
  isVerified = true,
  roleTag = 'PRODUCER & SOUND DESIGNER',
  bio = 'Electronic Music Producer & Sound Designer 🎹 | Synthwave, Cyberpunk & Deep Melodic Vibes ✨',
  location = 'Buenos Aires, Argentina',
  link,
}: ProfileHeroProps) {
  const initial = name ? name.charAt(0).toUpperCase() : 'S';
  const displayLink = link || `sorae.app/${handle.replace('@', '')}`;

  return (
    <View
      className="items-center px-4 pt-2 pb-4 bg-[#0d0e12]"
      style={styles.container}
    >
      {/* Avatar with Glow Ring */}
      <View style={styles.avatarWrapper}>
        <View
          className="w-22 h-22 rounded-full overflow-hidden border-2 border-[#8b5cf6] items-center justify-center bg-[#1c1d28]"
          style={styles.avatarContainer}
        >
          {avatarUrl ? (
            <Image
              source={{ uri: avatarUrl }}
              style={styles.avatarImage}
              contentFit="cover"
            />
          ) : (
            <Text className="text-[#a78bfa] text-3xl font-extrabold">{initial}</Text>
          )}
        </View>
        {isVerified && (
          <View style={styles.verifiedBadgeContainer}>
            <VerifiedBadge size={20} />
          </View>
        )}
      </View>

      {/* Name and Handle */}
      <View
        className="flex-row items-center gap-1.5 mt-3.5"
        style={styles.nameRow}
      >
        <Text
          className="text-white text-2xl font-bold tracking-tight"
          style={styles.nameText}
        >
          {name}
        </Text>
      </View>

      <Text
        className="text-[#8e8f99] text-xs font-normal mt-0.5"
        style={styles.handleText}
      >
        {handle}
      </Text>

      {/* Role Pill */}
      {roleTag && (
        <View
          className="mt-2.5 bg-[#1a1b24] border border-[#2d2e3d] px-3 py-1 rounded-full"
          style={styles.roleBadge}
        >
          <Text
            className="text-[#a78bfa] text-[10px] font-bold tracking-wider"
            style={styles.roleText}
          >
            {roleTag}
          </Text>
        </View>
      )}

      {/* Bio Description */}
      {bio && (
        <Text
          className="text-[#d4d4d8] text-xs text-center leading-5 mt-3 max-w-[320px]"
          style={styles.bioText}
        >
          {bio}
        </Text>
      )}

      {/* Location and Link Meta */}
      <View
        className="flex-row items-center gap-3 mt-2.5"
        style={styles.metaRow}
      >
        {location && (
          <Text
            className="text-[#8e8f99] text-[11px]"
            style={styles.metaItem}
          >
            📍 {location}
          </Text>
        )}
        {displayLink && (
          <Text
            className="text-[#8b5cf6] text-[11px] font-medium"
            style={styles.linkItem}
          >
            🔗 {displayLink}
          </Text>
        )}
      </View>
    </View>
  );
}

const styles = StyleSheet.create({
  container: {
    alignItems: 'center',
    paddingHorizontal: 16,
    paddingTop: 8,
    paddingBottom: 16,
    backgroundColor: '#0d0e12',
  },
  avatarWrapper: {
    position: 'relative',
    alignItems: 'center',
    justifyContent: 'center',
  },
  avatarContainer: {
    width: 88,
    height: 88,
    borderRadius: 44,
    overflow: 'hidden',
    borderWidth: 2.5,
    borderColor: '#8b5cf6',
    backgroundColor: '#181920',
  },
  avatarImage: {
    width: '100%',
    height: '100%',
  },
  verifiedBadgeContainer: {
    position: 'absolute',
    bottom: 2,
    right: 2,
    backgroundColor: '#0d0e12',
    borderRadius: 12,
    padding: 2,
  },
  nameRow: {
    flexDirection: 'row',
    alignItems: 'center',
    gap: 6,
    marginTop: 12,
  },
  nameText: {
    color: '#ffffff',
    fontSize: 22,
    fontWeight: '700',
    letterSpacing: -0.4,
  },
  handleText: {
    color: '#8e8f99',
    fontSize: 13,
    marginTop: 2,
  },
  roleBadge: {
    marginTop: 10,
    backgroundColor: '#1a1b24',
    borderWidth: 1,
    borderColor: '#2d2e3d',
    paddingHorizontal: 12,
    paddingVertical: 4,
    borderRadius: 9999,
  },
  roleText: {
    color: '#a78bfa',
    fontSize: 10,
    fontWeight: '700',
    letterSpacing: 0.8,
  },
  bioText: {
    color: '#d4d4d8',
    fontSize: 12,
    textAlign: 'center',
    lineHeight: 18,
    marginTop: 10,
    maxWidth: 320,
  },
  metaRow: {
    flexDirection: 'row',
    alignItems: 'center',
    gap: 12,
    marginTop: 8,
  },
  metaItem: {
    color: '#8e8f99',
    fontSize: 11,
  },
  linkItem: {
    color: '#8b5cf6',
    fontSize: 11,
    fontWeight: '500',
  },
});
