import PropTypes from 'prop-types';
import SearchBar from './SearchBar';
import ProfileDropdown from './ProfileDropdown';
import { MDBNavbar, MDBNavbarNav, MDBNavbarItem, MDBContainer } from 'mdb-react-ui-kit';

const TopBar = ({ onSearch }) => {
    return (
        <MDBNavbar expand='lg' light style={{ backgroundColor: '#d1e7ff' }}>
            <MDBContainer fluid>
                <MDBNavbarNav className='w-100 d-flex align-items-center justify-content-between'>
                    <MDBNavbarItem className='mx-auto' style={{ flex: 0.3 }}>
                        <SearchBar onSearch={onSearch} />
                    </MDBNavbarItem>
                    <MDBNavbarItem>
                        <ProfileDropdown />
                    </MDBNavbarItem>
                </MDBNavbarNav>
            </MDBContainer>
        </MDBNavbar>
    );
};

TopBar.propTypes = {
    onSearch: PropTypes.func.isRequired,
};

export default TopBar;