import { useRouter } from 'expo-router';
import React from 'react';
import { StyleSheet, Text, TouchableOpacity, View } from 'react-native';

interface Props {
  onRegister?: (role: 'passenger' | 'driver' | 'admin') => void;
  onBack?: () => void;
}

export default function RegisterScreen({ onRegister, onBack }: Props) {
  const router = useRouter();

  const handleRegister = (role: 'passenger' | 'driver' | 'admin') => {
    if (onRegister) return onRegister(role);
    // For demo, after registering as passenger navigate to PassengerApp
    if (role === 'passenger') {
      router.replace('/passenger/PassengerApp');
    } else {
      router.replace('/');
    }
  };

  const handleBack = () => {
    if (onBack) return onBack();
    router.back();
  };

  return (
    <View style={styles.container}>
      <Text style={styles.title}>Create account</Text>
      <Text style={styles.subtitle}>Pick a role to create a demo account.</Text>

      <TouchableOpacity style={styles.primary} onPress={() => handleRegister('passenger')}>
        <Text style={styles.primaryText}>Register as Passenger</Text>
      </TouchableOpacity>

      <TouchableOpacity style={styles.primary} onPress={() => handleRegister('driver')}>
        <Text style={styles.primaryText}>Register as Driver</Text>
      </TouchableOpacity>

      <TouchableOpacity style={styles.primary} onPress={() => handleRegister('admin')}>
        <Text style={styles.primaryText}>Register as Admin</Text>
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
