/**
 * Table Component - React Native
 * 
 * A responsive table component.
 */

import React from 'react';
import { View, Text, ScrollView, StyleSheet } from 'react-native';

interface TableProps {
  children: React.ReactNode;
}

export function Table({ children }: TableProps) {
  return (
    <ScrollView horizontal>
      <View style={styles.table}>{children}</View>
    </ScrollView>
  );
}

export function TableHeader({ children }: { children: React.ReactNode }) {
  return <View style={styles.tableHeader}>{children}</View>;
}

export function TableBody({ children }: { children: React.ReactNode }) {
  return <View style={styles.tableBody}>{children}</View>;
}

export function TableRow({ children }: { children: React.ReactNode }) {
  return <View style={styles.tableRow}>{children}</View>;
}

export function TableHead({ children }: { children: React.ReactNode }) {
  return (
    <View style={styles.tableHead}>
      <Text style={styles.tableHeadText}>{children}</Text>
    </View>
  );
}

export function TableCell({ children }: { children: React.ReactNode }) {
  return (
    <View style={styles.tableCell}>
      <Text style={styles.tableCellText}>{children}</Text>
    </View>
  );
}

const styles = StyleSheet.create({
  table: {
    borderWidth: 1,
    borderColor: '#e5e7eb',
    borderRadius: 8,
    overflow: 'hidden',
  },
  tableHeader: {
    backgroundColor: '#f9fafb',
    borderBottomWidth: 1,
    borderBottomColor: '#e5e7eb',
  },
  tableBody: {
    backgroundColor: '#ffffff',
  },
  tableRow: {
    flexDirection: 'row',
    borderBottomWidth: 1,
    borderBottomColor: '#e5e7eb',
  },
  tableHead: {
    padding: 12,
    minWidth: 100,
  },
  tableHeadText: {
    fontSize: 14,
    fontWeight: '600',
    color: '#1f2937',
  },
  tableCell: {
    padding: 12,
    minWidth: 100,
  },
  tableCellText: {
    fontSize: 14,
    color: '#6b7280',
  },
});
