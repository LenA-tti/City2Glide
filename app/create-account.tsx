import { View, Text, TextInput, TouchableOpacity } from 'react-native';
import { SafeAreaView } from 'react-native-safe-area-context';
import { useRouter } from 'expo-router';
import { Image } from 'expo-image';

export default function CreateAccountScreen() {
  const router = useRouter();

  return (
    <SafeAreaView className="flex-1 bg-white">
      <View className="flex-1 justify-center p-4">
        <Image
          source={require('@/assets/images/icon.png')}
          className="w-24 h-24 mx-auto mb-8"
          contentFit="contain"
        />
        <Text className="text-3xl font-bold text-center mb-8">Create Account</Text>
        <TextInput
          className="bg-gray-100 p-4 rounded-lg mb-4"
          placeholder="Full Name"
        />
        <TextInput
          className="bg-gray-100 p-4 rounded-lg mb-4"
          placeholder="Email"
          keyboardType="email-address"
          autoCapitalize="none"
        />
        <TextInput
          className="bg-gray-100 p-4 rounded-lg mb-4"
          placeholder="Phone Number"
          keyboardType="phone-pad"
        />
        <TextInput
          className="bg-gray-100 p-4 rounded-lg mb-4"
          placeholder="Password"
          secureTextEntry
        />
        <TouchableOpacity
          className="bg-blue-500 w-full py-4 rounded-full mb-4"
          onPress={() => router.push('/(tabs)')}
        >
          <Text className="text-white text-center text-lg font-bold">
            Create Account
          </Text>
        </TouchableOpacity>
        <TouchableOpacity onPress={() => router.push('/login')}>
          <Text className="text-center text-blue-500">
            Already have an account? Login
          </Text>
        </TouchableOpacity>
      </View>
    </SafeAreaView>
  );
}
