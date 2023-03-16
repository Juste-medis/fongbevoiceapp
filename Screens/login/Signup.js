import React from 'react';
import {ImageBackground} from 'react-native';

import Globals from '../../Ressources/Globals';
import {styleSignIn as styles} from '../../Ressources/Styles';

export default function SignupScreen({navigation}) {
  return (
    <ImageBackground
      style={styles.container}
      source={Globals.IMAGES.LO_SPLASH}
    />
  );
}
