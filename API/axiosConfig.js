import Storer from './storer';

export default function setupAxios(axios, store) {
  axios.interceptors.request.use(
    async config => {
      let token = await Storer.getData('@TOKEN');
      if (config.headers) {
        if (config.headers.post) {
          config.headers.post['Content-Type'] = 'application/json';
        }
        if (token) {
          config.headers.Authorization = `Bearer ${token}`;
        }
      }

      return config;
    },
    err => Promise.reject(err),
  );

  axios.interceptors.response.use(
    response => {
      return response;
    },
    error => {
      return Promise.reject(error);
    },
  );
}
