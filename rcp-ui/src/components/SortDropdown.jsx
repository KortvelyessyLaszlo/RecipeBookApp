import { MDBDropdown, MDBDropdownToggle, MDBDropdownMenu, MDBDropdownItem } from 'mdb-react-ui-kit';
import PropTypes from 'prop-types';

const SortDropdown = ({ handleSort }) => {

    return (
        <MDBDropdown>
            <MDBDropdownToggle color='secondary'>
                <img src='/src/assets/sort.png' alt="Profile" style={{ width: '20px', height: '20px' }} /> Sort By
            </MDBDropdownToggle>
            <MDBDropdownMenu>
                <MDBDropdownItem link onClick={(e) => handleSort(e, 'rating', 'desc')}>Top Rated</MDBDropdownItem>
                <MDBDropdownItem link onClick={(e) => handleSort(e, 'createdAt', 'desc')}>Most Recent</MDBDropdownItem>
                <MDBDropdownItem link onClick={(e) => handleSort(e, 'cookingTime', 'asc')}>Quickest</MDBDropdownItem>
            </MDBDropdownMenu>
        </MDBDropdown>
    );
};

SortDropdown.propTypes = {
    handleSort: PropTypes.func.isRequired,
};

export default SortDropdown;
