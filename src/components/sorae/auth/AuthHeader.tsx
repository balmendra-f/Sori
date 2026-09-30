import React from 'react';
import { View, Text, Pressable, StyleSheet } from 'react-native';
import { ArrowLeftIcon, LogoWaveIcon } from '../Icons';

interface AuthHeaderProps {
  title: string;
  subtitle?: string;
  showBack?: boolean;
  onBack?: () => void;
  showLogo?: boolean;
}

export function AuthHeader({
  title,
  subtitle,
  showBack = false,
  onBack,
  showLogo = true,
}: AuthHeaderProps) {
  return (
    <View className="items-center mb-8" style={styles.container}>
      {/* Back button row if present */}
      {showBack ? (
        <View className="w-full flex-row items-center mb-4" style={styles.backRow}>
          <Pressable
            onPress={onBack}
            hitSlop={12}
            className="w-10 h-10 rounded-full bg-[#181920] border border-[#23242c] items-center justify-center active:opacity-80"
            style={styles.backBtn}
          >
            <ArrowLeftIcon size={20} color="#ffffff" />
          </Pressable>
        </View>
      ) : null}

      {/* Branded Logo (Logo only, without name) */}
      {showLogo ? (
        <View className="items-center mb-5" style={styles.logoWrapper}>
          <View
            className="w-20 h-20 rounded-3xl bg-[#12111c] items-center justify-center border border-[#9359ff]/40 shadow-lg"
            style={styles.logoBox}
          >
            <LogoWaveIcon size={36} color="#9359ff" />
          </View>
        </View>
      ) : null}

      {/* Header Titles */}
      <Text className="text-2xl font-bold text-white text-center mb-2" style={styles.title}>
        {title}
      </Text>
      {subtitle ? (
        <Text className="text-sm text-[#8e8f99] text-center px-4" style={styles.subtitle}>
          {subtitle}
        </Text>
      ) : null}
    </View>
  );
}

const styles = StyleSheet.create({
  container: {
    alignItems: 'center',
    marginBottom: 28,
  },
  backRow: {
    width: '100%',
    flexDirection: 'row',
    alignItems: 'center',
    marginBottom: 16,
  },
  backBtn: {
    width: 40,
    height: 40,
    borderRadius: 20,
    backgroundColor: '#181920',
    borderWidth: 1,
    borderColor: '#23242c',
    alignItems: 'center',
    justifyContent: 'center',
  },
  logoWrapper: {
    alignItems: 'center',
    marginBottom: 16,
  },
  logoBox: {
    width: 76,
    height: 76,
    borderRadius: 24,
    backgroundColor: '#181920',
    alignItems: 'center',
    justifyContent: 'center',
    borderWidth: 1.5,
    borderColor: 'rgba(139, 92, 246, 0.4)',
    marginBottom: 10,
    shadowColor: '#8b5cf6',
    shadowOffset: { width: 0, height: 4 },
    shadowOpacity: 0.25,
    shadowRadius: 10,
    elevation: 8,
  },
  brandTitle: {
    fontSize: 12,
    fontWeight: '800',
    letterSpacing: 2,
    color: '#8b5cf6',
    textTransform: 'uppercase',
  },
  title: {
    fontSize: 24,
    fontWeight: '700',
    color: '#ffffff',
    textAlign: 'center',
    marginBottom: 8,
    letterSpacing: -0.3,
  },
  subtitle: {
    fontSize: 14,
    color: '#8e8f99',
    textAlign: 'center',
    paddingHorizontal: 16,
    lineHeight: 20,
  },
});
