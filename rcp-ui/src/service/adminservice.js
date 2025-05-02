import axios from 'axios';

const API_URL_ADMIN = 'http://localhost:8080/api/admin';

const getAllUsers = async () => {
    const token = localStorage.getItem('token');
    const response = await axios.get(`${API_URL_ADMIN}/users`, {
        headers: {
            Authorization: `Bearer ${token}`
        }
    });
    return response.data;
};

const deleteUser = async (userId) => {
    const token = localStorage.getItem('token');
    const response = await axios.delete(`${API_URL_ADMIN}/users/${userId}`, {
        headers: {
            Authorization: `Bearer ${token}`
        }
    });
    return response.data;
};

const updateUserRole = async (userId, role) => {
    const token = localStorage.getItem('token');
    const response = await axios.put(`${API_URL_ADMIN}/users/${userId}/role`, role, {
        headers: {
            Authorization: `Bearer ${token}`,
            'Content-Type': 'text/plain'
        }
    });
    return response.data;
};

const getAllRecipes = async () => {
    const token = localStorage.getItem('token');
    const response = await axios.get(`${API_URL_ADMIN}/recipes`, {
        headers: {
            Authorization: `Bearer ${token}`
        }
    });
    return response.data;
};

const deleteRecipe = async (recipeId) => {
    const token = localStorage.getItem('token');
    const response = await axios.delete(`${API_URL_ADMIN}/recipes/${recipeId}`, {
        headers: {
            Authorization: `Bearer ${token}`
        }
    });
    return response.data;
};

const AdminService = {
    getAllUsers,
    deleteUser,
    updateUserRole,
    getAllRecipes,
    deleteRecipe
};

export default AdminService;
