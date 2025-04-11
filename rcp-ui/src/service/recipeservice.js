import axios from 'axios';
import qs from 'qs';
import dayjs from 'dayjs';

const API_URL_RECIPES = 'http://localhost:8080/api/recipe';

const formatDate = (date) => dayjs(date).format('YYYY-MM-DD');

const getRecipes = async (filter = {}, page = 0, size = 20, sort = '') => {
    const pagination = {
        page,
        size
    };

    if (filter.createdFrom) filter.createdFrom = formatDate(filter.createdFrom);
    if (filter.createdTo) filter.createdTo = formatDate(filter.createdTo);

    const params = {
        ...filter,
        ...pagination,
        sort
    };

    const query = qs.stringify(params, { arrayFormat: 'repeat' });
    const response = await axios.get(`${API_URL_RECIPES}?${query}`);

    const responseData = response.data;

    return {
        data: responseData.content || responseData,
        metadata: {
            totalPages: responseData.page.totalPages,
            totalElements: responseData.page.totalElements,
            size: responseData.page.size,
            number: responseData.page.number
        }
    };
}

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

const getIngredients = async () => {
    const token = localStorage.getItem('token');
    const response = await axios.get(`${API_URL_RECIPES}/ingredients`, {
        headers: {
            Authorization: `Bearer ${token}`
        }
    });
    return response.data;
};

const addRecipe = async (recipe) => {
    const token = localStorage.getItem('token');
    const response = await axios.post(`${API_URL_RECIPES}`, recipe, {
        headers: {
            Authorization: `Bearer ${token}`
        }
    });
    return response.data;
}

const getRecipeById = async (id) => {
    const response = await axios.get(`${API_URL_RECIPES}/${id}`);
    return response.data;
};

const deleteRecipeById = async (id) => {
    const token = localStorage.getItem('token');
    const response = await axios.delete(`${API_URL_RECIPES}/${id}`, {
        headers: {
            Authorization: `Bearer ${token}`
        }
    });
    return response.data;
}

const updateRecipe = async (id, recipe) => {
    const token = localStorage.getItem('token');
    const response = await axios.put(`${API_URL_RECIPES}/${id}`, recipe, {
        headers: {
            Authorization: `Bearer ${token}`
        }
    });
    return response.data;
}

export { getRecipes, getUserRecipes, getDefaultRecipeFilters, getIngredients, addRecipe, getRecipeById, deleteRecipeById, updateRecipe };