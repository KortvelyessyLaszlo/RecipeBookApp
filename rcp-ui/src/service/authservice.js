import axios from 'axios';

const API_URL = 'http://localhost:8080/api/auth/';
const API_URL_USERS = 'http://localhost:8080/api/user/';

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

const checkAdminRole = async () => {
  const token = getToken();
  if (!token) return false;
  
  try {
    const response = await axios.get(API_URL + 'checkAdminRole', {
      headers: { Authorization: `Bearer ${token}` },
    });
    return response.status === 200;
  } catch {
    return false;
  }
};

const getUserProfile = async () => {
  const token = getToken();
  if (!token) throw new Error('Not authenticated');

  const response = await axios.get(API_URL_USERS + 'profile', {
    headers: { Authorization: `Bearer ${token}` },
  });
  return response.data;
};

const updateUsername = async (newUsername) => {
  const token = getToken();
  if (!token) throw new Error('Not authenticated');

  const response = await axios.put(API_URL_USERS + 'update/username', 
    { username: newUsername }, 
    {
      headers: { Authorization: `Bearer ${token}` },
    }
  );
  if (response.data) {
    saveToken(response.data);
  }
  return response.data;
};

const updatePassword = async (currentPassword, newPassword) => {
  const token = getToken();
  if (!token) throw new Error('Not authenticated');

  const response = await axios.put(API_URL_USERS + 'update/password', 
    { 
      currentPassword,
      newPassword
    }, 
    {
      headers: { Authorization: `Bearer ${token}` },
    }
  );
  if (response.data) {
    saveToken(response.data);
  }
  return response.data;
};

const AuthService = {
  login,
  logout,
  checkAuth,
  checkAdminRole,
  getUserProfile,
  updateUsername,
  updatePassword
};

export default AuthService;