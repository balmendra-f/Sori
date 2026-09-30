import React from 'react';
import { View, Text, TextInput, Pressable, StyleSheet } from 'react-native';
import { Image } from 'expo-image';
import { LogoWaveIcon, SearchIcon, CloseIcon } from './Icons';

interface SoraeHeaderProps {
  searchQuery?: string;
  onSearchChange?: (query: string) => void;
  onAvatarPress?: () => void;
  avatarUrl?: string;
  userName?: string;
}

export function SoraeHeader({
  searchQuery = '',
  onSearchChange,
  onAvatarPress,
  avatarUrl,
  userName = 'Sorae',
}: SoraeHeaderProps) {
  const initial = userName.trim() ? userName.trim().charAt(0).toUpperCase() : 'S';

  return (
    <View
      className="flex-row items-center justify-between px-4 py-2.5 bg-[#0d0e12]"
      style={styles.container}
    >
      {/* Brand Logo (Logo only, without text name) */}
      <View className="items-center justify-center pl-1 pr-1.5" style={styles.brandRow}>
        <LogoWaveIcon size={26} color="#9359ff" />
      </View>

      {/* Search Bar */}
      <View
        className="flex-1 mx-3 flex-row items-center bg-[#191a21] border border-[#252631] rounded-full px-3 py-1.5 h-10"
        style={styles.searchBar}
      >
        <SearchIcon size={15} color="#8e8f99" />
        <TextInput
          value={searchQuery}
          onChangeText={onSearchChange}
          placeholder="Buscar tracks, beats, géneros..."
          placeholderTextColor="#6d6e7b"
          className="flex-1 ml-2 text-white text-xs font-normal h-full"
          style={styles.searchInput}
        />
        {searchQuery.length > 0 ? (
          <Pressable
            onPress={() => onSearchChange?.('')}
            hitSlop={8}
            className="p-1 active:opacity-70"
          >
            <CloseIcon size={12} color="#8e8f99" />
          </Pressable>
        ) : null}
      </View>

      {/* User Avatar */}
      <Pressable
        onPress={onAvatarPress}
        className="w-9 h-9 rounded-full overflow-hidden border border-[#2e2f3d] items-center justify-center active:opacity-80"
        style={styles.avatarButton}
      >
        {avatarUrl ? (
          <Image
            source={{ uri: avatarUrl }}
            style={styles.avatarImage}
            contentFit="cover"
          />
        ) : (
          <View
            className="w-full h-full bg-[#8b5cf6]/25 items-center justify-center"
            style={styles.initialBg}
          >
            <Text className="text-[#a78bfa] text-sm font-bold">
              {initial}
            </Text>
          </View>
        )}
      </Pressable>
    </View>
  );
}

// Backward compatibility alias
export const VibeWaveHeader = SoraeHeader;

const styles = StyleSheet.create({
  container: {
    flexDirection: 'row',
    alignItems: 'center',
    justifyContent: 'space-between',
    paddingHorizontal: 16,
    paddingVertical: 10,
    backgroundColor: '#0d0e12',
  },
  brandRow: {
    alignItems: 'center',
    justifyContent: 'center',
    paddingLeft: 4,
    paddingRight: 6,
  },
  searchBar: {
    flex: 1,
    marginHorizontal: 10,
    flexDirection: 'row',
    alignItems: 'center',
    backgroundColor: '#191a21',
    borderWidth: 1,
    borderColor: '#252631',
    borderRadius: 9999,
    paddingHorizontal: 12,
    height: 38,
  },
  searchInput: {
    flex: 1,
    marginLeft: 8,
    color: '#ffffff',
    fontSize: 13,
    height: '100%',
    paddingVertical: 0,
  },
  avatarButton: {
    width: 36,
    height: 36,
    borderRadius: 18,
    overflow: 'hidden',
    borderWidth: 1,
    borderColor: '#2e2f3d',
    alignItems: 'center',
    justifyContent: 'center',
  },
  avatarImage: {
    width: '100%',
    height: '100%',
  },
  initialBg: {
    width: '100%',
    height: '100%',
    backgroundColor: 'rgba(139, 92, 246, 0.25)',
    alignItems: 'center',
    justifyContent: 'center',
  },
});
