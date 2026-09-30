import React, { useState } from 'react';
import {
  View,
  Text,
  TextInput,
  Pressable,
  StyleSheet,
  KeyboardTypeOptions,
} from 'react-native';
import { EyeIcon, EyeOffIcon } from '../Icons';

interface AuthInputProps {
  label?: string;
  icon?: React.ReactNode;
  placeholder?: string;
  value: string;
  onChangeText: (text: string) => void;
  secureTextEntry?: boolean;
  keyboardType?: KeyboardTypeOptions;
  autoCapitalize?: 'none' | 'sentences' | 'words' | 'characters';
  error?: string;
  autoFocus?: boolean;
  editable?: boolean;
}

export function AuthInput({
  label,
  icon,
  placeholder,
  value,
  onChangeText,
  secureTextEntry = false,
  keyboardType = 'default',
  autoCapitalize = 'none',
  error,
  autoFocus = false,
  editable = true,
}: AuthInputProps) {
  const [isFocused, setIsFocused] = useState(false);
  const [showPassword, setShowPassword] = useState(false);

  const isSecure = secureTextEntry && !showPassword;

  return (
    <View className="mb-4" style={styles.wrapper}>
      {label ? (
        <Text className="text-xs font-semibold text-[#8e8f99] mb-1.5 uppercase tracking-wider" style={styles.label}>
          {label}
        </Text>
      ) : null}

      <View
        className={`flex-row items-center bg-[#16171e] rounded-2xl px-3.5 py-3 border ${
          error
            ? 'border-red-500/70'
            : isFocused
            ? 'border-purple-500'
            : 'border-[#23242c]'
        }`}
        style={[
          styles.container,
          isFocused && styles.focusedContainer,
          error ? styles.errorContainer : undefined,
        ]}
      >
        {icon ? <View className="mr-3" style={styles.iconContainer}>{icon}</View> : null}

        <TextInput
          className="flex-1 text-white text-base py-0"
          style={styles.input}
          placeholder={placeholder}
          placeholderTextColor="#6b7280"
          value={value}
          onChangeText={onChangeText}
          secureTextEntry={isSecure}
          keyboardType={keyboardType}
          autoCapitalize={autoCapitalize}
          autoCorrect={false}
          autoFocus={autoFocus}
          editable={editable}
          onFocus={() => setIsFocused(true)}
          onBlur={() => setIsFocused(false)}
        />

        {secureTextEntry ? (
          <Pressable
            onPress={() => setShowPassword((prev) => !prev)}
            hitSlop={10}
            className="p-1 active:opacity-70"
            style={styles.eyeBtn}
          >
            {showPassword ? (
              <EyeOffIcon size={18} color="#8e8f99" />
            ) : (
              <EyeIcon size={18} color="#8e8f99" />
            )}
          </Pressable>
        ) : null}
      </View>

      {error ? (
        <Text className="text-red-400 text-xs mt-1.5 ml-1 font-medium" style={styles.errorText}>
          {error}
        </Text>
      ) : null}
    </View>
  );
}

const styles = StyleSheet.create({
  wrapper: {
    marginBottom: 16,
  },
  label: {
    fontSize: 11,
    fontWeight: '600',
    color: '#8e8f99',
    marginBottom: 6,
    textTransform: 'uppercase',
    letterSpacing: 0.5,
  },
  container: {
    flexDirection: 'row',
    alignItems: 'center',
    backgroundColor: '#16171e',
    borderRadius: 16,
    paddingHorizontal: 14,
    paddingVertical: 13,
    borderWidth: 1,
    borderColor: '#23242c',
  },
  focusedContainer: {
    borderColor: '#8b5cf6',
  },
  errorContainer: {
    borderColor: 'rgba(239, 68, 68, 0.7)',
  },
  iconContainer: {
    marginRight: 10,
    alignItems: 'center',
    justifyContent: 'center',
  },
  input: {
    flex: 1,
    color: '#ffffff',
    fontSize: 15,
    paddingVertical: 0,
  },
  eyeBtn: {
    padding: 4,
  },
  errorText: {
    color: '#f87171',
    fontSize: 12,
    marginTop: 6,
    marginLeft: 4,
    fontWeight: '500',
  },
});
