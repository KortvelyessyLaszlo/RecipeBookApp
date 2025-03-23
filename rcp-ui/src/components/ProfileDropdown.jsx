import { MDBDropdown, MDBDropdownToggle, MDBDropdownMenu, MDBDropdownItem } from 'mdb-react-ui-kit';
import profileLogo from '../assets/profile-logo.png';
import { useState, useEffect } from 'react';
import AuthService from '../service/authservice';
import { useNavigate } from 'react-router-dom';

const ProfileDropdown = () => {
    const [loggedIn, setLoggedIn] = useState(false);
    const navigate = useNavigate();

    useEffect(() => {
        const checkAuthentication = async () => {
            const isAuthenticated = await AuthService.checkAuth();
            setLoggedIn(isAuthenticated);
        };
        checkAuthentication();
    }, []);

    const handleLoginClick = (event) => {
        event.preventDefault();
        navigate('/login');
    };

    const handleLogout = (event) => {
        event.preventDefault();
        AuthService.logout();
        setLoggedIn(false);
    };

    const handleMyRecipesClick = (event) => {
        event.preventDefault();
        navigate('/my-recipes');
    };

    return (
        <MDBDropdown className="profile-logo" style={{ position: 'relative', cursor: 'pointer' }}>
            <MDBDropdownToggle tag="a" className="nav-link">
                <img src={profileLogo} alt="Profile" width="40" height="40" />
            </MDBDropdownToggle>
            <MDBDropdownMenu>
                {loggedIn ? (
                    <>
                        <MDBDropdownItem link onClick={handleMyRecipesClick}>My recipes</MDBDropdownItem>
                        <MDBDropdownItem link onClick={handleLogout}>
                            <span style={{ color: 'red' }}>Logout</span>
                        </MDBDropdownItem>
                    </>
                ) : (
                    <>
                        <MDBDropdownItem link onClick={handleLoginClick}>Login</MDBDropdownItem>
                    </>
                )}
            </MDBDropdownMenu>
        </MDBDropdown>
    );
};

export default ProfileDropdown;