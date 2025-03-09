import axios from 'axios';

const API_URL_RECIPES = 'http://localhost:8080/api/recipe';

const getRecipes = async () => {
    const response = await axios.get(API_URL_RECIPES);
    return response.data;
};

export { getRecipes };
