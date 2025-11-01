import { View, Text, ScrollView, TouchableOpacity, TextInput } from 'react-native';
import { SafeAreaView } from 'react-native-safe-area-context';
import { styled } from 'nativewind';
import { useTheme } from '@/contexts/theme-context';
import { ArrowLeft, Search, Navigation, Clock, Users, Star } from 'lucide-react-native';
import { useRouter } from 'expo-router';

const StyledView = styled(View);
const StyledText = styled(Text);
const StyledTouchableOpacity = styled(TouchableOpacity);
const StyledTextInput = styled(TextInput);

export default function VehicleSelectionScreen() {
  const { colors, isDarkMode } = useTheme();
  const router = useRouter();

  return (
    <StyledView style={{ backgroundColor: colors.background }} className="flex-1">
      <StyledView style={{ backgroundColor: isDarkMode ? colors.primaryRed : colors.primary, height: 140 }}>
        <SafeAreaView>
          <StyledView className="flex-row items-center justify-between px-6 pt-4">
            <StyledTouchableOpacity onPress={() => router.back()}>
              <ArrowLeft color="white" />
            </StyledTouchableOpacity>
            <StyledText className="text-white font-bold text-xl">Available Vehicles</StyledText>
            <StyledView className="w-6" />
          </StyledView>
          <StyledView className="px-6 mt-4">
            <StyledView className="flex-row items-center bg-white dark:bg-primary-dark p-3 rounded-xl">
              <Search color="gray" />
              <StyledTextInput
                placeholder="Search route, vehicle, or driver"
                placeholderTextColor="gray"
                className="ml-2 flex-1 dark:text-white"
              />
            </StyledView>
          </StyledView>
        </SafeAreaView>
      </StyledView>

      <StyledView className="p-6 border-b border-gray-200 dark:border-white/20 flex-row">
        <StyledView className="items-center mr-4">
          <StyledView className="w-3 h-3 rounded-full" style={{ backgroundColor: colors.primary }} />
          <StyledView className="w-0.5 h-8 bg-gray-300 my-1" />
          <Navigation color={colors.primary} size={16} />
        </StyledView>
        <StyledView>
          <StyledText className="text-gray-500 text-sm">From</StyledText>
          <StyledText className="font-bold dark:text-white">Current Location (GPS)</StyledText>
          <StyledView className="h-4" />
          <StyledText className="text-gray-500 text-sm">To</StyledText>
          <StyledText className="font-bold dark:text-white">Select a vehicle below</StyledText>
        </StyledView>
      </StyledView>

      <ScrollView horizontal showsHorizontalScrollIndicator={false} className="px-6 py-3 border-b border-gray-200 dark:border-white/20">
        <FilterChip text="Nearest First" active />
        <FilterChip text="Available Seats" />
        <FilterChip text="Top Rated" />
      </ScrollView>

      <ScrollView className="px-6 pt-4">
        <StyledText className="text-gray-500 mb-4">4 vehicles available</StyledText>
        <VehicleCard route="Gaborone → Mogoditshane" reg="B 123 ABC" driver="Thabo Molefe" time="5 min" seats="6/14" rating="4.8" fare="P 25" />
        <VehicleCard route="Gaborone → Tlokweng" reg="B 456 DEF" driver="Siti" time="8 min" seats="10/14" rating="4.9" fare="P 15" badge="Popular" />
      </ScrollView>
    </StyledView>
  );
}

const FilterChip = ({ text, active = false }) => (
  <StyledTouchableOpacity
    className={`px-4 py-2 rounded-full border mr-2 ${
      active ? 'bg-primary-red border-primary-red' : 'border-gray-300 dark:border-white/30'
    }`}
  >
    <StyledText className={`${active ? 'text-white' : 'text-gray-500'}`}>{text}</StyledText>
  </StyledTouchableOpacity>
);

const VehicleCard = ({ route, reg, driver, time, seats, rating, fare, badge }) => {
  const router = useRouter();
  return (
    <StyledTouchableOpacity
      className="p-4 rounded-xl mb-4 dark:bg-primary-dark border border-gray-200 dark:border-white/20"
      onPress={() => router.push('/trip-tracking')}
    >
      <StyledView className="flex-row justify-between">
        <StyledView>
          <StyledText className="text-lg font-bold text-primary dark:text-primary-red">{route}</StyledText>
          <StyledText className="text-gray-500 mt-1">{reg} • {driver}</StyledText>
          <StyledView className="flex-row items-center mt-2 space-x-4">
            <InfoItem icon={Clock} text={time} />
            <InfoItem icon={Users} text={seats} />
            <InfoItem icon={Star} text={rating} filled />
          </StyledView>
        </StyledView>
        <StyledView className="items-end">
          <StyledText className="text-lg font-bold dark:text-white">{fare}</StyledText>
          {badge && <StyledView className="px-2 py-1 bg-accent-red rounded-full mt-1"><StyledText className="text-white text-xs">{badge}</StyledText></StyledView>}
        </StyledView>
      </StyledView>
      <StyledTouchableOpacity className="mt-4 w-full bg-primary-red py-3 rounded-full">
        <StyledText className="text-white text-center font-bold">Select Vehicle</StyledText>
      </StyledTouchableOpacity>
    </StyledTouchableOpacity>
  );
};

const InfoItem = ({ icon: Icon, text, filled = false }) => (
  <StyledView className="flex-row items-center">
    <Icon size={14} color={filled ? 'gold' : 'gray'} fill={filled ? 'gold' : 'none'} />
    <StyledText className="text-gray-500 ml-1 text-sm">{text}</StyledText>
  </StyledView>
);
