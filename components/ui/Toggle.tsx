/**
 * Toggle Component - React Native
 * 
 * A two-state button that can be either on or off.
 */

import React from 'react';
import { TouchableOpacity, Text, StyleSheet } from 'react-native';

interface ToggleProps {
  pressed?: boolean;
  onPress?: () => void;
  children: React.ReactNode;
  variant?: 'default' | 'outline';
  size?: 'sm' | 'md' | 'lg';
  disabled?: boolean;
}

export function Toggle({
  pressed = false,
  onPress,
  children,
  variant = 'default',
  size = 'md',
  disabled = false,
}: ToggleProps) {
  const sizeStyles = {
    sm: { paddingHorizontal: 12, paddingVertical: 6, fontSize: 12 },
    md: { paddingHorizontal: 16, paddingVertical: 8, fontSize: 14 },
    lg: { paddingHorizontal: 20, paddingVertical: 10, fontSize: 16 },
  };

  const variantStyles = pressed
    ? variant === 'outline'
      ? styles.outlinePressed
      : styles.defaultPressed
    : variant === 'outline'
    ? styles.outline
    : styles.default;

  return (
    <TouchableOpacity
      onPress={onPress}
      disabled={disabled}
      activeOpacity={0.7}
      style={[
        styles.toggle,
        variantStyles,
        {
          paddingHorizontal: sizeStyles[size].paddingHorizontal,
          paddingVertical: sizeStyles[size].paddingVertical,
        },
        disabled && styles.disabled,
      ]}
    >
      <Text
        style={[
          styles.text,
          pressed && styles.textPressed,
          { fontSize: sizeStyles[size].fontSize },
          disabled && styles.textDisabled,
        ]}
      >
        {children}
      </Text>
    </TouchableOpacity>
  );
}

const styles = StyleSheet.create({
  toggle: {
    borderRadius: 8,
    alignItems: 'center',
    justifyContent: 'center',
  },
  default: {
    backgroundColor: '#f3f4f6',
  },
  defaultPressed: {
    backgroundColor: '#3b82f6',
  },
  outline: {
    backgroundColor: 'transparent',
    borderWidth: 1,
    borderColor: '#e5e7eb',
  },
  outlinePressed: {
    backgroundColor: 'transparent',
    borderWidth: 1,
    borderColor: '#3b82f6',
  },
  text: {
    color: '#1f2937',
  },
  textPressed: {
    color: '#ffffff',
  },
  disabled: {
    opacity: 0.5,
  },
  textDisabled: {
    color: '#9ca3af',
  },
});
