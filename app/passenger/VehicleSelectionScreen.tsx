/**
 * VehicleSelectionScreen - Find and Select Vehicles
 * React Native Implementation
 */

import { Badge, Button, Card, CardContent, Input } from '@/components/ui';
import React, { useState } from 'react';
import {
    ScrollView,
    StatusBar,
    StyleSheet,
    Text,
    TouchableOpacity,
    View,
} from 'react-native';
import { SafeAreaView } from 'react-native-safe-area-context';

interface VehicleSelectionScreenProps {
  onBack: () => void;
  onSelectVehicle: (vehicle: any) => void;
}

export default function VehicleSelectionScreen({
  onBack,
  onSelectVehicle,
}: VehicleSelectionScreenProps) {
  const [searchQuery, setSearchQuery] = useState('');
  const [selectedFilter, setSelectedFilter] = useState<string>('nearest');
  const [from, setFrom] = useState('Current Location');
  const [to, setTo] = useState('');

  const vehicles = [
    {
      id: '1',
      type: 'Toyota Quantum',
      registration: 'ABC 123 GP',
      driver: 'Michael Johnson',
      rating: 4.9,
      trips: 156,
      fare: 25.50,
      seats: 12,
      availableSeats: 8,
      distance: '0.5 km',
      eta: '3 min',
      image: '🚐',
    },
    {
      id: '2',
      type: 'Nissan Caravan',
      registration: 'XYZ 789 GP',
      driver: 'Sarah Williams',
      rating: 4.8,
      trips: 203,
      fare: 28.00,
      seats: 14,
      availableSeats: 10,
      distance: '1.2 km',
      eta: '5 min',
      image: '🚐',
    },
    {
      id: '3',
      type: 'Toyota Hiace',
      registration: 'DEF 456 GP',
      driver: 'David Brown',
      rating: 5.0,
      trips: 289,
      fare: 30.00,
      seats: 15,
      availableSeats: 5,
      distance: '2.1 km',
      eta: '8 min',
      image: '🚐',
    },
  ];

  const filters = [
    { id: 'nearest', label: 'Nearest First', icon: '📍' },
    { id: 'seats', label: 'Available Seats', icon: '💺' },
    { id: 'rating', label: 'Top Rated', icon: '⭐' },
  ];

  return (
    <SafeAreaView style={styles.container}>
      <StatusBar barStyle="light-content" backgroundColor="#0f0f0f" />

      {/* Header */}
      <View style={styles.header}>
        <TouchableOpacity onPress={onBack} style={styles.backButton}>
          <Text style={styles.backIcon}>←</Text>
        </TouchableOpacity>
        <Text style={styles.headerTitle}>Find a Ride</Text>
        <View style={styles.headerSpacer} />
      </View>

      {/* Route Selection */}
      <View style={styles.routeSection}>
        <Card style={styles.routeCard}>
          <CardContent style={styles.routeContent}>
            <View style={styles.routeItem}>
              <Text style={styles.routeDot}>🔵</Text>
              <View style={styles.routeInput}>
                <Text style={styles.routeLabel}>From</Text>
                <Text style={styles.routeText}>{from}</Text>
              </View>
            </View>

            <View style={styles.routeLine} />

            <View style={styles.routeItem}>
              <Text style={styles.routeDot}>🔴</Text>
              <View style={styles.routeInput}>
                <Text style={styles.routeLabel}>To</Text>
                <Input
                  value={to}
                  onChangeText={setTo}
                  placeholder="Enter destination"
                  style={styles.destinationInput}
                />
              </View>
            </View>
          </CardContent>
        </Card>
      </View>

      {/* Search */}
      <View style={styles.searchSection}>
        <Input
          value={searchQuery}
          onChangeText={setSearchQuery}
          placeholder="Search vehicles..."
          style={styles.searchInput}
        />
      </View>

      {/* Filters */}
      <View style={styles.filterSection}>
        <ScrollView
          horizontal
          showsHorizontalScrollIndicator={false}
          contentContainerStyle={styles.filterScroll}
        >
          {filters.map((filter) => (
            <TouchableOpacity
              key={filter.id}
              style={[
                styles.filterChip,
                selectedFilter === filter.id && styles.filterChipActive,
              ]}
              onPress={() => setSelectedFilter(filter.id)}
            >
              <Text style={styles.filterIcon}>{filter.icon}</Text>
              <Text
                style={[
                  styles.filterLabel,
                  selectedFilter === filter.id && styles.filterLabelActive,
                ]}
              >
                {filter.label}
              </Text>
            </TouchableOpacity>
          ))}
        </ScrollView>
      </View>

      {/* Vehicles List */}
      <ScrollView style={styles.scrollView} showsVerticalScrollIndicator={false}>
        <View style={styles.vehiclesSection}>
          <Text style={styles.sectionTitle}>
            {vehicles.length} vehicles available
          </Text>

          {vehicles.map((vehicle) => (
            <Card key={vehicle.id} style={styles.vehicleCard}>
              <CardContent style={styles.vehicleContent}>
                {/* Vehicle Header */}
                <View style={styles.vehicleHeader}>
                  <View style={styles.vehicleIcon}>
                    <Text style={styles.vehicleEmoji}>{vehicle.image}</Text>
                  </View>
                  <View style={styles.vehicleInfo}>
                    <Text style={styles.vehicleType}>{vehicle.type}</Text>
                    <Text style={styles.vehicleReg}>{vehicle.registration}</Text>
                  </View>
                  <View style={styles.vehicleFare}>
                    <Text style={styles.fareAmount}>P {vehicle.fare.toFixed(2)}</Text>
                    <Text style={styles.fareLabel}>estimated</Text>
                  </View>
                </View>

                {/* Driver Info */}
                <View style={styles.driverSection}>
                  <View style={styles.driverInfo}>
                    <Text style={styles.driverIcon}>👤</Text>
                    <View style={styles.driverDetails}>
                      <Text style={styles.driverName}>{vehicle.driver}</Text>
                      <View style={styles.driverStats}>
                        <Text style={styles.driverRating}>
                          ⭐ {vehicle.rating}
                        </Text>
                        <Text style={styles.driverTrips}>
                          • {vehicle.trips} trips
                        </Text>
                      </View>
                    </View>
                  </View>
                </View>

                {/* Vehicle Stats */}
                <View style={styles.statsRow}>
                  <View style={styles.statItem}>
                    <Text style={styles.statIcon}>💺</Text>
                    <Text style={styles.statText}>
                      {vehicle.availableSeats}/{vehicle.seats} seats
                    </Text>
                  </View>
                  <View style={styles.statItem}>
                    <Text style={styles.statIcon}>📍</Text>
                    <Text style={styles.statText}>{vehicle.distance} away</Text>
                  </View>
                  <View style={styles.statItem}>
                    <Text style={styles.statIcon}>⏱️</Text>
                    <Text style={styles.statText}>{vehicle.eta} ETA</Text>
                  </View>
                </View>

                {/* Action Button */}
                <Button
                  onPress={() => onSelectVehicle(vehicle)}
                  style={styles.selectButton}
                >
                  Select Vehicle
                </Button>

                {/* Badge */}
                {vehicle.rating >= 4.9 && (
                  <Badge variant="secondary" style={styles.topBadge}>
                    ⭐ Top Rated
                  </Badge>
                )}
              </CardContent>
            </Card>
          ))}
        </View>

        <View style={styles.bottomSpacing} />
      </ScrollView>
    </SafeAreaView>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: '#0f0f0f',
  },
  header: {
    flexDirection: 'row',
    alignItems: 'center',
    paddingHorizontal: 20,
    paddingVertical: 16,
    gap: 12,
  },
  backButton: {
    width: 40,
    height: 40,
    borderRadius: 20,
    backgroundColor: '#1f1f1f',
    alignItems: 'center',
    justifyContent: 'center',
  },
  backIcon: {
    fontSize: 24,
    color: '#ffffff',
  },
  headerTitle: {
    flex: 1,
    fontSize: 20,
    fontWeight: '600',
    color: '#ffffff',
  },
  headerSpacer: {
    width: 40,
  },
  routeSection: {
    paddingHorizontal: 20,
    marginBottom: 16,
  },
  routeCard: {
    backgroundColor: '#1f1f1f',
    borderWidth: 0,
  },
  routeContent: {
    padding: 16,
  },
  routeItem: {
    flexDirection: 'row',
    alignItems: 'center',
    gap: 12,
  },
  routeDot: {
    fontSize: 16,
  },
  routeInput: {
    flex: 1,
  },
  routeLabel: {
    fontSize: 12,
    color: '#9ca3af',
    marginBottom: 4,
  },
  routeText: {
    fontSize: 16,
    color: '#ffffff',
  },
  destinationInput: {
    backgroundColor: '#0f0f0f',
    borderColor: '#374151',
    marginTop: 0,
  },
  routeLine: {
    width: 2,
    height: 20,
    backgroundColor: '#374151',
    marginLeft: 8,
    marginVertical: 4,
  },
  searchSection: {
    paddingHorizontal: 20,
    marginBottom: 16,
  },
  searchInput: {
    backgroundColor: '#1f1f1f',
    borderColor: '#374151',
  },
  filterSection: {
    marginBottom: 16,
  },
  filterScroll: {
    paddingHorizontal: 20,
    gap: 8,
  },
  filterChip: {
    flexDirection: 'row',
    alignItems: 'center',
    backgroundColor: '#1f1f1f',
    paddingHorizontal: 16,
    paddingVertical: 8,
    borderRadius: 20,
    gap: 6,
  },
  filterChipActive: {
    backgroundColor: '#9B3922',
  },
  filterIcon: {
    fontSize: 16,
  },
  filterLabel: {
    fontSize: 14,
    color: '#d1d5db',
  },
  filterLabelActive: {
    color: '#ffffff',
    fontWeight: '600',
  },
  scrollView: {
    flex: 1,
  },
  vehiclesSection: {
    paddingHorizontal: 20,
  },
  sectionTitle: {
    fontSize: 16,
    fontWeight: '600',
    color: '#9ca3af',
    marginBottom: 16,
  },
  vehicleCard: {
    backgroundColor: '#1f1f1f',
    marginBottom: 16,
    borderWidth: 0,
    position: 'relative',
  },
  vehicleContent: {
    padding: 16,
  },
  vehicleHeader: {
    flexDirection: 'row',
    alignItems: 'center',
    marginBottom: 16,
    gap: 12,
  },
  vehicleIcon: {
    width: 56,
    height: 56,
    borderRadius: 28,
    backgroundColor: '#374151',
    alignItems: 'center',
    justifyContent: 'center',
  },
  vehicleEmoji: {
    fontSize: 32,
  },
  vehicleInfo: {
    flex: 1,
  },
  vehicleType: {
    fontSize: 18,
    fontWeight: '600',
    color: '#ffffff',
    marginBottom: 4,
  },
  vehicleReg: {
    fontSize: 14,
    color: '#9ca3af',
  },
  vehicleFare: {
    alignItems: 'flex-end',
  },
  fareAmount: {
    fontSize: 20,
    fontWeight: '700',
    color: '#10b981',
    marginBottom: 2,
  },
  fareLabel: {
    fontSize: 12,
    color: '#6b7280',
  },
  driverSection: {
    marginBottom: 16,
  },
  driverInfo: {
    flexDirection: 'row',
    alignItems: 'center',
    gap: 12,
  },
  driverIcon: {
    fontSize: 32,
  },
  driverDetails: {
    flex: 1,
  },
  driverName: {
    fontSize: 16,
    fontWeight: '500',
    color: '#ffffff',
    marginBottom: 4,
  },
  driverStats: {
    flexDirection: 'row',
    alignItems: 'center',
  },
  driverRating: {
    fontSize: 14,
    color: '#fbbf24',
  },
  driverTrips: {
    fontSize: 14,
    color: '#9ca3af',
  },
  statsRow: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    marginBottom: 16,
    paddingVertical: 12,
    borderTopWidth: 1,
    borderBottomWidth: 1,
    borderColor: '#374151',
  },
  statItem: {
    alignItems: 'center',
    gap: 4,
  },
  statIcon: {
    fontSize: 20,
  },
  statText: {
    fontSize: 12,
    color: '#d1d5db',
  },
  selectButton: {
    backgroundColor: '#9B3922',
  },
  topBadge: {
    position: 'absolute',
    top: 12,
    right: 12,
  },
  bottomSpacing: {
    height: 32,
  },
});
