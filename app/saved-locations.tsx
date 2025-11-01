import { View, Text, ScrollView, TouchableOpacity, Modal, TextInput } from 'react-native';
import { SafeAreaView } from 'react-native-safe-area-context';
import { styled } from 'nativewind';
import { useTheme } from '@/contexts/theme-context';
import { ArrowLeft, Plus, MapPin, Home, Briefcase, Trash, X } from 'lucide-react-native';
import { useRouter } from 'expo-router';
import { useState } from 'react';

const StyledView = styled(View);
const StyledText = styled(Text);
const StyledTouchableOpacity = styled(TouchableOpacity);
const StyledTextInput = styled(TextInput);

export default function SavedLocationsScreen() {
  const { colors, isDarkMode } = useTheme();
  const router = useRouter();
  const [locations, setLocations] = useState([]);
  const [modalVisible, setModalVisible] = useState(false);

  return (
    <StyledView style={{ backgroundColor: colors.background }} className="flex-1">
      <SafeAreaView>
        <StyledView className="flex-row items-center justify-between px-6 pt-4">
          <StyledTouchableOpacity onPress={() => router.back()}>
            <ArrowLeft color={isDarkMode ? 'white' : 'black'} />
          </StyledTouchableOpacity>
          <StyledText className="font-bold text-xl dark:text-white">Saved Locations</StyledText>
          <StyledTouchableOpacity onPress={() => setModalVisible(true)}>
            <Plus color={isDarkMode ? 'white' : 'black'} />
          </StyledTouchableOpacity>
        </StyledView>
      </SafeAreaView>

      <StyledView className="p-4 bg-gray-100 dark:bg-primary-dark/50 mt-4">
        <StyledText className="text-center text-gray-500">
          Save your frequently visited places for quick access
        </StyledText>
      </StyledView>

      <ScrollView className="px-6 pt-4">
        {locations.length === 0 ? (
          <EmptyState onAdd={() => setModalVisible(true)} />
        ) : (
          locations.map((loc, index) => <LocationCard key={index} {...loc} />)
        )}
      </ScrollView>

      <AddEditLocationModal visible={modalVisible} onClose={() => setModalVisible(false)} />
    </StyledView>
  );
}

const EmptyState = ({ onAdd }) => (
  <StyledView className="items-center justify-center mt-24">
    <MapPin size={48} color="gray" />
    <StyledText className="text-gray-500 mt-4">No saved locations yet</StyledText>
    <StyledTouchableOpacity onPress={onAdd} className="mt-4 bg-primary-red py-3 px-6 rounded-full">
      <StyledText className="text-white font-bold">Add Your First Location</StyledText>
    </StyledTouchableOpacity>
  </StyledView>
);

const LocationCard = ({ icon, label, address }) => {
  const Icon = { home: Home, work: Briefcase, other: MapPin }[icon];
  return (
    <StyledView className="flex-row items-center p-4 rounded-xl mb-4 dark:bg-primary-dark border border-gray-200 dark:border-white/20">
      <StyledView className="w-10 h-10 items-center justify-center rounded-lg bg-gray-100 dark:bg-white/10">
        <Icon color="gray" />
      </StyledView>
      <StyledView className="ml-4 flex-1">
        <StyledText className="font-bold dark:text-white">{label}</StyledText>
        <StyledText className="text-gray-500">{address}</StyledText>
      </StyledView>
      <StyledTouchableOpacity>
        <Trash size={20} color="red" />
      </StyledTouchableOpacity>
    </StyledView>
  );
};

const AddEditLocationModal = ({ visible, onClose }) => {
  const { colors } = useTheme();
  return (
    <Modal visible={visible} transparent animationType="fade">
      <StyledView className="flex-1 justify-center items-center bg-black/60 p-6">
        <StyledView className="w-full p-6 rounded-2xl" style={{ backgroundColor: colors.background }}>
          <StyledView className="flex-row justify-between items-center">
            <StyledText className="font-bold text-xl dark:text-white">Add Location</StyledText>
            <StyledTouchableOpacity onPress={onClose}><X color="gray" /></StyledTouchableOpacity>
          </StyledView>
          <StyledTextInput placeholder="Label (e.g., Home)" placeholderTextColor="gray" className="mt-6 p-3 rounded-lg bg-gray-100 dark:bg-white/10 dark:text-white" />
          <StyledTextInput placeholder="Enter the full address" placeholderTextColor="gray" className="mt-4 p-3 rounded-lg bg-gray-100 dark:bg-white/10 dark:text-white" />
          {/* Icon Selector */}
          <StyledView className="flex-row justify-end mt-6">
            <StyledTouchableOpacity onPress={onClose} className="py-3 px-6 rounded-full border border-gray-300 dark:border-white/30">
              <StyledText className="font-bold dark:text-white">Cancel</StyledText>
            </StyledTouchableOpacity>
            <StyledTouchableOpacity className="py-3 px-6 rounded-full bg-primary-red ml-4">
              <StyledText className="font-bold text-white">Add</StyledText>
            </StyledTouchableOpacity>
          </StyledView>
        </StyledView>
      </StyledView>
    </Modal>
  );
};
