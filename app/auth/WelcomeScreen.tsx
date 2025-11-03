import { useRouter } from 'expo-router';
import React from 'react';
import { StyleSheet, Text, TouchableOpacity, View } from 'react-native';

interface Props {
  onLogin?: () => void;
  onRegister?: () => void;
}

export default function WelcomeScreen({ onLogin, onRegister }: Props) {
  const router = useRouter();

  const handleLogin = () => {
    if (onLogin) return onLogin();
    router.push('/auth/LoginScreen');
  };

  const handleRegister = () => {
    if (onRegister) return onRegister();
    router.push('/auth/RegisterScreen');
  };

  return (
    <View style={styles.container}>
      <Text style={styles.title}>Welcome to SmartRide</Text>
      <Text style={styles.subtitle}>A lightweight rideshare experience.</Text>

      <TouchableOpacity style={styles.primary} onPress={handleLogin}>
        <Text style={styles.primaryText}>Sign in</Text>
      </TouchableOpacity>

      <TouchableOpacity style={styles.secondary} onPress={handleRegister}>
        <Text style={styles.secondaryText}>Create account</Text>
      </TouchableOpacity>
    </View>
  );
}

const styles = StyleSheet.create({
  container: { flex: 1, padding: 24, justifyContent: 'center', alignItems: 'center' },
  title: { fontSize: 28, fontWeight: '700', marginBottom: 8 },
  subtitle: { fontSize: 16, color: '#6b7280', marginBottom: 24, textAlign: 'center' },
  primary: { backgroundColor: '#0ea5e9', paddingHorizontal: 20, paddingVertical: 12, borderRadius: 8, marginBottom: 12 },
  primaryText: { color: '#fff', fontWeight: '600' },
  secondary: { paddingHorizontal: 20, paddingVertical: 12, borderRadius: 8, borderWidth: 1, borderColor: '#cbd5e1' },
  secondaryText: { color: '#111827' },
});
