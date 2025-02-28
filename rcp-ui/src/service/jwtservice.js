import axios from 'axios';

const API_URL = 'http://localhost:8080/api/auth/';

const login = async (username, password) => {
  const response = await axios.post(API_URL + 'login', { username, password });
  if (response.data) {
    saveToken(response.data);
  }
  return response.data;
};

const saveToken = (token) => {
  localStorage.setItem('token', token);
};

const getToken = () => {
  return localStorage.getItem('token');
};

const AuthService = {
  login,
  saveToken,
  getToken,
};

export default AuthService;
