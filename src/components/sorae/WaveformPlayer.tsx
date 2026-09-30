import React from 'react';
import { View, Pressable, StyleSheet } from 'react-native';
import { PlayIcon, PauseIcon } from './Icons';

interface WaveformPlayerProps {
  isPlaying: boolean;
  onTogglePlay?: () => void;
  waveformBars: number[];
  playedRatio?: number; // 0 to 1
  onSeek?: (ratio: number) => void;
}

export function WaveformPlayer({
  isPlaying,
  onTogglePlay,
  waveformBars,
  playedRatio = 0,
  onSeek,
}: WaveformPlayerProps) {
  const totalBars = waveformBars.length;
  const effectiveRatio = isPlaying ? (playedRatio > 0 ? playedRatio : 0.45) : playedRatio;
  const activeCutoffIndex = Math.floor(totalBars * effectiveRatio);

  return (
    <View
      className="bg-[#0e0f14] rounded-full px-2.5 py-2 flex-row items-center"
      style={styles.container}
    >
      {/* Play/Pause Button */}
      <Pressable
        onPress={onTogglePlay}
        className={`w-11 h-11 rounded-full items-center justify-center ${
          isPlaying ? 'bg-[#8b5cf6]' : 'bg-[#262732]'
        } active:opacity-80`}
        style={[
          styles.playButton,
          { backgroundColor: isPlaying ? '#8b5cf6' : '#262732' },
        ]}
      >
        {isPlaying ? (
          <PauseIcon size={14} color="#ffffff" />
        ) : (
          <PlayIcon size={13} color="#d4d4d8" />
        )}
      </Pressable>

      {/* Waveform Bars */}
      <View
        className="flex-1 flex-row items-center justify-between ml-3.5 mr-2 h-9"
        style={styles.waveformRow}
      >
        {waveformBars.map((heightPercent, index) => {
          const isBarActive = isPlaying && index <= activeCutoffIndex;
          const barHeight = Math.max(4, Math.round(heightPercent * 28));

          return (
            <Pressable
              key={index}
              onPress={() => onSeek?.(index / (totalBars - 1))}
              className="py-1 items-center justify-center"
              style={styles.barTouch}
            >
              <View
                style={{
                  width: 3,
                  height: barHeight,
                  borderRadius: 1.5,
                  backgroundColor: isBarActive ? '#8b5cf6' : '#282935',
                }}
              />
            </Pressable>
          );
        })}
      </View>
    </View>
  );
}

const styles = StyleSheet.create({
  container: {
    backgroundColor: '#0e0f14',
    borderRadius: 9999,
    paddingHorizontal: 10,
    paddingVertical: 8,
    flexDirection: 'row',
    alignItems: 'center',
  },
  playButton: {
    width: 44,
    height: 44,
    borderRadius: 22,
    alignItems: 'center',
    justifyContent: 'center',
  },
  waveformRow: {
    flex: 1,
    flexDirection: 'row',
    alignItems: 'center',
    justifyContent: 'space-between',
    marginLeft: 14,
    marginRight: 8,
    height: 36,
  },
  barTouch: {
    flex: 1,
    alignItems: 'center',
    justifyContent: 'center',
    paddingVertical: 4,
  },
});
