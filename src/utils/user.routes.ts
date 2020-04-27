import Axios from 'axios';

const serverRoot = process.env.REACT_APP_SERVER_ROOT;
const routePrefix = '/api/user';
const baseUrl = `${serverRoot}${routePrefix}`;

// @TODO: make interfaces
export default {
  login: (request: any) => Axios.post(`${baseUrl}/login`, request),
  register: (request: any) => Axios.post(`${baseUrl}/register`, request),
  changePw: (request: any) => Axios.post(`${baseUrl}/changepw`, request),
  reset: (request: any) => Axios.post(`${baseUrl}/reset`, request),
  delete: (request: any) => Axios.delete(`${baseUrl}`, request),
  devUser: (request: any) => Axios.post(`${baseUrl}/devuser`, request),
};
