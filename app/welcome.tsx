import { View, Text, TouchableOpacity } from 'react-native';
import { SafeAreaView } from 'react-native-safe-area-context';
import { useRouter } from 'expo-router';
import { Image } from 'expo-image';

export default function WelcomeScreen() {
  const router = useRouter();

  return (
    <SafeAreaView className="flex-1 bg-white">
      <View className="flex-1 items-center justify-center p-4">
        <Image
          source={require('@/assets/images/icon.png')}
          className="w-32 h-32 mb-8"
          contentFit="contain"
        />
        <Text className="text-4xl font-bold text-center mb-4">
          Welcome to CityGlide
        </Text>
        <Text className="text-lg text-gray-600 text-center mb-12">
          Your partner in navigating the city with ease.
        </Text>
        <TouchableOpacity
          className="bg-blue-500 w-full py-4 rounded-full mb-4"
          onPress={() => router.push('/login')}
        >
          <Text className="text-white text-center text-lg font-bold">
            Get Started
          </Text>
        </TouchableOpacity>
      </View>
    </SafeAreaView>
  );
}
