import * as React from 'react';
import 'react-native-gesture-handler';
import { createStackNavigator } from '@react-navigation/stack';
import { SafeAreaProvider } from 'react-native-safe-area-context';
import {
  TransitionSpecs,
  HeaderStyleInterpolators,
} from '@react-navigation/stack';
import Dasboard from '../Screens/connected/Dasboard';
import Recorder from '../Screens/connected/Recorder';
import Challenge from '../Screens/connected/Challenge';
import Ecouter from '../Screens/connected/Ecouter';

const Stack = createStackNavigator();
function Navigation({ navigation }) {
  return (
    <SafeAreaProvider>
      <Stack.Navigator
        initialRouteName="Dasboard"
        screenOptions={{
          headerShown: false,
          gestureDirection: 'horizontal',
          transitionSpec: {
            open: TransitionSpecs.TransitionIOSSpec,
            close: TransitionSpecs.TransitionIOSSpec,
          },
          headerStyleInterpolator: HeaderStyleInterpolators.forSlideUp,
        }}>
        <Stack.Screen
          options={{
            headerStyle: { backgroundColor: '#fd7e14' },
            headerTitleStyle: { color: 'white' },
          }}
          name="Tableau de bord"
          component={Dasboard}
        />
        <Stack.Screen
          options={{ title: 'Enregistrement' }}
          name="Recorder"
          component={Recorder}
        />
        <Stack.Screen
          options={{ title: 'Enregistrement' }}
          name="Ecouter"
          component={Ecouter}
        />
        <Stack.Screen
          options={{ headerShown: false }}
          name="Challenge"
          component={Challenge}
        />
      </Stack.Navigator>
    </SafeAreaProvider>
  );
}

export default Navigation;
