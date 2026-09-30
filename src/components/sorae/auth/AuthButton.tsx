import React from 'react';
import {
  Pressable,
  Text,
  ActivityIndicator,
  View,
  StyleSheet,
} from 'react-native';

interface AuthButtonProps {
  title: string;
  onPress: () => void;
  isLoading?: boolean;
  disabled?: boolean;
  icon?: React.ReactNode;
  variant?: 'primary' | 'secondary' | 'outline';
}

export function AuthButton({
  title,
  onPress,
  isLoading = false,
  disabled = false,
  icon,
  variant = 'primary',
}: AuthButtonProps) {
  const isDisabled = disabled || isLoading;

  const isPrimary = variant === 'primary';
  const isOutline = variant === 'outline';

  return (
    <Pressable
      onPress={onPress}
      disabled={isDisabled}
      className={`w-full py-4 rounded-2xl items-center justify-center flex-row ${
        isDisabled
          ? 'bg-[#23242c] opacity-60'
          : isPrimary
          ? 'bg-[#8b5cf6] active:bg-[#7c3aed]'
          : isOutline
          ? 'bg-transparent border border-[#23242c] active:bg-[#16171e]'
          : 'bg-[#181920] active:bg-[#23242c]'
      }`}
      style={[
        styles.button,
        isPrimary && styles.primaryBtn,
        isOutline && styles.outlineBtn,
        isDisabled && styles.disabledBtn,
      ]}
    >
      {isLoading ? (
        <ActivityIndicator size="small" color="#ffffff" />
      ) : (
        <View className="flex-row items-center justify-center gap-2" style={styles.content}>
          {icon ? <View style={styles.icon}>{icon}</View> : null}
          <Text
            className={`text-base font-bold tracking-wide ${
              isDisabled
                ? 'text-[#8e8f99]'
                : isPrimary
                ? 'text-white'
                : 'text-[#8b5cf6]'
            }`}
            style={[
              styles.text,
              isPrimary && styles.primaryText,
              isDisabled && styles.disabledText,
            ]}
          >
            {title}
          </Text>
        </View>
      )}
    </Pressable>
  );
}

const styles = StyleSheet.create({
  button: {
    width: '100%',
    paddingVertical: 15,
    borderRadius: 16,
    alignItems: 'center',
    justifyContent: 'center',
    flexDirection: 'row',
  },
  primaryBtn: {
    backgroundColor: '#8b5cf6',
  },
  outlineBtn: {
    backgroundColor: 'transparent',
    borderWidth: 1,
    borderColor: '#23242c',
  },
  disabledBtn: {
    backgroundColor: '#23242c',
    opacity: 0.6,
  },
  content: {
    flexDirection: 'row',
    alignItems: 'center',
    justifyContent: 'center',
    gap: 8,
  },
  icon: {
    alignItems: 'center',
    justifyContent: 'center',
  },
  text: {
    fontSize: 16,
    fontWeight: '700',
    letterSpacing: 0.3,
  },
  primaryText: {
    color: '#ffffff',
  },
  disabledText: {
    color: '#8e8f99',
  },
});
