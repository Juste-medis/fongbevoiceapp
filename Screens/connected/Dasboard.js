/* eslint-disable react-native/no-inline-styles */
/* eslint-disable react-hooks/exhaustive-deps */
import React, {useEffect, useRef, useState} from 'react';
import {Image, ScrollView, Text, TouchableOpacity, View} from 'react-native';
import Globals from '../../Ressources/Globals';
import {styleDashBoard as styles} from '../../Ressources/Styles';
import Fetcher from '../../API/fakeApi';
import Toast from 'react-native-toast-message';
import Icon from 'react-native-vector-icons/Ionicons';
import Storer from '../../API/storer';
import RNReastart from 'react-native-restart';
import {AppLanguages} from '../../Helpers/Shemas';
import {Picker} from '@react-native-picker/picker';
import {Modal, Portal, Provider} from 'react-native-paper';

export default function Dasboard({navigation}) {
  const pickerRef = useRef();
  const [selectedLanguage, setSelectedLanguage] = useState(
    Globals.PROFIL_INFO.user.language,
  );
  const [visible, setVisible] = React.useState(false);

  const showModal = () => setVisible(true);
  const hideModal = () => setVisible(false);
  const containerStyle = {backgroundColor: 'white', padding: 20};

  const [dataprop, setdataprop] = React.useState({
    recordings: Globals.PROFIL_INFO.user.recordings,
    validated: Globals.PROFIL_INFO.user.validated,
    note: Globals.PROFIL_INFO.user.note,
    gain: Globals.PROFIL_INFO.user.gain,
    username: Globals.PROFIL_INFO.user.username,
  });
  const [spinner, setspinner] = React.useState(false);
  function err_err(err) {
    setspinner(false);
    Toast.show({
      type: 'error',
      text1: 'Eureur',
      text2:
        err.name === 'TypeError'
          ? Globals.STRINGS.no_internet
          : err.message || Globals.STRINGS.Ocurred_error,
    });
  }
  useEffect(() => {
    load_init();
    return () => {};
  }, []);
  const load_init = () => {
    setspinner(true);
    Fetcher.GetUserData(
      JSON.stringify({
        user: {
          phone: Globals.PROFIL_INFO.phone,
          code: Globals.PROFIL_INFO.code,
          language: selectedLanguage,
        },
      }),
    )
      .then(res => {
        console.log(res);
        setspinner(false);
        if (res.errors) {
          err_err(
            typeof res.errors[0] === 'string'
              ? res.errors[0]
              : Globals.STRINGS.Ocurred_error,
          );
        } else {
          setdataprop({...dataprop, ...res});
        }
        setspinner(false);
      })
      .catch(err => {
        err_err(err);
      });
  };
  function handleLanguageChange(itemValue, index) {
    load_init();
    setSelectedLanguage(itemValue);
  }
  const MiddleFielder = meta => {
    return (
      <View style={styles.middle_fields_container}>
        <Text style={styles.midle_prop_value}>
          {meta.legend === Globals.STRINGS.note ? (
            <Icon name="star" size={15} color="black" />
          ) : null}
          {meta.value}
        </Text>
        <Text style={styles.midle_prop_title}>{meta.legend}</Text>
      </View>
    );
  };

  return (
    <Provider>
      <ScrollView contentContainerStyle={styles.main_container}>
        <Toast position="bottom" />
        <Portal>
          <Modal
            visible={visible}
            onDismiss={hideModal}
            style={{padding: 20, borderRadius: 30}}
            contentContainerStyle={containerStyle}>
            <Text style={{color: 'black'}}>
              Etes vous sûr de vous déconnecter ?
            </Text>
            <View
              style={{display: 'flex', flexDirection: 'row', marginTop: 20}}>
              <Text
                onPress={() => {
                  setVisible(false);
                }}
                style={{color: 'black'}}>
                Annuler
              </Text>
              <Text
                onPress={() => {
                  Storer.removeData();
                  RNReastart.Restart();
                }}
                style={{
                  color: Globals.COLORS.primary,
                  fontWeight: 'bold',
                  marginLeft: 20,
                }}>
                oui
              </Text>
            </View>
          </Modal>
        </Portal>

        <TouchableOpacity
          disabled={spinner}
          activeOpacity={1}
          style={{
            position: 'absolute',
            right: 20,
            top: 10,
          }}
          onPress={() => {
            showModal();
          }}>
          <Icon name="power" size={30} color="red" />
        </TouchableOpacity>
        <View style={styles.middle_heberger}>
          <View style={styles.top_container}>
            <Image
              source={Globals.IMAGES.USER_PHOTO}
              resizeMode="contain"
              style={{
                width: 70,
                height: 70,
                borderRadius: 70,
                marginTop: -35,
                backgroundColor: 'white',
              }}
            />

            <Text style={styles.autor_name}>{dataprop.username}</Text>
          </View>
          <View style={styles.middle_container}>
            {MiddleFielder({
              legend: Globals.STRINGS.save,
              value: dataprop.recordings,
            })}
            {MiddleFielder({
              legend: Globals.STRINGS.checked,
              value: dataprop.validated,
            })}
            {MiddleFielder({
              legend: Globals.STRINGS.note,
              value: dataprop.note,
            })}
          </View>

          <View
            style={{
              marginBottom: 20,
              display: 'flex',
              flexDirection: 'column',
              justifyContent: 'center',
              alignItems: 'center',
              width: '100%',
            }}>
            <TouchableOpacity
              onPress={e => {
                pickerRef.current.focus();
              }}
              activeOpacity={1}
              style={{}}>
              <Text
                style={{
                  color: 'black',
                  fontSize: 18,
                  fontWeight: '600',
                }}>
                {selectedLanguage}{' '}
                <Icon
                  style={{marginLeft: 10}}
                  name="chevron-down"
                  size={20}
                  color="black"
                />
              </Text>
            </TouchableOpacity>
            <Picker
              ref={pickerRef}
              selectedValue={selectedLanguage}
              mode="dropdown"
              dropdownIconRippleColor="white"
              style={{
                color: 'black',
                fontWeight: 'bold',
                height: 0,
                width: 0,
              }}
              itemStyle={{backgroundColor: 'white', color: 'black'}}
              onValueChange={(itemValue, itemIndex) => {
                handleLanguageChange(itemValue, itemIndex);
              }}>
              {AppLanguages.map(mes => (
                <Picker.Item
                  style={{
                    backgroundColor: 'white',
                    color: 'black',
                    fontWeight: 'bold',
                  }}
                  label={mes.label}
                  value={mes.value}
                />
              ))}
            </Picker>
          </View>
        </View>

        <View
          style={{
            display: 'flex',
            flexDirection: 'row-reverse',
            alignItems: 'center',
            width: '100%',
            marginTop: 100,
            marginRight: '40%',
          }}>
          <TouchableOpacity
            style={[styles.action_button, {width: '50%'}]}
            labelStyle={{color: 'white'}}
            mode="contained"
            loading={spinner}
            disabled={spinner}
            onPress={() => {
              navigation.navigate('Ecouter');
            }}>
            <Icon name="play" size={30} color="green" />
          </TouchableOpacity>
          <Text style={styles.botom_value_title}>
            {dataprop.recordings_play}
          </Text>
        </View>
        <View
          style={{
            display: 'flex',
            flexDirection: 'row-reverse',
            alignItems: 'center',
            marginTop: 23,
            width: '100%',
            marginRight: '15%',
          }}>
          <TouchableOpacity
            style={[styles.action_button, {width: '50%'}]}
            labelStyle={{color: 'white'}}
            mode="contained"
            loading={spinner}
            disabled={spinner}
            onPress={() => {
              navigation.navigate('Recorder');
            }}>
            <Icon name="recording-outline" size={35} color="red" />
          </TouchableOpacity>
          <Text style={styles.botom_value_title}>
            {dataprop.recordings_audio}
          </Text>
        </View>
      </ScrollView>
    </Provider>
  );
}
