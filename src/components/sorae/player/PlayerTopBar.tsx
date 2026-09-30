import React from 'react';
import { View, Text, Pressable, StyleSheet } from 'react-native';
import { ChevronDownIcon, MoreHorizontalIcon } from '../Icons';

interface PlayerTopBarProps {
  sessionTitle?: string;
  onMinimize: () => void;
  onMore?: () => void;
}

export function PlayerTopBar({
  sessionTitle = 'SORAE SESSION',
  onMinimize,
  onMore,
}: PlayerTopBarProps) {
  return (
    <View
      className="flex-row items-center justify-between px-4 py-3"
      style={styles.container}
    >
      {/* Minimize Button */}
      <Pressable
        onPress={onMinimize}
        hitSlop={12}
        className="w-10 h-10 rounded-full bg-[#181920] border border-[#252631] items-center justify-center active:opacity-75"
        style={styles.iconBtn}
      >
        <ChevronDownIcon size={22} color="#ffffff" />
      </Pressable>

      {/* Session Title */}
      <View className="items-center" style={styles.titleColumn}>
        <Text
          className="text-[#8e8f99] text-[10px] font-bold tracking-widest uppercase"
          style={styles.subtitle}
        >
          REPRODUCIENDO DESDE
        </Text>
        <Text
          className="text-white text-xs font-semibold mt-0.5"
          style={styles.title}
        >
          {sessionTitle}
        </Text>
      </View>

      {/* More Options Button */}
      <Pressable
        onPress={onMore}
        hitSlop={12}
        className="w-10 h-10 rounded-full bg-[#181920] border border-[#252631] items-center justify-center active:opacity-75"
        style={styles.iconBtn}
      >
        <MoreHorizontalIcon size={18} color="#ffffff" />
      </Pressable>
    </View>
  );
}

const styles = StyleSheet.create({
  container: {
    flexDirection: 'row',
    alignItems: 'center',
    justifyContent: 'space-between',
    paddingHorizontal: 16,
    paddingVertical: 12,
  },
  iconBtn: {
    width: 38,
    height: 38,
    borderRadius: 19,
    backgroundColor: '#181920',
    borderWidth: 1,
    borderColor: '#252631',
    alignItems: 'center',
    justifyContent: 'center',
  },
  titleColumn: {
    alignItems: 'center',
  },
  subtitle: {
    color: '#8e8f99',
    fontSize: 10,
    fontWeight: '700',
    letterSpacing: 1.2,
  },
  title: {
    color: '#ffffff',
    fontSize: 13,
    fontWeight: '600',
    marginTop: 2,
  },
});
