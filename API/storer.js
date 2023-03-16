import AsyncStorage from '@react-native-async-storage/async-storage';
import * as RNFS from 'react-native-fs';

let Storer = {
  storeData: async function (key, datan) {
    try {
      await AsyncStorage.setItem(key, JSON.stringify(datan));
    } catch (e) {
      console.log('Storer' + e);
    }
  },
  FetchFromTo: async function (reference, path) {
    RNFS.exists(reference)
      .then(() => {
        RNFS.downloadFile({
          fromUrl: reference,
          toFile: path,
        }).catch(e => {
          console.log(e);
        });
      })
      .catch(direxist => {
        console.log(direxist);
      });
  },
  updateData: async function (key, datan) {
    try {
      await AsyncStorage.mergeItem(key, JSON.stringify(datan));
    } catch (e) {
      console.log('Storer' + e);
    }
  },
  getData: async function (key) {
    try {
      const jsonValue = await AsyncStorage.getItem(key);
      return jsonValue != null ? JSON.parse(jsonValue) : null;
    } catch (e) {
      console.log('Storer' + e);
    }
  },
  removeData: async function () {
    try {
      return await AsyncStorage.clear();
    } catch (e) {
      console.log('Storer' + e);
    }
  },
  removeItem: async function (key) {
    try {
      return await AsyncStorage.removeItem(key);
    } catch (e) {
      console.log('Storer' + e);
    }
  },
};

export default Storer;
