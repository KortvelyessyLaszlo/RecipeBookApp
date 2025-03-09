import { MDBContainer, MDBRow, MDBCol, MDBCard, MDBCardBody, MDBCardTitle, MDBCardImage } from 'mdb-react-ui-kit';
import { Alert } from 'react-bootstrap';
import PropTypes from 'prop-types';
import { useEffect, useState } from 'react';
import { getRecipes } from './service/recipeservice';

const RecipeList = ({ searchTerm }) => {
  const [recipes, setRecipes] = useState([]);
  const [error, setError] = useState(null);

  useEffect(() => {
    const fetchRecipes = async () => {
      try {
        const data = await getRecipes();
        setRecipes(data);
      } catch {
        setError('Failed to fetch recipes. Please try again later.');
      }
    };
    fetchRecipes();
  }, []);

  const filteredRecipes = recipes.filter((recipe) =>
    recipe.title.toLowerCase().includes(searchTerm.toLowerCase())
  );

  return (
    <MDBContainer className='mt-4'>
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
  );
};

RecipeList.propTypes = {
  searchTerm: PropTypes.string.isRequired,
};

export default RecipeList;
