/* eslint-disable react-hooks/exhaustive-deps */
import React, {useEffect} from 'react';
import {ActivityIndicator, ScrollView, Text, View} from 'react-native';
import {styleRecorder as styles} from '../../Ressources/Styles';
import Toast from 'react-native-toast-message';
import Globals from '../../Ressources/Globals';
import Fetcher from '../../API/fetcher';
import AudioRecorde from '../../components/AudioRecorder';

import * as RNFS from 'react-native-fs';
import Storer from '../../API/storer';
import axios from 'axios';

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
    Fetcher.GetSectionF()
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
              sentences: [res],
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
      bodyFormData.append({
        clip: {
          audio: {
            uri: pathi,
            name: 'audio.wav',
            type: 'audio/wav',
          },
          sentence_id: sectiondata.sentences?.[0]?.id,
        },
      });
      let user = await Storer.getData('@ProfilInfo');
      console.log(user);
      const user_id = user.id;

      const formData = new FormData();

      formData.append('clip[audio]', {
        uri: pathi,
        name: 'audio.wav',
        type: 'audio/wav',
      });
      formData.append('clip[sentence_id]', sectiondata.sentences?.[0]?.id);
      formData.append('clip[user_id]', user_id.value);

      // https://fongbevi.com/clips/new

      fetch('https://fongbevi.com/api/clips', {
        method: 'POST',
        body: formData,
      })
        .then(response => {
          console.log('File saved successfully!');
        })
        .catch(error => {
          console.error('Error saving file:', error);
        });

      // bodyFormData.append('token', token);
      // axios
      //   .post('api/clips', bodyFormData)
      //   .then(response => {
      //     console.log(response);
      //   })
      //   .catch(e => {
      //     console.log (  e);
      //   });

      // var http = new XMLHttpRequest();

      // http.open('POST', 'https://fongbevi.com/api/clips', true);
      // http.setRequestHeader('Content-type', 'multipart/form-data');
      // http.setRequestHeader('Authorization', `Bearer ${token}`);
      // http.onreadystatechange = function () {
      //   console.log(JSON.stringify(http));

      //   if (http.readyState === 4 && http.status === 200) {
      //     RNFS.unlink(pathi);
      //     let response = JSON.parse(http.responseText);
      //     //console.log(response);
      //     let newpro = {
      //       ...response,
      //       phone: Globals.PROFIL_INFO.phone,
      //       code: Globals.PROFIL_INFO.code,
      //     };
      //     //------------------------------------------
      //     // Storer.storeData('@ProfilInfo', newpro);
      //     // Globals.PROFIL_INFO = newpro;
      //     //------------------------------------------
      //   }
      //   setspinner(false);
      // };
      // http.onerror = function () {
      //   console.log(http.responseText);
      //   if (http.responseText.includes('Failed to connect')) {
      //     err_err(Globals.STRINGS.no_internet);
      //   } else {
      //     err_err(Globals.STRINGS.Ocurred_error);
      //   }
      // };
      // http.send(bodyFormData);
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
          <Text style={styles.translate_text}>Traduire le texte suivant</Text>
          {spinner ? (
            <ActivityIndicator
              style={{marginTop: 30}}
              size="large"
              color="#000"
            />
          ) : (
            <Text style={styles.translate_value}>
              {sectiondata.sentences?.[0]?.content}
            </Text>
          )}
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
