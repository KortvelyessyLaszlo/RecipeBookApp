import axios from 'axios';

const API_URL_COMMENTS = 'http://localhost:8080/api/comment';

const getRecipeComments = async (recipeId) => {
    const response = await axios.get(`${API_URL_COMMENTS}/${recipeId}`);
    return response.data;
};

const addComment = async (recipeId, text) => {
    const token = localStorage.getItem('token');
    const response = await axios.post(`${API_URL_COMMENTS}/${recipeId}`, { text }, {
        headers: {
            Authorization: `Bearer ${token}`
        }
    });
    return response.data;
};

export { getRecipeComments, addComment };