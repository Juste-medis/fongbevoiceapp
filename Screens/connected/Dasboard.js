/* eslint-disable react-native/no-inline-styles */
/* eslint-disable react-hooks/exhaustive-deps */
import React, {useEffect, useState} from 'react';
import {Image, ScrollView, Text, TouchableOpacity, View} from 'react-native';
import Globals from '../../Ressources/Globals';
import {styleDashBoard as styles} from '../../Ressources/Styles';
import Fetcher from '../../API/fetcher';
import Toast from 'react-native-toast-message';
import Icon from 'react-native-vector-icons/Ionicons';
import Storer from '../../API/storer';
import RNReastart from 'react-native-restart';
import {Modal, Portal, Provider} from 'react-native-paper';

export default function Dasboard({navigation}) {
  const [selectedLanguage] = useState(Globals.PROFIL_INFO.language || 'fr');
  const [visible, setVisible] = React.useState(false);

  const showModal = () => setVisible(true);
  const hideModal = () => setVisible(false);
  const containerStyle = {backgroundColor: 'white', padding: 20};

  const [dataprop, setdataprop] = React.useState({
    recordings: Globals.PROFIL_INFO.clips_created || 3,
    validated: Globals.PROFIL_INFO.clips_validated || 3,
    note: Globals.PROFIL_INFO.note || 3,
    email: Globals.PROFIL_INFO.email || '-',
    fullname: Globals.PROFIL_INFO.fullname || '-',
  });
  const [spinner, setspinner] = React.useState(false);
  function err_err(err) {
    setspinner(false);
    Toast.show({
      type: 'error',
      text1: 'Ereur',
      text2:
        err.name === 'TypeError'
          ? Globals.STRINGS.no_internet
          : err.message || Globals.STRINGS.Ocurred_error,
    });
  }
  useEffect(() => {
    // load_init();
    return () => {};
  }, []);
  const load_init = () => {
    setspinner(true);
    Fetcher.GetUserData(
      JSON.stringify({
        user: {
          language: selectedLanguage,
        },
      }),
    )
      .then(res => {
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

  const deconnectUser = () => {
    setVisible(false);
    setspinner(true);
    Fetcher.AuthSignout(
      JSON.stringify({
        user: {
          phone: Globals.PROFIL_INFO.phone,
          code: Globals.PROFIL_INFO.code,
          language: selectedLanguage,
        },
      }),
    )
      .then(res => {
        setspinner(false);
        Storer.removeData();
        RNReastart.Restart();
      })
      .catch(err => {
        setspinner(false);
        err_err(err);
      });
  };

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
                onPress={deconnectUser}
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

            <Text style={styles.autor_name}>{dataprop.fullname}</Text>
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
              marginBottom: 40,
              display: 'flex',
              flexDirection: 'column',
              justifyContent: 'center',
              alignItems: 'center',
              width: '100%',
            }}>
            <TouchableOpacity onPress={e => {}} activeOpacity={1} style={{}}>
              <Text
                style={{
                  color: 'black',
                  fontSize: 18,
                  fontWeight: '600',
                }}>
                {dataprop.email}
              </Text>
            </TouchableOpacity>
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
