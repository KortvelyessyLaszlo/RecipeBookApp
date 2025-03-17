import { MDBDropdown, MDBDropdownToggle, MDBDropdownMenu, MDBDropdownItem } from 'mdb-react-ui-kit';
import PropTypes from 'prop-types';

const SortDropdown = ({ sortOptions, handleSort }) => {
    const formatSortOption = (option) => {
        return option.replace(/([A-Z])/g, ' $1').trim();
    };

    return (
        <MDBDropdown>
            <MDBDropdownToggle color='secondary'>
                <img src='/src/assets/sort.png' alt="Profile" style={{ width: '20px', height: '20px' }} /> Sort By
            </MDBDropdownToggle>
            <MDBDropdownMenu>
                {sortOptions.map((option) => (
                    <MDBDropdownItem link key={option} onClick={(event) => handleSort(event, option)}>
                        {formatSortOption(option)}
                    </MDBDropdownItem>
                ))}
            </MDBDropdownMenu>
        </MDBDropdown>
    );
};

SortDropdown.propTypes = {
    sortOptions: PropTypes.array.isRequired,
    handleSort: PropTypes.func.isRequired,
};

export default SortDropdown;
