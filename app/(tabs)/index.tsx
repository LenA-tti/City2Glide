// app/index.tsx
// Load optional BlurView at runtime to avoid Metro resolving native-only modules
// during web bundling or when the native module isn't installed.
let BlurView: any = null;
// Prefer Expo's blur on managed projects, then fall back to the community package.
try {
  // eslint-disable-next-line @typescript-eslint/no-var-requires
  const expoBlur = require('expo-blur');
  BlurView = expoBlur?.BlurView ?? expoBlur?.default?.BlurView ?? expoBlur;
} catch (e) {
  try {
    // eslint-disable-next-line @typescript-eslint/no-var-requires
    BlurView = require('@react-native-community/blur').BlurView;
  } catch (err) {
    // Fallback: simple View passthrough with same props (no blur effect)
    // We import View lazily to avoid top-level cycles.
    // eslint-disable-next-line @typescript-eslint/no-var-requires
    const { View: _View } = require('react-native');
    BlurView = (props: any) => {
      const { children, style } = props;
      return _View ? <_View style={style}>{children}</_View> : null;
    };
  }
}
import { useRouter } from 'expo-router';
import React, { useEffect } from 'react';
import {
  Dimensions,
  ScrollView,
  StyleSheet,
  Text,
  TouchableOpacity,
  View,
} from 'react-native';
import Animated, {
  useAnimatedStyle,
  useSharedValue,
  withDelay,
  withSpring,
  withTiming
} from 'react-native-reanimated';
import Icon from 'react-native-vector-icons/MaterialCommunityIcons';

// Load linear gradient at runtime to avoid bundler/ts errors when package is
// not installed or native module isn't linked. Prefer expo-linear-gradient,
// fall back to react-native-linear-gradient, then to a simple View.
let LinearGradient: any = null;
try {
  // eslint-disable-next-line @typescript-eslint/no-var-requires
  LinearGradient = require('expo-linear-gradient').LinearGradient;
} catch (e) {
  try {
    // eslint-disable-next-line @typescript-eslint/no-var-requires
    const mod = require('react-native-linear-gradient');
    LinearGradient = mod?.default ?? mod;
  } catch (err) {
    LinearGradient = null;
  }
}

if (!LinearGradient) {
  // Fallback component that just renders a View with the provided style.
  LinearGradient = (props: any) => {
    const { children, style } = props;
    return <View style={style}>{children}</View>;
  };
}

const { width } = Dimensions.get('window');

interface LandingProps {
  onLogin: () => void;
  onRegister: () => void;
}

export default function Landing({ onLogin, onRegister }: LandingProps) {
  const router = useRouter();

  // Animation values
  const scale = useSharedValue(0);
  const rotate = useSharedValue(-180);

  useEffect(() => {
    scale.value = withSpring(1, { stiffness: 200, damping: 15 });
    rotate.value = withSpring(0);
  }, []);

  const animatedLogoStyle = useAnimatedStyle(() => ({
    transform: [
      { scale: scale.value },
      { rotate: `${rotate.value}deg` },
    ],
  }));

  return (
    <LinearGradient
      colors={['#2563eb', '#9333ea', '#4f46e5']}
      style={styles.container}
    >
      {/* Background Orbs */}
      <View style={styles.backgroundContainer}>
        <Animated.View style={[styles.orb1]} />
        <Animated.View style={[styles.orb2]} />
        <Animated.View style={[styles.orb3]} />
      </View>

      <ScrollView contentContainerStyle={styles.content}>
        {/* Logo */}
        <Animated.View style={[styles.logoBox, animatedLogoStyle]}>
          <Icon name="bus" size={56} color="#2563eb" />
          <View style={styles.sparkle}>
            <Icon name="star" size={24} color="#facc15" />
          </View>
        </Animated.View>

        {/* Title */}
        <Text style={styles.title}>SmartRide</Text>
        <View style={styles.titleUnderline} />
        <Text style={styles.subtitle}>
          Transforming transport in Botswana. Safe, reliable, and data-driven
          mobility for everyone.
        </Text>

        {/* Features */}
        <FeatureItem
          icon="flash"
          title="Real-time Tracking"
          description="See your ride in real-time"
          delay={0.8}
        />
        <FeatureItem
          icon="shield-check"
          title="Safe & Secure"
          description="Verified drivers and vehicles"
          delay={1.0}
        />
        <FeatureItem
          icon="credit-card-outline"
          title="Digital Payments"
          description="Cashless, contactless rides"
          delay={1.2}
        />

        {/* Action Buttons */}
        <View style={styles.buttons}>
          <TouchableOpacity
            onPress={() => (onRegister ? onRegister() : router.push('/auth/RegisterScreen'))}
            style={styles.primaryButton}
            activeOpacity={0.8}
          >
            <LinearGradient
              colors={['#ffffff', '#ffffff']}
              style={styles.buttonGradient}
            >
              <Text style={styles.buttonText}>Get Started</Text>
              <Icon name="star" size={16} color="#2563eb" />
            </LinearGradient>
          </TouchableOpacity>

          <TouchableOpacity
            onPress={() => (onLogin ? onLogin() : router.push('/auth/LoginScreen'))}
            style={styles.secondaryButton}
            activeOpacity={0.8}
          >
            <Text style={styles.secondaryButtonText}>Login</Text>
          </TouchableOpacity>
        </View>
      </ScrollView>
    </LinearGradient>
  );
}

interface FeatureProps {
  icon: string;
  title: string;
  description: string;
  delay: number;
}

function FeatureItem({ icon, title, description, delay }: FeatureProps) {
  const opacity = useSharedValue(0);
  const translateX = useSharedValue(-50);

  useEffect(() => {
    opacity.value = withDelay(delay * 1000, withTiming(1));
    translateX.value = withDelay(
      delay * 1000,
      withSpring(0, { stiffness: 100 })
    );
  }, []);

  const animatedStyle = useAnimatedStyle(() => ({
    opacity: opacity.value,
    transform: [{ translateX: translateX.value }],
  }));

  return (
    <Animated.View style={[styles.featureCard, animatedStyle]}>
      <BlurView blurType="light" blurAmount={10} style={styles.blurContainer}>
        <View style={styles.iconContainer}>
          <Icon name={icon} size={24} color="#fff" />
        </View>
        <View style={{ flex: 1 }}>
          <Text style={styles.featureTitle}>{title}</Text>
          <Text style={styles.featureDescription}>{description}</Text>
        </View>
      </BlurView>
    </Animated.View>
  );
}

const styles = StyleSheet.create({
  container: { flex: 1, overflow: 'hidden' },
  backgroundContainer: { position: 'absolute', top: 0, left: 0, right: 0, bottom: 0 },
  orb1: {
    position: 'absolute',
    top: -160,
    left: -160,
    width: 320,
    height: 320,
    backgroundColor: 'rgba(255,255,255,0.1)',
    borderRadius: 160,
  },
  orb2: {
    position: 'absolute',
    bottom: -160,
    right: -160,
    width: 384,
    height: 384,
    backgroundColor: 'rgba(255,192,203,0.2)',
    borderRadius: 192,
  },
  orb3: {
    position: 'absolute',
    top: '50%',
    left: '50%',
    width: 256,
    height: 256,
    backgroundColor: 'rgba(255,255,0,0.1)',
    borderRadius: 128,
  },
  content: {
    flexGrow: 1,
    alignItems: 'center',
    justifyContent: 'center',
    paddingHorizontal: 24,
    paddingVertical: 48,
  },
  logoBox: {
    width: 112,
    height: 112,
    borderRadius: 24,
    backgroundColor: '#fff',
    alignItems: 'center',
    justifyContent: 'center',
    marginBottom: 32,
    shadowColor: '#000',
    shadowOffset: { width: 0, height: 20 },
    shadowOpacity: 0.3,
    shadowRadius: 50,
    elevation: 25,
  },
  sparkle: { position: 'absolute', top: -8, right: -8 },
  title: {
    fontSize: 36,
    fontWeight: 'bold',
    color: '#fff',
    textAlign: 'center',
  },
  titleUnderline: {
    height: 4,
    width: 96,
    backgroundColor: 'rgba(255,255,255,0.6)',
    borderRadius: 2,
    marginVertical: 8,
    alignSelf: 'center',
  },
  subtitle: {
    textAlign: 'center',
    color: 'rgba(255,255,255,0.9)',
    maxWidth: 380,
    marginBottom: 48,
  },
  featureCard: {
    flexDirection: 'row',
    alignItems: 'flex-start',
    gap: 12,
    marginBottom: 16,
  },
  blurContainer: {
    flexDirection: 'row',
    alignItems: 'center',
    backgroundColor: 'rgba(255,255,255,0.1)',
    padding: 20,
    borderRadius: 16,
    borderWidth: 1,
    borderColor: 'rgba(255,255,255,0.2)',
    flex: 1,
  },
  iconContainer: {
    width: 48,
    height: 48,
    borderRadius: 12,
    backgroundColor: 'rgba(255,255,255,0.1)',
    alignItems: 'center',
    justifyContent: 'center',
    marginRight: 12,
  },
  featureTitle: { color: '#fff', fontSize: 16, fontWeight: 'bold', marginBottom: 4 },
  featureDescription: { color: 'rgba(255,255,255,0.7)' },
  buttons: { width: '100%', maxWidth: 400, marginTop: 24, gap: 12 },
  primaryButton: {
    height: 56,
    borderRadius: 16,
    overflow: 'hidden',
  },
  buttonGradient: {
    flex: 1,
    alignItems: 'center',
    justifyContent: 'center',
    flexDirection: 'row',
    gap: 8,
  },
  buttonText: { color: '#2563eb', fontWeight: 'bold', fontSize: 16 },
  secondaryButton: {
    height: 56,
    borderRadius: 16,
    backgroundColor: 'rgba(255,255,255,0.1)',
    borderWidth: 1,
    borderColor: 'rgba(255,255,255,0.3)',
    alignItems: 'center',
    justifyContent: 'center',
  },
  secondaryButtonText: { color: '#fff', fontWeight: 'bold', fontSize: 16 },
});
