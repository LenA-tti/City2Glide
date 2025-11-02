/**
 * SavedLocationsScreen - Manage Favorite Places
 * React Native Implementation
 */

import React, { useState } from 'react';
import {
  Alert,
  ScrollView,
  StatusBar,
  StyleSheet,
  Text,
  TouchableOpacity,
  View
} from 'react-native';
import { Button, Card, TextInput } from 'react-native-paper';
import { SafeAreaView } from 'react-native-safe-area-context';
// @ts-ignore: react-native-vector-icons does not provide bundled TypeScript declarations in this project
import Icon from 'react-native-vector-icons/MaterialIcons';

type Location = {
  id: string;
  name: string;
  address: string;
  icon?: string;
  isPredefined?: boolean;
};

export default function SavedLocationsScreen({ 
  onBack, 
  onSelectLocation 
}: { 
  onBack: () => void; 
  onSelectLocation: (location: Location) => void;
}) {
  const [searchQuery, setSearchQuery] = useState('');
  const [showAddDialog, setShowAddDialog] = useState(false);
  const [newLocation, setNewLocation] = useState({ name: '', address: '' });
  const [selectedLocation, setSelectedLocation] = useState<Location | null>(null);
  const [showDeleteDialog, setShowDeleteDialog] = useState(false);

  const savedLocations: Location[] = [
    { id: 'home', name: 'Home', address: 'Block 8, Gaborone West', icon: '🏠', isPredefined: true },
    { id: 'work', name: 'Work', address: 'CBD, Main Mall Area', icon: '💼', isPredefined: true },
    { id: '1', name: 'Gym', address: 'Riverwalk Mall, Gaborone', icon: '🏋️' },
    { id: '2', name: 'University', address: 'UB Main Campus', icon: '🎓' },
  ];

  const quickLocations = savedLocations.filter(loc => loc.isPredefined);
  const customLocations = savedLocations.filter(loc => !loc.isPredefined);

  const handleAddLocation = () => {
    if (!newLocation.name.trim() || !newLocation.address.trim()) {
      Alert.alert('Error', 'Please fill in both name and address');
      return;
    }

    // In a real app, you would save to state/context/API
    Alert.alert('Success', `Added ${newLocation.name}`);
    setNewLocation({ name: '', address: '' });
    setShowAddDialog(false);
  };

  const handleDeleteLocation = () => {
    if (selectedLocation) {
      Alert.alert('Deleted', `Removed ${selectedLocation.name}`);
      setShowDeleteDialog(false);
      setSelectedLocation(null);
    }
  };

  const confirmDelete = (location: Location) => {
    setSelectedLocation(location);
    setShowDeleteDialog(true);
  };

  const filteredLocations = savedLocations.filter(loc =>
    loc.name.toLowerCase().includes(searchQuery.toLowerCase()) ||
    loc.address.toLowerCase().includes(searchQuery.toLowerCase())
  );

  return (
    <SafeAreaView style={styles.container}>
      <StatusBar barStyle="light-content" backgroundColor="#0f0f0f" />
      
      {/* Header */}
      <View style={styles.header}>
        <TouchableOpacity onPress={onBack} style={styles.backButton}>
          <Icon name="arrow-back" size={24} color="#ffffff" />
        </TouchableOpacity>
        <Text style={styles.headerTitle}>Saved Locations</Text>
        <TouchableOpacity 
          onPress={() => setShowAddDialog(true)} 
          style={styles.addButton}
        >
          <Icon name="add" size={24} color="#ffffff" />
        </TouchableOpacity>
      </View>

      {/* Search */}
      <View style={styles.searchSection}>
        <TextInput
          placeholder="Search locations..."
          value={searchQuery}
          onChangeText={setSearchQuery}
          style={styles.searchInput}
          theme={{ colors: { primary: '#9B3922' } }}
          left={<TextInput.Icon icon="magnify" />}
        />
      </View>

      <ScrollView style={styles.scrollView}>
        {/* Quick Locations */}
        <View style={styles.section}>
          <Text style={styles.sectionTitle}>Quick Access</Text>
          <View style={styles.quickLocations}>
            {quickLocations.map((location) => (
              <Card key={location.id} style={styles.quickCard}>
                <Card.Content style={styles.quickContent}>
                  <View style={styles.quickIcon}>
                    <Text style={styles.iconEmoji}>{location.icon}</Text>
                  </View>
                  <View style={styles.quickInfo}>
                    <Text style={styles.quickName}>{location.name}</Text>
                    <Text style={styles.quickAddress}>{location.address}</Text>
                  </View>
                  <TouchableOpacity 
                    onPress={() => onSelectLocation(location)}
                    style={styles.useButton}
                  >
                    <Icon name="navigation" size={20} color="#ffffff" />
                  </TouchableOpacity>
                </Card.Content>
              </Card>
            ))}
          </View>
        </View>

        {/* Custom Locations */}
        <View style={styles.section}>
          <Text style={styles.sectionTitle}>Your Locations</Text>
          {customLocations.map((location) => (
            <Card key={location.id} style={styles.locationCard}>
              <Card.Content style={styles.locationContent}>
                <View style={styles.locationIcon}>
                  <Text style={styles.iconEmoji}>{location.icon}</Text>
                </View>
                <View style={styles.locationInfo}>
                  <Text style={styles.locationName}>{location.name}</Text>
                  <Text style={styles.locationAddress}>{location.address}</Text>
                </View>
                <View style={styles.locationActions}>
                  <TouchableOpacity 
                    onPress={() => onSelectLocation(location)}
                    style={styles.actionButton}
                  >
                    <Icon name="navigation" size={18} color="#ffffff" />
                  </TouchableOpacity>
                  <TouchableOpacity 
                    onPress={() => confirmDelete(location)}
                    style={styles.actionButton}
                  >
                    <Icon name="delete" size={18} color="#ff6b6b" />
                  </TouchableOpacity>
                </View>
              </Card.Content>
            </Card>
          ))}
        </View>

        <View style={styles.bottomSpacing} />
      </ScrollView>

      {/* Add Location Dialog */}
      {showAddDialog && (
        <View style={styles.dialogOverlay}>
          <Card style={styles.dialogContent}>
            <Card.Content>
              <Text style={styles.dialogTitle}>Add New Location</Text>
              
              <View style={styles.formContainer}>
                <View style={styles.formGroup}>
                  <Text style={styles.label}>Name</Text>
                  <TextInput
                    value={newLocation.name}
                    onChangeText={(text) => setNewLocation({ ...newLocation, name: text })}
                    placeholder="e.g., Gym, School"
                    style={styles.formInput}
                  />
                </View>
                
                <View style={styles.formGroup}>
                  <Text style={styles.label}>Address</Text>
                  <TextInput
                    value={newLocation.address}
                    onChangeText={(text) => setNewLocation({ ...newLocation, address: text })}
                    placeholder="Full address"
                    style={styles.formInput}
                    multiline
                  />
                </View>
              </View>

              <View style={styles.dialogFooter}>
                <Button 
                  mode="outlined" 
                  onPress={() => setShowAddDialog(false)}
                  style={styles.dialogButton}
                >
                  Cancel
                </Button>
                <Button 
                  mode="contained" 
                  onPress={handleAddLocation}
                  style={styles.dialogButton}
                  buttonColor="#9B3922"
                >
                  Add Location
                </Button>
              </View>
            </Card.Content>
          </Card>
        </View>
      )}

      {/* Delete Confirmation Dialog */}
      {showDeleteDialog && (
        <View style={styles.dialogOverlay}>
          <Card style={styles.dialogContent}>
            <Card.Content>
              <Text style={styles.dialogTitle}>Delete Location?</Text>
              <Text style={styles.dialogDescription}>
                Are you sure you want to delete "{selectedLocation?.name}"? This action cannot be undone.
              </Text>
              
              <View style={styles.dialogFooter}>
                <Button 
                  mode="outlined" 
                  onPress={() => setShowDeleteDialog(false)}
                  style={styles.dialogButton}
                >
                  Cancel
                </Button>
                <Button 
                  mode="contained" 
                  onPress={handleDeleteLocation}
                  style={styles.dialogButton}
                  buttonColor="#ff6b6b"
                >
                  Delete
                </Button>
              </View>
            </Card.Content>
          </Card>
        </View>
      )}
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
  headerTitle: {
    flex: 1,
    fontSize: 20,
    fontWeight: '600',
    color: '#ffffff',
  },
  addButton: {
    width: 40,
    height: 40,
    borderRadius: 20,
    backgroundColor: '#9B3922',
    alignItems: 'center',
    justifyContent: 'center',
  },
  searchSection: {
    paddingHorizontal: 20,
    marginBottom: 16,
  },
  searchInput: {
    backgroundColor: '#1f1f1f',
    fontSize: 16,
  },
  scrollView: {
    flex: 1,
  },
  section: {
    paddingHorizontal: 20,
    marginBottom: 24,
  },
  sectionTitle: {
    fontSize: 18,
    fontWeight: '600',
    color: '#ffffff',
    marginBottom: 16,
  },
  quickLocations: {
    gap: 12,
  },
  quickCard: {
    backgroundColor: '#1f1f1f',
    borderWidth: 0,
  },
  quickContent: {
    flexDirection: 'row',
    alignItems: 'center',
    padding: 16,
    gap: 12,
  },
  quickIcon: {
    width: 56,
    height: 56,
    borderRadius: 28,
    backgroundColor: '#9B3922',
    alignItems: 'center',
    justifyContent: 'center',
  },
  iconEmoji: {
    fontSize: 28,
  },
  quickInfo: {
    flex: 1,
  },
  quickName: {
    fontSize: 18,
    fontWeight: '600',
    color: '#ffffff',
    marginBottom: 4,
  },
  quickAddress: {
    fontSize: 14,
    color: '#9ca3af',
  },
  useButton: {
    width: 40,
    height: 40,
    borderRadius: 20,
    backgroundColor: '#374151',
    alignItems: 'center',
    justifyContent: 'center',
  },
  locationCard: {
    backgroundColor: '#1f1f1f',
    marginBottom: 12,
    borderWidth: 0,
  },
  locationContent: {
    flexDirection: 'row',
    alignItems: 'center',
    padding: 16,
    gap: 12,
  },
  locationIcon: {
    width: 48,
    height: 48,
    borderRadius: 24,
    backgroundColor: '#374151',
    alignItems: 'center',
    justifyContent: 'center',
  },
  locationInfo: {
    flex: 1,
  },
  locationName: {
    fontSize: 16,
    fontWeight: '600',
    color: '#ffffff',
    marginBottom: 4,
  },
  locationAddress: {
    fontSize: 14,
    color: '#9ca3af',
  },
  locationActions: {
    flexDirection: 'row',
    gap: 8,
  },
  actionButton: {
    width: 36,
    height: 36,
    borderRadius: 18,
    backgroundColor: '#374151',
    alignItems: 'center',
    justifyContent: 'center',
  },
  dialogOverlay: {
    position: 'absolute',
    top: 0,
    left: 0,
    right: 0,
    bottom: 0,
    backgroundColor: 'rgba(0, 0, 0, 0.8)',
    justifyContent: 'center',
    padding: 20,
  },
  dialogContent: {
    backgroundColor: '#1f1f1f',
    padding: 16,
  },
  dialogTitle: {
    fontSize: 20,
    fontWeight: '600',
    color: '#ffffff',
    marginBottom: 16,
    textAlign: 'center',
  },
  dialogDescription: {
    fontSize: 16,
    color: '#9ca3af',
    textAlign: 'center',
    marginBottom: 24,
    lineHeight: 22,
  },
  formContainer: {
    gap: 16,
    marginVertical: 16,
  },
  formGroup: {
    gap: 8,
  },
  label: {
    fontSize: 16,
    fontWeight: '500',
    color: '#ffffff',
  },
  formInput: {
    backgroundColor: '#0f0f0f',
    fontSize: 16,
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