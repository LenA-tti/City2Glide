/**
 * Separator Component - React Native
 * 
 * Visually or semantically separates content.
 */

import React from 'react';
import { View, StyleSheet } from 'react-native';

interface SeparatorProps {
  orientation?: 'horizontal' | 'vertical';
  className?: string;
  style?: any;
}

export function Separator({ orientation = 'horizontal', style }: SeparatorProps) {
  return (
    <View
      style={[
        styles.separator,
        orientation === 'horizontal' ? styles.horizontal : styles.vertical,
        style,
      ]}
    />
  );
}

const styles = StyleSheet.create({
  separator: {
    backgroundColor: '#e5e7eb',
  },
  horizontal: {
    height: 1,
    width: '100%',
  },
  vertical: {
    width: 1,
    height: '100%',
  },
});
