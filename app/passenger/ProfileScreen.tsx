/**
 * ProfileScreen - User Profile & Settings
 * React Native Implementation
 */

import { AlertDialog, Avatar, Button, Card, CardContent, Dialog, DialogContent, DialogFooter, DialogHeader, DialogTitle, Input, Label, Separator, Switch } from '@/components/ui';
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

interface ProfileScreenProps {
  onBack: () => void;
  onLogout: () => void;
}

export default function ProfileScreen({ onBack, onLogout }: ProfileScreenProps) {
  const [notifications, setNotifications] = useState(true);
  const [emailNotifications, setEmailNotifications] = useState(true);
  const [locationServices, setLocationServices] = useState(true);
  const [darkMode, setDarkMode] = useState(true);
  const [showLogoutDialog, setShowLogoutDialog] = useState(false);
  const [showDeleteDialog, setShowDeleteDialog] = useState(false);
  const [showEditDialog, setShowEditDialog] = useState(false);

  const userProfile = {
    name: 'John Doe',
    email: 'john.doe@example.com',
    phone: '+267 72 123 456',
    memberSince: 'Jan 2024',
    totalTrips: 24,
    rating: 4.8,
    totalSpent: 340.50,
  };

  const handleLogout = () => {
    setShowLogoutDialog(false);
    onLogout();
  };

  return (
    <SafeAreaView style={styles.container}>
      <StatusBar barStyle="light-content" backgroundColor="#0f0f0f" />

      {/* Header */}
      <View style={styles.header}>
        <TouchableOpacity onPress={onBack} style={styles.backButton}>
          <Text style={styles.backIcon}>←</Text>
        </TouchableOpacity>
        <Text style={styles.headerTitle}>Profile</Text>
        <TouchableOpacity
          onPress={() => setShowEditDialog(true)}
          style={styles.editButton}
        >
          <Text style={styles.editIcon}>✏️</Text>
        </TouchableOpacity>
      </View>

      <ScrollView style={styles.scrollView} showsVerticalScrollIndicator={false}>
        {/* Profile Header */}
        <View style={styles.profileHeader}>
          <TouchableOpacity style={styles.avatarContainer}>
            <Avatar style={{ width: 96, height: 96 }}>
              <Text style={styles.avatarText}>JD</Text>
            </Avatar>
            <View style={styles.cameraButton}>
              <Text style={styles.cameraIcon}>📷</Text>
            </View>
          </TouchableOpacity>

          <Text style={styles.profileName}>{userProfile.name}</Text>
          <Text style={styles.profileEmail}>{userProfile.email}</Text>

          <View style={styles.ratingContainer}>
            <Text style={styles.ratingText}>⭐ {userProfile.rating}</Text>
            <Text style={styles.ratingLabel}>Passenger Rating</Text>
          </View>
        </View>

        {/* Stats */}
        <View style={styles.statsSection}>
          <Card style={styles.statCard}>
            <CardContent style={styles.statContent}>
              <Text style={styles.statValue}>{userProfile.totalTrips}</Text>
              <Text style={styles.statLabel}>Total Trips</Text>
            </CardContent>
          </Card>

          <Card style={styles.statCard}>
            <CardContent style={styles.statContent}>
              <Text style={styles.statValue}>{userProfile.memberSince}</Text>
              <Text style={styles.statLabel}>Member Since</Text>
            </CardContent>
          </Card>

          <Card style={styles.statCard}>
            <CardContent style={styles.statContent}>
              <Text style={styles.statValue}>P {userProfile.totalSpent}</Text>
              <Text style={styles.statLabel}>Total Spent</Text>
            </CardContent>
          </Card>
        </View>

        {/* Account Settings */}
        <View style={styles.section}>
          <Text style={styles.sectionTitle}>Account Settings</Text>

          <Card style={styles.settingCard}>
            <CardContent style={styles.settingContent}>
              <View style={styles.settingRow}>
                <View style={styles.settingInfo}>
                  <Text style={styles.settingIcon}>🔔</Text>
                  <View style={styles.settingText}>
                    <Text style={styles.settingLabel}>Push Notifications</Text>
                    <Text style={styles.settingDescription}>
                      Get trip updates and offers
                    </Text>
                  </View>
                </View>
                <Switch
                  checked={notifications}
                  onCheckedChange={setNotifications}
                />
              </View>

              <Separator style={styles.separator} />

              <View style={styles.settingRow}>
                <View style={styles.settingInfo}>
                  <Text style={styles.settingIcon}>📧</Text>
                  <View style={styles.settingText}>
                    <Text style={styles.settingLabel}>Email Notifications</Text>
                    <Text style={styles.settingDescription}>
                      Receive updates via email
                    </Text>
                  </View>
                </View>
                <Switch
                  checked={emailNotifications}
                  onCheckedChange={setEmailNotifications}
                />
              </View>

              <Separator style={styles.separator} />

              <View style={styles.settingRow}>
                <View style={styles.settingInfo}>
                  <Text style={styles.settingIcon}>📍</Text>
                  <View style={styles.settingText}>
                    <Text style={styles.settingLabel}>Location Services</Text>
                    <Text style={styles.settingDescription}>
                      Allow location tracking
                    </Text>
                  </View>
                </View>
                <Switch
                  checked={locationServices}
                  onCheckedChange={setLocationServices}
                />
              </View>
            </CardContent>
          </Card>
        </View>

        {/* Preferences */}
        <View style={styles.section}>
          <Text style={styles.sectionTitle}>Preferences</Text>

          <Card style={styles.settingCard}>
            <CardContent style={styles.settingContent}>
              <View style={styles.settingRow}>
                <View style={styles.settingInfo}>
                  <Text style={styles.settingIcon}>🌙</Text>
                  <View style={styles.settingText}>
                    <Text style={styles.settingLabel}>Dark Mode</Text>
                    <Text style={styles.settingDescription}>
                      Use dark theme
                    </Text>
                  </View>
                </View>
                <Switch checked={darkMode} onCheckedChange={setDarkMode} />
              </View>

              <Separator style={styles.separator} />

              <TouchableOpacity style={styles.settingRow}>
                <View style={styles.settingInfo}>
                  <Text style={styles.settingIcon}>🌍</Text>
                  <View style={styles.settingText}>
                    <Text style={styles.settingLabel}>Language</Text>
                    <Text style={styles.settingDescription}>English</Text>
                  </View>
                </View>
                <Text style={styles.arrow}>›</Text>
              </TouchableOpacity>

              <Separator style={styles.separator} />

              <TouchableOpacity style={styles.settingRow}>
                <View style={styles.settingInfo}>
                  <Text style={styles.settingIcon}>💱</Text>
                  <View style={styles.settingText}>
                    <Text style={styles.settingLabel}>Currency</Text>
                    <Text style={styles.settingDescription}>BWP (Pula)</Text>
                  </View>
                </View>
                <Text style={styles.arrow}>›</Text>
              </TouchableOpacity>
            </CardContent>
          </Card>
        </View>

        {/* Security */}
        <View style={styles.section}>
          <Text style={styles.sectionTitle}>Security</Text>

          <Card style={styles.settingCard}>
            <CardContent style={styles.settingContent}>
              <TouchableOpacity style={styles.settingRow}>
                <View style={styles.settingInfo}>
                  <Text style={styles.settingIcon}>🔐</Text>
                  <View style={styles.settingText}>
                    <Text style={styles.settingLabel}>Change Password</Text>
                    <Text style={styles.settingDescription}>
                      Update your password
                    </Text>
                  </View>
                </View>
                <Text style={styles.arrow}>›</Text>
              </TouchableOpacity>

              <Separator style={styles.separator} />

              <View style={styles.settingRow}>
                <View style={styles.settingInfo}>
                  <Text style={styles.settingIcon}>🔒</Text>
                  <View style={styles.settingText}>
                    <Text style={styles.settingLabel}>Two-Factor Auth</Text>
                    <Text style={styles.settingDescription}>
                      Extra security layer
                    </Text>
                  </View>
                </View>
                <Switch checked={false} />
              </View>
            </CardContent>
          </Card>
        </View>

        {/* Support */}
        <View style={styles.section}>
          <Text style={styles.sectionTitle}>Support</Text>

          <Card style={styles.settingCard}>
            <CardContent style={styles.settingContent}>
              <TouchableOpacity style={styles.settingRow}>
                <Text style={styles.settingIcon}>📞</Text>
                <Text style={styles.settingLabel}>Help & Support</Text>
                <Text style={styles.arrow}>›</Text>
              </TouchableOpacity>

              <Separator style={styles.separator} />

              <TouchableOpacity style={styles.settingRow}>
                <Text style={styles.settingIcon}>📧</Text>
                <Text style={styles.settingLabel}>Contact Us</Text>
                <Text style={styles.arrow}>›</Text>
              </TouchableOpacity>

              <Separator style={styles.separator} />

              <TouchableOpacity style={styles.settingRow}>
                <Text style={styles.settingIcon}>⭐</Text>
                <Text style={styles.settingLabel}>Rate App</Text>
                <Text style={styles.arrow}>›</Text>
              </TouchableOpacity>

              <Separator style={styles.separator} />

              <TouchableOpacity style={styles.settingRow}>
                <Text style={styles.settingIcon}>📄</Text>
                <Text style={styles.settingLabel}>Terms & Conditions</Text>
                <Text style={styles.arrow}>›</Text>
              </TouchableOpacity>

              <Separator style={styles.separator} />

              <TouchableOpacity style={styles.settingRow}>
                <Text style={styles.settingIcon}>🔒</Text>
                <Text style={styles.settingLabel}>Privacy Policy</Text>
                <Text style={styles.arrow}>›</Text>
              </TouchableOpacity>
            </CardContent>
          </Card>
        </View>

        {/* Actions */}
        <View style={styles.section}>
          <Button
            variant="destructive"
            onPress={() => setShowLogoutDialog(true)}
            style={styles.actionButton}
          >
            🚪 Logout
          </Button>

          <Button
            variant="outline"
            onPress={() => setShowDeleteDialog(true)}
            style={StyleSheet.flatten([styles.actionButton, styles.deleteButton])}
          >
            🗑️ Delete Account
          </Button>
        </View>

        <View style={styles.bottomSpacing} />
      </ScrollView>

      {/* Edit Profile Dialog */}
      <Dialog open={showEditDialog} onOpenChange={(open) => setShowEditDialog(open)}>
        <DialogContent style={styles.dialogContent}>
          <DialogHeader>
            <DialogTitle>Edit Profile</DialogTitle>
          </DialogHeader>

          <View style={styles.formContainer}>
            <View style={styles.formGroup}>
              <Label>Full Name</Label>
              <Input defaultValue={userProfile.name} style={styles.formInput} />
            </View>

            <View style={styles.formGroup}>
              <Label>Email</Label>
              <Input
                defaultValue={userProfile.email}
                keyboardType="email-address"
                style={styles.formInput}
              />
            </View>

            <View style={styles.formGroup}>
              <Label>Phone Number</Label>
              <Input
                defaultValue={userProfile.phone}
                keyboardType="phone-pad"
                style={styles.formInput}
              />
            </View>
          </View>

          <DialogFooter style={styles.dialogFooter}>
            <Button
              variant="outline"
              onPress={() => setShowEditDialog(false)}
              style={styles.dialogButton}
            >
              Cancel
            </Button>
            <Button
              onPress={() => setShowEditDialog(false)}
              style={styles.dialogButton}
            >
              Save Changes
            </Button>
          </DialogFooter>
        </DialogContent>
      </Dialog>

      {/* Logout Confirmation */}
      <Dialog open={showLogoutDialog} onOpenChange={(open) => setShowLogoutDialog(open)}>
        <DialogContent style={styles.dialogContent}>
          <DialogHeader>
            <DialogTitle>Logout</DialogTitle>
          </DialogHeader>

          <Text style={{ color: '#9ca3af', marginVertical: 8 }}>
            Are you sure you want to logout?
          </Text>

          <DialogFooter style={styles.dialogFooter}>
            <Button
              variant="outline"
              onPress={() => setShowLogoutDialog(false)}
              style={styles.dialogButton}
            >
              Cancel
            </Button>
            <Button
              variant="destructive"
              onPress={handleLogout}
              style={styles.dialogButton}
            >
              Logout
            </Button>
          </DialogFooter>
        </DialogContent>
      </Dialog>

      {/* Delete Account Confirmation */}
      <AlertDialog open={showDeleteDialog} onOpenChange={(open) => setShowDeleteDialog(open)}>
        <DialogContent style={styles.dialogContent}>
          <DialogHeader>
            <DialogTitle>Delete Account</DialogTitle>
          </DialogHeader>

          <Text style={{ color: '#9ca3af', marginVertical: 8 }}>
            Are you sure you want to permanently delete your account? This action cannot be undone.
          </Text>

          <DialogFooter style={styles.dialogFooter}>
            <Button
              variant="outline"
              onPress={() => setShowDeleteDialog(false)}
              style={styles.dialogButton}
            >
              Cancel
            </Button>
            <Button
              variant="destructive"
              onPress={() => setShowDeleteDialog(false)}
              style={styles.dialogButton}
            >
              Delete Account
            </Button>
          </DialogFooter>
        </DialogContent>
      </AlertDialog>
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
  editButton: {
    width: 40,
    height: 40,
    borderRadius: 20,
    backgroundColor: '#1f1f1f',
    alignItems: 'center',
    justifyContent: 'center',
  },
  editIcon: {
    fontSize: 20,
  },
  scrollView: {
    flex: 1,
  },
  profileHeader: {
    alignItems: 'center',
    paddingVertical: 24,
  },
  avatarContainer: {
    position: 'relative',
    marginBottom: 16,
  },
  avatarText: {
    fontSize: 36,
    color: '#ffffff',
  },
  cameraButton: {
    position: 'absolute',
    bottom: 0,
    right: 0,
    width: 32,
    height: 32,
    borderRadius: 16,
    backgroundColor: '#9B3922',
    alignItems: 'center',
    justifyContent: 'center',
  },
  cameraIcon: {
    fontSize: 16,
  },
  profileName: {
    fontSize: 24,
    fontWeight: '700',
    color: '#ffffff',
    marginBottom: 4,
  },
  profileEmail: {
    fontSize: 16,
    color: '#9ca3af',
    marginBottom: 16,
  },
  ratingContainer: {
    flexDirection: 'row',
    alignItems: 'center',
    gap: 8,
    backgroundColor: '#1f1f1f',
    paddingHorizontal: 16,
    paddingVertical: 8,
    borderRadius: 20,
  },
  ratingText: {
    fontSize: 16,
    fontWeight: '600',
    color: '#fbbf24',
  },
  ratingLabel: {
    fontSize: 14,
    color: '#9ca3af',
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
    fontSize: 18,
    fontWeight: '700',
    color: '#ffffff',
    marginBottom: 4,
  },
  statLabel: {
    fontSize: 12,
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
  settingCard: {
    backgroundColor: '#1f1f1f',
    borderWidth: 0,
  },
  settingContent: {
    padding: 0,
  },
  settingRow: {
    flexDirection: 'row',
    alignItems: 'center',
    paddingVertical: 16,
    paddingHorizontal: 16,
    gap: 12,
  },
  settingInfo: {
    flex: 1,
    flexDirection: 'row',
    alignItems: 'center',
    gap: 12,
  },
  settingIcon: {
    fontSize: 24,
  },
  settingText: {
    flex: 1,
  },
  settingLabel: {
    fontSize: 16,
    fontWeight: '500',
    color: '#ffffff',
    marginBottom: 2,
  },
  settingDescription: {
    fontSize: 14,
    color: '#9ca3af',
  },
  separator: {
    marginHorizontal: 16,
    backgroundColor: '#374151',
  },
  arrow: {
    fontSize: 24,
    color: '#6b7280',
  },
  actionButton: {
    marginBottom: 12,
  },
  deleteButton: {
    borderColor: '#ef4444',
  },
  dialogContent: {
    backgroundColor: '#1f1f1f',
    padding: 24,
  },
  formContainer: {
    gap: 16,
    marginVertical: 16,
  },
  formGroup: {
    gap: 8,
  },
  formInput: {
    backgroundColor: '#0f0f0f',
    borderColor: '#374151',
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
