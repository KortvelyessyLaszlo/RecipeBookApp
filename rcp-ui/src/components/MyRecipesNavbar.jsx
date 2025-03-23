import { MDBContainer, MDBNavbar, MDBNavbarBrand, MDBNavbarNav, MDBNavbarItem, MDBNavbarLink } from 'mdb-react-ui-kit';
import SearchBar from './SearchBar';
import PropTypes from 'prop-types';
import HouseIcon from '../assets/house.png';

const MyRecipesNavbar = ({ onSearch }) => {
    return (
        <MDBNavbar expand='lg' light style={{ backgroundColor: '#d1e7ff' }}>
            <MDBContainer fluid>
                <MDBNavbarBrand>My recipes</MDBNavbarBrand>
                <MDBNavbarNav className='w-100 d-flex align-items-center justify-content-between'>
                    <MDBNavbarItem className='mx-auto' style={{ flex: 0.3 }}>
                        <SearchBar onSearch={onSearch} />
                    </MDBNavbarItem>
                    <MDBNavbarItem>
                        <MDBNavbarLink href='/'>
                            <img src={HouseIcon} alt='Home' width='40' height='40' />
                        </MDBNavbarLink>
                    </MDBNavbarItem>
                </MDBNavbarNav>
            </MDBContainer>
        </MDBNavbar>
    );
};

MyRecipesNavbar.propTypes = {
    onSearch: PropTypes.func.isRequired,
};

export default MyRecipesNavbar;