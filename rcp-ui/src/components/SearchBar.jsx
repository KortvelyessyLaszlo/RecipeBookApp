import PropTypes from 'prop-types';
import { MDBInputGroup, MDBInput, MDBBtn } from 'mdb-react-ui-kit';
import searchIcon from '../assets/search.png';
import { useState } from 'react';

const SearchBar = ({ onSearch }) => {
    const [searchTerm, setSearchTerm] = useState('');

    const handleKeyDown = (event) => {
        if (event.key === 'Enter') {
            onSearch(searchTerm);
        }
    };

    const handleSearch = () => {
        onSearch(searchTerm);
    };

    return (
        <MDBInputGroup className="search-bar" style={{ maxWidth: '40%', margin: 'auto' }}>
            <MDBInput
                type="text"
                placeholder="Search recipes..."
                style={{ backgroundColor: '#f8f9fa', padding: '0.5rem 1rem' }}
                value={searchTerm}
                onChange={(e) => setSearchTerm(e.target.value)}
                onKeyDown={handleKeyDown}
            />
            <MDBBtn color="primary" onClick={handleSearch}>
                <img src={searchIcon} alt="Search" width="20" height="20" />
            </MDBBtn>
        </MDBInputGroup>
    );
};

SearchBar.propTypes = {
    onSearch: PropTypes.func.isRequired,
};

export default SearchBar;
