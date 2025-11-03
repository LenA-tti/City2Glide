/**
 * TripTrackingScreen - Live Trip Tracking
 * React Native Implementation
 */

import { Badge, Button, Card, CardContent, Dialog, DialogContent, DialogFooter, DialogHeader, DialogTitle, Progress, toast } from '@/components/ui';
import React, { useEffect, useState } from 'react';
import {
  Animated,
  Linking,
  ScrollView,
  StatusBar,
  StyleSheet,
  Text,
  TouchableOpacity,
  View,
} from 'react-native';
import { SafeAreaView } from 'react-native-safe-area-context';

interface TripTrackingScreenProps {
  vehicle: any;
  onComplete: () => void;
  onCancel: () => void;
}

type TripStatus = 'waiting' | 'boarding' | 'in_transit' | 'arriving';

export default function TripTrackingScreen({
  vehicle,
  onComplete,
  onCancel,
}: TripTrackingScreenProps) {
  const [tripStatus, setTripStatus] = useState<TripStatus>('waiting');
  const [showCancelDialog, setShowCancelDialog] = useState(false);
  const [showRatingDialog, setShowRatingDialog] = useState(false);
  const [rating, setRating] = useState(0);
  const [progress, setProgress] = useState(0);
  const pulseAnim = React.useRef(new Animated.Value(1)).current;

  useEffect(() => {
    // Simulate trip progression
    const statusProgression: TripStatus[] = ['waiting', 'boarding', 'in_transit', 'arriving'];
    let currentIndex = 0;

    const interval = setInterval(() => {
      if (currentIndex < statusProgression.length - 1) {
        currentIndex++;
        setTripStatus(statusProgression[currentIndex]);
        setProgress((currentIndex / (statusProgression.length - 1)) * 100);
      }
    }, 15000); // Change status every 15 seconds

    return () => clearInterval(interval);
  }, []);

  useEffect(() => {
    // Pulse animation for active status
    Animated.loop(
      Animated.sequence([
        Animated.timing(pulseAnim, {
          toValue: 1.2,
          duration: 1000,
          useNativeDriver: true,
        }),
        Animated.timing(pulseAnim, {
          toValue: 1,
          duration: 1000,
          useNativeDriver: true,
        }),
      ])
    ).start();
  }, []);

  const getStatusInfo = () => {
    switch (tripStatus) {
      case 'waiting':
        return {
          label: 'Vehicle En Route',
          description: 'Driver is on the way to pick you up',
          icon: '🚗',
          color: '#3b82f6',
        };
      case 'boarding':
        return {
          label: 'Vehicle Arrived',
          description: 'Please board the vehicle',
          icon: '📍',
          color: '#10b981',
        };
      case 'in_transit':
        return {
          label: 'In Transit',
          description: 'Heading to your destination',
          icon: '🗺️',
          color: '#f59e0b',
        };
      case 'arriving':
        return {
          label: 'Arriving Soon',
          description: 'You will reach your destination shortly',
          icon: '🎯',
          color: '#9B3922',
        };
    }
  };

  const statusInfo = getStatusInfo();

  const handleCallDriver = () => {
    const phoneNumber = '+267 72 123 456';
    Linking.openURL(`tel:${phoneNumber}`);
  };

  const handleCompleteTrip = () => {
    setShowRatingDialog(true);
  };

  const handleSubmitRating = () => {
    toast.success('Trip Completed', 'Thank you for your feedback!');
    setShowRatingDialog(false);
    onComplete();
  };

  const handleCancelTrip = () => {
    setShowCancelDialog(false);
    toast.error('Trip Cancelled', 'Your trip has been cancelled');
    onCancel();
  };

  return (
    <SafeAreaView style={styles.container}>
      <StatusBar barStyle="light-content" backgroundColor="#0f0f0f" />

      <ScrollView style={styles.scrollView} showsVerticalScrollIndicator={false}>
        {/* Map Placeholder */}
        <View style={styles.mapContainer}>
          <View style={styles.mapPlaceholder}>
            <Text style={styles.mapIcon}>🗺️</Text>
            <Text style={styles.mapText}>Live Map View</Text>
            <Text style={styles.mapSubtext}>Tracking your trip in real-time</Text>
          </View>

          {/* Status Badge */}
          <Animated.View
            style={[
              styles.statusBadgeContainer,
              { transform: [{ scale: pulseAnim }] },
            ]}
          >
            <Badge
              variant="default"
              style={StyleSheet.flatten([styles.statusBadge, { backgroundColor: statusInfo.color }])}
            >
              <Text style={styles.statusIcon}>{statusInfo.icon}</Text>
              <Text style={styles.statusText}>{statusInfo.label}</Text>
            </Badge>
          </Animated.View>
        </View>

        {/* Progress */}
        <View style={styles.progressSection}>
          <Progress value={progress} style={styles.progressBar} />
          <Text style={styles.progressText}>{Math.round(progress)}% Complete</Text>
        </View>

        {/* Status Info */}
        <View style={styles.statusSection}>
          <Card style={styles.statusCard}>
            <CardContent style={styles.statusContent}>
              <Text style={styles.statusTitle}>{statusInfo.label}</Text>
              <Text style={styles.statusDescription}>
                {statusInfo.description}
              </Text>
            </CardContent>
          </Card>
        </View>

        {/* Driver Card */}
        <View style={styles.section}>
          <Text style={styles.sectionTitle}>Driver Information</Text>
          <Card style={styles.driverCard}>
            <CardContent style={styles.driverContent}>
              <View style={styles.driverHeader}>
                <View style={styles.driverAvatar}>
                  <Text style={styles.driverAvatarText}>👤</Text>
                </View>
                <View style={styles.driverInfo}>
                  <Text style={styles.driverName}>{vehicle?.driver || 'Driver Name'}</Text>
                  <View style={styles.driverStats}>
                    <Text style={styles.driverRating}>⭐ {vehicle?.rating || '4.9'}</Text>
                    <Text style={styles.driverTrips}>
                      • {vehicle?.trips || '156'} trips
                    </Text>
                  </View>
                </View>
                <TouchableOpacity
                  style={styles.callButton}
                  onPress={handleCallDriver}
                >
                  <Text style={styles.callIcon}>📞</Text>
                </TouchableOpacity>
              </View>

              <View style={styles.vehicleInfo}>
                <View style={styles.vehicleDetail}>
                  <Text style={styles.vehicleLabel}>Vehicle</Text>
                  <Text style={styles.vehicleValue}>
                    {vehicle?.type || 'Toyota Quantum'}
                  </Text>
                </View>
                <View style={styles.vehicleDetail}>
                  <Text style={styles.vehicleLabel}>Registration</Text>
                  <Text style={styles.vehicleValue}>
                    {vehicle?.registration || 'ABC 123 GP'}
                  </Text>
                </View>
              </View>
            </CardContent>
          </Card>
        </View>

        {/* Route Card */}
        <View style={styles.section}>
          <Text style={styles.sectionTitle}>Trip Route</Text>
          <Card style={styles.routeCard}>
            <CardContent style={styles.routeContent}>
              <View style={styles.routePoint}>
                <Text style={styles.routeDot}>🔵</Text>
                <View style={styles.routeInfo}>
                  <Text style={styles.routeLabel}>Pickup</Text>
                  <Text style={styles.routeText}>Current Location</Text>
                </View>
              </View>

              <View style={styles.routeLine} />

              <View style={styles.routePoint}>
                <Text style={styles.routeDot}>🔴</Text>
                <View style={styles.routeInfo}>
                  <Text style={styles.routeLabel}>Destination</Text>
                  <Text style={styles.routeText}>Main Mall, Gaborone</Text>
                </View>
              </View>

              <View style={styles.routeStats}>
                <View style={styles.routeStat}>
                  <Text style={styles.routeStatLabel}>Distance</Text>
                  <Text style={styles.routeStatValue}>8.5 km</Text>
                </View>
                <View style={styles.routeStat}>
                  <Text style={styles.routeStatLabel}>ETA</Text>
                  <Text style={styles.routeStatValue}>15 min</Text>
                </View>
                <View style={styles.routeStat}>
                  <Text style={styles.routeStatLabel}>Fare</Text>
                  <Text style={styles.routeStatValue}>
                    P {vehicle?.fare || '25.50'}
                  </Text>
                </View>
              </View>
            </CardContent>
          </Card>
        </View>

        {/* Actions */}
        <View style={styles.actionsSection}>
          {tripStatus === 'arriving' ? (
            <Button
              onPress={handleCompleteTrip}
              style={styles.completeButton}
            >
              Complete Trip
            </Button>
          ) : (
            <Button
              variant="destructive"
              onPress={() => setShowCancelDialog(true)}
              style={styles.cancelButton}
            >
              Cancel Trip
            </Button>
          )}
        </View>

        <View style={styles.bottomSpacing} />
      </ScrollView>

      {/* Cancel Confirmation */}
      <Dialog open={showCancelDialog} onOpenChange={(open) => setShowCancelDialog(open)}>
        <DialogContent style={styles.dialogContent}>
          <DialogHeader>
            <DialogTitle>Cancel Trip?</DialogTitle>
          </DialogHeader>

          <View style={{ paddingVertical: 8 }}>
            <Text style={{ color: '#9ca3af' }}>
              Are you sure you want to cancel this trip? Cancellation fees may apply.
            </Text>
          </View>

          <DialogFooter style={styles.dialogFooter}>
            <Button
              variant="outline"
              onPress={() => setShowCancelDialog(false)}
              style={styles.dialogButton}
            >
              Keep Trip
            </Button>
            <Button
              variant="destructive"
              onPress={handleCancelTrip}
              style={styles.dialogButton}
            >
              Cancel Trip
            </Button>
          </DialogFooter>
        </DialogContent>
      </Dialog>

      {/* Rating Dialog */}
      <Dialog open={showRatingDialog} onOpenChange={(open) => setShowRatingDialog(open)}>
        <DialogContent style={styles.dialogContent}>
          <DialogHeader>
            <DialogTitle>Rate Your Trip</DialogTitle>
          </DialogHeader>

          <View style={styles.ratingContainer}>
            <Text style={styles.ratingText}>How was your experience?</Text>
            <View style={styles.starsContainer}>
              {[1, 2, 3, 4, 5].map((star) => (
                <TouchableOpacity
                  key={star}
                  onPress={() => setRating(star)}
                  style={styles.starButton}
                >
                  <Text style={styles.starIcon}>
                    {star <= rating ? '⭐' : '☆'}
                  </Text>
                </TouchableOpacity>
              ))}
            </View>
          </View>

          <DialogFooter style={styles.dialogFooter}>
            <Button
              variant="outline"
              onPress={() => setShowRatingDialog(false)}
              style={styles.dialogButton}
            >
              Skip
            </Button>
            <Button
              onPress={handleSubmitRating}
              disabled={rating === 0}
              style={styles.dialogButton}
            >
              Submit
            </Button>
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
  scrollView: {
    flex: 1,
  },
  mapContainer: {
    height: 300,
    backgroundColor: '#1f1f1f',
    position: 'relative',
  },
  mapPlaceholder: {
    flex: 1,
    alignItems: 'center',
    justifyContent: 'center',
  },
  mapIcon: {
    fontSize: 64,
    marginBottom: 16,
  },
  mapText: {
    fontSize: 20,
    fontWeight: '600',
    color: '#ffffff',
    marginBottom: 8,
  },
  mapSubtext: {
    fontSize: 14,
    color: '#9ca3af',
  },
  statusBadgeContainer: {
    position: 'absolute',
    top: 20,
    alignSelf: 'center',
  },
  statusBadge: {
    flexDirection: 'row',
    alignItems: 'center',
    gap: 8,
    paddingHorizontal: 16,
    paddingVertical: 8,
  },
  statusIcon: {
    fontSize: 16,
  },
  statusText: {
    fontSize: 14,
    fontWeight: '600',
    color: '#ffffff',
  },
  progressSection: {
    paddingHorizontal: 20,
    paddingVertical: 16,
  },
  progressBar: {
    marginBottom: 8,
  },
  progressText: {
    fontSize: 14,
    color: '#9ca3af',
    textAlign: 'center',
  },
  statusSection: {
    paddingHorizontal: 20,
    marginBottom: 24,
  },
  statusCard: {
    backgroundColor: '#1f1f1f',
    borderWidth: 0,
  },
  statusContent: {
    alignItems: 'center',
    padding: 20,
  },
  statusTitle: {
    fontSize: 20,
    fontWeight: '700',
    color: '#ffffff',
    marginBottom: 8,
  },
  statusDescription: {
    fontSize: 14,
    color: '#9ca3af',
    textAlign: 'center',
  },
  section: {
    paddingHorizontal: 20,
    marginBottom: 24,
  },
  sectionTitle: {
    fontSize: 18,
    fontWeight: '600',
    color: '#ffffff',
    marginBottom: 12,
  },
  driverCard: {
    backgroundColor: '#1f1f1f',
    borderWidth: 0,
  },
  driverContent: {
    padding: 16,
  },
  driverHeader: {
    flexDirection: 'row',
    alignItems: 'center',
    marginBottom: 16,
    gap: 12,
  },
  driverAvatar: {
    width: 56,
    height: 56,
    borderRadius: 28,
    backgroundColor: '#374151',
    alignItems: 'center',
    justifyContent: 'center',
  },
  driverAvatarText: {
    fontSize: 32,
  },
  driverInfo: {
    flex: 1,
  },
  driverName: {
    fontSize: 18,
    fontWeight: '600',
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
  callButton: {
    width: 48,
    height: 48,
    borderRadius: 24,
    backgroundColor: '#10b981',
    alignItems: 'center',
    justifyContent: 'center',
  },
  callIcon: {
    fontSize: 24,
  },
  vehicleInfo: {
    paddingTop: 16,
    borderTopWidth: 1,
    borderTopColor: '#374151',
  },
  vehicleDetail: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    marginBottom: 8,
  },
  vehicleLabel: {
    fontSize: 14,
    color: '#9ca3af',
  },
  vehicleValue: {
    fontSize: 14,
    fontWeight: '500',
    color: '#ffffff',
  },
  routeCard: {
    backgroundColor: '#1f1f1f',
    borderWidth: 0,
  },
  routeContent: {
    padding: 16,
  },
  routePoint: {
    flexDirection: 'row',
    alignItems: 'flex-start',
    gap: 12,
  },
  routeDot: {
    fontSize: 16,
    marginTop: 2,
  },
  routeInfo: {
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
  routeLine: {
    width: 2,
    height: 30,
    backgroundColor: '#374151',
    marginLeft: 8,
    marginVertical: 8,
  },
  routeStats: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    marginTop: 16,
    paddingTop: 16,
    borderTopWidth: 1,
    borderTopColor: '#374151',
  },
  routeStat: {
    alignItems: 'center',
  },
  routeStatLabel: {
    fontSize: 12,
    color: '#9ca3af',
    marginBottom: 4,
  },
  routeStatValue: {
    fontSize: 16,
    fontWeight: '600',
    color: '#ffffff',
  },
  actionsSection: {
    paddingHorizontal: 20,
    marginBottom: 24,
  },
  completeButton: {
    backgroundColor: '#10b981',
  },
  cancelButton: {
    backgroundColor: '#ef4444',
  },
  dialogContent: {
    backgroundColor: '#1f1f1f',
    padding: 24,
  },
  ratingContainer: {
    alignItems: 'center',
    marginVertical: 24,
  },
  ratingText: {
    fontSize: 16,
    color: '#ffffff',
    marginBottom: 16,
  },
  starsContainer: {
    flexDirection: 'row',
    gap: 12,
  },
  starButton: {
    padding: 4,
  },
  starIcon: {
    fontSize: 40,
  },
  dialogFooter: {
    flexDirection: 'row',
    gap: 12,
  },
  dialogButton: {
    flex: 1,
  },
  bottomSpacing: {
    height: 32,
  },
});
