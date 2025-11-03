/**
 * Tooltip Component - React Native
 * 
 * A popup that displays information related to an element when the element receives focus.
 * Uses react-native-walkthrough-tooltip
 */

import React, { useState } from 'react';
import { TouchableOpacity } from 'react-native';
import Tooltip from 'react-native-walkthrough-tooltip';

interface TooltipProps {
  content: React.ReactNode;
  children: React.ReactNode;
  placement?: 'top' | 'bottom' | 'left' | 'right' | 'center';
}

export function RNTooltip({ content, children, placement = 'top' }: TooltipProps) {
  const [visible, setVisible] = useState(false);

  return (
    <Tooltip
      isVisible={visible}
      content={<>{content}</>}
      placement={placement}
      onClose={() => setVisible(false)}
      contentStyle={{
        backgroundColor: '#1f2937',
        borderRadius: 8,
        padding: 8,
      }}
    >
      <TouchableOpacity
        onPress={() => setVisible(true)}
        onLongPress={() => setVisible(true)}
      >
        {children}
      </TouchableOpacity>
    </Tooltip>
  );
}

/**
 * Installation required:
 * npm install react-native-walkthrough-tooltip
 * 
 * Alternative: Use react-native-tooltip or implement custom tooltip
 */
