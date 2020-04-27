import Axios from 'axios';

const serverRoot = process.env.REACT_APP_SERVER_ROOT;
const routePrefix = '/api/profile';
const baseUrl = `${serverRoot}${routePrefix}`;

// @TODO: make interfaces
export default {
  getProfile: () => Axios.get(`${baseUrl}`),
  updateProfile: (request: any) => Axios.patch(`${baseUrl}`, request)
};
