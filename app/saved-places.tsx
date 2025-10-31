import { View, Text, TouchableOpacity, ScrollView } from 'react-native';
import { SafeAreaView } from 'react-native-safe-area-context';
import { FontAwesome } from '@expo/vector-icons';
import { useRouter } from 'expo-router';

export default function SavedPlacesScreen() {
  const router = useRouter();

  return (
    <SafeAreaView className="flex-1 bg-gray-100">
      <ScrollView className="p-4">
        <Text className="text-3xl font-bold mb-6">Saved Places</Text>

        <SavedPlace icon="home" title="Home" address="123 Main St, Gaborone" />
        <SavedPlace icon="briefcase" title="Work" address="456 Business Ave, Gaborone" />
        <SavedPlace icon="heart" title="Mom's House" address="789 Family Rd, Gaborone" />

        <TouchableOpacity
          className="bg-blue-500 w-full py-4 rounded-full mt-6"
          onPress={() => {
            /* TODO: Implement add new place functionality */
          }}
        >
          <Text className="text-white text-center text-lg font-bold">
            Add New Place
          </Text>
        </TouchableOpacity>
      </ScrollView>
    </SafeAreaView>
  );
}

const SavedPlace = ({ icon, title, address }) => (
  <View className="bg-white p-4 rounded-lg mb-4 flex-row items-center">
    <FontAwesome name={icon} size={24} color="gray" className="mr-4" />
    <View>
      <Text className="font-bold text-lg">{title}</Text>
      <Text className="text-gray-500">{address}</Text>
    </View>
    <View className="flex-1 items-end">
      <TouchableOpacity>
        <FontAwesome name="ellipsis-v" size={24} color="gray" />
      </TouchableOpacity>
    </View>
  </View>
);
