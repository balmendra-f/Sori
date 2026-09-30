import React from 'react';
import { View, Text, Pressable, StyleSheet } from 'react-native';
import { SettingsIcon, ShareIcon, LogOutIcon } from '../Icons';

interface ProfileHeaderProps {
  handle: string;
  onSettingsPress?: () => void;
  onSharePress?: () => void;
  onLogoutPress?: () => void;
}

export function ProfileHeader({
  handle,
  onSettingsPress,
  onSharePress,
  onLogoutPress,
}: ProfileHeaderProps) {
  return (
    <View
      className="flex-row items-center justify-between px-4 py-3 bg-[#0d0e12]"
      style={styles.container}
    >
      {/* Profile Handle */}
      <Text
        className="text-white text-lg font-bold tracking-tight"
        style={styles.handleText}
      >
        {handle}
      </Text>

      {/* Right Actions */}
      <View className="flex-row items-center gap-2.5" style={styles.actionsRow}>
        <Pressable
          onPress={onSharePress}
          className="w-9 h-9 rounded-full bg-[#181920] border border-[#252631] items-center justify-center active:opacity-80"
          style={styles.actionBtn}
        >
          <ShareIcon size={16} color="#ffffff" />
        </Pressable>

        <Pressable
          onPress={onSettingsPress}
          className="w-9 h-9 rounded-full bg-[#181920] border border-[#252631] items-center justify-center active:opacity-80"
          style={styles.actionBtn}
        >
          <SettingsIcon size={18} color="#ffffff" />
        </Pressable>

        {onLogoutPress ? (
          <Pressable
            onPress={onLogoutPress}
            hitSlop={8}
            className="w-9 h-9 rounded-full bg-[#181920] border border-red-500/30 items-center justify-center active:opacity-80"
            style={[styles.actionBtn, styles.logoutBtn]}
          >
            <LogOutIcon size={15} color="#ef4444" />
          </Pressable>
        ) : null}
      </View>
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
    backgroundColor: '#0d0e12',
  },
  handleText: {
    color: '#ffffff',
    fontSize: 18,
    fontWeight: '700',
    letterSpacing: -0.3,
  },
  actionsRow: {
    flexDirection: 'row',
    alignItems: 'center',
    gap: 10,
  },
  actionBtn: {
    width: 36,
    height: 36,
    borderRadius: 18,
    backgroundColor: '#181920',
    borderWidth: 1,
    borderColor: '#252631',
    alignItems: 'center',
    justifyContent: 'center',
  },
  logoutBtn: {
    borderColor: 'rgba(239, 68, 68, 0.35)',
  },
});
