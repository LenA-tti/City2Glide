/**
 * Accordion Component - React Native
 * 
 * A vertically stacked set of interactive headings that each reveal a section of content.
 */

import React, { useState } from 'react';
import {
  View,
  Text,
  TouchableOpacity,
  StyleSheet,
  LayoutAnimation,
  Platform,
  UIManager,
} from 'react-native';

// Enable LayoutAnimation on Android
if (Platform.OS === 'android' && UIManager.setLayoutAnimationEnabledExperimental) {
  UIManager.setLayoutAnimationEnabledExperimental(true);
}

interface AccordionItemProps {
  title: string;
  children: React.ReactNode;
  isExpanded?: boolean;
  onToggle?: () => void;
}

export function AccordionItem({ title, children, isExpanded, onToggle }: AccordionItemProps) {
  const handleToggle = () => {
    LayoutAnimation.configureNext(LayoutAnimation.Presets.easeInEaseOut);
    onToggle?.();
  };

  return (
    <View style={styles.item}>
      <TouchableOpacity
        style={styles.header}
        onPress={handleToggle}
        activeOpacity={0.7}
      >
        <Text style={styles.title}>{title}</Text>
        <Text style={styles.chevron}>{isExpanded ? '▲' : '▼'}</Text>
      </TouchableOpacity>
      {isExpanded && (
        <View style={styles.content}>
          {children}
        </View>
      )}
    </View>
  );
}

interface AccordionProps {
  children: React.ReactElement<AccordionItemProps>[];
  type?: 'single' | 'multiple';
}

export function Accordion({ children, type = 'single' }: AccordionProps) {
  const [expandedItems, setExpandedItems] = useState<number[]>([]);

  const handleToggle = (index: number) => {
    if (type === 'single') {
      setExpandedItems(expandedItems.includes(index) ? [] : [index]);
    } else {
      setExpandedItems(
        expandedItems.includes(index)
          ? expandedItems.filter((i) => i !== index)
          : [...expandedItems, index]
      );
    }
  };

  return (
    <View style={styles.container}>
      {React.Children.map(children, (child, index) =>
        React.cloneElement(child, {
          isExpanded: expandedItems.includes(index),
          onToggle: () => handleToggle(index),
        })
      )}
    </View>
  );
}

const styles = StyleSheet.create({
  container: {
    borderRadius: 8,
    borderWidth: 1,
    borderColor: '#e5e7eb',
    overflow: 'hidden',
  },
  item: {
    borderBottomWidth: 1,
    borderBottomColor: '#e5e7eb',
  },
  header: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    alignItems: 'center',
    padding: 16,
    backgroundColor: '#ffffff',
  },
  title: {
    fontSize: 16,
    fontWeight: '500',
    color: '#1f2937',
  },
  chevron: {
    fontSize: 12,
    color: '#6b7280',
  },
  content: {
    padding: 16,
    paddingTop: 0,
    backgroundColor: '#ffffff',
  },
});
