import { MDBCard, MDBCardBody, MDBCardTitle, MDBCardImage, MDBBtn } from 'mdb-react-ui-kit';
import PropTypes from 'prop-types';
import chefIcon from '../assets/chef.png';
import clockIcon from '../assets/clock.png';
import EditIcon from '../assets/edit.png';
import ClearIcon from '../assets/clear.png';

const RecipeCard = ({ recipe, onRecipeClick, onEditClick, onDeleteClick }) => {
    return (
        <MDBCard className='text-center card' onClick={() => onRecipeClick(recipe.id)}>
            {recipe.image && <MDBCardImage src={`data:image/jpeg;base64,${recipe.image}`} alt={recipe.title} className='card-image' />}
            <MDBCardBody className='card-body'>
                <MDBCardTitle>{recipe.title}</MDBCardTitle>
                <div className='d-flex flex-wrap justify-content-between'>
                  <div className='d-flex align-items-center mb-1 me-2'>
                    <img src={chefIcon} alt='Chef' className='chef-icon' width={20} height={20}/>
                    <span className='card-author'>{recipe.author}</span>
                  </div>
                  <div className='d-flex align-items-center mb-1'>
                    <img src={clockIcon} alt='Clock' className='clock-icon' width={20} height={20}/>
                    <span className='card-cooking-time'>{recipe.cookingTime} mins</span>
                  </div>
                </div>
                <div className='card-buttons'>
                    <MDBBtn size='sm' color='light' className='me-2' onClick={(e) => { e.stopPropagation(); onEditClick(recipe.id); }}>
                        <img src={EditIcon} alt='Edit' style={{ width: '20px', height: '20px' }} />
                    </MDBBtn>
                    <MDBBtn size='sm' color='dark' onClick={(e) => { e.stopPropagation(); onDeleteClick(recipe.id); }}>
                        <img src={ClearIcon} alt='Delete' style={{ width: '20px', height: '20px' }} />
                    </MDBBtn>
                </div>
            </MDBCardBody>
        </MDBCard>
    );
};

RecipeCard.propTypes = {
    recipe: PropTypes.shape({
        id: PropTypes.number.isRequired,
        image: PropTypes.string.isRequired,
        title: PropTypes.string.isRequired,
        author: PropTypes.string.isRequired,
        cookingTime: PropTypes.number.isRequired,
    }).isRequired,
    onRecipeClick: PropTypes.func.isRequired,
    onEditClick: PropTypes.func.isRequired,
    onDeleteClick: PropTypes.func.isRequired,
};

export default RecipeCard;