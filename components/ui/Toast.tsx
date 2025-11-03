/**
 * Toast Component - React Native
 * 
 * A succinct message that is displayed temporarily.
 * Uses react-native-toast-message
 */

import React from 'react';
import Toast from 'react-native-toast-message';

export interface ToastOptions {
  type?: 'success' | 'error' | 'info';
  text1?: string;
  text2?: string;
  position?: 'top' | 'bottom';
  visibilityTime?: number;
}

export const toast = {
  success: (message: string, description?: string) => {
    Toast.show({
      type: 'success',
      text1: message,
      text2: description,
      position: 'top',
    });
  },
  
  error: (message: string, description?: string) => {
    Toast.show({
      type: 'error',
      text1: message,
      text2: description,
      position: 'top',
    });
  },
  
  info: (message: string, description?: string) => {
    Toast.show({
      type: 'info',
      text1: message,
      text2: description,
      position: 'top',
    });
  },
  
  show: (options: ToastOptions) => {
    Toast.show(options);
  },
};

// Export the Toast component to be rendered at the root
export { Toast };

/**
 * Usage:
 * 
 * 1. Add <Toast /> to your root component (App.tsx):
 *    import { Toast } from './components/ui-rn/Toast';
 *    
 *    export default function App() {
 *      return (
 *        <>
 *          <YourApp />
 *          <Toast />
 *        </>
 *      );
 *    }
 * 
 * 2. Use toast functions anywhere:
 *    import { toast } from './components/ui-rn/Toast';
 *    
 *    toast.success('Success!', 'Your action was completed');
 *    toast.error('Error!', 'Something went wrong');
 *    toast.info('Info', 'Just so you know...');
 * 
 * Installation required:
 * npm install react-native-toast-message
 */
