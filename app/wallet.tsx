import { View, Text, TouchableOpacity, ScrollView } from 'react-native';
import { SafeAreaView } from 'react-native-safe-area-context';
import { Image } from 'expo-image';
import { FontAwesome } from '@expo/vector-icons';

export default function WalletScreen() {
  return (
    <SafeAreaView className="flex-1 bg-gray-100">
      <ScrollView className="p-4">
        <Text className="text-3xl font-bold mb-6">Wallet</Text>

        {/* Wallet Balance */}
        <View className="bg-blue-500 p-6 rounded-lg mb-6 items-center">
          <Text className="text-white text-lg">SmartRide Wallet</Text>
          <Text className="text-white text-4xl font-bold">$150.00</Text>
          <View className="flex-row mt-4">
            <TouchableOpacity className="bg-white px-4 py-2 rounded-full mr-2">
              <Text className="text-blue-500 font-bold">Add Money</Text>
            </TouchableOpacity>
            <TouchableOpacity className="border border-white px-4 py-2 rounded-full ml-2">
              <Text className="text-white font-bold">Transfer</Text>
            </TouchableOpacity>
          </View>
        </View>

        {/* Payment Methods */}
        <View className="mb-6">
          <Text className="text-lg font-bold mb-4">Payment Methods</Text>
          <View className="bg-white p-4 rounded-lg">
            <PaymentMethod icon={require('@/assets/images/icon.png')} name="Orange Money" />
            <PaymentMethod icon={require('@/assets/images/icon.png')} name="Mascom MyZaka" />
            <PaymentMethod icon={require('@/assets/images/icon.png')} name="Visa **** 1234" />
          </View>
          <TouchableOpacity className="mt-4">
            <Text className="text-blue-500 text-center font-bold">Add Payment Method</Text>
          </TouchableOpacity>
        </View>

        {/* Recent Transactions */}
        <View>
          <Text className="text-lg font-bold mb-4">Recent Transactions</Text>
          <View className="bg-white p-4 rounded-lg">
            <TransactionItem type="Top-up" date="2024-07-28" amount="+$50.00" />
            <TransactionItem type="Ride Payment" date="2024-07-27" amount="-$15.00" />
            <TransactionItem type="Transfer" date="2024-07-26" amount="-$20.00" />
          </View>
        </View>
      </ScrollView>
    </SafeAreaView>
  );
}

const PaymentMethod = ({ icon, name }) => (
  <View className="flex-row items-center justify-between py-2">
    <View className="flex-row items-center">
      <Image source={icon} className="w-8 h-8 mr-4" />
      <Text className="font-bold">{name}</Text>
    </View>
    <FontAwesome name="chevron-right" size={16} color="gray" />
  </View>
);

const TransactionItem = ({ type, date, amount }) => (
  <View className="flex-row justify-between items-center py-2 border-b border-gray-200">
    <View>
      <Text className="font-bold">{type}</Text>
      <Text className="text-gray-500">{date}</Text>
    </View>
    <Text className={`font-bold ${amount.startsWith('+') ? 'text-green-500' : 'text-red-500'}`}>
      {amount}
    </Text>
  </View>
);
