import React from 'react';
import { View, Text, Pressable, ScrollView, StyleSheet } from 'react-native';

interface FilterTabsProps {
  tabs?: string[];
  activeTab: string;
  onSelectTab: (tab: string) => void;
}

const DEFAULT_TABS = ['Para Ti', 'Siguiendo', 'Loops', 'Beats'];

export function FilterTabs({
  tabs = DEFAULT_TABS,
  activeTab,
  onSelectTab,
}: FilterTabsProps) {
  return (
    <View className="py-2.5" style={styles.container}>
      <ScrollView
        horizontal
        showsHorizontalScrollIndicator={false}
        contentContainerStyle={styles.scrollContent}
      >
        {tabs.map((tab) => {
          const isActive = tab === activeTab;
          return (
            <Pressable
              key={tab}
              onPress={() => onSelectTab(tab)}
              className={`rounded-full px-5 py-2 ${
                isActive
                  ? 'bg-[#8b5cf6]'
                  : 'bg-[#181920] border border-[#252631]'
              } active:opacity-85`}
              style={[
                styles.tabPill,
                isActive ? styles.tabActive : styles.tabInactive,
              ]}
            >
              <Text
                className={`text-sm font-medium ${
                  isActive ? 'text-white font-semibold' : 'text-[#a1a1aa]'
                }`}
                style={[
                  styles.tabText,
                  isActive ? styles.tabTextActive : styles.tabTextInactive,
                ]}
              >
                {tab}
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
    paddingVertical: 10,
  },
  scrollContent: {
    paddingHorizontal: 16,
    flexDirection: 'row',
    gap: 10,
  },
  tabPill: {
    borderRadius: 9999,
    justifyContent: 'center',
    alignItems: 'center',
  },
  tabActive: {
    backgroundColor: '#8b5cf6',
    paddingHorizontal: 20,
    paddingVertical: 8,
  },
  tabInactive: {
    backgroundColor: '#181920',
    borderWidth: 1,
    borderColor: '#252631',
    paddingHorizontal: 16,
    paddingVertical: 8,
  },
  tabText: {
    fontSize: 14,
  },
  tabTextActive: {
    color: '#ffffff',
    fontWeight: '600',
  },
  tabTextInactive: {
    color: '#a1a1aa',
    fontWeight: '500',
  },
});
