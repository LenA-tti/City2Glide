/**
 * Slider Component - React Native
 * 
 * An input where the user selects a value from within a given range.
 */

import React from 'react';
import { StyleSheet, Text, View } from 'react-native';

// Try to load optional native slider. If it's not installed we fall back to a
// simple, non-interactive visual that prevents bundler resolution failures.
let ExternalSlider: any = null;
try {
  // eslint-disable-next-line @typescript-eslint/no-var-requires
  const mod = require('@react-native-community/slider');
  ExternalSlider = mod?.default ?? mod;
} catch (e) {
  ExternalSlider = null;
}

interface SliderProps {
  value?: number;
  onValueChange?: (value: number) => void;
  minimumValue?: number;
  maximumValue?: number;
  step?: number;
  disabled?: boolean;
}

export function RNSlider({
  value = 0,
  onValueChange,
  minimumValue = 0,
  maximumValue = 100,
  step = 1,
  disabled = false,
}: SliderProps) {
  if (ExternalSlider) {
    const S = ExternalSlider;
    return (
      <View style={styles.container}>
        <S
          value={value}
          onValueChange={onValueChange}
          minimumValue={minimumValue}
          maximumValue={maximumValue}
          step={step}
          disabled={disabled}
          minimumTrackTintColor="#3b82f6"
          maximumTrackTintColor="#e5e7eb"
          thumbTintColor="#3b82f6"
          style={styles.slider}
        />
      </View>
    );
  }

  // Fallback: non-interactive visual indicator (value shown) so bundler doesn't fail
  return (
    <View style={styles.container}>
      <View style={styles.fallbackTrack} />
      <Text style={styles.fallbackValue}>Value: {value}</Text>
    </View>
  );
}

const styles = StyleSheet.create({
  container: {
    width: '100%',
  },
  slider: {
    width: '100%',
    height: 40,
  },
  fallbackTrack: {
    height: 8,
    backgroundColor: '#e5e7eb',
    borderRadius: 4,
    marginVertical: 8,
  },
  fallbackValue: {
    textAlign: 'center',
    color: '#374151',
  },
});

// Note: Requires installation: npm install @react-native-community/slider
