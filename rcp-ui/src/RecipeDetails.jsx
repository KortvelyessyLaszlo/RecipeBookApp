import { useParams, useNavigate } from 'react-router-dom';
import { useState, useEffect } from 'react';
import { MDBContainer, MDBRow, MDBCol, MDBCard, MDBCardBody, MDBCardTitle, MDBCardImage, MDBCardText, MDBBtn, MDBSpinner } from 'mdb-react-ui-kit';
import { getRecipeById } from './service/recipeservice';
import CommentSection from './components/CommentSection';
import RatingSection from './components/RatingSection';
import commentIcon from './assets/comment.png';
import './styles/RecipeDetails.css';

const RecipeDetails = () => {
    const { id } = useParams();
    const navigate = useNavigate();
    const [recipe, setRecipe] = useState(null);
    const [showComments, setShowComments] = useState(false);

    useEffect(() => {
        const fetchRecipeData = async () => {
            const recipeData = await getRecipeById(id);
            setRecipe(recipeData);
        };

        fetchRecipeData();
    }, [id]);

    const toggleComments = () => {
        setShowComments(!showComments);
    };

    const handleCloseComments = () => {
        setShowComments(false);
    };

    if (!recipe) {
        return (
            <MDBContainer className="loading-container">
                <MDBSpinner size='lg' />
            </MDBContainer>
        );
    }

    return (
        <>
            <div className="position-fixed start-0 top-0 ms-4 mt-4"
                style={{ cursor: 'pointer', zIndex: 1000 }}
                onClick={() => navigate(-1)}>
                <i className="fas fa-arrow-left fa-lg text-muted"></i>
            </div>
            <MDBContainer className='mt-4'>
                <MDBRow className='justify-content-center'>
                    <MDBCol md='9'>
                        <MDBCard className='w-100 recipe-details-card'>
                            <MDBCardImage src={`data:image/jpeg;base64,${recipe.image}`} alt={recipe.title} position='top' />
                            <MDBCardBody>
                                <div className='d-flex justify-content-between align-items-start'>
                                    <MDBCardTitle className="mb-3">{recipe.title}</MDBCardTitle>
                                    <MDBBtn color='primary' onClick={toggleComments}>
                                        {commentIcon ? (
                                            <img src={commentIcon} alt="Comments" width="20" height="20" className="me-2" />
                                        ) : null}
                                        Comments
                                    </MDBBtn>
                                </div>
                                <MDBCardText>
                                    <strong>Author:</strong> {recipe.author}
                                </MDBCardText>
                                <RatingSection recipeId={id} />
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
                </MDBRow>            <CommentSection
                    recipeId={id}
                    isOpen={showComments}
                    onClose={handleCloseComments}
                />
            </MDBContainer>
        </>
    );
};

export default RecipeDetails;