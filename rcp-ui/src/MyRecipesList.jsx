import { MDBContainer, MDBRow, MDBCol, MDBCard, MDBCardBody, MDBCardTitle, MDBCardImage, MDBNavbar, MDBNavbarBrand, MDBNavbarNav, MDBNavbarItem, MDBNavbarLink } from 'mdb-react-ui-kit';
import { Alert } from 'react-bootstrap';
import { useEffect, useState } from 'react';
import { getUserRecipes } from './service/recipeservice';
import SearchBar from './components/SearchBar';

const MyRecipesList = () => {
    const [recipes, setRecipes] = useState([]);
    const [error, setError] = useState(null);
    const [searchTerm, setSearchTerm] = useState('');

    useEffect(() => {
        const fetchRecipes = async () => {
            try {
                const userRecipes = await getUserRecipes();
                setRecipes(userRecipes);
            } catch {
                setError('Failed to load recipes. Please try again later.');
            }
        };
        fetchRecipes();
    }, []);

    const handleSearch = (term) => {
        setSearchTerm(term);
    };

    const filteredRecipes = recipes.filter((recipe) =>
        recipe.title.toLowerCase().includes(searchTerm.toLowerCase())
    );

    return (
        <>
            <MDBNavbar expand='lg' light style={{ backgroundColor: '#d1e7ff' }}>
                <MDBContainer fluid>
                    <MDBNavbarBrand href='/'>Home</MDBNavbarBrand>
                    <MDBNavbarNav className='w-100 d-flex align-items-center justify-content-between'>
                        <MDBNavbarItem className='mx-auto' style={{ flex: 0.3 }}>
                            <SearchBar onSearch={handleSearch} />
                        </MDBNavbarItem>
                        <MDBNavbarItem>
                            <MDBNavbarLink href='/add-recipe'>Add New Recipe</MDBNavbarLink>
                        </MDBNavbarItem>
                    </MDBNavbarNav>
                </MDBContainer>
            </MDBNavbar>
            <MDBContainer fluid className='mt-4'>
                {error && <Alert variant='danger' className='mb-4'>{error}</Alert>}
                <MDBRow>
                    {filteredRecipes.map((recipe) => (
                        <MDBCol key={recipe.id} className='mb-4 recipe-card' md='3' sm='6' xs='12'>
                            <MDBCard className='text-center' style={{ borderRadius: '10px' }}>
                                {recipe.image && <MDBCardImage src={`data:image/jpeg;base64,${recipe.image}`} alt={recipe.title} style={{ width: '100%', borderTopLeftRadius: '10px', borderTopRightRadius: '10px' }} />}
                                <MDBCardBody>
                                    <MDBCardTitle>{recipe.title}</MDBCardTitle>
                                </MDBCardBody>
                            </MDBCard>
                        </MDBCol>
                    ))}
                </MDBRow>
            </MDBContainer>
        </>
    );
};

export default MyRecipesList;