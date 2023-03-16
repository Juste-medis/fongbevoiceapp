/* eslint-disable react-native/no-inline-styles */
import * as React from 'react';
import {View, Text} from 'react-native';
import Globals from '../Ressources/Globals';
import {styleChallenge as styles} from '../Ressources/Styles';

const ChallengeTop = route => {
  let {participants, rang} = route;
  return (
    <View>
      <Text
        style={[
          styles.text_top,
          {
            fontSize: 20,
            paddingTop: 30,
            fontWeight: '800',
          },
        ]}>
        Challenge
      </Text>
      <Text
        style={[
          styles.text_top,
          {
            fontSize: 15,
          },
        ]}>
        en cour
      </Text>
      <View style={styles.metaCont}>
        <View style={styles.top_metaCont}>
          <Text
            style={[
              styles.text_top,
              {
                fontSize: 15,
                fontWeight: '500',
                textAlign: 'left',
              },
            ]}>
            Participants
          </Text>
          <Text
            style={[
              styles.text_top,
              {
                fontSize: 15,
                marginTop: 15,
                textAlign: 'right',
                fontWeight: '500',
              },
            ]}>
            {participants}
          </Text>
        </View>
        <View style={styles.top_metaCont}>
          <Text
            style={[
              styles.text_top,
              {
                fontSize: 15,
                fontWeight: '500',
                textAlign: 'right',
              },
            ]}>
            Rang
          </Text>
          <Text
            style={[
              styles.text_top,
              {
                fontSize: 15,
                marginTop: 15,
                textAlign: 'left',
                fontWeight: '500',
              },
            ]}>
            {rang}
          </Text>
        </View>
      </View>
      <Text
        style={[
          styles.text_top,
          {
            fontSize: 20,
            fontWeight: 'bold',
          },
        ]}>
        {Globals.STRINGS.players}
      </Text>
    </View>
  );
};

export default ChallengeTop;
