import { View, Text, ScrollView, TouchableOpacity, Modal } from 'react-native';
import { SafeAreaView } from 'react-native-safe-area-context';
import { styled } from 'nativewind';
import { useTheme } from '@/contexts/theme-context';
import { ArrowLeft, Calendar, Clock, Star, X } from 'lucide-react-native';
import { useRouter } from 'expo-router';
import { useState } from 'react';

const StyledView = styled(View);
const StyledText = styled(Text);
const StyledTouchableOpacity = styled(TouchableOpacity);

export default function TripHistoryScreen() {
  const { colors, isDarkMode } = useTheme();
  const router = useRouter();
  const [activeTab, setActiveTab] = useState('All');
  const [modalVisible, setModalVisible] = useState(false);

  return (
    <StyledView style={{ backgroundColor: colors.background }} className="flex-1">
      <SafeAreaView>
        <StyledView className="flex-row items-center justify-between px-6 pt-4">
          <StyledTouchableOpacity onPress={() => router.back()}>
            <ArrowLeft color={isDarkMode ? 'white' : 'black'} />
          </StyledTouchableOpacity>
          <StyledText className="font-bold text-xl dark:text-white">Trip History</StyledText>
          <StyledView className="w-6" />
        </StyledView>
      </SafeAreaView>

      <StatsSection />

      <StyledView className="flex-row mt-4">
        <TabButton title="All" active={activeTab === 'All'} onPress={() => setActiveTab('All')} />
        <TabButton title="Completed" active={activeTab === 'Completed'} onPress={() => setActiveTab('Completed')} />
        <TabButton title="Cancelled" active={activeTab === 'Cancelled'} onPress={() => setActiveTab('Cancelled')} />
      </StyledView>

      <ScrollView className="px-6 pt-4">
        <TripCard status="completed" onPress={() => setModalVisible(true)} />
        <TripCard status="cancelled" onPress={() => setModalVisible(true)} />
      </ScrollView>

      <TripDetailModal visible={modalVisible} onClose={() => setModalVisible(false)} />
    </StyledView>
  );
}

const StatsSection = () => (
  <StyledView className="px-6 py-4 mt-4 bg-gray-100 dark:bg-primary-dark/50 flex-row justify-between border-y border-gray-200 dark:border-white/20">
    <StatItem value="5" label="Total Trips" />
    <StatItem value="12" label="This Month" />
    <StatItem value="P 340" label="Total Spent" />
  </StyledView>
);

const StatItem = ({ value, label }) => (
  <StyledView className="items-center">
    <StyledText className="font-bold text-lg dark:text-white">{value}</StyledText>
    <StyledText className="text-gray-500 text-sm">{label}</StyledText>
  </StyledView>
);

const TabButton = ({ title, active, onPress }) => {
  const { colors } = useTheme();
  return (
    <StyledTouchableOpacity onPress={onPress} className="flex-1 items-center py-2">
      <StyledText className={`font-bold ${active ? 'text-primary dark:text-primary-red' : 'text-gray-500'}`}>{title}</StyledText>
      {active && <StyledView className="h-0.5 mt-1 w-8" style={{ backgroundColor: colors.primaryRed }} />}
    </StyledTouchableOpacity>
  );
};

const TripCard = ({ status, onPress }) => {
  const isCompleted = status === 'completed';
  return (
    <StyledTouchableOpacity onPress={onPress} className="p-4 rounded-xl mb-4 dark:bg-primary-dark border border-gray-200 dark:border-white/20">
      <StyledView className="flex-row justify-between">
        <StyledText className="font-bold text-lg text-blue-500 dark:text-primary-red">Main Mall → Mogoditshane</StyledText>
        <StyledView className={`px-2 py-1 rounded-full ${isCompleted ? 'bg-green-100' : 'bg-red-100'}`}>
          <StyledText className={`font-bold text-xs ${isCompleted ? 'text-green-800' : 'text-red-800'}`}>{status}</StyledText>
        </StyledView>
      </StyledView>
      <StyledView className="flex-row space-x-4 mt-2">
        <InfoItem icon={Calendar} text="28 July 2024" />
        <InfoItem icon={Clock} text="2:30 PM" />
      </StyledView>
      <StyledText className="text-gray-500 mt-2">B 123 ABC • Thabo Molefe</StyledText>
      <StyledView className="flex-row justify-between items-center mt-2">
        <StyledText className="font-bold text-lg dark:text-white">P 25</StyledText>
        {isCompleted && <StarRating rating={4} />}
      </StyledView>
    </StyledTouchableOpacity>
  );
};

const TripDetailModal = ({ visible, onClose }) => {
  const { colors, isDarkMode } = useTheme();
  return (
    <Modal visible={visible} transparent animationType="slide">
      <StyledView className="flex-1 justify-end bg-black/60">
        <StyledView className="h-[80%] p-6 rounded-t-2xl" style={{ backgroundColor: colors.background }}>
          <StyledView className="flex-row justify-between items-center">
            <StyledText className="font-bold text-2xl dark:text-white">Trip Details</StyledText>
            <StyledTouchableOpacity onPress={onClose} className="p-2 bg-gray-100 dark:bg-white/10 rounded-full">
              <X color={isDarkMode ? 'white' : 'black'} />
            </StyledTouchableOpacity>
          </StyledView>
          {/* Add all modal content here */}
          <StyledTouchableOpacity className="mt-6 w-full py-4 rounded-full border border-gray-300 dark:border-white/30">
            <StyledText className="text-center font-bold dark:text-white">Download Receipt</StyledText>
          </StyledTouchableOpacity>
        </StyledView>
      </StyledView>
    </Modal>
  );
};

const InfoItem = ({ icon: Icon, text }) => (
  <StyledView className="flex-row items-center">
    <Icon size={14} color="gray" />
    <StyledText className="text-gray-500 ml-1 text-sm">{text}</StyledText>
  </StyledView>
);

const StarRating = ({ rating }) => (
  <StyledView className="flex-row items-center">
    <Star size={16} color="gold" fill="gold" />
    <StyledText className="font-bold dark:text-white ml-1">{rating}</StyledText>
  </StyledView>
);
