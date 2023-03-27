/**
 * @format
 */

import {AppRegistry} from 'react-native';
import App from './App';
import {name as appName} from './app.json';
import setupAxios from './API/axiosConfig';
import axios from 'axios';
setupAxios(axios);

AppRegistry.registerComponent(appName, () => App);
