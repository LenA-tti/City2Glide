/**
 * Alert Component - React Native
 * 
 * Displays a callout for user attention.
 */

import React from 'react';
import { View, Text, StyleSheet } from 'react-native';

interface AlertProps {
  variant?: 'default' | 'destructive' | 'success' | 'warning';
  title?: string;
  description?: string;
  children?: React.ReactNode;
}

export function Alert({ variant = 'default', title, description, children }: AlertProps) {
  const variantStyles = {
    default: {
      backgroundColor: '#f3f4f6',
      borderColor: '#e5e7eb',
      titleColor: '#1f2937',
      descriptionColor: '#6b7280',
    },
    destructive: {
      backgroundColor: '#fee2e2',
      borderColor: '#fca5a5',
      titleColor: '#991b1b',
      descriptionColor: '#dc2626',
    },
    success: {
      backgroundColor: '#dcfce7',
      borderColor: '#86efac',
      titleColor: '#166534',
      descriptionColor: '#16a34a',
    },
    warning: {
      backgroundColor: '#fef3c7',
      borderColor: '#fcd34d',
      titleColor: '#92400e',
      descriptionColor: '#d97706',
    },
  };

  const style = variantStyles[variant];

  return (
    <View
      style={[
        styles.container,
        { backgroundColor: style.backgroundColor, borderColor: style.borderColor },
      ]}
    >
      {title && (
        <Text style={[styles.title, { color: style.titleColor }]}>{title}</Text>
      )}
      {description && (
        <Text style={[styles.description, { color: style.descriptionColor }]}>
          {description}
        </Text>
      )}
      {children}
    </View>
  );
}

export function AlertTitle({ children }: { children: React.ReactNode }) {
  return <Text style={styles.title}>{children}</Text>;
}

export function AlertDescription({ children }: { children: React.ReactNode }) {
  return <Text style={styles.description}>{children}</Text>;
}

const styles = StyleSheet.create({
  container: {
    padding: 16,
    borderRadius: 8,
    borderWidth: 1,
  },
  title: {
    fontSize: 16,
    fontWeight: '600',
    marginBottom: 4,
  },
  description: {
    fontSize: 14,
    lineHeight: 20,
  },
});
