/**
 * PassengerApp - Main Container for Passenger Application
 * React Native Implementation
 */

import { Toast } from '@/components/ui';
import React, { useState } from 'react';
import { StyleSheet, View } from 'react-native';
import { SafeAreaProvider } from 'react-native-safe-area-context';
import AnimatedSidebar from './AnimatedSidebar';
import HomeScreen from './HomeScreen';
import PaymentScreen from './PaymentScreen';
import ProfileScreen from './ProfileScreen';
import SavedLocationsScreen from './SavedLocationsScreen';
import TripHistoryScreen from './TripHistoryScreen';
import TripTrackingScreen from './TripTrackingScreen';
import VehicleSelectionScreen from './VehicleSelectionScreen';

export type Screen = 
  | 'home' 
  | 'vehicles' 
  | 'tracking' 
  | 'history' 
  | 'locations' 
  | 'payment' 
  | 'profile';

export default function PassengerApp() {
  const [currentScreen, setCurrentScreen] = useState<Screen>('home');
  const [isSidebarOpen, setIsSidebarOpen] = useState(false);
  const [selectedVehicle, setSelectedVehicle] = useState<any>(null);

  const handleLogout = () => {
    // In real app, clear auth tokens and navigate to welcome screen
    console.log('Logging out...');
  };

  const navigateToScreen = (screen: Screen) => {
    setCurrentScreen(screen);
    setIsSidebarOpen(false);
  };

  const renderScreen = () => {
    switch (currentScreen) {
      case 'home':
        return (
          <HomeScreen
            onOpenSidebar={() => setIsSidebarOpen(true)}
            onNavigate={navigateToScreen}
          />
        );
      case 'vehicles':
        return (
          <VehicleSelectionScreen
            onBack={() => setCurrentScreen('home')}
            onSelectVehicle={(vehicle) => {
              setSelectedVehicle(vehicle);
              setCurrentScreen('tracking');
            }}
          />
        );
      case 'tracking':
        return (
          <TripTrackingScreen
            vehicle={selectedVehicle}
            onComplete={() => setCurrentScreen('home')}
            onCancel={() => setCurrentScreen('vehicles')}
          />
        );
      case 'history':
        return (
          <TripHistoryScreen
            onBack={() => setCurrentScreen('home')}
            onRebook={(destination) => setCurrentScreen('vehicles')}
          />
        );
      case 'locations':
        return (
          <SavedLocationsScreen
            onBack={() => setCurrentScreen('home')}
            onSelectLocation={(location) => setCurrentScreen('vehicles')}
          />
        );
      case 'payment':
        return (
          <PaymentScreen
            onBack={() => setCurrentScreen('home')}
          />
        );
      case 'profile':
        return (
          <ProfileScreen
            onBack={() => setCurrentScreen('home')}
            onLogout={handleLogout}
          />
        );
      default:
        return (
          <HomeScreen
            onOpenSidebar={() => setIsSidebarOpen(true)}
            onNavigate={navigateToScreen}
          />
        );
    }
  };

  return (
    <SafeAreaProvider>
      <View style={styles.container}>
        <AnimatedSidebar
          isOpen={isSidebarOpen}
          onClose={() => setIsSidebarOpen(false)}
          onNavigate={navigateToScreen}
          onLogout={handleLogout}
          currentScreen={currentScreen}
        />
        <View style={styles.content}>
          {renderScreen()}
        </View>
        <Toast />
      </View>
    </SafeAreaProvider>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: '#0f0f0f',
  },
  content: {
    flex: 1,
  },
});
