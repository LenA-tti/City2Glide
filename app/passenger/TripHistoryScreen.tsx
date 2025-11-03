/**
 * TripHistoryScreen - View Past Trips
 * React Native Implementation
 */

import { Badge, Button, Card, CardContent, Dialog, DialogContent, DialogFooter, DialogHeader, DialogTitle, Input, Tabs, TabsContent, TabsList, TabsTrigger } from '@/components/ui';
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

interface TripHistoryScreenProps {
  onBack: () => void;
  onRebook: (destination: string) => void;
}

export default function TripHistoryScreen({ onBack, onRebook }: TripHistoryScreenProps) {
  const [searchQuery, setSearchQuery] = useState('');
  const [selectedTrip, setSelectedTrip] = useState<any>(null);
  const [showDetails, setShowDetails] = useState(false);
  const [tabValue, setTabValue] = useState('all');

  const completedTrips = [
    {
      id: '1',
      from: 'Main Mall',
      to: 'Gaborone West',
      date: 'Nov 2, 2025',
      time: '2:30 PM',
      fare: 25.50,
      driver: 'Michael Johnson',
      vehicle: 'Toyota Quantum - ABC 123 GP',
      status: 'completed',
      rating: 5,
    },
    {
      id: '2',
      from: 'Airport Junction',
      to: 'CBD',
      date: 'Nov 1, 2025',
      time: '9:15 AM',
      fare: 35.00,
      driver: 'Sarah Williams',
      vehicle: 'Nissan Caravan - XYZ 789 GP',
      status: 'completed',
      rating: 4,
    },
    {
      id: '3',
      from: 'Mogoditshane',
      to: 'Broadhurst',
      date: 'Oct 31, 2025',
      time: '5:45 PM',
      fare: 28.00,
      driver: 'David Brown',
      vehicle: 'Toyota Hiace - DEF 456 GP',
      status: 'completed',
      rating: 5,
    },
  ];

  const cancelledTrips = [
    {
      id: '4',
      from: 'Gaborone West',
      to: 'Main Mall',
      date: 'Oct 30, 2025',
      time: '3:20 PM',
      fare: 25.50,
      status: 'cancelled',
      reason: 'Vehicle not available',
    },
  ];

  const handleTripPress = (trip: any) => {
    setSelectedTrip(trip);
    setShowDetails(true);
  };

  const renderTripCard = (trip: any) => (
    <TouchableOpacity
      key={trip.id}
      onPress={() => handleTripPress(trip)}
    >
      <Card style={styles.tripCard}>
        <CardContent style={styles.tripContent}>
          <View style={styles.tripHeader}>
            <View style={styles.tripDate}>
              <Text style={styles.dateText}>{trip.date}</Text>
              <Text style={styles.timeText}>{trip.time}</Text>
            </View>
            <Badge
              variant={trip.status === 'completed' ? 'secondary' : 'destructive'}
            >
              {trip.status}
            </Badge>
          </View>

          <View style={styles.tripRoute}>
            <View style={styles.routePoint}>
              <Text style={styles.pointDot}>🔵</Text>
              <Text style={styles.locationText}>{trip.from}</Text>
            </View>
            <View style={styles.routeLine} />
            <View style={styles.routePoint}>
              <Text style={styles.pointDot}>🔴</Text>
              <Text style={styles.locationText}>{trip.to}</Text>
            </View>
          </View>

          <View style={styles.tripFooter}>
            <Text style={styles.fareText}>P {trip.fare.toFixed(2)}</Text>
            {trip.rating && (
              <View style={styles.ratingContainer}>
                <Text style={styles.ratingText}>
                  {'⭐'.repeat(trip.rating)}
                </Text>
              </View>
            )}
          </View>
        </CardContent>
      </Card>
    </TouchableOpacity>
  );

  return (
    <SafeAreaView style={styles.container}>
      <StatusBar barStyle="light-content" backgroundColor="#0f0f0f" />

      {/* Header */}
      <View style={styles.header}>
        <TouchableOpacity onPress={onBack} style={styles.backButton}>
          <Text style={styles.backIcon}>←</Text>
        </TouchableOpacity>
        <Text style={styles.headerTitle}>Trip History</Text>
        <View style={styles.headerSpacer} />
      </View>

      {/* Search */}
      <View style={styles.searchSection}>
        <Input
          value={searchQuery}
          onChangeText={setSearchQuery}
          placeholder="Search trips..."
          style={styles.searchInput}
        />
      </View>

      <Tabs value={tabValue} onValueChange={setTabValue} defaultValue="all" style={styles.tabs}>
        <TabsList style={styles.tabsList}>
          <TabsTrigger value="all" style={styles.tabTrigger}>
            All Trips
          </TabsTrigger>
          <TabsTrigger value="completed" style={styles.tabTrigger}>
            Completed
          </TabsTrigger>
          <TabsTrigger value="cancelled" style={styles.tabTrigger}>
            Cancelled
          </TabsTrigger>
        </TabsList>

        <TabsContent value="all" style={styles.tabContent}>
          <ScrollView showsVerticalScrollIndicator={false}>
            {[...completedTrips, ...cancelledTrips].map(renderTripCard)}
            <View style={styles.bottomSpacing} />
          </ScrollView>
        </TabsContent>

        <TabsContent value="completed" style={styles.tabContent}>
          <ScrollView showsVerticalScrollIndicator={false}>
            {completedTrips.map(renderTripCard)}
            <View style={styles.bottomSpacing} />
          </ScrollView>
        </TabsContent>

        <TabsContent value="cancelled" style={styles.tabContent}>
          <ScrollView showsVerticalScrollIndicator={false}>
            {cancelledTrips.map(renderTripCard)}
            <View style={styles.bottomSpacing} />
          </ScrollView>
        </TabsContent>
      </Tabs>

      {/* Trip Details Dialog */}
      <Dialog open={showDetails} onOpenChange={setShowDetails}>
        <DialogContent style={styles.dialogContent}>
          <DialogHeader>
            <DialogTitle>Trip Details</DialogTitle>
          </DialogHeader>

          {selectedTrip && (
            <View style={styles.detailsContainer}>
              <View style={styles.detailRow}>
                <Text style={styles.detailLabel}>Date & Time</Text>
                <Text style={styles.detailValue}>
                  {selectedTrip.date} at {selectedTrip.time}
                </Text>
              </View>

              <View style={styles.detailRow}>
                <Text style={styles.detailLabel}>From</Text>
                <Text style={styles.detailValue}>{selectedTrip.from}</Text>
              </View>

              <View style={styles.detailRow}>
                <Text style={styles.detailLabel}>To</Text>
                <Text style={styles.detailValue}>{selectedTrip.to}</Text>
              </View>

              {selectedTrip.driver && (
                <View style={styles.detailRow}>
                  <Text style={styles.detailLabel}>Driver</Text>
                  <Text style={styles.detailValue}>{selectedTrip.driver}</Text>
                </View>
              )}

              {selectedTrip.vehicle && (
                <View style={styles.detailRow}>
                  <Text style={styles.detailLabel}>Vehicle</Text>
                  <Text style={styles.detailValue}>{selectedTrip.vehicle}</Text>
                </View>
              )}

              <View style={styles.detailRow}>
                <Text style={styles.detailLabel}>Fare</Text>
                <Text style={styles.detailValue}>
                  P {selectedTrip.fare.toFixed(2)}
                </Text>
              </View>

              <View style={styles.detailRow}>
                <Text style={styles.detailLabel}>Status</Text>
                <Badge
                  variant={
                    selectedTrip.status === 'completed'
                      ? 'secondary'
                      : 'destructive'
                  }
                >
                  {selectedTrip.status}
                </Badge>
              </View>
            </View>
          )}

          <DialogFooter style={styles.dialogFooter}>
            <Button
              variant="outline"
              onPress={() => setShowDetails(false)}
              style={styles.dialogButton}
            >
              Close
            </Button>
            {selectedTrip?.status === 'completed' && (
              <Button
                onPress={() => {
                  setShowDetails(false);
                  onRebook(selectedTrip.to);
                }}
                style={styles.dialogButton}
              >
                Book Again
              </Button>
            )}
          </DialogFooter>
        </DialogContent>
      </Dialog>
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
  searchSection: {
    paddingHorizontal: 20,
    marginBottom: 16,
  },
  searchInput: {
    backgroundColor: '#1f1f1f',
    borderColor: '#374151',
  },
  tabs: {
    flex: 1,
  },
  tabsList: {
    backgroundColor: '#1f1f1f',
    marginHorizontal: 20,
    marginBottom: 16,
    borderRadius: 12,
    padding: 4,
  },
  tabTrigger: {
    flex: 1,
  },
  tabContent: {
    flex: 1,
    paddingHorizontal: 20,
  },
  tripCard: {
    backgroundColor: '#1f1f1f',
    marginBottom: 12,
    borderWidth: 0,
  },
  tripContent: {
    padding: 16,
  },
  tripHeader: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    alignItems: 'flex-start',
    marginBottom: 16,
  },
  tripDate: {
    flex: 1,
  },
  dateText: {
    fontSize: 16,
    fontWeight: '600',
    color: '#ffffff',
    marginBottom: 4,
  },
  timeText: {
    fontSize: 14,
    color: '#9ca3af',
  },
  tripRoute: {
    marginBottom: 16,
  },
  routePoint: {
    flexDirection: 'row',
    alignItems: 'center',
    gap: 12,
  },
  pointDot: {
    fontSize: 16,
  },
  locationText: {
    fontSize: 16,
    color: '#d1d5db',
  },
  routeLine: {
    width: 2,
    height: 20,
    backgroundColor: '#374151',
    marginLeft: 8,
    marginVertical: 4,
  },
  tripFooter: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    alignItems: 'center',
    paddingTop: 12,
    borderTopWidth: 1,
    borderTopColor: '#374151',
  },
  fareText: {
    fontSize: 18,
    fontWeight: '700',
    color: '#10b981',
  },
  ratingContainer: {
    flexDirection: 'row',
    alignItems: 'center',
  },
  ratingText: {
    fontSize: 16,
  },
  dialogContent: {
    backgroundColor: '#1f1f1f',
    padding: 24,
  },
  detailsContainer: {
    gap: 16,
    marginVertical: 16,
  },
  detailRow: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    alignItems: 'center',
  },
  detailLabel: {
    fontSize: 14,
    color: '#9ca3af',
  },
  detailValue: {
    fontSize: 14,
    fontWeight: '500',
    color: '#ffffff',
    textAlign: 'right',
    flex: 1,
    marginLeft: 16,
  },
  dialogFooter: {
    flexDirection: 'row',
    gap: 12,
    marginTop: 16,
  },
  dialogButton: {
    flex: 1,
  },
  bottomSpacing: {
    height: 32,
  },
});
