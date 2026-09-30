import React from 'react';
import { View, Text, Pressable, Platform, StyleSheet } from 'react-native';
import { useSafeAreaInsets } from 'react-native-safe-area-context';
import { FeedWaveIcon, PlusIcon, UserIcon } from './Icons';

interface BottomNavBarProps {
  activeTab?: 'feed' | 'perfil';
  onSelectTab?: (tab: 'feed' | 'perfil') => void;
  onFabPress?: () => void;
}

export function BottomNavBar({
  activeTab = 'feed',
  onSelectTab,
  onFabPress,
}: BottomNavBarProps) {
  const insets = useSafeAreaInsets();
  const bottomPadding = Math.max(insets.bottom, Platform.OS === 'ios' ? 20 : 12);

  return (
    <View
      className="bg-[#090a0e] border-t border-[#181920] px-8 pt-2"
      style={[styles.container, { paddingBottom: bottomPadding }]}
    >
      <View className="flex-row items-center justify-between" style={styles.navRow}>
        {/* Feed Tab */}
        <Pressable
          onPress={() => onSelectTab?.('feed')}
          className="items-center justify-center py-1 min-w-[60px] active:opacity-75"
          style={styles.tabItem}
        >
          <FeedWaveIcon
            size={20}
            color={activeTab === 'feed' ? '#8b5cf6' : '#8e8f99'}
          />
          <Text
            className={`text-[11px] mt-1 ${
              activeTab === 'feed'
                ? 'text-[#8b5cf6] font-semibold'
                : 'text-[#8e8f99] font-medium'
            }`}
            style={[
              styles.tabLabel,
              {
                color: activeTab === 'feed' ? '#8b5cf6' : '#8e8f99',
                fontWeight: activeTab === 'feed' ? '600' : '500',
              },
            ]}
          >
            Feed
          </Text>
        </Pressable>

        {/* Center Floating Action Button (FAB) */}
        <View className="items-center -mt-6" style={styles.fabWrapper}>
          <Pressable
            onPress={onFabPress}
            className="w-14 h-14 rounded-full bg-[#8b5cf6] items-center justify-center shadow-lg shadow-purple-600/50 active:opacity-85 active:scale-95"
            style={styles.fabButton}
          >
            <PlusIcon size={26} color="#ffffff" />
          </Pressable>
        </View>

        {/* Perfil Tab */}
        <Pressable
          onPress={() => onSelectTab?.('perfil')}
          className="items-center justify-center py-1 min-w-[60px] active:opacity-75"
          style={styles.tabItem}
        >
          <UserIcon
            size={20}
            color={activeTab === 'perfil' ? '#8b5cf6' : '#8e8f99'}
          />
          <Text
            className={`text-[11px] mt-1 ${
              activeTab === 'perfil'
                ? 'text-[#8b5cf6] font-semibold'
                : 'text-[#8e8f99] font-medium'
            }`}
            style={[
              styles.tabLabel,
              {
                color: activeTab === 'perfil' ? '#8b5cf6' : '#8e8f99',
                fontWeight: activeTab === 'perfil' ? '600' : '500',
              },
            ]}
          >
            Perfil
          </Text>
        </Pressable>
      </View>
    </View>
  );
}

const styles = StyleSheet.create({
  container: {
    backgroundColor: '#090a0e',
    borderTopWidth: 1,
    borderTopColor: '#181920',
    paddingHorizontal: 32,
    paddingTop: 8,
  },
  navRow: {
    flexDirection: 'row',
    alignItems: 'center',
    justifyContent: 'space-between',
  },
  tabItem: {
    alignItems: 'center',
    justifyContent: 'center',
    paddingVertical: 4,
    minWidth: 60,
  },
  tabLabel: {
    fontSize: 11,
    marginTop: 4,
  },
  fabWrapper: {
    alignItems: 'center',
    marginTop: -24,
  },
  fabButton: {
    width: 56,
    height: 56,
    borderRadius: 28,
    backgroundColor: '#8b5cf6',
    alignItems: 'center',
    justifyContent: 'center',
    shadowColor: '#8b5cf6',
    shadowOffset: { width: 0, height: 4 },
    shadowOpacity: 0.5,
    shadowRadius: 10,
    elevation: 8,
  },
});
