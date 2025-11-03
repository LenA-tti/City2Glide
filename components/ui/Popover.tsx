/**
 * Popover Component - React Native
 * 
 * Displays rich content in a portal, triggered by a button.
 * Uses react-native-popover-view
 */

import React from 'react';
import { StyleSheet, TouchableOpacity, View } from 'react-native';
// Try to load the native popover view if present. Fall back to SimplePopover when
// the package isn't installed (prevents bundling errors on projects that don't
// include the optional native dependency).
let ExternalPopover: any = null;
try {
  // eslint-disable-next-line @typescript-eslint/no-var-requires
  const mod = require('react-native-popover-view');
  ExternalPopover = mod?.default ?? mod;
} catch (e) {
  ExternalPopover = null;
}

interface PopoverProps {
  trigger: React.ReactElement;
  children: React.ReactNode;
  placement?: 'top' | 'bottom' | 'left' | 'right' | 'auto';
}

export function RNPopover({ trigger, children, placement = 'auto' }: PopoverProps) {
  if (ExternalPopover) {
    return (
      <ExternalPopover from={trigger} placement={placement} popoverStyle={styles.popover}>
        <View style={styles.content}>{children}</View>
      </ExternalPopover>
    );
  }

  // Fallback: use the SimplePopover implementation and manage visibility locally.
  const [visible, setVisible] = React.useState(false);

  const triggerWithToggle = React.isValidElement(trigger)
    ? React.cloneElement(trigger, { onPress: () => setVisible(true) } as any)
    : (
      <TouchableOpacity onPress={() => setVisible(true)}>{trigger}</TouchableOpacity>
    );

  return (
    <SimplePopover trigger={triggerWithToggle} visible={visible} onClose={() => setVisible(false)}>
      {children}
    </SimplePopover>
  );
}

export function PopoverContent({ children }: { children: React.ReactNode }) {
  return <View style={styles.popoverContent}>{children}</View>;
}

const styles = StyleSheet.create({
  popover: {
    borderRadius: 8,
    backgroundColor: '#ffffff',
  },
  content: {
    padding: 16,
    minWidth: 200,
  },
  popoverContent: {
    width: '100%',
  },
});

/**
 * Installation required:
 * npm install react-native-popover-view
 * 
 * Alternative implementation without library:
 */

export function SimplePopover({
  trigger,
  children,
  visible,
  onClose,
}: {
  trigger: React.ReactElement;
  children: React.ReactNode;
  visible: boolean;
  onClose: () => void;
}) {
  return (
    <View>
      {trigger}
      {visible && (
            <>
              <TouchableOpacity
                style={StyleSheet.absoluteFill}
                onPress={onClose}
                activeOpacity={1}
              />
              <View style={simpleStyles.simplePopover}>{children}</View>
            </>
          )}
    </View>
  );
}

const simpleStyles = StyleSheet.create({
  simplePopover: {
    position: 'absolute',
    top: 40,
    backgroundColor: '#ffffff',
    borderRadius: 8,
    padding: 16,
    shadowColor: '#000',
    shadowOffset: { width: 0, height: 2 },
    shadowOpacity: 0.25,
    shadowRadius: 3.84,
    elevation: 5,
  },
});
