import { View, Text, TextInput, TouchableOpacity, ScrollView } from 'react-native';
import { SafeAreaView } from 'react-native-safe-area-context';
import { Image } from 'expo-image';
import { FontAwesome } from '@expo/vector-icons';

export default function HomeScreen() {
  return (
    <SafeAreaView className="flex-1 bg-gray-100">
      <ScrollView className="p-4">
        {/* Header */}
        <View className="flex-row items-center justify-between mb-6">
          <View>
            <Text className="text-2xl font-bold">Hello, Jules!</Text>
            <Text className="text-gray-500">Welcome back</Text>
          </View>
          <Image
            source={{ uri: 'https://i.pravatar.cc/150?u=a042581f4e29026704d' }}
            className="w-12 h-12 rounded-full"
          />
        </View>

        {/* Search Bar */}
        <View className="bg-white p-4 rounded-lg mb-6 flex-row items-center">
          <FontAwesome name="search" size={20} color="gray" />
          <TextInput
            className="ml-4 flex-1"
            placeholder="Where to?"
          />
        </View>

        {/* Quick Access */}
        <View className="flex-row justify-between mb-6">
          <TouchableOpacity className="bg-blue-500 p-4 rounded-lg flex-1 mr-2 items-center">
            <FontAwesome name="car" size={24} color="white" />
            <Text className="text-white font-bold mt-2">Find a Ride</Text>
          </TouchableOpacity>
          <TouchableOpacity className="bg-white p-4 rounded-lg flex-1 ml-2 items-center">
            <FontAwesome name="star" size={24} color="black" />
            <Text className="font-bold mt-2">Saved Places</Text>
          </TouchableOpacity>
        </View>

        {/* Activity Summary */}
        <View className="bg-white p-4 rounded-lg mb-6">
          <Text className="text-lg font-bold mb-4">Your Activity</Text>
          <View className="flex-row justify-between">
            <View className="items-center">
              <Text className="text-2xl font-bold">125</Text>
              <Text className="text-gray-500">Trips</Text>
            </View>
            <View className="items-center">
              <Text className="text-2xl font-bold">4.9</Text>
              <Text className="text-gray-500">Rating</Text>
            </View>
            <View className="items-center">
              <Text className="text-2xl font-bold">$1,200</Text>
              <Text className="text-gray-500">Spent</Text>
            </View>
          </View>
        </View>

        {/* Recent Trips */}
        <View className="mb-6">
          <Text className="text-lg font-bold mb-4">Recent Trips</Text>
          <View className="bg-white p-4 rounded-lg">
            <View className="flex-row justify-between items-center mb-4">
              <View>
                <Text className="font-bold">Gaborone to Francistown</Text>
                <Text className="text-gray-500">Completed</Text>
              </View>
              <Text className="font-bold">$50.00</Text>
            </View>
            <View className="flex-row justify-between items-center">
              <View>
                <Text className="font-bold">Airport to Home</Text>
                <Text className="text-gray-500">Completed</Text>
              </View>
              <Text className="font-bold">$15.00</Text>
            </View>
          </View>
        </View>

        {/* Payment Methods */}
        <View>
          <Text className="text-lg font-bold mb-4">Payment Methods</Text>
          <View className="bg-white p-4 rounded-lg">
            <View className="flex-row items-center mb-4">
              <Image source={require('@/assets/images/icon.png')} className="w-8 h-8 mr-4" />
              <Text className="font-bold">Orange Money</Text>
            </View>
            <View className="flex-row items-center">
              <Image source={require('@/assets/images/icon.png')} className="w-8 h-8 mr-4" />
              <Text className="font-bold">Visa **** 1234</Text>
            </View>
          </View>
        </View>
      </ScrollView>
    </SafeAreaView>
  );
}
