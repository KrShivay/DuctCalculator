import axios from 'axios';

const API_URL = 'https://duct.gvmtraders.in/api/';

export async function registerUser(payload: any) {
  return axios.post(`${API_URL}userRegister`, payload).then(resp => {
    return resp.data;
  });
}

export async function ductSizeScreenInsert(payload: any) {
  return axios.post(`${API_URL}ductSizeScreenInsert`, payload).then(resp => {
    return resp.data;
  });
}
export async function ductMoreDetailsInsert(payload: any) {
  return axios.post(`${API_URL}ductMoreDetailsInsert`, payload).then(resp => {
    return resp.data;
  });
}
