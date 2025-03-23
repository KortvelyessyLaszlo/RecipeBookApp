import { MDBContainer, MDBRow, MDBCol } from 'mdb-react-ui-kit';
import { Alert } from 'react-bootstrap';
import { useEffect, useState } from 'react';
import { getUserRecipes, deleteRecipeById } from './service/recipeservice';
import { useNavigate } from 'react-router-dom';
import './styles/RecipeList.css';
import MyRecipesNavbar from './components/MyRecipesNavbar';
import RecipeCard from './components/RecipeCard';
import AddRecipeCard from './components/AddRecipeCard';
import DeleteConfirmationModal from './components/DeleteConfirmationModal';

const MyRecipesList = () => {
    const [recipes, setRecipes] = useState([]);
    const [error, setError] = useState(null);
    const [searchTerm, setSearchTerm] = useState('');
    const [deleteModal, setDeleteModal] = useState({ show: false, recipeId: null });
    const [showAddCard, setShowAddCard] = useState(false);
    const navigate = useNavigate();

    useEffect(() => {
        const fetchRecipes = async () => {
            try {
                const userRecipes = await getUserRecipes();
                setRecipes(userRecipes);
                setShowAddCard(true);
            } catch {
                setError('Failed to load recipes. Please try again later.');
            }
        };
        fetchRecipes();
    }, []);

    const handleSearch = (term) => {
        setSearchTerm(term);
    };

    const handleRecipeClick = (recipeId) => {
        navigate(`/recipe/${recipeId}`);
    };

    const handleEditClick = (recipeId) => {
        navigate(`/edit-recipe/${recipeId}`);
    };

    const handleDelete = async (recipeId = null, confirm = false) => {
        if (recipeId) {
            setDeleteModal({ show: true, recipeId });
        } else if (confirm) {
            try {
                await deleteRecipeById(deleteModal.recipeId);
                setRecipes(recipes.filter(recipe => recipe.id !== deleteModal.recipeId));
            } catch {
                setError('Failed to delete recipe. Please try again later.');
            }
            setDeleteModal({ show: false, recipeId: null });
        } else {
            setDeleteModal({ show: false, recipeId: null });
        }
    };

    const handleDeleteCancel = () => {
        setDeleteModal({ show: false, recipeId: null });
    };

    const handleDeleteConfirm = () => {
        handleDelete(null, true);
    };

    const handleAddRecipe = () => {
        navigate('/add-recipe');
    };

    const filteredRecipes = recipes.filter((recipe) =>
        recipe.title.toLowerCase().includes(searchTerm.toLowerCase()) ||
        recipe.author.toLowerCase().includes(searchTerm.toLowerCase())
    );

    return (
        <>
            <MyRecipesNavbar onSearch={handleSearch} />
            <MDBContainer fluid className='mt-4 MyRecipesList'>
                {error && <Alert variant='danger' className='mb-4'>{error}</Alert>}
                <MDBRow>
                    {filteredRecipes.map((recipe) => (
                        <MDBCol key={recipe.id} className='mb-4' md='3' sm='6' xs='12'>
                            <RecipeCard 
                                recipe={recipe}
                                onRecipeClick={handleRecipeClick}
                                onEditClick={handleEditClick}
                                onDeleteClick={handleDelete}
                            />
                        </MDBCol>
                    ))}
                    {showAddCard && (
                        <MDBCol className='mb-4' md='3' sm='6' xs='12'>
                            <AddRecipeCard onClick={handleAddRecipe} />
                        </MDBCol>
                    )}
                </MDBRow>
            </MDBContainer>
            <DeleteConfirmationModal 
                show={deleteModal.show}
                onCancel={handleDeleteCancel}
                onConfirm={handleDeleteConfirm}
            />
        </>
    );
};

export default MyRecipesList;