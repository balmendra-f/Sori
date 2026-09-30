import React from 'react';
import { View, Text, Pressable, StyleSheet } from 'react-native';
import { EditIcon, ShareIcon } from '../Icons';

interface ProfileActionsProps {
  onEditPress?: () => void;
  onSharePress?: () => void;
}

export function ProfileActions({
  onEditPress,
  onSharePress,
}: ProfileActionsProps) {
  return (
    <View
      className="flex-row items-center gap-3 px-4 py-3"
      style={styles.container}
    >
      {/* Edit Profile Button */}
      <Pressable
        onPress={onEditPress}
        className="flex-1 flex-row items-center justify-center gap-2 bg-[#22232d] border border-[#2e2f3d] py-2.5 rounded-full active:opacity-80"
        style={styles.actionBtn}
      >
        <EditIcon size={14} color="#ffffff" />
        <Text
          className="text-white text-xs font-semibold"
          style={styles.actionBtnText}
        >
          Editar Perfil
        </Text>
      </Pressable>

      {/* Share Profile Button */}
      <Pressable
        onPress={onSharePress}
        className="flex-1 flex-row items-center justify-center gap-2 bg-[#181920] border border-[#252631] py-2.5 rounded-full active:opacity-80"
        style={styles.secondaryBtn}
      >
        <ShareIcon size={14} color="#a1a1aa" />
        <Text
          className="text-[#a1a1aa] text-xs font-semibold"
          style={styles.secondaryBtnText}
        >
          Compartir
        </Text>
      </Pressable>
    </View>
  );
}

const styles = StyleSheet.create({
  container: {
    flexDirection: 'row',
    alignItems: 'center',
    gap: 12,
    paddingHorizontal: 16,
    paddingVertical: 10,
  },
  actionBtn: {
    flex: 1,
    flexDirection: 'row',
    alignItems: 'center',
    justifyContent: 'center',
    gap: 8,
    backgroundColor: '#22232d',
    borderWidth: 1,
    borderColor: '#2e2f3d',
    paddingVertical: 9,
    borderRadius: 9999,
  },
  actionBtnText: {
    color: '#ffffff',
    fontSize: 13,
    fontWeight: '600',
  },
  secondaryBtn: {
    flex: 1,
    flexDirection: 'row',
    alignItems: 'center',
    justifyContent: 'center',
    gap: 8,
    backgroundColor: '#181920',
    borderWidth: 1,
    borderColor: '#252631',
    paddingVertical: 9,
    borderRadius: 9999,
  },
  secondaryBtnText: {
    color: '#a1a1aa',
    fontSize: 13,
    fontWeight: '600',
  },
});
