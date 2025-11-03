/**
 * Sheet Component - React Native (Bottom Sheet)
 * 
 * Extends the Dialog component to display content that complements the main content.
 * Uses react-native-bottom-sheet or @gorhom/bottom-sheet
 */

// Load @gorhom/bottom-sheet at runtime if available. If it's not installed we
// provide a lightweight fallback so the app still bundles and runs.
let ExternalBottomSheet: any = null;
let ExternalBackdrop: any = null;
try {
  // eslint-disable-next-line @typescript-eslint/no-var-requires
  const mod = require('@gorhom/bottom-sheet');
  ExternalBottomSheet = mod?.default ?? mod;
  ExternalBackdrop = mod?.BottomSheetBackdrop ?? mod?.BottomSheetBackdrop;
} catch (e) {
  ExternalBottomSheet = null;
  ExternalBackdrop = null;
}

import React, { useMemo, useRef } from 'react';
import { StyleSheet, Text, TouchableOpacity, View } from 'react-native';

interface SheetProps {
  isOpen: boolean;
  onClose: () => void;
  children: React.ReactNode;
  snapPoints?: string[];
}

export function Sheet({
  isOpen,
  onClose,
  children,
  snapPoints = ['25%', '50%', '90%'],
}: SheetProps) {
  const bottomSheetRef = useRef<any>(null);
  const snapPointsMemo = useMemo(() => snapPoints, []);

  React.useEffect(() => {
    if (isOpen) {
      bottomSheetRef.current?.expand();
    } else {
      bottomSheetRef.current?.close();
    }
  }, [isOpen]);
  // If the external BottomSheet is available use it, otherwise render a
  // simple fallback sheet for environments without the native dependency.
  if (ExternalBottomSheet) {
    const BS = ExternalBottomSheet;
    const Backdrop = ExternalBackdrop;
    return (
      <BS
        ref={bottomSheetRef}
        index={isOpen ? 0 : -1}
        snapPoints={snapPointsMemo}
        enablePanDownToClose
        onClose={onClose}
        backdropComponent={(props: any) => (
          <Backdrop
            {...props}
            appearsOnIndex={0}
            disappearsOnIndex={-1}
          />
        )}
      >
        <View style={styles.contentContainer}>{children}</View>
      </BS>
    );
  }

  // Fallback UI: simple bottom-anchored panel with an overlay
  if (!isOpen) return null;

  return (
    <View style={styles.fallbackOverlay}>
      <TouchableOpacity style={StyleSheet.absoluteFill} onPress={onClose} />
      <View style={styles.fallbackSheet}>
        <View style={styles.contentContainer}>{children}</View>
      </View>
    </View>
  );
}

export function SheetHeader({ children }: { children: React.ReactNode }) {
  return <View style={styles.header}>{children}</View>;
}

export function SheetTitle({ children }: { children: React.ReactNode }) {
  return <Text style={styles.title}>{children}</Text>;
}

export function SheetDescription({ children }: { children: React.ReactNode }) {
  return <Text style={styles.description}>{children}</Text>;
}

const styles = StyleSheet.create({
  contentContainer: {
    flex: 1,
    padding: 24,
  },
  header: {
    marginBottom: 16,
  },
  title: {
    fontSize: 20,
    fontWeight: '600',
    color: '#1f2937',
    marginBottom: 8,
  },
  description: {
    fontSize: 14,
    color: '#6b7280',
  },
  fallbackOverlay: {
    position: 'absolute',
    left: 0,
    right: 0,
    top: 0,
    bottom: 0,
    justifyContent: 'flex-end',
  },
  fallbackSheet: {
    backgroundColor: '#fff',
    borderTopLeftRadius: 16,
    borderTopRightRadius: 16,
    maxHeight: '90%',
  },
});

/**
 * Installation required:
 * npm install @gorhom/bottom-sheet
 * npm install react-native-reanimated react-native-gesture-handler
 */
