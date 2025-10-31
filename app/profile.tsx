import { View, Text, TouchableOpacity, ScrollView, Switch } from 'react-native';
import { SafeAreaView } from 'react-native-safe-area-context';
import { Image } from 'expo-image';
import { FontAwesome } from '@expo/vector-icons';
import { useState } from 'react';

export default function ProfileScreen() {
  const [tripUpdates, setTripUpdates] = useState(true);
  const [promotions, setPromotions] = useState(false);
  const [news, setNews] = useState(true);

  return (
    <SafeAreaView className="flex-1 bg-gray-100">
      <ScrollView className="p-4">
        <Text className="text-3xl font-bold mb-6">Profile</Text>

        {/* User Info */}
        <View className="bg-white p-4 rounded-lg mb-6 flex-row items-center">
          <Image
            source={{ uri: 'https://i.pravatar.cc/150?u=a042581f4e29026704d' }}
            className="w-20 h-20 rounded-full mr-4"
          />
          <View>
            <Text className="text-2xl font-bold">Jules</Text>
            <Text className="text-gray-500">jules@example.com</Text>
          </View>
          <View className="flex-1 items-end">
            <TouchableOpacity>
              <Text className="text-blue-500 font-bold">Edit</Text>
            </TouchableOpacity>
          </View>
        </View>

        {/* Notifications */}
        <View className="bg-white p-4 rounded-lg mb-6">
          <Text className="text-lg font-bold mb-4">Notifications</Text>
          <NotificationToggle
            label="Trip Updates"
            value={tripUpdates}
            onValueChange={setTripUpdates}
          />
          <NotificationToggle
            label="Promotions"
            value={promotions}
            onValueChange={setPromotions}
          />
          <NotificationToggle
            label="News & Updates"
            value={news}
            onValueChange={setNews}
          />
        </View>

        {/* Other Settings */}
        <View className="bg-white p-4 rounded-lg">
          <SettingsItem icon="shield" label="Privacy & Security" />
          <SettingsItem icon="question-circle" label="Help & Support" />
          <SettingsItem icon="info-circle" label="Terms & Conditions" />
        </View>
      </ScrollView>
    </SafeAreaView>
  );
}

const NotificationToggle = ({ label, value, onValueChange }) => (
  <View className="flex-row justify-between items-center py-2">
    <Text className="text-lg">{label}</Text>
    <Switch value={value} onValueChange={onValueChange} />
  </View>
);

const SettingsItem = ({ icon, label }) => (
  <TouchableOpacity className="flex-row items-center justify-between py-3 border-b border-gray-200">
    <View className="flex-row items-center">
      <FontAwesome name={icon} size={20} color="gray" className="mr-4" />
      <Text className="text-lg">{label}</Text>
    </View>
    <FontAwesome name="chevron-right" size={16} color="gray" />
  </TouchableOpacity>
);
