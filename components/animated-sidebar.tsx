import { View, Text, TouchableOpacity } from 'react-native';
import { Image } from 'expo-image';
import { FontAwesome } from '@expo/vector-icons';
import { useRouter } from 'expo-router';
import Animated, { useAnimatedStyle, useSharedValue, withTiming } from 'react-native-reanimated';
import { useEffect } from 'react';

export default function AnimatedSidebar({ isOpen, onClose }) {
  const router = useRouter();
  const translateX = useSharedValue(-300);

  useEffect(() => {
    translateX.value = withTiming(isOpen ? 0 : -300);
  }, [isOpen]);

  const animatedStyle = useAnimatedStyle(() => {
    return {
      transform: [{ translateX: translateX.value }],
    };
  });

  const handleNavigation = (path) => {
    onClose();
    router.push(path);
  };

  return (
    <Animated.View
      style={[
        animatedStyle,
        {
          position: 'absolute',
          top: 0,
          bottom: 0,
          left: 0,
          width: 300,
          backgroundColor: 'white',
          zIndex: 100,
          padding: 20,
        },
      ]}
    >
      <View className="items-center mb-8">
        <Image
          source={{ uri: 'https://i.pravatar.cc/150?u=a042581f4e29026704d' }}
          className="w-24 h-24 rounded-full mb-4"
        />
        <Text className="text-2xl font-bold">Jules</Text>
        <Text className="text-gray-500">jules@example.com</Text>
      </View>
      <NavItem icon="home" label="Home" onPress={() => handleNavigation('/(tabs)')} />
      <NavItem icon="history" label="Trip History" onPress={() => handleNavigation('/trip-history')} />
      <NavItem icon="star" label="Saved Places" onPress={() => handleNavigation('/saved-places')} />
      <NavItem icon="wallet" label="Wallet" onPress={() => handleNavigation('/wallet')} />
      <NavItem icon="user" label="Profile" onPress={() => handleNavigation('/profile')} />
      <View className="flex-1" />
      <NavItem icon="sign-out" label="Logout" onPress={() => router.push('/login')} />
    </Animated.View>
  );
}

const NavItem = ({ icon, label, onPress }) => (
  <TouchableOpacity
    className="flex-row items-center p-4 mb-2 rounded-lg hover:bg-gray-100"
    onPress={onPress}
  >
    <FontAwesome name={icon} size={20} color="gray" className="mr-4" />
    <Text className="text-lg">{label}</Text>
  </TouchableOpacity>
);
