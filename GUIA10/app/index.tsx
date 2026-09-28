import { Ionicons } from '@expo/vector-icons';
import {
  createBottomTabNavigator,
  type BottomTabNavigationOptions,
} from 'expo-router/js-tabs';
import { Platform } from 'react-native';
import Maravillas from '../components/Screens/Maravillas';
import Paises from '../components/Screens/Paises';

type RootTabParamList = { Paises: undefined; Maravilla: undefined };
const Tab = createBottomTabNavigator<RootTabParamList>();

export default function HomeScreen() {
  return (
    <Tab.Navigator
      screenOptions={({ route }): BottomTabNavigationOptions => ({
        headerShown: false,
        tabBarInactiveTintColor: '#f48b28',
        tabBarActiveTintColor: '#633204',
        tabBarIcon: ({ color, size }) => {
          let iconName: keyof typeof Ionicons.glyphMap = 'home';
          if (route.name === 'Paises') iconName = Platform.OS === 'ios' ? 'home-outline' : 'home';
          else if (route.name === 'Maravilla') iconName = Platform.OS === 'ios' ? 'list-outline' : 'list';
          return <Ionicons name={iconName} size={size} color={color} />;
        },
      })}
    >
      <Tab.Screen name="Paises" component={Paises} />
      <Tab.Screen name="Maravilla" component={Maravillas} />
    </Tab.Navigator>
  );
}