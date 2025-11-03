import React from 'react';
import { StyleSheet, Text, View } from 'react-native';

export default function MapMock({ title, pins = [] }: { title?: string; pins?: Array<{ id: string; label: string }> }) {
  return (
    <View style={styles.container}>
      {title && <Text style={styles.title}>{title}</Text>}
      <View style={styles.mapPlaceholder}>
        {pins.map((p) => (
          <Text key={p.id} style={styles.pin}>{p.label}</Text>
        ))}
      </View>
    </View>
  );
}

const styles = StyleSheet.create({
  container: { padding: 12 },
  title: { fontWeight: '700', marginBottom: 8 },
  mapPlaceholder: { height: 160, backgroundColor: '#f3f4f6', borderRadius: 8, padding: 8 },
  pin: { fontSize: 12, color: '#374151' },
});
