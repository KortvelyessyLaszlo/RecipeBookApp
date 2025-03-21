import { MDBContainer, MDBRow, MDBCol, MDBCard, MDBCardBody, MDBCardTitle, MDBCardImage, MDBNavbar, MDBNavbarBrand, MDBNavbarNav, MDBNavbarItem, MDBNavbarLink, MDBBtn } from 'mdb-react-ui-kit';
import { Alert, Modal, Button } from 'react-bootstrap';
import { useEffect, useState } from 'react';
import { getUserRecipes, deleteRecipeById } from './service/recipeservice';
import SearchBar from './components/SearchBar';
import { useNavigate } from 'react-router-dom';
import './styles/RecipeList.css';
import ClearIcon from './assets/clear.png';
import EditIcon from './assets/edit.png';
import HouseIcon from './assets/house.png';
import AddIcon from './assets/add.png';

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

    const filteredRecipes = recipes.filter((recipe) =>
        recipe.title.toLowerCase().includes(searchTerm.toLowerCase())
    );

    return (
        <>
            <MDBNavbar expand='lg' light style={{ backgroundColor: '#d1e7ff' }}>
                <MDBContainer fluid>
                    <MDBNavbarBrand>My recipes</MDBNavbarBrand>
                    <MDBNavbarNav className='w-100 d-flex align-items-center justify-content-between'>
                        <MDBNavbarItem className='mx-auto' style={{ flex: 0.3 }}>
                            <SearchBar onSearch={handleSearch} />
                        </MDBNavbarItem>
                        <MDBNavbarItem>
                            <MDBNavbarLink href='/'>
                                <img src={HouseIcon} alt='Home' width='40' height='40' />
                            </MDBNavbarLink>
                        </MDBNavbarItem>
                    </MDBNavbarNav>
                </MDBContainer>
            </MDBNavbar>
            <MDBContainer fluid className='mt-4'>
                {error && <Alert variant='danger' className='mb-4'>{error}</Alert>}
                <MDBRow>
                    {filteredRecipes.map((recipe) => (
                        <MDBCol key={recipe.id} className='mb-4' md='3' sm='6' xs='12'>
                            <MDBCard className='text-center card' onClick={() => handleRecipeClick(recipe.id)}>
                                {recipe.image && <MDBCardImage src={`data:image/jpeg;base64,${recipe.image}`} alt={recipe.title} className='card-image' />}
                                <MDBCardBody className='card-body'>
                                    <MDBCardTitle>{recipe.title}</MDBCardTitle>
                                    <div className='card-buttons'>
                                        <MDBBtn size='sm' color='light' className='me-2' onClick={(e) => { e.stopPropagation(); handleEditClick(recipe.id); }}>
                                            <img src={EditIcon} alt='Edit' style={{ width: '20px', height: '20px' }} />
                                        </MDBBtn>
                                        <MDBBtn size='sm' color='dark' onClick={(e) => { e.stopPropagation(); handleDelete(recipe.id); }}>
                                            <img src={ClearIcon} alt='Delete' style={{ width: '20px', height: '20px' }} />
                                        </MDBBtn>
                                    </div>
                                </MDBCardBody>
                            </MDBCard>
                        </MDBCol>
                    ))}
                    {showAddCard && (
                        <MDBCol className='mb-4' md='3' sm='6' xs='12'>
                            <MDBCard className='text-center card add-card' onClick={() => navigate('/add-recipe')} style={{ height: '100%' }}>
                                <MDBCardBody className='card-body d-flex flex-column justify-content-center align-items-center'>
                                    <img src={AddIcon} alt='Add' style={{ width: '150px', height: '150px' }} />
                                </MDBCardBody>
                            </MDBCard>
                        </MDBCol>
                    )}
                </MDBRow>
            </MDBContainer>
            <Modal show={deleteModal.show} onHide={() => handleDelete()}>
                <Modal.Header closeButton>
                    <Modal.Title>Confirm Delete</Modal.Title>
                </Modal.Header>
                <Modal.Body>Are you sure you want to delete this recipe?</Modal.Body>
                <Modal.Footer>
                    <Button variant='secondary' onClick={() => handleDelete()}>Cancel</Button>
                    <Button variant='danger' onClick={() => handleDelete(null, true)}>Delete</Button>
                </Modal.Footer>
            </Modal>
        </>
    );
};

export default MyRecipesList;