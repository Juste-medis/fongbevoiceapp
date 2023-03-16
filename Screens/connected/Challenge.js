/* eslint-disable react-hooks/exhaustive-deps */
/* eslint-disable react-native/no-inline-styles */
import * as React from 'react';
import {ScrollView, Text, TouchableOpacity, View} from 'react-native';
import {DataTable} from 'react-native-paper';
import Fetcher from '../../API/fetcher';
import ChallengeTop from '../../components/ChallengeTop';
import {paginate, toast_message} from '../../Helpers/Utils';
import Globals from '../../Ressources/Globals';
import {styleChallenge as styles} from '../../Ressources/Styles';
import Toast from 'react-native-toast-message';
import LottieView from 'lottie-react-native';

const Challenge = ({navigation}) => {
  const [page, setPage] = React.useState(1);
  const [spinner, setspinner] = React.useState(false);
  const [metadata, setmetadata] = React.useState({
    participants: 1,
    rang: 1,
    list: [],
  });
  let totalpage = Math.ceil(metadata.list.length / 10);
  React.useEffect(() => {
    if (!Globals.INTERNET) {
      toast_message(Globals.STRINGS.no_internet);
      navigation.goBack();
    } else {
      load_init();
    }
    load_init();
    return () => {};
  }, []);

  const load_init = () => {
    setspinner(true);
    Fetcher.GetChallenges(
      JSON.stringify({
        results: {
          phone: Globals.PROFIL_INFO.phone,
          token: Globals.PROFIL_INFO.user.token,
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
          setmetadata({...metadata, ...res});
        }
        setspinner(false);
      })
      .catch(err => {
        console.log(err);
        err_err(err);
      });
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
  const TableRower = ({meta}) => {
    return (
      <DataTable.Row
        style={{
          backgroundColor:
            Globals.PROFIL_INFO.user.username === meta.firstname
              ? '#ffeed6ff'
              : meta.rang % 3 === 0
              ? '#efeef2ff'
              : 'white',
        }}>
        <DataTable.Cell>
          <Text
            style={{
              fontWeight: '600',
            }}>
            {meta.firstname}
          </Text>
        </DataTable.Cell>
        <View style={{display: 'flex', flexDirection: 'row', width: '35%'}}>
          <DataTable.Cell numeric>{meta.valid}</DataTable.Cell>
          <DataTable.Cell numeric>{meta.rang} </DataTable.Cell>
        </View>
      </DataTable.Row>
    );
  };
  return (
    <ScrollView style={styles.main_container}>
      <Toast position="bottom" topOffset={1} />

      <ChallengeTop rang={metadata.rang} participants={metadata.participants} />
      <DataTable style={{paddingHorizontal: '10%'}}>
        <DataTable.Header
          style={{
            backgroundColor: 'white',
          }}>
          <DataTable.Title>Joueur</DataTable.Title>
          <View style={{display: 'flex', flexDirection: 'row', width: '35%'}}>
            <DataTable.Title numeric>valides</DataTable.Title>
            <DataTable.Title numeric>Rang</DataTable.Title>
          </View>
        </DataTable.Header>
        <ScrollView style={styles.middle_container}>
          {spinner ? (
            <LottieView
              style={{
                height: 150,
                width: 100,
              }}
              source={require('../../assets/loading.json')}
              autoPlay
              loop
            />
          ) : (
            paginate(metadata.list, 10, page).map((mes, i) => (
              <TableRower meta={mes} key={`joueur${i}`} />
            ))
          )}
        </ScrollView>
      </DataTable>
      <ScrollView
        style={styles.main_scroller}
        horizontal={true}
        showsHorizontalScrollIndicator={false}
        contentContainerStyle={{flexGrow: 1, justifyContent: 'center'}}>
        {Array.apply(null, Array(totalpage)).map((mes, index) => {
          let ni = index + 1;
          return (
            <TouchableOpacity
              key={ni}
              style={[
                styles.unity_page,
                {
                  borderRadius: page === ni ? 15 : 8,
                  backgroundColor: page === ni ? '#e6e4eaff' : '#f7f7faff',
                },
              ]}
              mode="contained"
              onPress={e => {
                setPage(ni);
              }}>
              <Text>{ni}</Text>
            </TouchableOpacity>
          );
        })}
      </ScrollView>
    </ScrollView>
  );
};

export default Challenge;
