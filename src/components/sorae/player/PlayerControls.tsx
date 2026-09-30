import React from 'react';
import { View, Pressable, StyleSheet } from 'react-native';
import {
  PlayIcon,
  PauseIcon,
  PreviousIcon,
  NextIcon,
  ShuffleIcon,
  RepeatIcon,
} from '../Icons';

interface PlayerControlsProps {
  isPlaying: boolean;
  isShuffle?: boolean;
  isRepeat?: boolean;
  onTogglePlay: () => void;
  onPrevious?: () => void;
  onNext?: () => void;
  onToggleShuffle?: () => void;
  onToggleRepeat?: () => void;
}

export function PlayerControls({
  isPlaying,
  isShuffle = false,
  isRepeat = false,
  onTogglePlay,
  onPrevious,
  onNext,
  onToggleShuffle,
  onToggleRepeat,
}: PlayerControlsProps) {
  return (
    <View
      className="flex-row items-center justify-between px-8 my-4"
      style={styles.container}
    >
      {/* Shuffle Button */}
      <Pressable
        onPress={onToggleShuffle}
        hitSlop={12}
        className="p-2 active:opacity-70"
        style={styles.secondaryBtn}
      >
        <ShuffleIcon
          size={20}
          color={isShuffle ? '#8b5cf6' : '#8e8f99'}
        />
      </Pressable>

      {/* Previous Track Button */}
      <Pressable
        onPress={onPrevious}
        hitSlop={12}
        className="p-2 active:opacity-70"
        style={styles.skipBtn}
      >
        <PreviousIcon size={22} color="#ffffff" />
      </Pressable>

      {/* Big Center Play/Pause Button */}
      <Pressable
        onPress={onTogglePlay}
        className="w-18 h-18 rounded-full bg-[#8b5cf6] items-center justify-center shadow-xl shadow-purple-600/60 active:scale-95 active:opacity-90"
        style={styles.playBtn}
      >
        {isPlaying ? (
          <PauseIcon size={22} color="#ffffff" />
        ) : (
          <PlayIcon size={20} color="#ffffff" />
        )}
      </Pressable>

      {/* Next Track Button */}
      <Pressable
        onPress={onNext}
        hitSlop={12}
        className="p-2 active:opacity-70"
        style={styles.skipBtn}
      >
        <NextIcon size={22} color="#ffffff" />
      </Pressable>

      {/* Repeat Track Button */}
      <Pressable
        onPress={onToggleRepeat}
        hitSlop={12}
        className="p-2 active:opacity-70"
        style={styles.secondaryBtn}
      >
        <RepeatIcon
          size={20}
          color={isRepeat ? '#8b5cf6' : '#8e8f99'}
        />
      </Pressable>
    </View>
  );
}

const styles = StyleSheet.create({
  container: {
    flexDirection: 'row',
    alignItems: 'center',
    justifyContent: 'space-between',
    paddingHorizontal: 28,
    marginVertical: 12,
  },
  secondaryBtn: {
    padding: 8,
  },
  skipBtn: {
    padding: 8,
  },
  playBtn: {
    width: 68,
    height: 68,
    borderRadius: 34,
    backgroundColor: '#8b5cf6',
    alignItems: 'center',
    justifyContent: 'center',
    shadowColor: '#8b5cf6',
    shadowOffset: { width: 0, height: 6 },
    shadowOpacity: 0.55,
    shadowRadius: 14,
    elevation: 10,
  },
});
