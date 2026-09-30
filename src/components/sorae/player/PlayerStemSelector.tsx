import React from 'react';
import { View, Text, Pressable, ScrollView, StyleSheet } from 'react-native';

interface PlayerStemSelectorProps {
  stems?: string[];
  activeStem?: string;
  onSelectStem?: (stem: string) => void;
}

const DEFAULT_STEMS = ['Master', 'Drums', 'Bass', 'Synths', 'Vocals'];

export function PlayerStemSelector({
  stems = DEFAULT_STEMS,
  activeStem = 'Master',
  onSelectStem,
}: PlayerStemSelectorProps) {
  return (
    <View className="my-1.5" style={styles.container}>
      <View className="px-6 mb-2 flex-row items-center justify-between" style={styles.labelRow}>
        <Text
          className="text-[#8e8f99] text-[10px] font-bold tracking-wider uppercase"
          style={styles.label}
        >
          STEMS / PISTAS AISLADAS
        </Text>
        <Text className="text-[#8b5cf6] text-[11px] font-medium" style={styles.soloText}>
          Modo Studio
        </Text>
      </View>

      <ScrollView
        horizontal
        showsHorizontalScrollIndicator={false}
        contentContainerStyle={styles.scrollContent}
      >
        {stems.map((stem) => {
          const isActive = stem === activeStem;
          return (
            <Pressable
              key={stem}
              onPress={() => onSelectStem?.(stem)}
              className={`rounded-full px-4 py-1.5 ${
                isActive
                  ? 'bg-[#8b5cf6]'
                  : 'bg-[#181920] border border-[#252631]'
              } active:opacity-80`}
              style={[
                styles.stemPill,
                isActive ? styles.stemPillActive : styles.stemPillInactive,
              ]}
            >
              <Text
                className={`text-xs font-semibold ${
                  isActive ? 'text-white' : 'text-[#a1a1aa]'
                }`}
                style={[
                  styles.stemText,
                  isActive ? styles.stemTextActive : styles.stemTextInactive,
                ]}
              >
                {stem}
              </Text>
            </Pressable>
          );
        })}
      </ScrollView>
    </View>
  );
}

const styles = StyleSheet.create({
  container: {
    marginVertical: 4,
  },
  labelRow: {
    paddingHorizontal: 24,
    marginBottom: 8,
    flexDirection: 'row',
    alignItems: 'center',
    justifyContent: 'space-between',
  },
  label: {
    color: '#8e8f99',
    fontSize: 10,
    fontWeight: '700',
    letterSpacing: 0.8,
  },
  soloText: {
    color: '#8b5cf6',
    fontSize: 11,
    fontWeight: '600',
  },
  scrollContent: {
    paddingHorizontal: 24,
    flexDirection: 'row',
    gap: 8,
  },
  stemPill: {
    borderRadius: 9999,
    paddingHorizontal: 16,
    paddingVertical: 6,
    justifyContent: 'center',
    alignItems: 'center',
  },
  stemPillActive: {
    backgroundColor: '#8b5cf6',
  },
  stemPillInactive: {
    backgroundColor: '#181920',
    borderWidth: 1,
    borderColor: '#252631',
  },
  stemText: {
    fontSize: 12,
  },
  stemTextActive: {
    color: '#ffffff',
    fontWeight: '700',
  },
  stemTextInactive: {
    color: '#a1a1aa',
    fontWeight: '500',
  },
});
