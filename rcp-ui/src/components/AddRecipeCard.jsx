import { MDBCard, MDBCardBody } from 'mdb-react-ui-kit';
import AddIcon from '../assets/add.png';
import PropTypes from 'prop-types';

const AddRecipeCard = ({ onClick }) => {
    return (
        <MDBCard className='text-center card' onClick={onClick} style={{ height: '100%' }}>
            <MDBCardBody className='card-body d-flex flex-column justify-content-center align-items-center'>
                <img src={AddIcon} alt='Add' style={{ width: '150px', height: '150px' }} />
            </MDBCardBody>
        </MDBCard>
    );
};

AddRecipeCard.propTypes = {
    onClick: PropTypes.func.isRequired,
};

export default AddRecipeCard;