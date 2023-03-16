import * as React from 'react';
import {
  createStackNavigator,
  TransitionSpecs,
  HeaderStyleInterpolators,
} from '@react-navigation/stack';
import {NavigationContainer} from '@react-navigation/native';
import SignIn from '../Screens/login/SignIn';
import MainNavigator from './MainNavigator';

const Stack = createStackNavigator();
function Navigation({navigation}) {
  return (
    <NavigationContainer>
      <Stack.Navigator
        initialRouteName="SignIn"
        screenOptions={{
          gestureDirection: 'horizontal',
          header: () => {},
          transitionSpec: {
            open: TransitionSpecs.TransitionIOSSpec,
            close: TransitionSpecs.TransitionIOSSpec,
          },
          headerStyleInterpolator: HeaderStyleInterpolators.forFade,
          cardStyleInterpolator: inter => {
            let {current, next, layouts} = inter;
            return {
              cardStyle: {
                transform: [
                  {
                    translateX: current.progress.interpolate({
                      inputRange: [0, 1],
                      outputRange: [layouts.screen.height, 0],
                    }),
                  },
                  {
                    scale: next
                      ? next.progress.interpolate({
                          inputRange: [0, 1],
                          outputRange: [1, 0.9],
                        })
                      : 1,
                  },
                ],
              },
              overlayStyle: {
                opacity: current.progress.interpolate({
                  inputRange: [0, 1],
                  outputRange: [0, 0.5],
                }),
              },
            };
          },
        }}>
        <Stack.Screen name="SignIn" component={SignIn} />
        <Stack.Screen name="MainNavigation" component={MainNavigator} />
      </Stack.Navigator>
    </NavigationContainer>
  );
}

export default Navigation;
