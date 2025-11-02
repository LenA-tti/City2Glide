/**
 * Textarea Component - React Native
 * 
 * Displays a form textarea or a component that looks like a textarea.
 */

import React from 'react';
import { TextInput, StyleSheet, View, Text } from 'react-native';

interface TextareaProps {
  value?: string;
  onChangeText?: (text: string) => void;
  placeholder?: string;
  disabled?: boolean;
  numberOfLines?: number;
  maxLength?: number;
  error?: string;
  label?: string;
}

export function Textarea({
  value,
  onChangeText,
  placeholder,
  disabled = false,
  numberOfLines = 4,
  maxLength,
  error,
  label,
}: TextareaProps) {
  return (
    <View style={styles.container}>
      {label && <Text style={styles.label}>{label}</Text>}
      <TextInput
        value={value}
        onChangeText={onChangeText}
        placeholder={placeholder}
        editable={!disabled}
        multiline
        numberOfLines={numberOfLines}
        maxLength={maxLength}
        placeholderTextColor="#9ca3af"
        style={[
          styles.textarea,
          disabled && styles.disabled,
          error && styles.error,
        ]}
        textAlignVertical="top"
      />
      {error && <Text style={styles.errorText}>{error}</Text>}
      {maxLength && (
        <Text style={styles.counter}>
          {value?.length || 0}/{maxLength}
        </Text>
      )}
    </View>
  );
}

const styles = StyleSheet.create({
  container: {
    width: '100%',
  },
  label: {
    fontSize: 14,
    fontWeight: '500',
    color: '#1f2937',
    marginBottom: 8,
  },
  textarea: {
    borderWidth: 1,
    borderColor: '#e5e7eb',
    borderRadius: 8,
    padding: 12,
    fontSize: 16,
    color: '#1f2937',
    backgroundColor: '#ffffff',
    minHeight: 100,
  },
  disabled: {
    backgroundColor: '#f3f4f6',
    color: '#9ca3af',
  },
  error: {
    borderColor: '#ef4444',
  },
  errorText: {
    fontSize: 12,
    color: '#ef4444',
    marginTop: 4,
  },
  counter: {
    fontSize: 12,
    color: '#6b7280',
    textAlign: 'right',
    marginTop: 4,
  },
});
