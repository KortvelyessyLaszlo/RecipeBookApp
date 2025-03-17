import axios from 'axios';
import qs from 'qs';
import dayjs from 'dayjs';

const API_URL_RECIPES = 'http://localhost:8080/api/recipe';

const formatDate = (date) => dayjs(date).format('YYYY-MM-DD');

const getRecipes = async (filter = {}) => {
    if (filter.createdFrom) filter.createdFrom = formatDate(filter.createdFrom);
    if (filter.createdTo) filter.createdTo = formatDate(filter.createdTo);
    const query = qs.stringify(filter, { arrayFormat: 'repeat' });
    const response = await axios.get(`${API_URL_RECIPES}?${query}`);
    return response.data;
};

const getUserRecipes = async (filter = {}) => {
    const token = localStorage.getItem('token');
    if (filter.createdFrom) filter.createdFrom = formatDate(filter.createdFrom);
    if (filter.createdTo) filter.createdTo = formatDate(filter.createdTo);
    const query = qs.stringify(filter, { arrayFormat: 'repeat' });
    const response = await axios.get(`${API_URL_RECIPES}/myrecipes?${query}`, {
        headers: {
            Authorization: `Bearer ${token}`
        }
    });
    return response.data;
};

const getDefaultRecipeFilters = async () => {
    const response = await axios.get(`${API_URL_RECIPES}/filters`);
    return response.data;
}

const getSortOptions = async () => {
    const response = await axios.get(`${API_URL_RECIPES}/sortOptions`);
    return response.data;
};

export { getRecipes, getUserRecipes, getDefaultRecipeFilters, getSortOptions };