/**
 * AnimatedSidebar - Navigation Drawer
 * React Native Implementation
 */

import { Avatar, Badge, Separator, Switch } from '@/components/ui';
import React from 'react';
import {
  Animated,
  Modal,
  ScrollView,
  StyleSheet,
  Text,
  TouchableOpacity,
  View,
} from 'react-native';
import { SafeAreaView } from 'react-native-safe-area-context';
import type { Screen } from './PassengerApp';

interface AnimatedSidebarProps {
  isOpen: boolean;
  onClose: () => void;
  onNavigate: (screen: Screen) => void;
  onLogout: () => void;
  currentScreen: Screen;
}

export default function AnimatedSidebar({
  isOpen,
  onClose,
  onNavigate,
  onLogout,
  currentScreen,
}: AnimatedSidebarProps) {
  const [darkMode, setDarkMode] = React.useState(true);
  const slideAnim = React.useRef(new Animated.Value(-300)).current;

  React.useEffect(() => {
    Animated.timing(slideAnim, {
      toValue: isOpen ? 0 : -300,
      duration: 300,
      useNativeDriver: true,
    }).start();
  }, [isOpen]);

  const menuItems = [
    { id: 'home' as Screen, label: 'Home', icon: '🏠', badge: null },
    { id: 'vehicles' as Screen, label: 'Find Vehicles', icon: '🚗', badge: null },
    { id: 'tracking' as Screen, label: 'Active Trip', icon: '🗺️', badge: 'Live' },
    { id: 'history' as Screen, label: 'Trip History', icon: '📜', badge: null },
    { id: 'locations' as Screen, label: 'Saved Locations', icon: '📍', badge: null },
    { id: 'payment' as Screen, label: 'Payment Methods', icon: '💳', badge: null },
    { id: 'profile' as Screen, label: 'Profile', icon: '👤', badge: null },
  ];

  const handleNavigate = (screen: Screen) => {
    onNavigate(screen);
  };

  return (
    <Modal
      visible={isOpen}
      transparent
      animationType="none"
      onRequestClose={onClose}
    >
      <View style={styles.overlay}>
        <TouchableOpacity
          style={styles.backdrop}
          activeOpacity={1}
          onPress={onClose}
        />
        <Animated.View
          style={[
            styles.sidebar,
            { transform: [{ translateX: slideAnim }] },
          ]}
        >
          <SafeAreaView style={styles.safeArea}>
            <ScrollView style={styles.scrollView}>
              {/* Header */}
              <View style={styles.header}>
                <TouchableOpacity
                  onPress={() => handleNavigate('profile')}
                  style={styles.profileSection}
                >
                  <Avatar style={{ width: 64, height: 64, borderRadius: 32, justifyContent: 'center', alignItems: 'center' }}>
                    <Text style={styles.avatarText}>JD</Text>
                  </Avatar>
                  <View style={styles.userInfo}>
                    <Text style={styles.userName}>John Doe</Text>
                    <View style={styles.ratingContainer}>
                      <Text style={styles.ratingText}>⭐ 4.8</Text>
                      <Text style={styles.ratingSubtext}>Passenger</Text>
                    </View>
                  </View>
                </TouchableOpacity>
              </View>

              <Separator style={styles.separator} />

              {/* Menu Items */}
              <View style={styles.menuSection}>
                {menuItems.map((item) => (
                  <TouchableOpacity
                    key={item.id}
                    style={[
                      styles.menuItem,
                      currentScreen === item.id && styles.menuItemActive,
                    ]}
                    onPress={() => handleNavigate(item.id)}
                  >
                    <Text style={styles.menuIcon}>{item.icon}</Text>
                    <Text
                      style={[
                        styles.menuLabel,
                        currentScreen === item.id && styles.menuLabelActive,
                      ]}
                    >
                      {item.label}
                    </Text>
                    {item.badge && (
                      <Badge variant="destructive" style={styles.badge}>
                        {item.badge}
                      </Badge>
                    )}
                  </TouchableOpacity>
                ))}
              </View>

              <Separator style={styles.separator} />

              {/* Settings */}
              <View style={styles.settingsSection}>
                <View style={styles.settingItem}>
                  <Text style={styles.settingIcon}>🌙</Text>
                  <Text style={styles.settingLabel}>Dark Mode</Text>
                  <Switch
                    checked={darkMode}
                    onCheckedChange={setDarkMode}
                  />
                </View>
              </View>

              <Separator style={styles.separator} />

              {/* Logout */}
              <TouchableOpacity
                style={styles.logoutButton}
                onPress={onLogout}
              >
                <Text style={styles.logoutIcon}>🚪</Text>
                <Text style={styles.logoutText}>Logout</Text>
              </TouchableOpacity>

              {/* Footer */}
              <View style={styles.footer}>
                <Text style={styles.footerText}>SmartRide v1.0.0</Text>
                <Text style={styles.footerSubtext}>© 2025 SmartRide</Text>
              </View>
            </ScrollView>
          </SafeAreaView>
        </Animated.View>
      </View>
    </Modal>
  );
}

const styles = StyleSheet.create({
  overlay: {
    flex: 1,
    flexDirection: 'row',
  },
  backdrop: {
    flex: 1,
    backgroundColor: 'rgba(0, 0, 0, 0.5)',
  },
  sidebar: {
    width: 280,
    backgroundColor: '#181C14',
    shadowColor: '#000',
    shadowOffset: { width: 2, height: 0 },
    shadowOpacity: 0.3,
    shadowRadius: 10,
    elevation: 10,
  },
  safeArea: {
    flex: 1,
  },
  scrollView: {
    flex: 1,
  },
  header: {
    padding: 20,
  },
  profileSection: {
    flexDirection: 'row',
    alignItems: 'center',
    gap: 12,
  },
  userInfo: {
    flex: 1,
  },
  userName: {
    fontSize: 18,
    fontWeight: '600',
    color: '#ffffff',
    marginBottom: 4,
  },
  ratingContainer: {
    flexDirection: 'row',
    alignItems: 'center',
    gap: 8,
  },
  ratingText: {
    fontSize: 14,
    color: '#fbbf24',
  },
  ratingSubtext: {
    fontSize: 12,
    color: '#9ca3af',
  },
  separator: {
    marginVertical: 8,
    backgroundColor: '#374151',
  },
  menuSection: {
    paddingVertical: 8,
  },
  menuItem: {
    flexDirection: 'row',
    alignItems: 'center',
    paddingVertical: 14,
    paddingHorizontal: 20,
    gap: 12,
  },
  menuItemActive: {
    backgroundColor: 'rgba(155, 57, 34, 0.2)',
    borderLeftWidth: 3,
    borderLeftColor: '#9B3922',
  },
  menuIcon: {
    fontSize: 20,
  },
  menuLabel: {
    flex: 1,
    fontSize: 16,
    color: '#d1d5db',
  },
  menuLabelActive: {
    color: '#ffffff',
    fontWeight: '600',
  },
  badge: {
    paddingHorizontal: 8,
    paddingVertical: 2,
  },
  settingsSection: {
    paddingVertical: 8,
  },
  settingItem: {
    flexDirection: 'row',
    alignItems: 'center',
    paddingVertical: 14,
    paddingHorizontal: 20,
    gap: 12,
  },
  settingIcon: {
    fontSize: 20,
  },
  settingLabel: {
    flex: 1,
    fontSize: 16,
    color: '#d1d5db',
  },
  logoutButton: {
    flexDirection: 'row',
    alignItems: 'center',
    paddingVertical: 14,
    paddingHorizontal: 20,
    gap: 12,
    marginTop: 8,
  },
  logoutIcon: {
    fontSize: 20,
  },
  logoutText: {
    fontSize: 16,
    color: '#ef4444',
    fontWeight: '500',
  },
  footer: {
    padding: 20,
    marginTop: 'auto',
  },
  footerText: {
    fontSize: 12,
    color: '#6b7280',
    textAlign: 'center',
  },
  footerSubtext: {
    fontSize: 10,
    color: '#4b5563',
    textAlign: 'center',
    marginTop: 4,
  },
  avatarText: {
    fontSize: 24,
    color: '#ffffff',
  },
});
