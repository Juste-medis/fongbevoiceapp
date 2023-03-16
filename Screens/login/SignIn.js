/* eslint-disable react-native/no-inline-styles */
import React, {useRef, useState} from 'react';
import {
  View,
  Image,
  Text,
  ScrollView,
  TextInput,
  TouchableOpacity,
  Keyboard,
  ImageBackground,
} from 'react-native';
import Globals from '../../Ressources/Globals';
import {styleSignIn as styles} from '../../Ressources/Styles';
import Storer from '../../API/storer';
import RNReastart from 'react-native-restart';
import Toast from 'react-native-toast-message';
import {Title, Checkbox} from 'react-native-paper';
import Fetcher from '../../API/fakeApi';
import {Schemasignin} from '../../API/schemas';
import Icon from 'react-native-vector-icons/Ionicons';
import {Picker} from '@react-native-picker/picker';
import Swiper from 'react-native-swiper';
import {AppLanguages} from '../../Helpers/Shemas';

//search "beautiful textinput on google"
export default function SignIn({navigation}) {
  const [phone, setphone] = useState('');
  const [code, setcode] = useState('');
  const [confirmcode, setconfirmcode] = useState('');

  const pickerRef = useRef();

  const [spinner, setspinner] = useState(false);
  const [showPass, setshowPass] = useState(false);
  const [selectedLanguage, setSelectedLanguage] = useState('Fongbe');
  const [checked, setChecked] = React.useState(false);

  const [isKeyboardVisible, setKeyboardVisible] = useState(false);
  const [tabIndex, settabIndex] = useState(0);
  let mySwipper;
  React.useEffect(() => {
    const keyboardDidShowListener = Keyboard.addListener(
      'keyboardDidShow',
      () => {
        setKeyboardVisible(true); // or some other action
      },
    );
    const keyboardDidHideListener = Keyboard.addListener(
      'keyboardDidHide',
      () => {
        setKeyboardVisible(false); // or some other action
      },
    );

    return () => {
      keyboardDidHideListener.remove();
      keyboardDidShowListener.remove();
    };
  }, []);

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
  async function onSignInPressed() {
    try {
      if (tabIndex === 0) {
        await Schemasignin.validate({phone, code, language: ''});
      } else {
        await Schemasignin.validate({phone, code, confirmcode, language: ''});
      }
      setspinner(true);
      Fetcher.AuthSignin(
        JSON.stringify({
          user: {
            phone,
            code,
            language: '',
          },
        }),
      )
        .then(res => {
          setspinner(false);
          if (res.errors) {
            Toast.show({
              type: 'error',
              text1: 'Eureur',
              text2: res.errors,
              style: {
                zIndex: 100000000,
              },
            });
            setspinner(false);
          } else {
            Globals.PROFIL_INFO = res;
            Toast.show({
              type: 'success',
              text1: 'Bienvenu',
              text2: res?.user?.username,
              style: {
                zIndex: 100000000,
              },
            });
            Storer.storeData('@ProfilInfo', {...res, phone, code}).then(() => {
              Storer.storeData('@USER_TYPE', 1).then(() => {
                RNReastart.Restart();
              });
            });
          }
        })
        .catch(err => {
          err_err(err);
        });
    } catch (e) {
      if (e.name === 'ValidationError') {
        Toast.show({
          type: 'error',
          text1: 'Eureur',
          text2: e.message,
          style: {
            zIndex: 100000000,
          },
        });
      }
    }
  }
  const defaultTabHederLabelStyle = {
    padding: 3,
    color: Globals.COLORS.grey,
    borderBottomWidth: 2,
    borderBottomColor: 'white',
    textAlign: 'center',
  };
  return (
    <View style={styles.container}>
      <Toast config={{}} />
      <Title
        style={{
          fontSize: 30,
          color: Globals.COLORS.black,
          width: '100%',
          textAlign: 'center',
          fontFamily: 'Neogrotesk',
          paddingTop: 20,
        }}>
        {Globals.STRINGS.hello}
      </Title>
      <Title style={styles.titleText}>
        {Globals.STRINGS.by_connecting}
        <Title
          style={{
            ...styles.titleText,
            color: Globals.COLORS.primary,
            fontWeight: '600',
          }}>
          {Globals.STRINGS.read_tems}
        </Title>
      </Title>
      <ScrollView style={styles.center_scroll}>
        <View style={styles.center_container}>
          <View
            style={{
              display: 'flex',
              alignItems: 'center',
              flexDirection: 'column',
              height: tabIndex === 0 ? 180 : 230,
              width: '80%',
            }}>
            <View
              style={{
                display: 'flex',
                alignItems: 'center',
                flexDirection: 'row',
                width: '55%',
                justifyContent: 'space-between',
                marginBottom: 8,
              }}>
              <Text
                style={[
                  defaultTabHederLabelStyle,
                  tabIndex === 0
                    ? {
                        color: Globals.COLORS.primary,
                        borderBottomColor: Globals.COLORS.primary,
                      }
                    : {},
                ]}
                onPress={() => {
                  mySwipper.scrollTo(0);

                  settabIndex(0);
                }}>
                {Globals.STRINGS.connection}
              </Text>
              <Text
                onPress={() => {
                  mySwipper.scrollTo(1);
                  settabIndex(1);
                }}
                style={[
                  defaultTabHederLabelStyle,
                  tabIndex === 1
                    ? {
                        color: Globals.COLORS.primary,
                        borderBottomColor: Globals.COLORS.primary,
                      }
                    : {},
                ]}>
                {Globals.STRINGS.inscription}
              </Text>
            </View>

            <Swiper
              style={styles.wrapper}
              showsButtons={false}
              showsPagination={false}
              indicatorStyle={{height: 0}}
              onIndexChanged={i => {
                settabIndex(i);
              }}
              ref={ref => {
                mySwipper = ref;
              }}
              loop={false}>
              <View style={styles.slide1}>
                <View
                  style={{
                    display: 'flex',
                    alignItems: 'center',
                    flexDirection: 'row',
                    borderBottomColor: 'grey',
                    borderBottomWidth: 1,
                    paddingVertical: 5,
                    paddingHorizontal: 3,
                  }}>
                  <Icon name="mail" size={25} color="black" />
                  <TextInput
                    labelName="Numéro"
                    style={styles.input}
                    value={phone}
                    keyboardType="email-address"
                    autoCapitalize="none"
                    onChangeText={name => setphone(name)}
                    placeholder={`${Globals.STRINGS.mail}`}
                    placeholderTextColor="grey"
                  />
                </View>

                <View
                  style={{
                    display: 'flex',
                    alignItems: 'center',
                    flexDirection: 'row',
                    borderBottomColor: 'grey',
                    borderBottomWidth: 1,
                    marginTop: 20,
                    paddingVertical: 5,
                    paddingHorizontal: 3,
                  }}>
                  <Icon name="lock-closed-outline" size={25} color="black" />
                  <TextInput
                    placeholder={Globals.STRINGS.password}
                    value={code}
                    style={{...styles.input, width: '64%'}}
                    onChangeText={usercode => setcode(usercode)}
                    secureTextEntry={showPass}
                    placeholderTextColor="grey"
                  />
                  <TouchableOpacity
                    onPress={e => {
                      setshowPass(!showPass);
                    }}
                    activeOpacity={1}
                    style={{right: -45}}>
                    <Icon
                      name={showPass ? 'ios-eye' : 'ios-eye-off'}
                      size={25}
                      color="black"
                    />
                  </TouchableOpacity>
                </View>
              </View>
              {/** Slide 2 ---------------------- */}
              <View style={styles.slide2}>
                <View
                  style={{
                    display: 'flex',
                    alignItems: 'center',
                    flexDirection: 'row',
                    borderBottomColor: 'grey',
                    borderBottomWidth: 1,
                    paddingVertical: 5,
                    paddingHorizontal: 3,
                  }}>
                  <Icon name="mail" size={25} color="black" />
                  <TextInput
                    style={styles.input}
                    value={phone}
                    keyboardType="email-address"
                    autoCapitalize="none"
                    onChangeText={name => setphone(name)}
                    placeholder={`${Globals.STRINGS.mail}`}
                    placeholderTextColor="grey"
                  />
                </View>

                <View
                  style={{
                    display: 'flex',
                    alignItems: 'center',
                    flexDirection: 'row',
                    borderBottomColor: 'grey',
                    borderBottomWidth: 1,
                    marginTop: 20,
                    paddingVertical: 5,
                    paddingHorizontal: 3,
                  }}>
                  <Icon name="lock-closed-outline" size={25} color="black" />
                  <TextInput
                    placeholder={Globals.STRINGS.password}
                    value={code}
                    style={{...styles.input, width: '64%'}}
                    onChangeText={usercode => setcode(usercode)}
                    secureTextEntry={showPass}
                    placeholderTextColor="grey"
                  />
                  <TouchableOpacity
                    onPress={e => {
                      setshowPass(!showPass);
                    }}
                    activeOpacity={1}
                    style={{right: -30}}>
                    <Icon
                      name={showPass ? 'ios-eye' : 'ios-eye-off'}
                      size={25}
                      color="black"
                    />
                  </TouchableOpacity>
                </View>
                <View
                  style={{
                    display: 'flex',
                    alignItems: 'center',
                    flexDirection: 'row',
                    borderBottomColor: 'grey',
                    borderBottomWidth: 1,
                    marginTop: 20,
                    paddingVertical: 5,
                    paddingHorizontal: 3,
                  }}>
                  <Icon name="lock-closed-outline" size={25} color="black" />
                  <TextInput
                    placeholder={Globals.STRINGS.password}
                    value={confirmcode}
                    style={{...styles.input, width: '64%'}}
                    onChangeText={usercode => setconfirmcode(usercode)}
                    secureTextEntry={showPass}
                    placeholderTextColor="grey"
                  />
                </View>
              </View>
            </Swiper>
          </View>

          <View style={{paddingBottom: 20, paddingStart: 5, width: '80%'}}>
            <View style={{marginBottom: 20}}>
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
                    width: '40%',
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
                onValueChange={(itemValue, itemIndex) =>
                  setSelectedLanguage(itemValue)
                }>
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

            <View
              style={{
                display: 'flex',
                flexDirection: 'row',
                alignItems: 'flex-start',
                justifyContent: 'space-between',
                marginTop: 20,
              }}>
              <View
                style={{
                  display: 'flex',
                  flexDirection: 'row',
                  alignItems: 'center',
                  left: -10,
                }}>
                <Checkbox
                  status={checked ? 'checked' : 'unchecked'}
                  onPress={() => {
                    setChecked(!checked);
                  }}
                  color={Globals.COLORS.primary}
                />
                <Text style={{color: 'grey', fontSize: 16}}>
                  {Globals.STRINGS.remenber}
                </Text>
              </View>
              <Text
                style={{
                  color: Globals.COLORS.primary,
                  fontSize: 16,
                  width: '40%',
                }}>
                {Globals.STRINGS.password_forgot}
              </Text>
            </View>
          </View>

          <TouchableOpacity
            disabled={spinner}
            style={{
              backgroundColor: Globals.COLORS.primary,
              paddingHorizontal: 80,
              paddingVertical: 8,
              borderRadius: 10,
              zIndex: 5000,
            }}
            onPress={() => {
              console.log('spinner');

              onSignInPressed();
            }}>
            <Text style={styles.loginButtonLabel}>
              {tabIndex === 0
                ? Globals.STRINGS.connection
                : Globals.STRINGS.inscription}
            </Text>
          </TouchableOpacity>
        </View>
      </ScrollView>
      {!isKeyboardVisible === true ? (
        <View style={styles.bottom_container}>
          <Image
            source={Globals.IMAGES.ROBOT}
            resizeMode="contain"
            style={{
              width: tabIndex === 0 ? 60 : 40,
              height: tabIndex === 0 ? 60 : 100,
              marginBottom: 70,
              bottom: tabIndex === 0 ? -10 : -40,
            }}
          />

          <ImageBackground
            source={Globals.IMAGES.LOGINROUNDER}
            resizeMode="cover"
            style={{
              width: '100%',
              height: 300,
              marginBottom: 70,
              zIndex: -2000,
            }}>
            <Text style={styles.text}>Inside</Text>
          </ImageBackground>
        </View>
      ) : null}
    </View>
  );
}
