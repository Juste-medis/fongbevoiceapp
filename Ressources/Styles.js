import {StyleSheet, Dimensions} from 'react-native';
import Globals from '../Ressources/Globals';
//fontFamily?: string | undefined | 'Helvetica' | 'Montserrat' | 'Neogrotesk' | 'Ubuntu' ;

const {width, height} = Dimensions.get('screen');
const mobile_360_750 = true;
const mobile_500_1000 = width <= 500 && height <= 1000;

let tyleSignIn, tyleRecorder, tyleDashBoard, tyleChallenge;

if (mobile_360_750) {
  tyleSignIn = StyleSheet.create({
    container: {
      flex: 1,
      width: '100%',
      alignItems: 'center',
      justifyContent: 'space-between',
      flexDirection: 'column',
      backgroundColor: Globals.COLORS.white,
    },
    center_scroll: {
      width: '100%',
      marginTop: 20,
    },
    boldText: {
      fontSize: 40,
      color: Globals.COLORS.black,
      width: '100%',
      textAlign: 'center',
      fontFamily: 'Neogrotesk',
    },
    titleText: {
      fontSize: 14,
      color: Globals.COLORS.grey,
      width: '65%',
      textAlign: 'center',
      fontFamily: 'Neogrotesk',
      lineHeight: 16,
    },
    loginButtonLabel: {
      fontSize: 22,
      color: '#ffffff',
    },
    navButtonText: {
      fontSize: 16,
    },
    boldText_touchable: {
      fontWeight: 'bold',
      color: Globals.COLORS.white,
      fontSize: 18,
    },
    simple_text: {
      textAlign: 'center',
      color: Globals.COLORS.arsenic2,
    },
    Image_style: {
      height: 50,
      width: 200,
      zIndex: 41,
    },
    center_container: {
      display: 'flex',
      alignItems: 'center',
      justifyContent: 'center',
      width: '100%',
    },
    input_container: {
      display: 'flex',
      flexDirection: 'row',
      justifyContent: 'center',
      alignItems: 'center',
    },
    bottom_container: {
      alignItems: 'center',
      justifyContent: 'space-around',
      width: '100%',
      height: '10%',
    },
    text_input: {
      marginTop: 10,
      marginBottom: 10,
      width: width / 1.1,
      height: height / 13,
      elevation: 20,
    },
    buts_style: {
      width: 200,
      backgroundColor: Globals.COLORS.primary,
      marginTop: 15,
      borderRadius: 70,
      justifyContent: 'center',
      alignItems: 'center',
      height: 50,
    },
    input: {
      width: '70%',
      color: Globals.COLORS.grey,
      padding: 1,
      marginLeft: 6,
      fontSize: 16,
    },
    wrong_login_container: {
      bottom: 5,
      width: '80%',
      justifyContent: 'center',
      alignItems: 'center',
      padding: 10,
      borderTopWidth: 2,
      borderTopColor: Globals.COLORS.red,
    },
    wrong_login_found_text: {
      color: Globals.COLORS.red,
      fontWeight: 'bold',
      fontSize: 14,
      justifyContent: 'center',
      alignItems: 'center',
      textAlign: 'center',
    },
    indicator: {},
    media_unity: {
      justifyContent: 'center',
      alignItems: 'center',
      elevation: 5,
      backgroundColor: Globals.COLORS.white,
      height: 40,
      width: 70,
      marginHorizontal: 12,
    },
    media_container: {flexDirection: 'row', margin: 50},
    wrapper: {
      marginTop: 20,
    },
    slide1: {
      flex: 1,
    },
    slide2: {
      flex: 1,
    },
  });
  tyleDashBoard = StyleSheet.create({
    main_container: {
      display: 'flex',
      flex: 1,
      flexDirection: 'column',
      alignItems: 'center',
      backgroundColor: Globals.COLORS.white,
    },
    top_container: {
      display: 'flex',
      flexDirection: 'column',
      alignItems: 'center',
      justifyContent: 'space-between',
    },
    image: {
      borderRadius: 50,
      height: 100,
      width: '30%',
      padding: 4,
    },
    action_button: {
      borderRadius: 10,
      backgroundColor: 'white',
      elevation: 5,
      paddingVertical: 12,
      paddingStart: 20,
    },
    botom_value_title: {
      color: 'black',
      marginRight: 20,
      fontSize: 25,
      fontWeight: 'bold',
    },
    middle_container: {
      display: 'flex',
      flexDirection: 'row',
      justifyContent: 'space-around',
      width: '100%',
      paddingBottom: 50,
      paddingHorizontal: 30,
      marginTop: 30,
    },
    middle_heberger: {
      display: 'flex',
      flexDirection: 'column',
      alignItems: 'center',
      width: '85%',
      elevation: 10,
      backgroundColor: Globals.COLORS.white,
      marginTop: 100,
    },
    middle_fields_container: {
      flexDirection: 'column',
      alignItems: 'center',
      justifyContent: 'space-around',
    },
    midle_prop_title: {
      fontWeight: '300',
      color: Globals.COLORS.grey,
      fontSize: 13,
      marginTop: 5,
    },
    midle_prop_value: {
      fontWeight: 'bold',
      fontSize: 16,
      color: '#000',
    },
    autor_name: {
      fontWeight: 'bold',
      fontSize: 20,
      color: Globals.COLORS.blue_dark,
      marginTop: 10,
    },

    loginButtonLabel: {
      fontWeight: 'bold',
      color: Globals.COLORS.primary_pure,
      fontSize: 16,
    },
  });
  tyleRecorder = StyleSheet.create({
    main_container: {
      backgroundColor: Globals.COLORS.white,
    },
    top_container: {
      display: 'flex',
      flexDirection: 'row',
      alignItems: 'center',
      justifyContent: 'space-between',
      margin: 10,
    },
    bottom_container: {
      textAlign: 'center',
      marginTop: 120,
      display: 'flex',
      flexDirection: 'row',
      justifyContent: 'space-between',
      alignItems: 'center',
    },
    image: {
      borderRadius: 50,
      height: 100,
      width: '30%',
      padding: 4,
    },
    pass_button: {
      borderRadius: 50,
      textAlign: 'center',
      width: '90%',
      padding: 4,
    },
    middle_heberger: {
      paddingTop: 50,
    },
    middle_container: {
      display: 'flex',
      flexDirection: 'column',
      justifyContent: 'space-around',
      alignItems: 'center',
      padding: 20,
    },
    middle_fields_container: {
      flexDirection: 'column',
      alignItems: 'center',
      justifyContent: 'space-around',
    },
    translate_text: {
      fontWeight: 'normal',
      textAlignVertical: 'center',
      fontStyle: 'italic',
      color: Globals.COLORS.arsenic,
      fontSize: 15,
    },
    translate_value: {
      fontWeight: 'bold',
      color: Globals.COLORS.black,
      fontSize: 20,
      paddingBottom: 20,
      textAlign: 'center',
      paddingTop: 8,
    },
    translate_lang: {
      fontWeight: 'bold',
      color: Globals.COLORS.blue_dark,
      paddingBottom: 20,
    },
    midle_prop_title: {
      fontWeight: 'bold',
      fontSize: 18,
    },
    midle_prop_value: {
      fontWeight: '700',
      color: Globals.COLORS.arsenic,
      fontSize: 14,
    },
    loginButtonLabel: {
      fontWeight: 'bold',
      color: Globals.COLORS.primary_pure,
      fontSize: 16,
    },
  });
  tyleChallenge = StyleSheet.create({
    main_container: {backgroundColor: 'white', height: '100%'},
    middle_container: {minHeight: 200},
    main_scroller: {
      paddingBottom: '10%',
      width: '100%',
    },
    text_top: {
      width: '100%',
      textAlign: 'center',
      color: 'black',
    },
    top_metaCont: {
      display: 'flex',
      flexDirection: 'column',
      justifyContent: 'space-between',
      backgroundColor: '#c4c4c4ff',
      padding: 10,
      width: 120,
    },
    metaCont: {
      display: 'flex',
      flexDirection: 'row',
      justifyContent: 'space-between',
      marginBottom: 40,
    },
    unity_page: {
      display: 'flex',
      justifyContent: 'center',
      alignItems: 'center',
      margin: 3,
      padding: 10,
    },
  });
} else if (mobile_500_1000) {
  tyleSignIn = StyleSheet.create({
    wrapper: {},
  });
}
export const styleSignIn = tyleSignIn,
  styleDashBoard = tyleDashBoard,
  styleChallenge = tyleChallenge,
  styleRecorder = tyleRecorder;
