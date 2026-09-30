import React from 'react';
import { View, Text, StyleSheet } from 'react-native';

export interface ProfileStatItem {
  label: string;
  value: string;
}

interface ProfileStatsProps {
  stats?: ProfileStatItem[];
}

const DEFAULT_STATS: ProfileStatItem[] = [
  { label: 'Tracks', value: '24' },
  { label: 'Seguidores', value: '18.4k' },
  { label: 'Siguiendo', value: '412' },
  { label: 'Reproducciones', value: '120k' },
];

export function ProfileStats({ stats = DEFAULT_STATS }: ProfileStatsProps) {
  return (
    <View
      className="flex-row items-center justify-between px-4 py-2"
      style={styles.container}
    >
      {stats.map((item, index) => (
        <View
          key={index}
          className="flex-1 bg-[#16171e] border border-[#23242c] rounded-2xl py-3 px-1 items-center mx-1"
          style={styles.statCard}
        >
          <Text
            className="text-white text-base font-bold tracking-tight"
            style={styles.statValue}
          >
            {item.value}
          </Text>
          <Text
            className="text-[#8e8f99] text-[10px] font-medium mt-0.5 text-center"
            style={styles.statLabel}
          >
            {item.label}
          </Text>
        </View>
      ))}
    </View>
  );
}

const styles = StyleSheet.create({
  container: {
    flexDirection: 'row',
    alignItems: 'center',
    justifyContent: 'space-between',
    paddingHorizontal: 14,
    paddingVertical: 6,
  },
  statCard: {
    flex: 1,
    backgroundColor: '#16171e',
    borderWidth: 1,
    borderColor: '#23242c',
    borderRadius: 16,
    paddingVertical: 10,
    paddingHorizontal: 4,
    alignItems: 'center',
    marginHorizontal: 4,
  },
  statValue: {
    color: '#ffffff',
    fontSize: 16,
    fontWeight: '700',
    letterSpacing: -0.3,
  },
  statLabel: {
    color: '#8e8f99',
    fontSize: 10,
    fontWeight: '500',
    marginTop: 2,
    textAlign: 'center',
  },
});
