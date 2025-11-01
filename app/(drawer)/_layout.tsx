import { Drawer } from 'expo-router/drawer';
import AnimatedSidebar from '@/components/animated-sidebar';
import { useTheme } from '@/contexts/theme-context';

export default function DrawerLayout() {
  const { colors } = useTheme();

  return (
    <Drawer
      drawerContent={(props) => <AnimatedSidebar {...props} />}
      screenOptions={{
        headerShown: false,
        drawerStyle: {
          width: '85%',
        },
      }}
    >
      <Drawer.Screen name="index" />
      <Drawer.Screen name="explore" />
    </Drawer>
  );
}
