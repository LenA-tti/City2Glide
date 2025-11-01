import { View, Text, TouchableOpacity, Switch } from 'react-native';
import { styled } from 'nativewind';
import { useTheme } from '@/contexts/theme-context';
import { Home, History, MapPin, CreditCard, User, X, Sun, Moon, LogOut } from 'lucide-react-native';
import { useRouter } from 'expo-router';
import LinearGradient from 'react-native-linear-gradient';

const StyledView = styled(View);
const StyledText = styled(Text);
const StyledTouchableOpacity = styled(TouchableOpacity);
const StyledLinearGradient = styled(LinearGradient);

export default function AnimatedSidebar({ navigation }) {
  const { colors, isDarkMode, toggleTheme } = useTheme();
  const router = useRouter();

  const menuItems = [
    { icon: Home, label: 'Home', path: '/(tabs)' },
    { icon: History, label: 'Trip History', path: '/trip-history' },
    { icon: MapPin, label: 'Saved Places', path: '/saved-locations' },
    { icon: CreditCard, label: 'Wallet', path: '/payment' },
    { icon: User, label: 'Profile', path: '/profile' },
  ];

  const handleNavigation = (path) => {
    navigation.closeDrawer();
    router.push(path);
  };

  return (
    <StyledView style={{ backgroundColor: isDarkMode ? colors.primary : colors.background }} className="flex-1 p-6">
        {/* Header */}
        <StyledView className="flex-row items-center justify-between">
            <StyledView className="flex-row items-center">
                <StyledLinearGradient colors={isDarkMode ? [colors.primaryRed, colors.accentRed] : [colors.primary, '#A855F7']} className="w-12 h-12 items-center justify-center rounded-xl">
                    <Home color="white" />
                </StyledLinearGradient>
                <StyledView className="ml-3">
                    <StyledText className="font-bold text-xl dark:text-white">SmartRide</StyledText>
                    <StyledText className="text-xs text-gray-500">Navigate with ease</StyledText>
                </StyledView>
            </StyledView>
            <StyledTouchableOpacity onPress={() => navigation.closeDrawer()} className="p-2 bg-gray-100 dark:bg-white/10 rounded-full">
                <X size={18} color={isDarkMode ? 'white' : 'black'} />
            </StyledTouchableOpacity>
        </StyledView>

        {/* User Info */}
        <StyledView className="mt-6 p-4 rounded-2xl bg-gray-100 dark:bg-white/10">
            <StyledView className="flex-row items-center">
                <StyledView className="w-12 h-12 rounded-full bg-primary-red items-center justify-center">
                    <StyledText className="text-white font-bold text-xl">JD</StyledText>
                </StyledView>
                <StyledView className="ml-3">
                    <StyledText className="font-bold dark:text-white">John Doe</StyledText>
                    <StyledText className="text-gray-500 text-xs">john@example.com</StyledText>
                </StyledView>
            </StyledView>
        </StyledView>

        {/* Menu Items */}
        <StyledView className="mt-6">
            {menuItems.map((item, index) => (
                <MenuItem key={index} icon={item.icon} label={item.label} onPress={() => handleNavigation(item.path)} />
            ))}
        </StyledView>

        <StyledView className="flex-1" />

        {/* Footer */}
        <StyledView className="pb-6">
            <ThemeToggle isDarkMode={isDarkMode} onToggle={toggleTheme} />
            <StyledTouchableOpacity className="mt-4 flex-row items-center justify-center py-3 rounded-full bg-red-500/10 border border-red-500/30">
                <LogOut size={16} color="red" />
                <StyledText className="text-red-500 font-bold ml-2">Logout</StyledText>
            </StyledTouchableOpacity>
        </StyledView>
    </StyledView>
  );
}

const MenuItem = ({ icon: Icon, label, onPress }) => (
    <StyledTouchableOpacity onPress={onPress} className="flex-row items-center py-3 mb-2">
        <StyledView className="w-10 h-10 items-center justify-center rounded-lg bg-gray-100 dark:bg-white/10">
            <Icon color="gray" size={20} />
        </StyledView>
        <StyledText className="font-bold text-lg ml-4 dark:text-white">{label}</StyledText>
    </StyledTouchableOpacity>
);

const ThemeToggle = ({ isDarkMode, onToggle }) => (
    <StyledView className="flex-row items-center justify-between p-2 rounded-full bg-gray-100 dark:bg-primary-dark">
        <StyledTouchableOpacity className={`p-2 rounded-full w-1/2 items-center ${!isDarkMode ? 'bg-white' : ''}`}>
            <Sun color={isDarkMode ? 'gray' : 'black'} />
        </StyledTouchableOpacity>
        <StyledTouchableOpacity className={`p-2 rounded-full w-1/2 items-center ${isDarkMode ? 'bg-primary-red' : ''}`}>
            <Moon color={isDarkMode ? 'white' : 'gray'} />
        </StyledTouchableOpacity>
    </StyledView>
);
