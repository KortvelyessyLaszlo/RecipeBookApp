import { useState, useEffect } from 'react';
import { Alert } from 'react-bootstrap';
import { MDBContainer, MDBRow, MDBCol, MDBCard, MDBCardBody, MDBCardTitle, MDBInput, MDBBtn, MDBTextArea, MDBSpinner } from 'mdb-react-ui-kit';
import { getIngredients, addRecipe } from './service/recipeservice';
import Autocomplete from '@mui/material/Autocomplete';
import TextField from '@mui/material/TextField';
import { useNavigate } from 'react-router-dom';

const AddRecipe = () => {
    const navigate = useNavigate();
    const [title, setTitle] = useState('');
    const [ingredients, setIngredients] = useState([{ name: '', amount: '' }]);
    const [instructions, setInstructions] = useState('');
    const [image, setImage] = useState(null);
    const [cookingTime, setCookingTime] = useState('');
    const [ingredientOptions, setIngredientOptions] = useState([]);
    const [error, setError] = useState(null);
    const [submitting, setSubmitting] = useState(false);

    useEffect(() => {
        const fetchIngredients = async () => {
            const ingredients = await getIngredients();
            setIngredientOptions(ingredients);
        };
        fetchIngredients();
    }, []);

    const handleIngredientChange = (index, event, value) => {
        const values = [...ingredients];
        values[index].name = value || event.target.value;
        setIngredients(values);
    };

    const handleIngredientAmountChange = (index, event) => {
        const values = [...ingredients];
        values[index].amount = event.target.value;
        setIngredients(values);
    };

    const handleAddIngredient = () => {
        setIngredients([...ingredients, { name: '', amount: '' }]);
    };

    const handleRemoveIngredient = (index) => {
        const values = [...ingredients];
        values.splice(index, 1);
        setIngredients(values);
    };

    const handleImageChange = (event) => {
        const file = event.target.files[0];
        const reader = new FileReader();
        reader.readAsDataURL(file);
        reader.onloadend = () => {
            const base64String = reader.result.split(',')[1];
            setImage(base64String);
        };
    }; const handleSubmit = async (event) => {
        event.preventDefault();
        setSubmitting(true);

        const recipe = {
            title,
            ingredients,
            instructions,
            image,
            cookingTime,
        };

        try {
            await addRecipe(recipe);
            navigate('/my-recipes');
        } catch {
            setError('Failed to add recipe. Please try again later.');
        } finally {
            setSubmitting(false);
        }
    };

    return (
        <MDBContainer className='d-flex justify-content-center align-items-center min-vh-100'>
            <MDBRow className='justify-content-center w-100'>
                <MDBCol md='8'>
                    {error && <Alert variant='danger'>{error}</Alert>}
                    <MDBCard className='w-100'>
                        <MDBCardBody>
                            <div className="d-flex align-items-center mb-4 position-relative">
                                <div
                                    className="position-absolute start-0"
                                    style={{ cursor: 'pointer' }}
                                    onClick={() => navigate('/my-recipes')}
                                >
                                    <i className="fas fa-arrow-left fa-lg text-muted"></i>
                                </div>
                                <MDBCardTitle className="w-100 text-center m-0">Add New Recipe</MDBCardTitle>
                            </div>
                            <form onSubmit={handleSubmit}>
                                <MDBInput label='Title' value={title} onChange={(e) => setTitle(e.target.value)} required />
                                <MDBCardTitle className='mt-4'>Ingredients</MDBCardTitle>
                                {ingredients.map((ingredient, index) => (
                                    <MDBRow key={index} className='mb-2'>
                                        <MDBCol md='5'>
                                            <Autocomplete
                                                freeSolo
                                                options={ingredientOptions}
                                                getOptionLabel={(option) => option}
                                                value={ingredient.name}
                                                onChange={(event, value) => handleIngredientChange(index, event, value)}
                                                renderInput={(params) => <TextField {...params} label='Name' onChange={(event) => handleIngredientChange(index, event, event.target.value)} size='small' required />}
                                            />
                                        </MDBCol>
                                        <MDBCol md='5'>
                                            <MDBInput label='Amount' name='amount' value={ingredient.amount} onChange={(e) => handleIngredientAmountChange(index, e)} required style={{ height: '40px' }} />
                                        </MDBCol>
                                        <MDBCol md='2' className='d-flex align-items-center'>
                                            <MDBBtn type='button' color='danger' onClick={() => handleRemoveIngredient(index)}>Remove</MDBBtn>
                                        </MDBCol>
                                    </MDBRow>
                                ))}
                                <MDBBtn color='info' type='button' onClick={handleAddIngredient}>Add Ingredient</MDBBtn>
                                <MDBTextArea label='Instructions' value={instructions} onChange={(e) => setInstructions(e.target.value)} rows='4'
                                    className='mt-4' required style={{ resize: 'none', overflow: 'hidden' }}
                                    onInput={(e) => { e.target.style.height = 'auto'; e.target.style.height = e.target.scrollHeight + 'px'; }} />
                                <MDBInput type='file' accept='.jpg,.jpeg,.png' onChange={handleImageChange} className='mt-4' required />                                <MDBInput label='Cooking Time (minutes)' type='number' value={cookingTime} onChange={(e) => setCookingTime(e.target.value)} className='mt-4' required />
                                <MDBBtn type='submit' color='primary' className='mt-4' disabled={submitting}>
                                    {submitting ? (
                                        <>
                                            <MDBSpinner size='sm' className='me-2' />
                                            Adding...
                                        </>
                                    ) : 'Submit'}
                                </MDBBtn>
                            </form>
                        </MDBCardBody>
                    </MDBCard>
                </MDBCol>
            </MDBRow>
        </MDBContainer>
    );
};

export default AddRecipe;