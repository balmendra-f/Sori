import React from 'react';
import { View, Text, Pressable, StyleSheet } from 'react-native';
import { RemixIcon, VolumeIcon } from '../Icons';

interface PlayerBottomActionsProps {
  deviceName?: string;
  onDevicePress?: () => void;
  onRemixPress?: () => void;
}

export function PlayerBottomActions({
  deviceName = 'Auriculares Bluetooth (Conectado)',
  onDevicePress,
  onRemixPress,
}: PlayerBottomActionsProps) {
  return (
    <View
      className="flex-row items-center justify-between px-6 py-3 border-t border-[#181922]"
      style={styles.container}
    >
      {/* Device Indicator Button */}
      <Pressable
        onPress={onDevicePress}
        className="flex-row items-center gap-2 active:opacity-75"
        style={styles.deviceBtn}
      >
        <VolumeIcon size={16} color="#8b5cf6" />
        <Text
          className="text-[#a1a1aa] text-xs font-medium"
          style={styles.deviceText}
        >
          {deviceName}
        </Text>
      </Pressable>

      {/* Remix / Export Stem Button */}
      <Pressable
        onPress={onRemixPress}
        className="bg-[#22232e] border border-[#2d2e3d] px-3.5 py-1.5 rounded-full flex-row items-center gap-1.5 active:opacity-80"
        style={styles.remixBtn}
      >
        <RemixIcon size={14} color="#ffffff" />
        <Text
          className="text-white text-xs font-medium"
          style={styles.remixText}
        >
          Remix
        </Text>
      </Pressable>
    </View>
  );
}

const styles = StyleSheet.create({
  container: {
    flexDirection: 'row',
    alignItems: 'center',
    justifyContent: 'space-between',
    paddingHorizontal: 24,
    paddingVertical: 12,
    borderTopWidth: 1,
    borderTopColor: '#181922',
  },
  deviceBtn: {
    flexDirection: 'row',
    alignItems: 'center',
    gap: 8,
  },
  deviceText: {
    color: '#a1a1aa',
    fontSize: 12,
    fontWeight: '500',
  },
  remixBtn: {
    backgroundColor: '#22232e',
    borderWidth: 1,
    borderColor: '#2d2e3d',
    paddingHorizontal: 14,
    paddingVertical: 6,
    borderRadius: 9999,
    flexDirection: 'row',
    alignItems: 'center',
    gap: 6,
  },
  remixText: {
    color: '#ffffff',
    fontSize: 12,
    fontWeight: '500',
  },
});
