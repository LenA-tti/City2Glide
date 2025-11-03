/**
 * DropdownMenu Component - React Native
 * 
 * Displays a menu to the user triggered by a button.
 */

import React, { useState } from 'react';
import {
  View,
  Text,
  TouchableOpacity,
  Modal,
  StyleSheet,
  Pressable,
} from 'react-native';

interface DropdownMenuProps {
  trigger: React.ReactElement;
  children: React.ReactNode;
}

export function DropdownMenu({ trigger, children }: DropdownMenuProps) {
  const [visible, setVisible] = useState(false);
  const [position, setPosition] = useState({ x: 0, y: 0 });
  const triggerRef = React.useRef<View>(null);

  const openMenu = () => {
    triggerRef.current?.measure((fx, fy, width, height, px, py) => {
      setPosition({ x: px, y: py + height });
      setVisible(true);
    });
  };

  return (
    <View>
      <TouchableOpacity
        ref={triggerRef}
        onPress={openMenu}
      >
        {trigger}
      </TouchableOpacity>

      <Modal
        visible={visible}
        transparent
        animationType="fade"
        onRequestClose={() => setVisible(false)}
      >
        <Pressable
          style={styles.backdrop}
          onPress={() => setVisible(false)}
        >
          <View
            style={[
              styles.menu,
              { top: position.y, left: position.x },
            ]}
          >
            {React.Children.map(children, (child) =>
              React.isValidElement(child)
                ? React.cloneElement(child, { onClose: () => setVisible(false) } as any)
                : child
            )}
          </View>
        </Pressable>
      </Modal>
    </View>
  );
}

interface DropdownMenuItemProps {
  children: React.ReactNode;
  onPress?: () => void;
  onClose?: () => void;
  destructive?: boolean;
}

export function DropdownMenuItem({
  children,
  onPress,
  onClose,
  destructive = false,
}: DropdownMenuItemProps) {
  const handlePress = () => {
    onPress?.();
    onClose?.();
  };

  return (
    <TouchableOpacity
      style={styles.menuItem}
      onPress={handlePress}
      activeOpacity={0.7}
    >
      <Text
        style={[styles.menuItemText, destructive && styles.destructiveText]}
      >
        {children}
      </Text>
    </TouchableOpacity>
  );
}

export function DropdownMenuSeparator() {
  return <View style={styles.separator} />;
}

export function DropdownMenuLabel({ children }: { children: React.ReactNode }) {
  return (
    <View style={styles.label}>
      <Text style={styles.labelText}>{children}</Text>
    </View>
  );
}

const styles = StyleSheet.create({
  backdrop: {
    flex: 1,
    backgroundColor: 'rgba(0, 0, 0, 0.3)',
  },
  menu: {
    position: 'absolute',
    backgroundColor: '#ffffff',
    borderRadius: 8,
    minWidth: 200,
    shadowColor: '#000',
    shadowOffset: { width: 0, height: 2 },
    shadowOpacity: 0.25,
    shadowRadius: 3.84,
    elevation: 5,
    paddingVertical: 8,
  },
  menuItem: {
    paddingVertical: 12,
    paddingHorizontal: 16,
  },
  menuItemText: {
    fontSize: 14,
    color: '#1f2937',
  },
  destructiveText: {
    color: '#ef4444',
  },
  separator: {
    height: 1,
    backgroundColor: '#e5e7eb',
    marginVertical: 8,
  },
  label: {
    paddingVertical: 8,
    paddingHorizontal: 16,
  },
  labelText: {
    fontSize: 12,
    fontWeight: '600',
    color: '#6b7280',
  },
});
