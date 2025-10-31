import { Tabs } from 'expo-router';
import React, { useState } from 'react';
import { View, TouchableOpacity } from 'react-native';
import { FontAwesome } from '@expo/vector-icons';

import AnimatedSidebar from '@/components/animated-sidebar';
import { Colors } from '@/constants/theme';
import { useColorScheme } from '@/hooks/use-color-scheme';

export default function TabLayout() {
  const colorScheme = useColorScheme();
  const [isSidebarOpen, setSidebarOpen] = useState(false);

  return (
    <View style={{ flex: 1 }}>
      <AnimatedSidebar isOpen={isSidebarOpen} onClose={() => setSidebarOpen(false)} />
      <Tabs
        screenOptions={{
          tabBarActiveTintColor: Colors[colorScheme ?? 'light'].tint,
          headerShown: true,
          tabBarStyle: { display: 'none' },
        }}>
        <Tabs.Screen
          name="index"
          options={{
            title: 'CityGlide',
            headerLeft: () => (
              <TouchableOpacity
                onPress={() => setSidebarOpen(true)}
                style={{ marginLeft: 15 }}>
                <FontAwesome name="bars" size={24} color={Colors[colorScheme ?? 'light'].text} />
              </TouchableOpacity>
            ),
          }}
        />
      </Tabs>
    </View>
  );
}
