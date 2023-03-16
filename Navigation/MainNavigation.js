import * as React from 'react';
import {NavigationContainer} from '@react-navigation/native';
import MainNavigator from './MainNavigator';

function Navigation(route) {
  return (
    <NavigationContainer>
      <MainNavigator user_type={route} />
    </NavigationContainer>
  );
}

export default Navigation;
