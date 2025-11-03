declare module 'react-native-vector-icons/MaterialCommunityIcons';
declare module 'react-native-vector-icons/Feather';
declare module 'react-native-vector-icons/FontAwesome';
declare module 'react-native-vector-icons/Ionicons';
declare module 'react-native-vector-icons/MaterialIcons';
declare module 'react-native-vector-icons/Entypo';

// Fallback for any other vector icon imports
declare module 'react-native-vector-icons/*';

export { };

declare module 'expo-linear-gradient' {
	import React from 'react';
	import { ViewProps } from 'react-native';
	export const LinearGradient: React.ComponentType<ViewProps & { colors?: string[] }>;
}
declare module '@react-native-community/blur' {
	import React from 'react';
	import { ViewProps } from 'react-native';
	export const BlurView: React.ComponentType<ViewProps & { blurType?: string; blurAmount?: number }>;
	export const VibrancyView: React.ComponentType<ViewProps>;
}
declare module 'expo-blur' {
	import React from 'react';
	import { ViewProps } from 'react-native';
	export const BlurView: React.ComponentType<ViewProps & { intensity?: number; tint?: 'light' | 'dark' | 'default' }>;
	export default { BlurView: BlurView };
}
declare module 'react-native-vector-icons/Feather';
declare module 'react-native-popover-view';
declare module '@gorhom/bottom-sheet';
declare module '@react-native-community/slider';
declare module 'react-native-walkthrough-tooltip';

// Allow JS imports from ui barrel without exact type declarations
declare module '@/components/ui';
