import { View, Text, ScrollView, TouchableOpacity, Switch, Modal } from 'react-native';
import { SafeAreaView } from 'react-native-safe-area-context';
import { styled } from 'nativewind';
import { useTheme } from '@/contexts/theme-context';
import { ArrowLeft, User, Mail, Phone, Shield, HelpCircle, FileText, LogOut, ChevronRight, Edit } from 'lucide-react-native';
import { useRouter } from 'expo-router';
import { useState } from 'react';
import LinearGradient from 'react-native-linear-gradient';

const StyledView = styled(View);
const StyledText = styled(Text);
const StyledTouchableOpacity = styled(TouchableOpacity);
const StyledLinearGradient = styled(LinearGradient);

export default function ProfileScreen() {
  const { colors, isDarkMode } = useTheme();
  const router = useRouter();

  return (
    <StyledView style={{ backgroundColor: colors.background }} className="flex-1">
      <SafeAreaView>
        <StyledView className="flex-row items-center justify-between px-6 pt-4">
          <StyledTouchableOpacity onPress={() => router.back()}>
            <ArrowLeft color={isDarkMode ? 'white' : 'black'} />
          </StyledTouchableOpacity>
          <StyledText className="font-bold text-xl dark:text-white">Profile</StyledText>
          <StyledView className="w-6" />
        </StyledView>
      </SafeAreaView>

      <ScrollView className="px-6 pt-4">
        <ProfileHeader />

        <SettingsSection title="Account Settings">
          <SettingsItem icon={User} label="Personal Information" value="John Doe" />
          <SettingsItem icon={Mail} label="Email" value="john@example.com" />
          <SettingsItem icon={Phone} label="Phone Number" value="+267 71234567" />
        </SettingsSection>

        <SettingsSection title="Notifications">
          <NotificationItem label="Trip Updates" description="Get notified about your trips" />
          <NotificationItem label="Promotions & Offers" description="Receive special offers" />
          <NotificationItem label="News & Updates" description="Stay updated with SmartRide" />
        </SettingsSection>

        <SettingsSection title="More">
          <SettingsItem icon={Shield} label="Privacy & Security" />
          <SettingsItem icon={HelpCircle} label="Help & Support" />
          <SettingsItem icon={FileText} label="Terms & Conditions" />
        </SettingsSection>

        <StyledTouchableOpacity className="mt-6 w-full py-4 rounded-full bg-red-500 flex-row items-center justify-center">
          <LogOut color="white" size={18} />
          <StyledText className="text-white font-bold ml-2">Logout</StyledText>
        </StyledTouchableOpacity>

        <StyledText className="text-center text-gray-500 mt-6 mb-4">
          SmartRide v1.0.0 © 2025
        </StyledText>
      </ScrollView>
    </StyledView>
  );
}

const ProfileHeader = () => (
  <StyledView className="p-6 rounded-2xl bg-gray-100 dark:bg-primary-dark/50 items-center">
    <StyledView className="w-20 h-20 rounded-full bg-primary-red items-center justify-center">
      <StyledText className="text-white font-bold text-3xl">JD</StyledText>
    </StyledView>
    <StyledText className="font-bold text-2xl mt-4 dark:text-white">John Doe</StyledText>
    <StyledText className="text-gray-500">john@example.com</StyledText>
    <StyledTouchableOpacity className="mt-2 flex-row items-center py-2 px-4 rounded-full border border-gray-300 dark:border-white/30">
      <Edit size={14} color="gray" />
      <StyledText className="text-gray-500 ml-2">Edit Profile</StyledText>
    </StyledTouchableOpacity>
  </StyledView>
);

const SettingsSection = ({ title, children }) => (
  <StyledView className="mt-6">
    <StyledText className="font-bold text-lg dark:text-white">{title}</StyledText>
    <StyledView className="mt-2 rounded-xl dark:bg-primary-dark border border-gray-200 dark:border-white/20">
      {children}
    </StyledView>
  </StyledView>
);

const SettingsItem = ({ icon: Icon, label, value }) => (
  <StyledTouchableOpacity className="flex-row items-center p-4 border-b border-gray-200 dark:border-white/10">
    <Icon color="gray" size={20} />
    <StyledText className="ml-4 dark:text-white">{label}</StyledText>
    <StyledView className="flex-1 flex-row justify-end items-center">
      {value && <StyledText className="text-gray-500 mr-2">{value}</StyledText>}
      <ChevronRight color="gray" size={16} />
    </StyledView>
  </StyledTouchableOpacity>
);

const NotificationItem = ({ label, description }) => {
  const [isEnabled, setIsEnabled] = useState(false);
  return (
    <StyledView className="flex-row items-center p-4 border-b border-gray-200 dark:border-white/10">
      <StyledView className="flex-1">
        <StyledText className="font-bold dark:text-white">{label}</StyledText>
        <StyledText className="text-gray-500 text-sm">{description}</StyledText>
      </StyledView>
      <Switch
        trackColor={{ false: "#767577", true: "#81b0ff" }}
        thumbColor={isEnabled ? "#f5dd4b" : "#f4f3f4"}
        onValueChange={() => setIsEnabled(previousState => !previousState)}
        value={isEnabled}
      />
    </StyledView>
  );
};
