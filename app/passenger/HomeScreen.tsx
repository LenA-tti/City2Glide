/**
 * HomeScreen - Passenger Dashboard
 * React Native Implementation
 */

import { ThemeProvider } from '@/components/ThemeProvider';
import { Badge, Card, CardContent } from '@/components/ui';
import React from 'react';
import {
  ScrollView,
  StatusBar,
  StyleSheet,
  Text,
  TouchableOpacity,
  View,
} from 'react-native';
import { SafeAreaView } from 'react-native-safe-area-context';
import type { Screen } from './PassengerApp';

interface HomeScreenProps {
  onOpenSidebar: () => void;
  onNavigate: (screen: Screen) => void;
}

export default function HomeScreen({ onOpenSidebar, onNavigate }: HomeScreenProps) {
  const recentTrips = [
    {
      id: '1',
      from: 'Main Mall',
      to: 'Gaborone West',
      date: '2 hours ago',
      fare: 25.50,
      status: 'completed',
    },
    {
      id: '2',
      from: 'Airport Junction',
      to: 'CBD',
      date: 'Yesterday',
      fare: 35.00,
      status: 'completed',
    },
    {
      id: '3',
      from: 'Mogoditshane',
      to: 'Broadhurst',
      date: '2 days ago',
      fare: 28.00,
      status: 'completed',
    },
  ];

  return (
    <ThemeProvider>
      <SafeAreaView style={styles.container}>
        <StatusBar barStyle="light-content" backgroundColor="#0f0f0f" />
        <ScrollView style={styles.scrollView} showsVerticalScrollIndicator={false}>
          {/* Header */}
          <View style={styles.header}>
            <TouchableOpacity onPress={onOpenSidebar} style={styles.menuButton}>
              <Text style={styles.menuIcon}>☰</Text>
            </TouchableOpacity>
            <View style={styles.headerCenter}>
              <Text style={styles.greeting}>Good Morning</Text>
              <Text style={styles.userName}>John Doe</Text>
            </View>
            <TouchableOpacity
              onPress={() => onNavigate('profile')}
              style={styles.profileButton}
            >
              <View style={styles.avatarCircle}>
                <Text style={styles.avatarText}>JD</Text>
              </View>
            </TouchableOpacity>
          </View>

          {/* Search Bar */}
          <View style={styles.searchSection}>
            <TouchableOpacity
              style={styles.searchBar}
              onPress={() => onNavigate('vehicles')}
            >
              <Text style={styles.searchIcon}>🔍</Text>
              <Text style={styles.searchPlaceholder}>
                Where would you like to go?
              </Text>
            </TouchableOpacity>
          </View>

          {/* Quick Actions */}
          <View style={styles.quickActions}>
            <TouchableOpacity
              style={styles.quickActionCard}
              onPress={() => onNavigate('vehicles')}
            >
              <View style={styles.quickActionIcon}>
                <Text style={styles.quickActionEmoji}>🚗</Text>
              </View>
              <Text style={styles.quickActionLabel}>Find a Ride</Text>
            </TouchableOpacity>

            <TouchableOpacity
              style={styles.quickActionCard}
              onPress={() => onNavigate('locations')}
            >
              <View style={styles.quickActionIcon}>
                <Text style={styles.quickActionEmoji}>📍</Text>
              </View>
              <Text style={styles.quickActionLabel}>Saved Places</Text>
            </TouchableOpacity>

            <TouchableOpacity
              style={styles.quickActionCard}
              onPress={() => onNavigate('history')}
            >
              <View style={styles.quickActionIcon}>
                <Text style={styles.quickActionEmoji}>📜</Text>
              </View>
              <Text style={styles.quickActionLabel}>History</Text>
            </TouchableOpacity>
          </View>

          {/* Stats */}
          <View style={styles.statsSection}>
            <Card style={styles.statCard}>
              <CardContent style={styles.statContent}>
                <Text style={styles.statValue}>24</Text>
                <Text style={styles.statLabel}>Total Trips</Text>
              </CardContent>
            </Card>

            <Card style={styles.statCard}>
              <CardContent style={styles.statContent}>
                <Text style={styles.statValue}>⭐ 4.8</Text>
                <Text style={styles.statLabel}>Rating</Text>
              </CardContent>
            </Card>

            <Card style={styles.statCard}>
              <CardContent style={styles.statContent}>
                <Text style={styles.statValue}>P 340</Text>
                <Text style={styles.statLabel}>Spent</Text>
              </CardContent>
            </Card>
          </View>

          {/* Recent Trips */}
          <View style={styles.section}>
            <View style={styles.sectionHeader}>
              <Text style={styles.sectionTitle}>Recent Trips</Text>
              <TouchableOpacity onPress={() => onNavigate('history')}>
                <Text style={styles.viewAllText}>View all</Text>
              </TouchableOpacity>
            </View>

            {recentTrips.map((trip) => (
              <Card key={trip.id} style={styles.tripCard}>
                <CardContent style={styles.tripContent}>
                  <View style={styles.tripRoute}>
                    <View style={styles.tripLocation}>
                      <Text style={styles.locationDot}>🔵</Text>
                      <View style={styles.locationInfo}>
                        <Text style={styles.locationLabel}>From</Text>
                        <Text style={styles.locationText}>{trip.from}</Text>
                      </View>
                    </View>

                    <View style={styles.tripDivider}>
                      <View style={styles.dividerLine} />
                    </View>

                    <View style={styles.tripLocation}>
                      <Text style={styles.locationDot}>🔴</Text>
                      <View style={styles.locationInfo}>
                        <Text style={styles.locationLabel}>To</Text>
                        <Text style={styles.locationText}>{trip.to}</Text>
                      </View>
                    </View>
                  </View>

                  <View style={styles.tripFooter}>
                    <Text style={styles.tripDate}>{trip.date}</Text>
                    <View style={styles.tripFare}>
                      <Text style={styles.fareAmount}>P {trip.fare.toFixed(2)}</Text>
                      <Badge variant="secondary">
                        {trip.status}
                      </Badge>
                    </View>
                  </View>
                </CardContent>
              </Card>
            ))}
          </View>

          {/* Payment Method */}
          <View style={styles.section}>
            <Text style={styles.sectionTitle}>Payment Method</Text>
            <TouchableOpacity onPress={() => onNavigate('payment')}>
              <Card style={styles.paymentCard}>
                <CardContent style={styles.paymentContent}>
                  <View style={styles.paymentIcon}>
                    <Text style={styles.paymentEmoji}>💳</Text>
                  </View>
                  <View style={styles.paymentInfo}>
                    <Text style={styles.paymentLabel}>Visa •••• 4242</Text>
                    <Text style={styles.paymentSubtext}>Default payment</Text>
                  </View>
                  <Text style={styles.paymentArrow}>›</Text>
                </CardContent>
              </Card>
            </TouchableOpacity>
          </View>

          <View style={styles.bottomSpacing} />
        </ScrollView>
      </SafeAreaView>
    </ThemeProvider>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: '#0f0f0f',
  },
  scrollView: {
    flex: 1,
  },
  header: {
    flexDirection: 'row',
    alignItems: 'center',
    paddingHorizontal: 20,
    paddingVertical: 16,
    gap: 12,
  },
  menuButton: {
    width: 40,
    height: 40,
    borderRadius: 20,
    backgroundColor: '#1f1f1f',
    alignItems: 'center',
    justifyContent: 'center',
  },
  menuIcon: {
    fontSize: 24,
    color: '#ffffff',
  },
  headerCenter: {
    flex: 1,
  },
  greeting: {
    fontSize: 14,
    color: '#9ca3af',
  },
  userName: {
    fontSize: 18,
    fontWeight: '600',
    color: '#ffffff',
  },
  profileButton: {
    borderRadius: 20,
    overflow: 'hidden',
  },
  avatarText: {
    fontSize: 16,
    color: '#ffffff',
  },
  avatarCircle: {
    width: 40,
    height: 40,
    borderRadius: 20,
    backgroundColor: '#1f1f1f',
    alignItems: 'center',
    justifyContent: 'center',
  },
  searchSection: {
    paddingHorizontal: 20,
    marginBottom: 24,
  },
  searchBar: {
    flexDirection: 'row',
    alignItems: 'center',
    backgroundColor: '#1f1f1f',
    borderRadius: 12,
    paddingHorizontal: 16,
    paddingVertical: 14,
    gap: 12,
  },
  searchIcon: {
    fontSize: 20,
  },
  searchPlaceholder: {
    flex: 1,
    fontSize: 16,
    color: '#6b7280',
  },
  quickActions: {
    flexDirection: 'row',
    paddingHorizontal: 20,
    gap: 12,
    marginBottom: 24,
  },
  quickActionCard: {
    flex: 1,
    backgroundColor: '#1f1f1f',
    borderRadius: 12,
    padding: 16,
    alignItems: 'center',
    gap: 8,
  },
  quickActionIcon: {
    width: 48,
    height: 48,
    borderRadius: 24,
    backgroundColor: '#9B3922',
    alignItems: 'center',
    justifyContent: 'center',
  },
  quickActionEmoji: {
    fontSize: 24,
  },
  quickActionLabel: {
    fontSize: 12,
    color: '#d1d5db',
    textAlign: 'center',
  },
  statsSection: {
    flexDirection: 'row',
    paddingHorizontal: 20,
    gap: 12,
    marginBottom: 24,
  },
  statCard: {
    flex: 1,
    backgroundColor: '#1f1f1f',
    borderWidth: 0,
  },
  statContent: {
    alignItems: 'center',
    paddingVertical: 12,
  },
  statValue: {
    fontSize: 20,
    fontWeight: '700',
    color: '#ffffff',
    marginBottom: 4,
  },
  statLabel: {
    fontSize: 12,
    color: '#9ca3af',
  },
  section: {
    paddingHorizontal: 20,
    marginBottom: 24,
  },
  sectionHeader: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    alignItems: 'center',
    marginBottom: 16,
  },
  sectionTitle: {
    fontSize: 18,
    fontWeight: '600',
    color: '#ffffff',
  },
  viewAllText: {
    fontSize: 14,
    color: '#9B3922',
  },
  tripCard: {
    backgroundColor: '#1f1f1f',
    marginBottom: 12,
    borderWidth: 0,
  },
  tripContent: {
    padding: 16,
  },
  tripRoute: {
    marginBottom: 12,
  },
  tripLocation: {
    flexDirection: 'row',
    alignItems: 'flex-start',
    gap: 12,
  },
  locationDot: {
    fontSize: 16,
    marginTop: 2,
  },
  locationInfo: {
    flex: 1,
  },
  locationLabel: {
    fontSize: 12,
    color: '#9ca3af',
    marginBottom: 2,
  },
  locationText: {
    fontSize: 16,
    color: '#ffffff',
  },
  tripDivider: {
    paddingLeft: 8,
    paddingVertical: 4,
  },
  dividerLine: {
    width: 2,
    height: 20,
    backgroundColor: '#374151',
    marginLeft: 6,
  },
  tripFooter: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    alignItems: 'center',
    paddingTop: 12,
    borderTopWidth: 1,
    borderTopColor: '#374151',
  },
  tripDate: {
    fontSize: 14,
    color: '#9ca3af',
  },
  tripFare: {
    flexDirection: 'row',
    alignItems: 'center',
    gap: 8,
  },
  fareAmount: {
    fontSize: 16,
    fontWeight: '600',
    color: '#10b981',
  },
  paymentCard: {
    backgroundColor: '#1f1f1f',
    borderWidth: 0,
  },
  paymentContent: {
    flexDirection: 'row',
    alignItems: 'center',
    padding: 16,
    gap: 12,
  },
  paymentIcon: {
    width: 48,
    height: 48,
    borderRadius: 24,
    backgroundColor: '#374151',
    alignItems: 'center',
    justifyContent: 'center',
  },
  paymentEmoji: {
    fontSize: 24,
  },
  paymentInfo: {
    flex: 1,
  },
  paymentLabel: {
    fontSize: 16,
    color: '#ffffff',
    fontWeight: '500',
    marginBottom: 2,
  },
  paymentSubtext: {
    fontSize: 12,
    color: '#9ca3af',
  },
  paymentArrow: {
    fontSize: 24,
    color: '#6b7280',
  },
  bottomSpacing: {
    height: 32,
  },
});
