import { useState, useEffect } from 'react';
import { useNavigate } from 'react-router-dom';
import {
    MDBContainer,
    MDBRow,
    MDBCol,
    MDBCard,
    MDBCardBody,
    MDBCardTitle,
    MDBInput,
    MDBBtn,
    MDBSpinner
} from 'mdb-react-ui-kit';
import { Alert } from 'react-bootstrap';
import AuthService from './service/authservice';

const Settings = () => {
    const [username, setUsername] = useState('');
    const [currentUsername, setCurrentUsername] = useState('');
    const [currentPassword, setCurrentPassword] = useState('');
    const [newPassword, setNewPassword] = useState('');
    const [confirmPassword, setConfirmPassword] = useState('');
    const [error, setError] = useState('');
    const [success, setSuccess] = useState('');
    const [isLoading, setIsLoading] = useState(false);
    const [activeTab, setActiveTab] = useState('username');
    const navigate = useNavigate();

    useEffect(() => {
        const checkAuth = async () => {
            const isAuthenticated = await AuthService.checkAuth();
            if (!isAuthenticated) {
                navigate('/login');
                return;
            }

            try {
                const username = await AuthService.getUserProfile();
                setUsername(username);
                setCurrentUsername(username);
            } catch {
                setError('Failed to load user profile. Please try again later.');
            }
        };

        checkAuth();
    }, [navigate]);

    const handleUsernameChange = async (e) => {
        e.preventDefault();
        setError('');
        setSuccess('');

        if (username === currentUsername) {
            setError('New username is the same as current username.');
            return;
        }

        if (username.length < 4) {
            setError('Username must be at least 4 characters long.');
            return;
        }

        setIsLoading(true);
        try {
            await AuthService.updateUsername(username);
            setCurrentUsername(username);
            setSuccess('Username updated successfully.');
        } catch {
            setError('Failed to update username. Please try again later.');
        } finally {
            setIsLoading(false);
        }
    };

    const handlePasswordChange = async (e) => {
        e.preventDefault();
        setError('');
        setSuccess('');

        if (!currentPassword || !newPassword || !confirmPassword) {
            setError('All fields are required.');
            return;
        }

        if (newPassword.length < 4) {
            setError('New password must be at least 4 characters long.');
            return;
        }

        if (newPassword !== confirmPassword) {
            setError('New passwords do not match.');
            return;
        }

        setIsLoading(true);
        try {
            await AuthService.updatePassword(currentPassword, newPassword);
            setCurrentPassword('');
            setNewPassword('');
            setConfirmPassword('');
            setSuccess('Password updated successfully.');
        } catch {
            setError('Failed to update password. Please check your current password.');
        } finally {
            setIsLoading(false);
        }
    };

    return (
        <MDBContainer className="mt-5">
            <MDBRow className="justify-content-center">
                <MDBCol md="6">
                    <MDBCard>
                        <MDBCardBody>
                            <div className="d-flex align-items-center mb-4 position-relative">                                <div
                                className="position-absolute start-0 ms-2"
                                style={{ cursor: 'pointer' }}
                                onClick={() => navigate('/')}
                            >
                                <i className="fas fa-arrow-left fa-lg text-muted"></i>
                            </div>
                                <MDBCardTitle className="w-100 text-center m-0">Account Settings</MDBCardTitle>
                            </div>

                            {error && <Alert variant="danger">{error}</Alert>}
                            {success && <Alert variant="success">{success}</Alert>}

                            <div className="d-flex mb-4">
                                <MDBBtn
                                    color={activeTab === 'username' ? 'primary' : 'light'}
                                    onClick={() => setActiveTab('username')}
                                    className="me-2"
                                >
                                    Change Username
                                </MDBBtn>
                                <MDBBtn
                                    color={activeTab === 'password' ? 'primary' : 'light'}
                                    onClick={() => setActiveTab('password')}
                                >
                                    Change Password
                                </MDBBtn>
                            </div>

                            {activeTab === 'username' ? (
                                <form onSubmit={handleUsernameChange}>
                                    <MDBInput
                                        wrapperClass="mb-4"
                                        label="Username"
                                        value={username}
                                        onChange={(e) => setUsername(e.target.value)}
                                        required
                                    />
                                    <MDBBtn
                                        type="submit"
                                        className="w-100"
                                        disabled={isLoading || username === currentUsername}
                                    >
                                        {isLoading ? <MDBSpinner size="sm" /> : 'Update Username'}
                                    </MDBBtn>
                                </form>
                            ) : (
                                <form onSubmit={handlePasswordChange}>
                                    <MDBInput
                                        wrapperClass="mb-4"
                                        label="Current Password"
                                        type="password"
                                        value={currentPassword}
                                        onChange={(e) => setCurrentPassword(e.target.value)}
                                        required
                                    />
                                    <MDBInput
                                        wrapperClass="mb-4"
                                        label="New Password"
                                        type="password"
                                        value={newPassword}
                                        onChange={(e) => setNewPassword(e.target.value)}
                                        required
                                    />
                                    <MDBInput
                                        wrapperClass="mb-4"
                                        label="Confirm New Password"
                                        type="password"
                                        value={confirmPassword}
                                        onChange={(e) => setConfirmPassword(e.target.value)}
                                        required
                                    />
                                    <MDBBtn
                                        type="submit"
                                        className="w-100"
                                        disabled={isLoading || !currentPassword || !newPassword || !confirmPassword}
                                    >
                                        {isLoading ? <MDBSpinner size="sm" /> : 'Update Password'}
                                    </MDBBtn>
                                </form>
                            )}
                        </MDBCardBody>
                    </MDBCard>
                </MDBCol>
            </MDBRow>
        </MDBContainer>
    );
};

export default Settings;
