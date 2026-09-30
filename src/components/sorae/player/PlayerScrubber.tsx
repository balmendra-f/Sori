import React from 'react';
import { View, Text, Pressable, StyleSheet } from 'react-native';

interface PlayerScrubberProps {
  progress: number; // 0 to 1
  currentTime?: string;
  totalDuration?: string;
  onSeek?: (ratio: number) => void;
  waveformBars?: number[];
}

const DEFAULT_DETAILED_WAVE = [
  0.25, 0.4, 0.6, 0.8, 0.5, 0.7, 0.95, 0.75, 0.6, 0.85, 1.0, 0.8, 0.65, 0.5,
  0.7, 0.9, 0.6, 0.75, 0.85, 0.55, 0.4, 0.6, 0.8, 0.7, 0.9, 0.65, 0.5, 0.7,
  0.85, 0.6, 0.45, 0.55, 0.7, 0.45, 0.35, 0.25,
];

export function PlayerScrubber({
  progress = 0.45,
  currentTime = '1:42',
  totalDuration = '3:00',
  onSeek,
  waveformBars = DEFAULT_DETAILED_WAVE,
}: PlayerScrubberProps) {
  const totalBars = waveformBars.length;
  const activeCutoffIndex = Math.floor(totalBars * progress);

  return (
    <View className="px-6 my-3" style={styles.container}>
      {/* Waveform Visualization Bars */}
      <View
        className="flex-row items-center justify-between h-14 bg-[#12131a] border border-[#22232f] rounded-2xl px-3 py-2"
        style={styles.waveContainer}
      >
        {waveformBars.map((heightPercent, index) => {
          const isBarActive = index <= activeCutoffIndex;
          const barHeight = Math.max(6, Math.round(heightPercent * 40));

          return (
            <Pressable
              key={index}
              onPress={() => onSeek?.(index / (totalBars - 1))}
              className="py-1 items-center justify-center flex-1"
              style={styles.barTouch}
            >
              <View
                style={{
                  width: 3.5,
                  height: barHeight,
                  borderRadius: 2,
                  backgroundColor: isBarActive ? '#8b5cf6' : '#262734',
                }}
              />
            </Pressable>
          );
        })}
      </View>

      {/* Progress Track Line */}
      <View
        className="h-1 bg-[#252634] rounded-full overflow-hidden mt-3 w-full"
        style={styles.trackLine}
      >
        <View
          style={[styles.fillLine, { width: `${Math.round(progress * 100)}%` }]}
          className="h-full bg-[#8b5cf6] rounded-full"
        />
      </View>

      {/* Timestamps */}
      <View
        className="flex-row items-center justify-between mt-1.5"
        style={styles.timestampsRow}
      >
        <Text className="text-[#8e8f99] text-xs font-medium" style={styles.timeText}>
          {currentTime}
        </Text>
        <Text className="text-[#8e8f99] text-xs font-medium" style={styles.timeText}>
          {totalDuration}
        </Text>
      </View>
    </View>
  );
}

const styles = StyleSheet.create({
  container: {
    paddingHorizontal: 24,
    marginVertical: 10,
  },
  waveContainer: {
    flexDirection: 'row',
    alignItems: 'center',
    justifyContent: 'space-between',
    height: 56,
    backgroundColor: '#12131a',
    borderWidth: 1,
    borderColor: '#22232f',
    borderRadius: 16,
    paddingHorizontal: 12,
    paddingVertical: 6,
  },
  barTouch: {
    flex: 1,
    alignItems: 'center',
    justifyContent: 'center',
    paddingVertical: 4,
  },
  trackLine: {
    height: 3.5,
    backgroundColor: '#252634',
    borderRadius: 9999,
    overflow: 'hidden',
    marginTop: 10,
    width: '100%',
  },
  fillLine: {
    height: '100%',
    backgroundColor: '#8b5cf6',
    borderRadius: 9999,
  },
  timestampsRow: {
    flexDirection: 'row',
    alignItems: 'center',
    justifyContent: 'space-between',
    marginTop: 6,
  },
  timeText: {
    color: '#8e8f99',
    fontSize: 12,
    fontWeight: '500',
  },
});
