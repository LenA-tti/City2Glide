/**
 * AspectRatio Component - React Native
 * 
 * Displays content within a desired ratio.
 */

import React from 'react';
import { View, StyleSheet } from 'react-native';

interface AspectRatioProps {
  ratio: number; // e.g., 16/9, 4/3, 1/1
  children: React.ReactNode;
}

export function AspectRatio({ ratio, children }: AspectRatioProps) {
  return (
    <View style={styles.container}>
      <View style={[styles.aspectContainer, { paddingBottom: `${(1 / ratio) * 100}%` }]}>
        <View style={styles.content}>{children}</View>
      </View>
    </View>
  );
}

const styles = StyleSheet.create({
  container: {
    width: '100%',
  },
  aspectContainer: {
    position: 'relative',
    width: '100%',
  },
  content: {
    position: 'absolute',
    top: 0,
    left: 0,
    right: 0,
    bottom: 0,
  },
});
