import Axios from 'axios';

const serverRoot = process.env.REACT_APP_SERVER_ROOT;
const routePrefix = '/api/admin';
const baseUrl = `${serverRoot}${routePrefix}`;

// @TODO: make interfaces
export default {
  listUsers: (request: any) => Axios.get(`${baseUrl}/listusers`),
  deleteUser: (request: any) => Axios.delete(`${baseUrl}/deleteuser`, request),
  userActive: (request: any) => Axios.post(`${baseUrl}/useractive`, request)
};
