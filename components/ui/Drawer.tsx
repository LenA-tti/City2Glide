/**
 * Drawer Component - React Native
 * 
 * Navigation drawer that slides in from the side.
 * Use with React Navigation's Drawer Navigator
 */

import React from 'react';
import { View, Text, StyleSheet, ScrollView } from 'react-native';
import { SafeAreaView } from 'react-native-safe-area-context';

/**
 * This is a custom drawer content component.
 * For full drawer functionality, use React Navigation's Drawer Navigator:
 * 
 * import { createDrawerNavigator } from '@react-navigation/drawer';
 * const Drawer = createDrawerNavigator();
 * 
 * <Drawer.Navigator
 *   drawerContent={(props) => <CustomDrawerContent {...props} />}
 * >
 *   <Drawer.Screen name="Home" component={HomeScreen} />
 * </Drawer.Navigator>
 */

interface DrawerContentProps {
  children: React.ReactNode;
}

export function DrawerContent({ children }: DrawerContentProps) {
  return (
    <SafeAreaView style={styles.container}>
      <ScrollView style={styles.scrollView}>{children}</ScrollView>
    </SafeAreaView>
  );
}

export function DrawerHeader({ children }: { children: React.ReactNode }) {
  return <View style={styles.header}>{children}</View>;
}

export function DrawerTitle({ children }: { children: React.ReactNode }) {
  return <Text style={styles.title}>{children}</Text>;
}

export function DrawerDescription({ children }: { children: React.ReactNode }) {
  return <Text style={styles.description}>{children}</Text>;
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: '#ffffff',
  },
  scrollView: {
    flex: 1,
  },
  header: {
    padding: 24,
    borderBottomWidth: 1,
    borderBottomColor: '#e5e7eb',
  },
  title: {
    fontSize: 20,
    fontWeight: '600',
    color: '#1f2937',
    marginBottom: 4,
  },
  description: {
    fontSize: 14,
    color: '#6b7280',
  },
});

/**
 * Installation required:
 * npm install @react-navigation/drawer
 * npm install react-native-gesture-handler react-native-reanimated
 */
