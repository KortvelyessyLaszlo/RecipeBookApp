import { useParams } from 'react-router-dom';
import { useState, useEffect } from 'react';
import { MDBContainer, MDBRow, MDBCol, MDBCard, MDBCardBody, MDBCardTitle, MDBCardImage, MDBCardText } from 'mdb-react-ui-kit';
import { getRecipeById } from './service/recipeservice';

const RecipeDetails = () => {
    const { id } = useParams();
    const [recipe, setRecipe] = useState(null);

    useEffect(() => {
        const fetchRecipe = async () => {
            const data = await getRecipeById(id);
            setRecipe(data);
        };
        fetchRecipe();
    }, [id]);

    if (!recipe) return <div>Loading...</div>;

    return (
        <MDBContainer className='mt-4'>
            <MDBRow className='justify-content-center'>
                <MDBCol md='8'>
                    <MDBCard className='w-100 recipe-details-card'>
                        <MDBCardImage src={`data:image/jpeg;base64,${recipe.image}`} alt={recipe.title} position='top' />
                        <MDBCardBody>
                            <MDBCardTitle>{recipe.title}</MDBCardTitle>
                            <MDBCardText>
                                <strong>Author:</strong> {recipe.author}
                            </MDBCardText>
                            <MDBCardText>{recipe.instructions}</MDBCardText>
                            <MDBCardText><strong>Cooking Time:</strong> {recipe.cookingTime} minutes</MDBCardText>
                            <MDBCardText><strong>Ingredients:</strong></MDBCardText>
                            <ul>
                                {recipe.ingredients.map((ingredient, index) => (
                                    <li key={index}>{ingredient.name} - {ingredient.amount}</li>
                                ))}
                            </ul>
                        </MDBCardBody>
                    </MDBCard>
                </MDBCol>
            </MDBRow>
        </MDBContainer>
    );
};

export default RecipeDetails;