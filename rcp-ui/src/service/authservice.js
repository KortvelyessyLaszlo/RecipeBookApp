import axios from 'axios';

const API_URL = 'http://localhost:8080/api/auth/';

const login = async (username, password) => {
  const response = await axios.post(API_URL + 'login', { username, password });
  if (response.data) {
    saveToken(response.data);
  }
  return response.data;
};

const logout = () => {
  localStorage.removeItem('token');
};

const saveToken = (token) => {
  localStorage.setItem('token', token);
};

const getToken = () => {
  return localStorage.getItem('token');
};

const checkAuth = async () => {
  const token = getToken();
  if (!token) return false;

  try {
    const response = await axios.get(API_URL + 'check', {
      headers: { Authorization: `Bearer ${token}` },
    });
    return response.status === 200;
  } catch {
    return false;
  }
};

const AuthService = {
  login,
  logout,
  checkAuth,
};

export default AuthService;