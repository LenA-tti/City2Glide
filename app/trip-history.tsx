import { View, Text, TouchableOpacity, ScrollView } from 'react-native';
import { SafeAreaView } from 'react-native-safe-area-context';
import { FontAwesome } from '@expo/vector-icons';

export default function TripHistoryScreen() {
  return (
    <SafeAreaView className="flex-1 bg-gray-100">
      <ScrollView className="p-4">
        {/* Header */}
        <Text className="text-3xl font-bold mb-6">Trip History</Text>

        {/* Summary */}
        <View className="bg-white p-4 rounded-lg mb-6 flex-row justify-between">
          <View className="items-center">
            <Text className="text-2xl font-bold">125</Text>
            <Text className="text-gray-500">Total Trips</Text>
          </View>
          <View className="items-center">
            <Text className="text-2xl font-bold">12</Text>
            <Text className="text-gray-500">This Month</Text>
          </View>
          <View className="items-center">
            <Text className="text-2xl font-bold">$1,200</Text>
            <Text className="text-gray-500">Total Spent</Text>
          </View>
        </View>

        {/* Filters */}
        <View className="flex-row mb-6">
          <TouchableOpacity className="bg-blue-500 px-4 py-2 rounded-full mr-2">
            <Text className="text-white font-bold">All</Text>
          </TouchableOpacity>
          <TouchableOpacity className="bg-white px-4 py-2 rounded-full mr-2">
            <Text className="font-bold">Completed</Text>
          </TouchableOpacity>
          <TouchableOpacity className="bg-white px-4 py-2 rounded-full">
            <Text className="font-bold">Cancelled</Text>
          </TouchableOpacity>
        </View>

        {/* Trip List */}
        <View className="bg-white p-4 rounded-lg">
          <TripItem
            from="Gaborone"
            to="Francistown"
            status="Completed"
            date="2024-07-28"
            price="$50.00"
            rating={5}
          />
          <TripItem
            from="Airport"
            to="Home"
            status="Completed"
            date="2024-07-27"
            price="$15.00"
            rating={4}
          />
          <TripItem
            from="Work"
            to="Gym"
            status="Cancelled"
            date="2024-07-26"
            price="$10.00"
            rating={null}
          />
        </View>
      </ScrollView>
    </SafeAreaView>
  );
}

const TripItem = ({ from, to, status, date, price, rating }) => (
  <View className="border-b border-gray-200 pb-4 mb-4">
    <View className="flex-row justify-between items-center">
      <View>
        <Text className="font-bold text-lg">{from} to {to}</Text>
        <Text className="text-gray-500">{status} - {date}</Text>
      </View>
      <Text className="font-bold text-lg">{price}</Text>
    </View>
    {rating && (
      <View className="flex-row items-center mt-2">
        {[...Array(rating)].map((_, i) => (
          <FontAwesome key={i} name="star" size={16} color="gold" />
        ))}
      </View>
    )}
  </View>
);
