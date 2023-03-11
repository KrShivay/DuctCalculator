import axios from 'axios';

const API_URL = 'https://duct.gvmtraders.in/api/';

export async function registerUser(payload: any) {
  return axios.post(`${API_URL}userRegister`, payload).then(resp => {
    console.log(resp.data);
    return resp.data;
  });
}

export async function ductSizeScreenInsert(payload: any) {
  return axios.post(`${API_URL}ductSizeScreenInsert`, payload).then(resp => {
    console.log(resp.data);
    return resp.data;
  });
}
export async function ductMoreDetailsInsert(payload: any) {
  return axios.post(`${API_URL}ductMoreDetailsInsert`, payload).then(resp => {
    console.log(resp.data);
    return resp.data;
  });
}
