import { useRouter } from 'expo-router';
import React from 'react';
import { StyleSheet, View } from 'react-native';

import { ThemeProvider } from '@/components/ThemeProvider';
import { Toast } from '@/components/ui/Toast';

export default function Landing() {
  const router = useRouter();

  return (
    <ThemeProvider>
      <View style={styles.container}>
        {/* The landing page is a route root that directs users into the auth flow. */}
        {/* Use router.push to navigate to auth routes. Buttons are implemented in the Welcome screen. */}
        {/* Render PassengerApp when navigating directly to /passenger/PassengerApp route. */}
      </View>
      <Toast />
    </ThemeProvider>
  );
}

const styles = StyleSheet.create({
  container: { flex: 1 },
});
