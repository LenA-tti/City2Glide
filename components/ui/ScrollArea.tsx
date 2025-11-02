/**
 * ScrollArea Component - React Native
 * 
 * Augments native scroll functionality for custom scrolling.
 */

import React from 'react';
import { ScrollView, StyleSheet, ViewStyle } from 'react-native';

interface ScrollAreaProps {
  children: React.ReactNode;
  horizontal?: boolean;
  showsHorizontalScrollIndicator?: boolean;
  showsVerticalScrollIndicator?: boolean;
  style?: ViewStyle;
}

export function ScrollArea({
  children,
  horizontal = false,
  showsHorizontalScrollIndicator = false,
  showsVerticalScrollIndicator = false,
  style,
}: ScrollAreaProps) {
  return (
    <ScrollView
      horizontal={horizontal}
      showsHorizontalScrollIndicator={showsHorizontalScrollIndicator}
      showsVerticalScrollIndicator={showsVerticalScrollIndicator}
      style={[styles.scrollArea, style]}
      contentContainerStyle={styles.contentContainer}
    >
      {children}
    </ScrollView>
  );
}

const styles = StyleSheet.create({
  scrollArea: {
    flex: 1,
  },
  contentContainer: {
    flexGrow: 1,
  },
});
