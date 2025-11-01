import { View, Text, ScrollView, TouchableOpacity, TextInput } from 'react-native';
import { SafeAreaView } from 'react-native-safe-area-context';
import { styled } from 'nativewind';
import LinearGradient from 'react-native-linear-gradient';
import { useTheme } from '@/contexts/theme-context';
import { Menu, User, Search, Navigation, MapPin, History, Star, TrendingUp, Clock, CreditCard } from 'lucide-react-native';
import { BlurView } from '@react-native-community/blur';

const StyledView = styled(View);
const StyledText = styled(Text);
const StyledTouchableOpacity = styled(TouchableOpacity);
const StyledLinearGradient = styled(LinearGradient);
const StyledTextInput = styled(TextInput);

export default function HomeScreen() {
  const { colors, isDarkMode } = useTheme();

  const headerGradient = isDarkMode
    ? [colors.primaryRed, colors.accentRed]
    : [colors.primary, '#A855F7'];

  return (
    <StyledView style={{ backgroundColor: colors.background }} className="flex-1">
      <StyledLinearGradient colors={headerGradient} style={{ height: 160 }}>
        <SafeAreaView className="flex-1">
          <StyledView className="flex-row items-center justify-between px-6 pt-4">
            <StyledTouchableOpacity className="w-10 h-10 rounded-xl items-center justify-center bg-white/20">
              <Menu color="white" />
            </StyledTouchableOpacity>
            <StyledView>
              <StyledText className="text-white font-bold text-xl">Hello, John!</StyledText>
              <StyledText className="text-white/80">Where are you going today?</StyledText>
            </StyledView>
            <StyledTouchableOpacity className="w-10 h-10 rounded-full items-center justify-center bg-white/20">
              <User color="white" />
            </StyledTouchableOpacity>
          </StyledView>
        </SafeAreaView>
      </StyledLinearGradient>

      <ScrollView
        className="-mt-12 px-6"
        showsVerticalScrollIndicator={false}
      >
        <StyledView className="flex-row items-center bg-white dark:bg-primary-dark p-3 rounded-xl shadow-md">
          <Search color={isDarkMode ? 'white' : 'gray'} />
          <StyledTextInput
            placeholder="Search for a route or destination"
            placeholderTextColor={isDarkMode ? 'rgba(255,255,255,0.6)' : 'gray'}
            className="ml-2 flex-1 dark:text-white"
          />
        </StyledView>

        <StyledView className="flex-row mt-6 space-x-4">
          <QuickActionCard icon={Navigation} title="Find a Ride" subtitle="Near you" />
          <QuickActionCard icon={MapPin} title="Saved Places" subtitle="Home, Work..." />
        </StyledView>

        <StyledText className="text-lg font-bold mt-6 dark:text-white">Your Activity</StyledText>
        <StyledView className="flex-row mt-4 space-x-4">
          <ActivityCard icon={History} value="24" label="Trips" />
          <ActivityCard icon={Star} value="4.8" label="Rating" />
          <ActivityCard icon={TrendingUp} value="P 340" label="Spent" />
        </StyledView>

        <StyledView className="flex-row justify-between items-center mt-6">
          <StyledText className="text-lg font-bold dark:text-white">Recent Trips</StyledText>
          <StyledTouchableOpacity>
            <StyledText style={{ color: colors.primary }}>View all</StyledText>
          </StyledTouchableOpacity>
        </StyledView>
        <RecentTripCard route="Gaborone → Mogoditshane" time="2 hours ago" fare="P 25" />
        <RecentTripCard route="Block 8 → Main Mall" time="Yesterday" fare="P 15" />

        <StyledTouchableOpacity className="mt-6 flex-row items-center p-4 rounded-xl border-dashed border-2 border-primary-red/30 dark:bg-primary-dark">
          <StyledView className="w-10 h-10 items-center justify-center rounded-lg bg-primary-red/20">
            <CreditCard color={colors.primaryRed} />
          </StyledView>
          <StyledView className="ml-4">
            <StyledText className="font-bold dark:text-white">Payment Methods</StyledText>
            <StyledText className="text-gray-500">Orange Money •••• 4567</StyledText>
          </StyledView>
        </StyledTouchableOpacity>
      </ScrollView>
    </StyledView>
  );
}

const QuickActionCard = ({ icon: Icon, title, subtitle }) => {
  const { colors, isDarkMode } = useTheme();
  const gradient = isDarkMode ? [colors.primaryRed, colors.accentRed] : [colors.primary, '#A855F7'];
  return (
    <StyledTouchableOpacity className="flex-1 p-4 rounded-xl dark:bg-primary-dark border border-gray-200 dark:border-primary-red/30">
      <StyledLinearGradient colors={gradient} className="w-10 h-10 items-center justify-center rounded-full">
        <Icon color="white" />
      </StyledLinearGradient>
      <StyledText className="font-bold mt-4 dark:text-white">{title}</StyledText>
      <StyledText className="text-gray-500">{subtitle}</StyledText>
    </StyledTouchableOpacity>
  );
};

const ActivityCard = ({ icon: Icon, value, label }) => (
  <StyledView className="flex-1 p-4 items-center justify-center rounded-xl dark:bg-primary-dark border border-gray-200 dark:border-transparent">
    <Icon color="gray" size={20} />
    <StyledText className="text-xl font-bold mt-2 dark:text-white">{value}</StyledText>
    <StyledText className="text-gray-500">{label}</StyledText>
  </StyledView>
);

const RecentTripCard = ({ route, time, fare }) => {
  const { colors } = useTheme();
  return (
    <StyledView className="mt-4 flex-row items-center p-4 rounded-xl dark:bg-primary-dark border border-gray-200 dark:border-primary-red/30">
      <StyledView className="w-10 h-10 items-center justify-center rounded-lg bg-primary-red/20">
        <MapPin color={colors.primaryRed} />
      </StyledView>
      <StyledView className="ml-4 flex-1">
        <StyledText className="font-bold dark:text-white">{route}</StyledText>
        <StyledView className="flex-row items-center mt-1">
          <Clock size={12} color="gray" />
          <StyledText className="text-gray-500 ml-1">{time}</StyledText>
        </StyledView>
      </StyledView>
      <StyledText className="font-bold dark:text-white">{fare}</StyledText>
    </StyledView>
  );
};
