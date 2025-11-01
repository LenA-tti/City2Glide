import { View, Text, TextInput, TouchableOpacity } from 'react-native';
import { SafeAreaView } from 'react-native-safe-area-context';
import { useRouter } from 'expo-router';
import { styled } from 'nativewind';
import LinearGradient from 'react-native-linear-gradient';
import { useTheme } from '@/contexts/theme-context';

const StyledView = styled(View);
const StyledText = styled(Text);
const StyledTextInput = styled(TextInput);
const StyledTouchableOpacity = styled(TouchableOpacity);
const StyledLinearGradient = styled(LinearGradient);

export default function CreateAccountScreen() {
  const router = useRouter();
  const { colors, isDarkMode } = useTheme();

  const gradientColors = isDarkMode
    ? [colors.primary, colors.secondary]
    : ['#FFFFFF', '#F0F2F5'];

  return (
    <StyledLinearGradient colors={gradientColors} className="flex-1">
      <SafeAreaView className="flex-1 justify-center p-6">
        <StyledView>
          <StyledText className="text-4xl font-bold text-center mb-2" style={{ color: colors.text }}>
            Create Account
          </StyledText>
          <StyledText className="text-lg text-center text-gray-500 mb-12">
            Get started with CityGlide
          </StyledText>

          <StyledTextInput
            className="bg-white/20 p-4 rounded-lg mb-4 text-white placeholder:text-white/60"
            placeholder="Full Name"
            placeholderTextColor="rgba(255, 255, 255, 0.6)"
          />
          <StyledTextInput
            className="bg-white/20 p-4 rounded-lg mb-4 text-white placeholder:text-white/60"
            placeholder="Email"
            placeholderTextColor="rgba(255, 255, 255, 0.6)"
            keyboardType="email-address"
            autoCapitalize="none"
          />
          <StyledTextInput
            className="bg-white/20 p-4 rounded-lg mb-4 text-white placeholder:text-white/60"
            placeholder="Password"
            placeholderTextColor="rgba(255, 255, 255, 0.6)"
            secureTextEntry
          />

          <StyledTouchableOpacity
            className="w-full py-4 rounded-full mt-4"
            onPress={() => router.push('/(tabs)')}
          >
            <StyledLinearGradient
              colors={isDarkMode ? [colors.primaryRed, colors.accentRed] : [colors.primary, '#A855F7']}
              className="w-full py-4 rounded-full"
            >
              <StyledText className="text-white text-center text-lg font-bold">
                Create Account
              </StyledText>
            </StyledLinearGradient>
          </StyledTouchableOpacity>

          <StyledTouchableOpacity onPress={() => router.push('/login')} className="mt-6">
            <StyledText className="text-center" style={{ color: colors.text }}>
              Already have an account? <StyledText className="font-bold">Login</StyledText>
            </StyledText>
          </StyledTouchableOpacity>
        </StyledView>
      </SafeAreaView>
    </StyledLinearGradient>
  );
}
