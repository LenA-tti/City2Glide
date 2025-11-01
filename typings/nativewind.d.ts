import 'react-native';

declare module 'react-native' {
  interface ViewProps {
    className?: string;
  }
  interface TextProps {
    className?: string;
  }
  interface ImageProps {
    className?: string;
  }
  interface ScrollViewProps {
    className?: string;
  }
  interface TouchableOpacityProps {
    className?: string;
  }
  interface SwitchProps {
    className?: string;
  }
}

declare module 'react-native-safe-area-context' {
  interface NativeSafeAreaViewProps {
    className?: string;
  }
}

declare module 'expo-image' {
  import * as React from 'react';
    import { ImageProps as RNImageProps } from 'react-native';

  export interface ImageProps extends RNImageProps {
    className?: string;
  }

  export const Image: React.ComponentType<ImageProps>;
  export default Image;
}
