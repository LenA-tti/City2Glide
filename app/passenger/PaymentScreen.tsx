/**
 * PaymentScreen - Manage Payment Methods
 * React Native Implementation
 */

import { Badge, Button, Card, CardContent, Dialog, DialogContent, DialogFooter, DialogHeader, DialogTitle, Input, Label, RadioButton, RadioGroup } from '@/components/ui';
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

interface PaymentScreenProps {
  onBack: () => void;
}

export default function PaymentScreen({ onBack }: PaymentScreenProps) {
  const [defaultMethod, setDefaultMethod] = useState('card-1');
  const [showAddDialog, setShowAddDialog] = useState(false);
  const [showDeleteDialog, setShowDeleteDialog] = useState(false);
  const [selectedMethod, setSelectedMethod] = useState<any>(null);
  const [addMethodType, setAddMethodType] = useState<'card' | 'mobile' | null>(null);

  const paymentMethods = [
    {
      id: 'card-1',
      type: 'card',
      name: 'Visa',
      detail: '•••• 4242',
      icon: '💳',
      canDelete: true,
    },
    {
      id: 'orange',
      type: 'mobile',
      name: 'Orange Money',
      detail: '+267 7X XXX XXX',
      icon: '📱',
      color: '#ff6600',
      canDelete: true,
    },
    {
      id: 'mascom',
      type: 'mobile',
      name: 'Mascom MyZaka',
      detail: '+267 7X XXX XXX',
      icon: '📱',
      color: '#0066cc',
      canDelete: true,
    },
    {
      id: 'cash',
      type: 'cash',
      name: 'Cash',
      detail: 'Pay driver directly',
      icon: '💵',
      canDelete: false,
    },
  ];

  const handleAddPayment = () => {
    // In real app, process payment method
    console.log('Adding payment method:', addMethodType);
    setShowAddDialog(false);
    setAddMethodType(null);
  };

  const handleDeletePayment = () => {
    // In real app, remove from database
    console.log('Deleting payment method:', selectedMethod);
    setShowDeleteDialog(false);
    setSelectedMethod(null);
  };

  return (
    <SafeAreaView style={styles.container}>
      <StatusBar barStyle="light-content" backgroundColor="#0f0f0f" />

      {/* Header */}
      <View style={styles.header}>
        <TouchableOpacity onPress={onBack} style={styles.backButton}>
          <Text style={styles.backIcon}>←</Text>
        </TouchableOpacity>
        <Text style={styles.headerTitle}>Payment Methods</Text>
        <View style={styles.headerSpacer} />
      </View>

      <ScrollView style={styles.scrollView} showsVerticalScrollIndicator={false}>
        {/* Info Card */}
        <View style={styles.infoSection}>
          <Card style={styles.infoCard}>
            <CardContent style={styles.infoContent}>
              <Text style={styles.infoIcon}>ℹ️</Text>
              <Text style={styles.infoText}>
                Select your preferred payment method. You can change it anytime.
              </Text>
            </CardContent>
          </Card>
        </View>

        {/* Payment Methods */}
        <View style={styles.section}>
          <Text style={styles.sectionTitle}>Your Payment Methods</Text>

          <RadioGroup value={defaultMethod} onValueChange={setDefaultMethod}>
            {paymentMethods.map((method) => (
              <Card key={method.id} style={styles.methodCard}>
                <CardContent style={styles.methodContent}>
                  <RadioButton value={method.id} />

                  <View
                    style={[
                      styles.methodIcon,
                      method.color && { backgroundColor: method.color },
                    ]}
                  >
                    <Text style={styles.methodEmoji}>{method.icon}</Text>
                  </View>

                  <View style={styles.methodInfo}>
                    <Text style={styles.methodName}>{method.name}</Text>
                    <Text style={styles.methodDetail}>{method.detail}</Text>
                  </View>

                  {defaultMethod === method.id && (
                    <Badge variant="secondary" style={styles.defaultBadge}>
                      Default
                    </Badge>
                  )}

                  {method.canDelete && (
                    <TouchableOpacity
                      onPress={() => {
                        setSelectedMethod(method);
                        setShowDeleteDialog(true);
                      }}
                      style={styles.deleteButton}
                    >
                      <Text style={styles.deleteIcon}>🗑️</Text>
                    </TouchableOpacity>
                  )}
                </CardContent>
              </Card>
            ))}
          </RadioGroup>
        </View>

        {/* Add New Payment Method */}
        <View style={styles.section}>
          <Button
            onPress={() => setShowAddDialog(true)}
            style={styles.addButton}
          >
            + Add Payment Method
          </Button>
        </View>

        {/* Payment Tips */}
        <View style={styles.section}>
          <Text style={styles.sectionTitle}>Payment Tips</Text>
          <Card style={styles.tipCard}>
            <CardContent style={styles.tipContent}>
              <Text style={styles.tipIcon}>💡</Text>
              <View style={styles.tipInfo}>
                <Text style={styles.tipTitle}>Secure Transactions</Text>
                <Text style={styles.tipText}>
                  All card details are encrypted and stored securely. We never
                  share your information.
                </Text>
              </View>
            </CardContent>
          </Card>

          <Card style={styles.tipCard}>
            <CardContent style={styles.tipContent}>
              <Text style={styles.tipIcon}>⚡</Text>
              <View style={styles.tipInfo}>
                <Text style={styles.tipTitle}>Instant Processing</Text>
                <Text style={styles.tipText}>
                  Mobile money payments are processed instantly for faster trip
                  confirmations.
                </Text>
              </View>
            </CardContent>
          </Card>
        </View>

        <View style={styles.bottomSpacing} />
      </ScrollView>

      {/* Add Payment Dialog */}
      <Dialog open={showAddDialog} onOpenChange={(open) => setShowAddDialog(open)}>
        <DialogContent style={styles.dialogContent}>
          <DialogHeader>
            <DialogTitle>Add Payment Method</DialogTitle>
          </DialogHeader>

          {!addMethodType ? (
            <View style={styles.methodOptions}>
              <TouchableOpacity
                style={styles.methodOption}
                onPress={() => setAddMethodType('card')}
              >
                <Text style={styles.optionIcon}>💳</Text>
                <Text style={styles.optionText}>Credit/Debit Card</Text>
                <Text style={styles.optionArrow}>→</Text>
              </TouchableOpacity>

              <TouchableOpacity
                style={styles.methodOption}
                onPress={() => setAddMethodType('mobile')}
              >
                <Text style={styles.optionIcon}>📱</Text>
                <Text style={styles.optionText}>Mobile Money</Text>
                <Text style={styles.optionArrow}>→</Text>
              </TouchableOpacity>
            </View>
          ) : addMethodType === 'card' ? (
            <View style={styles.formContainer}>
              <View style={styles.formGroup}>
                <Label>Card Number</Label>
                <Input
                  placeholder="1234 5678 9012 3456"
                  keyboardType="numeric"
                  style={styles.formInput}
                />
              </View>

              <View style={styles.formRow}>
                <View style={styles.formGroupHalf}>
                  <Label>Expiry Date</Label>
                  <Input placeholder="MM/YY" style={styles.formInput} />
                </View>
                <View style={styles.formGroupHalf}>
                  <Label>CVV</Label>
                  <Input
                    placeholder="123"
                    keyboardType="numeric"
                    maxLength={3}
                    style={styles.formInput}
                  />
                </View>
              </View>

              <View style={styles.formGroup}>
                <Label>Cardholder Name</Label>
                <Input placeholder="John Doe" style={styles.formInput} />
              </View>
            </View>
          ) : (
            <View style={styles.formContainer}>
              <View style={styles.formGroup}>
                <Label>Provider</Label>
                <Input placeholder="Orange Money / Mascom MyZaka" style={styles.formInput} />
              </View>

              <View style={styles.formGroup}>
                <Label>Phone Number</Label>
                <Input
                  placeholder="+267 7X XXX XXX"
                  keyboardType="phone-pad"
                  style={styles.formInput}
                />
              </View>
            </View>
          )}

          <DialogFooter style={styles.dialogFooter}>
            <Button
              variant="outline"
              onPress={() => {
                setShowAddDialog(false);
                setAddMethodType(null);
              }}
              style={styles.dialogButton}
            >
              Cancel
            </Button>
            {addMethodType && (
              <Button onPress={handleAddPayment} style={styles.dialogButton}>
                Add Method
              </Button>
            )}
          </DialogFooter>
        </DialogContent>
      </Dialog>

      {/* Delete Confirmation */}
      <Dialog
        open={showDeleteDialog}
        onOpenChange={(open) => setShowDeleteDialog(open)}
      >
        <DialogContent style={styles.dialogContent}>
          <DialogHeader>
            <DialogTitle>Remove Payment Method?</DialogTitle>
          </DialogHeader>

          <View style={{ marginVertical: 8 }}>
            <Text style={{ color: '#9ca3af' }}>
              {`Are you sure you want to remove ${selectedMethod?.name}?`}
            </Text>
          </View>

          <DialogFooter style={styles.dialogFooter}>
            <Button
              variant="outline"
              onPress={() => setShowDeleteDialog(false)}
              style={styles.dialogButton}
            >
              Cancel
            </Button>
            <Button
              onPress={handleDeletePayment}
              style={styles.removeButton}
            >
              Remove
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
  scrollView: {
    flex: 1,
  },
  infoSection: {
    paddingHorizontal: 20,
    marginBottom: 24,
  },
  infoCard: {
    backgroundColor: 'rgba(59, 130, 246, 0.1)',
    borderWidth: 1,
    borderColor: '#3b82f6',
  },
  infoContent: {
    flexDirection: 'row',
    alignItems: 'center',
    padding: 16,
    gap: 12,
  },
  infoIcon: {
    fontSize: 24,
  },
  infoText: {
    flex: 1,
    fontSize: 14,
    color: '#93c5fd',
    lineHeight: 20,
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
  methodCard: {
    backgroundColor: '#1f1f1f',
    marginBottom: 12,
    borderWidth: 0,
  },
  methodContent: {
    flexDirection: 'row',
    alignItems: 'center',
    padding: 16,
    gap: 12,
  },
  methodIcon: {
    width: 48,
    height: 48,
    borderRadius: 24,
    backgroundColor: '#374151',
    alignItems: 'center',
    justifyContent: 'center',
  },
  methodEmoji: {
    fontSize: 24,
  },
  methodInfo: {
    flex: 1,
  },
  methodName: {
    fontSize: 16,
    fontWeight: '600',
    color: '#ffffff',
    marginBottom: 4,
  },
  methodDetail: {
    fontSize: 14,
    color: '#9ca3af',
  },
  defaultBadge: {
    paddingHorizontal: 8,
    paddingVertical: 4,
  },
  deleteButton: {
    width: 36,
    height: 36,
    borderRadius: 18,
    backgroundColor: '#374151',
    alignItems: 'center',
    justifyContent: 'center',
  },
  deleteIcon: {
    fontSize: 18,
  },
  addButton: {
    backgroundColor: '#9B3922',
  },
  tipCard: {
    backgroundColor: '#1f1f1f',
    marginBottom: 12,
    borderWidth: 0,
  },
  tipContent: {
    flexDirection: 'row',
    alignItems: 'flex-start',
    padding: 16,
    gap: 12,
  },
  tipIcon: {
    fontSize: 24,
    marginTop: 2,
  },
  tipInfo: {
    flex: 1,
  },
  tipTitle: {
    fontSize: 16,
    fontWeight: '600',
    color: '#ffffff',
    marginBottom: 4,
  },
  tipText: {
    fontSize: 14,
    color: '#9ca3af',
    lineHeight: 20,
  },
  dialogContent: {
    backgroundColor: '#1f1f1f',
    padding: 24,
  },
  methodOptions: {
    gap: 12,
    marginVertical: 16,
  },
  methodOption: {
    flexDirection: 'row',
    alignItems: 'center',
    backgroundColor: '#0f0f0f',
    padding: 16,
    borderRadius: 12,
    gap: 12,
  },
  optionIcon: {
    fontSize: 28,
  },
  optionText: {
    flex: 1,
    fontSize: 16,
    color: '#ffffff',
  },
  optionArrow: {
    fontSize: 24,
    color: '#6b7280',
  },
  formContainer: {
    gap: 16,
    marginVertical: 16,
  },
  formGroup: {
    gap: 8,
  },
  formRow: {
    flexDirection: 'row',
    gap: 12,
  },
  formGroupHalf: {
    flex: 1,
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
  removeButton: {
    flex: 1,
    backgroundColor: '#dc2626',
  },
  bottomSpacing: {
    height: 32,
  },
});
