import { View, Text, ScrollView, TouchableOpacity, Modal, TextInput } from 'react-native';
import { SafeAreaView } from 'react-native-safe-area-context';
import { styled } from 'nativewind';
import { useTheme } from '@/contexts/theme-context';
import { ArrowLeft, Plus, Smartphone, CreditCard, MoreVertical, X } from 'lucide-react-native';
import { useRouter } from 'expo-router';
import { useState } from 'react';
import LinearGradient from 'react-native-linear-gradient';

const StyledView = styled(View);
const StyledText = styled(Text);
const StyledTouchableOpacity = styled(TouchableOpacity);
const StyledLinearGradient = styled(LinearGradient);

export default function PaymentScreen() {
  const { colors, isDarkMode } = useTheme();
  const router = useRouter();
  const [modalVisible, setModalVisible] = useState(false);

  return (
    <StyledView style={{ backgroundColor: colors.background }} className="flex-1">
      <SafeAreaView>
        <StyledView className="flex-row items-center justify-between px-6 pt-4">
          <StyledTouchableOpacity onPress={() => router.back()}>
            <ArrowLeft color={isDarkMode ? 'white' : 'black'} />
          </StyledTouchableOpacity>
          <StyledText className="font-bold text-xl dark:text-white">Payment Methods</StyledText>
          <StyledTouchableOpacity onPress={() => setModalVisible(true)}>
            <Plus color={isDarkMode ? 'white' : 'black'} />
          </StyledTouchableOpacity>
        </StyledView>
      </SafeAreaView>

      <ScrollView className="px-6 pt-4">
        <WalletBalance />
        <StyledText className="font-bold text-lg mt-6 dark:text-white">Your Payment Methods</StyledText>
        <PaymentMethodCard icon={Smartphone} name="Orange Money" number="•••• 4567" isDefault />
        <PaymentMethodCard icon={CreditCard} name="Visa" number="•••• 1234" />

        <StyledText className="font-bold text-lg mt-6 dark:text-white">Recent Transactions</StyledText>
        <TransactionItem description="Trip to Mogoditshane" date="Today, 2:30 PM" amount="-P 25" />
        <TransactionItem description="Wallet Top-up" date="Yesterday" amount="+P 100" isCredit />
      </ScrollView>

      <AddPaymentModal visible={modalVisible} onClose={() => setModalVisible(false)} />
    </StyledView>
  );
}

const WalletBalance = () => {
  const { colors, isDarkMode } = useTheme();
  const gradient = isDarkMode ? [colors.primaryRed, colors.accentRed] : [colors.primary, '#A855F7'];
  return (
    <StyledLinearGradient colors={gradient} className="p-6 rounded-2xl">
      <StyledText className="text-white/80">SmartRide Wallet</StyledText>
      <StyledText className="text-white font-bold text-4xl mt-1">P 125.00</StyledText>
      <StyledView className="flex-row mt-4 space-x-4">
        <StyledTouchableOpacity className="bg-white/30 py-2 px-4 rounded-full">
          <StyledText className="text-white font-bold">Add Money</StyledText>
        </StyledTouchableOpacity>
        <StyledTouchableOpacity className="border border-white/50 py-2 px-4 rounded-full">
          <StyledText className="text-white font-bold">Transfer</StyledText>
        </StyledTouchableOpacity>
      </StyledView>
    </StyledLinearGradient>
  );
};

const PaymentMethodCard = ({ icon: Icon, name, number, isDefault = false }) => (
  <StyledView className="flex-row items-center p-4 rounded-xl mt-4 dark:bg-primary-dark border border-gray-200 dark:border-white/20">
    <StyledView className="w-12 h-12 items-center justify-center rounded-lg bg-gray-100 dark:bg-white/10">
      <Icon color="gray" />
    </StyledView>
    <StyledView className="ml-4 flex-1">
      <StyledText className="font-bold dark:text-white">{name}</StyledText>
      <StyledText className="text-gray-500">{number}</StyledText>
    </StyledView>
    {isDefault && <StyledView className="px-2 py-1 bg-blue-100 rounded-full"><StyledText className="text-blue-800 text-xs font-bold">Default</StyledText></StyledView>}
    <StyledTouchableOpacity className="ml-4"><MoreVertical color="gray" /></StyledTouchableOpacity>
  </StyledView>
);

const TransactionItem = ({ description, date, amount, isCredit = false }) => (
  <StyledView className="flex-row items-center justify-between py-4 border-b border-gray-200 dark:border-white/10">
    <StyledView>
      <StyledText className="font-bold dark:text-white">{description}</StyledText>
      <StyledText className="text-gray-500 text-sm">{date}</StyledText>
    </StyledView>
    <StyledText className={`font-bold ${isCredit ? 'text-green-500' : 'dark:text-white'}`}>{amount}</StyledText>
  </StyledView>
);

const AddPaymentModal = ({ visible, onClose }) => {
  const { colors } = useTheme();
  return (
    <Modal visible={visible} transparent animationType="fade">
      <StyledView className="flex-1 justify-center items-center bg-black/60 p-6">
        <StyledView className="w-full p-6 rounded-2xl" style={{ backgroundColor: colors.background }}>
          <StyledText className="font-bold text-xl dark:text-white">Add Payment Method</StyledText>
          {/* Add form here */}
          <StyledTouchableOpacity onPress={onClose} className="mt-6 w-full py-4 rounded-full bg-primary-red">
            <StyledText className="text-center font-bold text-white">Add Method</StyledText>
          </StyledTouchableOpacity>
        </StyledView>
      </StyledView>
    </Modal>
  );
};
