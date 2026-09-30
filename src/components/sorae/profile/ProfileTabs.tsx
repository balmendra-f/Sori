import React from 'react';
import { View, Text, Pressable, ScrollView, StyleSheet } from 'react-native';

interface ProfileTabsProps {
  tabs?: string[];
  activeTab: string;
  onSelectTab: (tab: string) => void;
}

const DEFAULT_PROFILE_TABS = ['Mis Tracks', 'Loops', 'Remixes', 'Guardados'];

export function ProfileTabs({
  tabs = DEFAULT_PROFILE_TABS,
  activeTab,
  onSelectTab,
}: ProfileTabsProps) {
  return (
    <View className="py-2 border-b border-[#181922]" style={styles.container}>
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
              className="py-2 px-4 items-center active:opacity-80"
              style={styles.tabButton}
            >
              <Text
                className={`text-xs font-semibold ${
                  isActive ? 'text-white' : 'text-[#8e8f99]'
                }`}
                style={[
                  styles.tabText,
                  isActive ? styles.tabTextActive : styles.tabTextInactive,
                ]}
              >
                {tab}
              </Text>
              {isActive && (
                <View
                  className="h-0.5 bg-[#8b5cf6] rounded-full mt-1.5 w-full"
                  style={styles.activeIndicator}
                />
              )}
            </Pressable>
          );
        })}
      </ScrollView>
    </View>
  );
}

const styles = StyleSheet.create({
  container: {
    paddingVertical: 4,
    borderBottomWidth: 1,
    borderBottomColor: '#181922',
  },
  scrollContent: {
    paddingHorizontal: 16,
    flexDirection: 'row',
    gap: 8,
  },
  tabButton: {
    paddingVertical: 8,
    paddingHorizontal: 14,
    alignItems: 'center',
  },
  tabText: {
    fontSize: 13,
  },
  tabTextActive: {
    color: '#ffffff',
    fontWeight: '700',
  },
  tabTextInactive: {
    color: '#8e8f99',
    fontWeight: '500',
  },
  activeIndicator: {
    height: 2.5,
    backgroundColor: '#8b5cf6',
    borderRadius: 2,
    marginTop: 6,
    width: '100%',
  },
});
