import { View, Text, TouchableOpacity } from 'react-native';
import { SafeAreaView } from 'react-native-safe-area-context';
import { useRouter } from 'expo-router';
import { styled } from 'nativewind';
import LinearGradient from 'react-native-linear-gradient';
import { useTheme } from '@/contexts/theme-context';

const StyledView = styled(View);
const StyledText = styled(Text);
const StyledTouchableOpacity = styled(TouchableOpacity);
const StyledLinearGradient = styled(LinearGradient);

export default function WelcomeScreen() {
  const router = useRouter();
  const { colors, isDarkMode } = useTheme();

  const gradientColors = isDarkMode
    ? [colors.primaryRed, colors.accentRed]
    : [colors.primary, '#A855F7'];

  return (
    <StyledLinearGradient colors={gradientColors} className="flex-1">
      <SafeAreaView className="flex-1 items-center justify-center p-6">
        <StyledView className="flex-1 justify-center items-center">
          <StyledText className="text-5xl font-bold text-white text-center">
            CityGlide
          </StyledText>
          <StyledText className="text-lg text-white/80 text-center mt-4">
            Navigate your city with ease.
          </StyledText>
        </StyledView>
        <StyledView className="w-full">
          <StyledTouchableOpacity
            className="bg-white/20 w-full py-4 rounded-full border border-white/30"
            onPress={() => router.push('/login')}
          >
            <StyledText className="text-white text-center text-lg font-bold">
              Get Started
            </StyledText>
          </StyledTouchableOpacity>
        </StyledView>
      </SafeAreaView>
    </StyledLinearGradient>
  );
}
