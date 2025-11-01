import { View, Text, ScrollView, TouchableOpacity } from 'react-native';
import { SafeAreaView } from 'react-native-safe-area-context';
import { styled } from 'nativewind';
import { useTheme } from '@/contexts/theme-context';
import { ArrowLeft, Navigation, Clock, Phone, User, CheckCircle } from 'lucide-react-native';
import { useRouter } from 'expo-router';
import { useEffect, useState } from 'react';
import LinearGradient from 'react-native-linear-gradient';

const StyledView = styled(View);
const StyledText = styled(Text);
const StyledTouchableOpacity = styled(TouchableOpacity);
const StyledLinearGradient = styled(LinearGradient);

const tripStages = [
  { stage: 'waiting', text: 'Vehicle is on the way', color: 'blue' },
  { stage: 'boarding', text: 'Vehicle has arrived', color: 'green' },
  { stage: 'in-transit', text: 'Trip in progress', color: 'purple' },
  { stage: 'arriving', text: 'Arriving soon', color: 'orange' },
];

export default function TripTrackingScreen() {
  const { colors, isDarkMode } = useTheme();
  const router = useRouter();
  const [currentStageIndex, setCurrentStageIndex] = useState(0);
  const progress = (currentStageIndex + 1) / tripStages.length * 100;

  useEffect(() => {
    const interval = setInterval(() => {
      setCurrentStageIndex((prevIndex) => (prevIndex + 1) % tripStages.length);
    }, 5000);
    return () => clearInterval(interval);
  }, []);

  const currentStage = tripStages[currentStageIndex];

  return (
    <StyledView style={{ backgroundColor: colors.background }} className="flex-1">
      <StyledView className="h-[45%]">
        <StyledLinearGradient colors={['#E0F7FA', '#CEEAD6']} className="flex-1 items-center justify-center">
          <Navigation size={64} color={colors.primary} />
          <StyledText className="text-gray-500 mt-2">Live tracking map</StyledText>
        </StyledLinearGradient>
        <StyledView className="absolute top-16 self-center bg-white dark:bg-primary-dark p-3 rounded-full flex-row items-center shadow-lg">
          <Clock size={16} color={currentStage.color} />
          <StyledText style={{ color: currentStage.color }} className="font-bold ml-2">{currentStage.text}</StyledText>
        </StyledView>
        <StyledView className="absolute bottom-4 w-[90%] self-center bg-white dark:bg-primary-dark p-3 rounded-xl shadow-lg">
          <StyledView className="flex-row justify-between mb-1">
            <StyledText className="text-gray-500 text-xs">Pickup</StyledText>
            <StyledText className="text-gray-500 text-xs">Drop-off</StyledText>
          </StyledView>
          <StyledView className="h-2 bg-gray-200 rounded-full">
            <StyledView style={{ width: `${progress}%`, backgroundColor: currentStage.color }} className="h-2 rounded-full" />
          </StyledView>
        </StyledView>
      </StyledView>

      <ScrollView className="p-6">
        <StyledText style={{ color: currentStage.color }} className="text-2xl font-bold">{currentStage.text}</StyledText>
        <StyledText className="text-gray-500">Track your vehicle in real-time</StyledText>

        <DriverCard name="Thabo Molefe" rating="4.8" vehicle="B 123 ABC" seats="6/14" />
        <RouteCard from="Current Location" to="Mogoditshane" />
        <FareCard fare="P 25" />

        <StyledView className="mt-6">
          {currentStage.stage === 'arriving' && (
            <StyledTouchableOpacity className="w-full bg-primary-red py-4 rounded-full mb-4">
              <StyledText className="text-white text-center font-bold">Complete Trip</StyledText>
            </StyledTouchableOpacity>
          )}
          <StyledTouchableOpacity
            className="w-full border border-gray-300 dark:border-white/30 py-4 rounded-full"
            onPress={() => router.back()}
          >
            <StyledText className="text-center font-bold dark:text-white">Cancel Trip</StyledText>
          </StyledTouchableOpacity>
        </StyledView>
      </ScrollView>
    </StyledView>
  );
}

const DriverCard = ({ name, rating, vehicle, seats }) => (
  <StyledView className="mt-6 p-4 rounded-xl dark:bg-primary-dark border border-gray-200 dark:border-white/20">
    <StyledView className="flex-row items-center justify-between">
      <StyledView className="flex-row items-center">
        <StyledView className="w-12 h-12 rounded-full bg-primary items-center justify-center">
          <StyledText className="text-white font-bold text-xl">TM</StyledText>
        </StyledView>
        <StyledView className="ml-3">
          <StyledText className="font-bold dark:text-white">{name}</StyledText>
          <StyledView className="flex-row items-center">
            <Star size={14} color="gold" fill="gold" />
            <StyledText className="text-gray-500 ml-1">{rating}</StyledText>
          </StyledView>
        </StyledView>
      </StyledView>
      <StyledTouchableOpacity className="p-3 border border-gray-300 dark:border-white/30 rounded-full">
        <Phone size={20} color="gray" />
      </StyledTouchableOpacity>
    </StyledView>
    <StyledView className="flex-row justify-between mt-4">
      <StyledView>
        <StyledText className="text-gray-500">Vehicle</StyledText>
        <StyledText className="font-bold dark:text-white">{vehicle}</StyledText>
      </StyledView>
      <StyledView>
        <StyledText className="text-gray-500">Seats</StyledText>
        <StyledText className="font-bold dark:text-white">{seats}</StyledText>
      </StyledView>
    </StyledView>
  </StyledView>
);

const RouteCard = ({ from, to }) => (
  <StyledView className="mt-4 p-4 rounded-xl dark:bg-primary-dark border border-gray-200 dark:border-white/20 flex-row">
    <StyledView className="items-center mr-4">
        <StyledView className="w-3 h-3 rounded-full bg-blue-500" />
        <StyledView className="w-0.5 h-8 bg-gray-300 my-1" />
        <Navigation color="blue" size={16} />
    </StyledView>
    <StyledView>
        <StyledText className="text-gray-500">From</StyledText>
        <StyledText className="font-bold dark:text-white">{from}</StyledText>
        <StyledView className="h-2" />
        <StyledText className="text-gray-500">To</StyledText>
        <StyledText className="font-bold dark:text-white">{to}</StyledText>
    </StyledView>
  </StyledView>
);

const FareCard = ({ fare }) => (
  <StyledView className="mt-4 p-4 rounded-xl dark:bg-primary-dark border border-gray-200 dark:border-white/20 flex-row justify-between items-center">
    <StyledView>
      <StyledText className="text-gray-500">Estimated Fare</StyledText>
      <StyledText className="font-bold text-2xl text-blue-500 dark:text-primary-red">{fare}</StyledText>
    </StyledView>
    <CheckCircle size={32} color="green" />
  </StyledView>
);
