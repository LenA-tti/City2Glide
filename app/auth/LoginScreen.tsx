import { useRouter } from 'expo-router';
import React from 'react';
import { StyleSheet, Text, TouchableOpacity, View } from 'react-native';

interface Props {
  onLogin?: (role: 'passenger' | 'driver' | 'admin') => void;
  onBack?: () => void;
}

export default function LoginScreen({ onLogin, onBack }: Props) {
  const router = useRouter();

  const handleRole = (role: 'passenger' | 'driver' | 'admin') => {
    if (onLogin) return onLogin(role);
    // In a real app you'd authenticate here. For demo, push to passenger app for passenger role.
    if (role === 'passenger') {
      router.replace('/passenger/PassengerApp');
    } else {
      // Non-passenger roles fallback to landing for now
      router.replace('/');
    }
  };

  const handleBack = () => {
    if (onBack) return onBack();
    router.back();
  };

  return (
    <View style={styles.container}>
      <Text style={styles.title}>Sign in</Text>
      <Text style={styles.subtitle}>Choose how you'd like to sign in .</Text>

      <TouchableOpacity style={styles.primary} onPress={() => handleRole('passenger')}>
        <Text style={styles.primaryText}>Continue as Passenger</Text>
      </TouchableOpacity>

      <TouchableOpacity style={styles.primary} onPress={() => handleRole('driver')}>
        <Text style={styles.primaryText}>Continue as Driver</Text>
      </TouchableOpacity>

      <TouchableOpacity style={styles.primary} onPress={() => handleRole('admin')}>
        <Text style={styles.primaryText}>Continue as Admin</Text>
      </TouchableOpacity>

      <TouchableOpacity style={styles.back} onPress={handleBack}>
        <Text style={styles.backText}>Back</Text>
      </TouchableOpacity>
    </View>
  );
}

const styles = StyleSheet.create({
  container: { flex: 1, padding: 24, justifyContent: 'center', alignItems: 'center' },
  title: { fontSize: 24, fontWeight: '700', marginBottom: 8 },
  subtitle: { fontSize: 14, color: '#6b7280', marginBottom: 20, textAlign: 'center' },
  primary: { backgroundColor: '#0ea5e9', paddingHorizontal: 20, paddingVertical: 12, borderRadius: 8, marginBottom: 12, width: '100%' },
  primaryText: { color: '#fff', fontWeight: '600', textAlign: 'center' },
  back: { marginTop: 16 },
  backText: { color: '#374151' },
});
