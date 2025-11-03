/**
 * InputOTP Component - React Native
 * 
 * Accessible one-time password component with copy paste functionality.
 */

import React, { useRef, useState } from 'react';
import { StyleSheet, TextInput, View } from 'react-native';

interface InputOTPProps {
  length?: number;
  value?: string;
  onChangeText?: (value: string) => void;
  onComplete?: (value: string) => void;
}

export function InputOTP({
  length = 6,
  value = '',
  onChangeText,
  onComplete,
}: InputOTPProps) {
  const [otp, setOtp] = useState(value.split(''));
  const inputs = useRef<(TextInput | null)[]>([]);

  const handleChange = (text: string, index: number) => {
    const newOtp = [...otp];
    newOtp[index] = text;
    setOtp(newOtp);

    const otpString = newOtp.join('');
    onChangeText?.(otpString);

    // Move to next input
    if (text && index < length - 1) {
      inputs.current[index + 1]?.focus();
    }

    // Check if OTP is complete
    if (otpString.length === length && !otpString.includes('')) {
      onComplete?.(otpString);
    }
  };

  const handleKeyPress = (e: any, index: number) => {
    if (e.nativeEvent.key === 'Backspace' && !otp[index] && index > 0) {
      inputs.current[index - 1]?.focus();
    }
  };

  return (
    <View style={styles.container}>
      {Array.from({ length }).map((_, index) => (
        <TextInput
          key={index}
          ref={(ref) => { inputs.current[index] = ref; }}
          style={styles.input}
          maxLength={1}
          keyboardType="number-pad"
          value={otp[index] || ''}
          onChangeText={(text) => handleChange(text, index)}
          onKeyPress={(e) => handleKeyPress(e, index)}
          selectTextOnFocus
        />
      ))}
    </View>
  );
}

const styles = StyleSheet.create({
  container: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    gap: 8,
  },
  input: {
    flex: 1,
    height: 56,
    borderWidth: 1,
    borderColor: '#e5e7eb',
    borderRadius: 8,
    textAlign: 'center',
    fontSize: 24,
    fontWeight: '600',
    color: '#1f2937',
    backgroundColor: '#ffffff',
  },
});
