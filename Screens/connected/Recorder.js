/* eslint-disable react-hooks/exhaustive-deps */
import React, {useEffect} from 'react';
import {ScrollView, Text, View} from 'react-native';
import {styleRecorder as styles} from '../../Ressources/Styles';
import Toast from 'react-native-toast-message';
import Globals from '../../Ressources/Globals';
import Fetcher from '../../API/fetcher';
import AudioRecorde from '../../components/AudioRecorder';

import * as RNFS from 'react-native-fs';
import Storer from '../../API/storer';

export default function Recorder({navigation}) {
  const [spinner, setspinner] = React.useState(false);

  const [sectiondata, setsectiondata] = React.useState({
    sentences: [],
  });
  useEffect(() => {
    load_init();
    return () => {};
  }, []);

  const load_init = () => {
    setspinner(true);
    Fetcher.GetSection()
      .then(res => {
        res = res.data;
        console.log(res);
        setspinner(false);
        if (res.errors) {
          err_err(
            typeof res.errors[0] === 'string'
              ? res.errors[0]
              : Globals.STRINGS.Ocurred_error,
          );
        } else {
          setsectiondata({
            ...sectiondata,
            ...{
              sentences: res,
            },
          });
        }
        setspinner(false);
      })
      .catch(err => {
        console.log(err);
        err_err(err);
      });
  };
  const send_instance = async (patho, pathi) => {
    let fexist = await RNFS.exists(patho);
    if (!fexist) {
      err_player('Enrégistrement invalide');
    } else {
      setspinner(true);
      var bodyFormData = new FormData();
      bodyFormData.append(
        'audio',
        {
          uri: pathi,
          name: 'audio.wav',
          type: 'audio/wav',
        },
        'test.wav',
      );
      bodyFormData.append('token', Globals.PROFIL_INFO.user.token);
      bodyFormData.append('phone', Globals.PROFIL_INFO.phone);
      bodyFormData.append('profile', Globals.PROFIL_INFO.user.profile);

      var http = new XMLHttpRequest();
      http.open(
        'POST',
        'http://217.160.170.119:8000/api/speech/uploadfile/',
        true,
      );
      http.setRequestHeader('Content-type', 'multipart/form-data');
      http.onreadystatechange = function () {
        if (http.readyState === 4 && http.status === 200) {
          RNFS.unlink(pathi);
          let response = JSON.parse(http.responseText);
          let newpro = {
            ...response,
            phone: Globals.PROFIL_INFO.phone,
            code: Globals.PROFIL_INFO.code,
          };
          //------------------------------------------
          // Storer.storeData('@ProfilInfo', newpro);
          // Globals.PROFIL_INFO = newpro;
          //------------------------------------------
          setsectiondata({
            ...sectiondata,
            ...{
              sentences: response.user.sentences,
            },
          });
        }
        setspinner(false);
      };
      http.onerror = function () {
        console.log(http.responseText);
        if (http.responseText.includes('Failed to connect')) {
          err_err(Globals.STRINGS.no_internet);
        } else {
          err_err(Globals.STRINGS.Ocurred_error);
        }
      };
      http.send(bodyFormData);
    }
  };
  function err_err(err) {
    setspinner(false);
    Toast.show({
      type: 'error',
      text1: 'Eureur',
      text2:
        typeof err === 'string'
          ? err
          : err.name === 'TypeError'
          ? Globals.STRINGS.no_internet
          : err.message || Globals.STRINGS.Ocurred_error,
    });
  }
  function err_player(err) {
    setspinner(false);
    Toast.show({
      type: 'info',
      text1: 'Info',
      text2: err,
    });
  }
  return (
    <ScrollView style={styles.main_container}>
      <Toast position="top" topOffset={1} />
      <View style={styles.middle_heberger}>
        <View style={styles.middle_container}>
          <Text style={styles.translate_text}>
            Traduire le texte suivant en{' '}
            <Text style={styles.translate_lang}>{sectiondata.language}</Text>:
          </Text>
          <Text style={styles.translate_value}>
            {sectiondata.sentences?.[0]?.content}
          </Text>
        </View>
        <AudioRecorde
          spinner={spinner}
          sectiondata={sectiondata}
          err_player={err_player}
          load_init={load_init}
          send_instance={send_instance}
        />
      </View>
    </ScrollView>
  );
}
