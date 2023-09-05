import NetInfo from '@react-native-community/netinfo';
import Globals from '../Ressources/Globals';
import Neter from '../Ressources/Neter';
import Storer from './storer';
import axios from 'axios';
const baseUrl = Neter.uri1;
let Fetcher = {
  FetchInternet: function () {
    NetInfo.addEventListener(state => {
      Globals.INTERNET = state.isInternetReachable;
      Storer.getData('@w_req').then(reqo => {
        if (reqo) {
          this.Handle_Update();
        }
      });
    });
  },
  AuthSignup: async function (setdada) {
    let url = baseUrl + '/users';
    let res = await fetch(url, {
      method: 'post',
      body: JSON.stringify(setdada),
      headers: {
        'Content-Type': 'application/json',
      },
    });
    return await res.json();
  },
  AuthSignout: async function (setdada) {
    let url = baseUrl + '/users/sign_out';
    let res = await fetch(url, {
      method: 'DELETE',
      body: JSON.stringify(setdada),
      headers: {
        'Content-Type': 'application/json',
      },
    });
    return await res.json();
  },
  AuthSignin: async function (setdada) {
    let url = baseUrl + '/users/sign_in';
    let res = await axios.post(url, setdada, {
      headers: {
        'Content-Type': 'application/json',
      },
    });
    return res;
  },
  AuthSigninF: async function (setdada) {
    let url = baseUrl + '/users/sign_in';
    console.log(url);
    let res = await fetch(url, {
      method: 'post',
      body: JSON.stringify(setdada),
      headers: {
        'Content-Type': 'application/json',
      },
    });
    console.log(res.text());
    return await res.json();
  },
  GetUserData: async function (setdada) {
    let url = baseUrl + '/api/users/login';
    let res = await fetch(url, {
      method: 'POST',
      body: setdada,
      headers: {
        'Content-Type': 'application/json',
      },
    });
    return await res.json();
  },
  GetSection: async function (setdada) {
    let url = baseUrl + '/clips';
    let res = await axios.get(url);
    return res;
  },
  GetSectionF: async function (setdada) {
    let url = baseUrl + '/clips';
    let res = await fetch(url, {
      method: 'GET',
      headers: {
        Accept: 'application/json',
        'Content-Type': 'application/json',
      },
    });
    console.log(res.status);
    return await res.text();
  },
  GetChallenges: async function (setdada) {
    let url = baseUrl + '/api/challenge/results';
    let res = await fetch(url, {
      method: 'POST',
      body: setdada,
      headers: {
        'Content-Type': 'application/json',
      },
    });
    return await res.json();
  },
  PutSection: async function (setdada) {
    let url = 'http://217.160.170.119:8000/api/speech/uploadfile/';
    let res = await fetch(url, {
      method: 'POST',
      body: setdada,
      redirect: 'follow',
      headers: {
        Accept: 'application/json',
        'Content-Type': false,
      },
    });
    return await res.json();
  },
  CheckAuth: async function (setdada, tk) {
    let url = baseUrl + '/auth/users/current/' + setdada;
    let res = await fetch(url, {
      method: 'POST',
      credentials: 'include',
      body: tk,
      headers: {
        Accept: 'application/json',
        'Content-Type': 'application/x-www-form-urlencoded',
      },
    });
    return await res.json();
  },
};
export default Fetcher;
