import { useState, useEffect } from 'react';
import { MDBIcon, MDBSpinner, MDBModal, MDBModalDialog, MDBModalContent, MDBModalHeader, MDBModalTitle, MDBModalBody, MDBModalFooter, MDBBtn } from 'mdb-react-ui-kit';
import { submitRating, getRecipeRating } from '../service/recipeservice';
import AuthService from '../service/authservice';
import { useNavigate } from 'react-router-dom';
import PropTypes from 'prop-types';

const RatingSection = ({ recipeId }) => {
    const navigate = useNavigate();
    const [hoveredRating, setHoveredRating] = useState(0);
    const [showRatingPopup, setShowRatingPopup] = useState(false);
    const [rating, setRating] = useState(0);
    const [isLoggedIn, setIsLoggedIn] = useState(false);
    const [isLoading, setIsLoading] = useState(false);
    const [showLoginModal, setShowLoginModal] = useState(false);

    useEffect(() => {
        const fetchRating = async () => {
            try {
                const ratingData = await getRecipeRating(recipeId);
                setRating(ratingData);
            } catch {
                setRating(0);
            }
        };

        const checkAuth = async () => {
            const authenticated = await AuthService.checkAuth();
            setIsLoggedIn(authenticated);
        };

        fetchRating();
        checkAuth();
    }, [recipeId]);

    const handleStarLeave = () => {
        setShowRatingPopup(false);
        setHoveredRating(0);
    }; const handleRatingSubmit = async (ratingValue) => {
        if (!isLoggedIn) {
            setShowLoginModal(true);
            return;
        }

        try {
            setIsLoading(true);
            await submitRating(recipeId, ratingValue);

            try {
                const updatedRating = await getRecipeRating(recipeId);
                setRating(updatedRating);
            } catch {
                setRating(ratingValue);
            } finally {
                setIsLoading(false);
            }
        } catch {
            setIsLoading(false);
        }
    };

    const handleLoginRedirect = () => {
        navigate('/login');
    };

    return (
        <div className="d-flex align-items-center mb-3">
            <strong className="me-2">Rating:</strong>
            <div className="d-flex position-relative"
                onMouseEnter={() => setShowRatingPopup(true)}
                onMouseLeave={handleStarLeave}>                {isLoading ? (
                    <>
                        <div className="d-flex align-items-center">
                            <MDBSpinner size='sm' className="me-2" />
                        </div>
                    </>
                ) : (
                    <>
                        {[...Array(5)].map((_, i) => (
                            <div key={i}>
                                {i < Math.floor(rating) ? (
                                    <MDBIcon
                                        icon="star"
                                        size="lg"
                                        color="warning"
                                        className="me-1"
                                    />
                                ) : i === Math.floor(rating) && rating % 1 >= 0.5 ? (
                                    <MDBIcon
                                        icon="star-half-alt"
                                        size="lg"
                                        color="warning"
                                        className="me-1"
                                    />
                                ) : (
                                    <MDBIcon
                                        far
                                        icon="star"
                                        size="lg"
                                        style={{ color: '#e4a11b' }}
                                        className="me-1"
                                    />
                                )}
                            </div>
                        ))}
                        <span className="ms-2">({rating.toFixed(1)}/5)</span>
                    </>
                )}{showRatingPopup && (
                    <div className="position-absolute"
                        style={{
                            top: '-80px',
                            left: '0',
                            backgroundColor: '#fff',
                            padding: '15px',
                            border: '1px solid #ddd',
                            borderRadius: '5px',
                            boxShadow: '0 2px 5px rgba(0,0,0,0.2)',
                            zIndex: 100,
                            width: '220px'
                        }}>
                        <p className="m-0 mb-2">Rate this recipe:</p>
                        <div className="d-flex">
                            {[...Array(5)].map((_, i) => (
                                <div key={i}
                                    onMouseEnter={() => setHoveredRating(i + 1)}
                                    onClick={() => handleRatingSubmit(i + 1)}
                                    style={{ cursor: 'pointer' }}>
                                    {i < hoveredRating ? (
                                        <MDBIcon
                                            icon="star"
                                            size="lg"
                                            color="warning"
                                            className="me-1"
                                        />
                                    ) : (
                                        <MDBIcon
                                            far
                                            icon="star"
                                            size="lg"
                                            style={{ color: '#e4a11b' }}
                                            className="me-1"
                                        />
                                    )}
                                </div>
                            ))}
                            {hoveredRating > 0 && <span className="ms-2">{hoveredRating}/5</span>}
                        </div>
                    </div>
                )}
            </div>
            {showLoginModal && (
                <MDBModal open={showLoginModal} tabIndex='-1' onClose={() => setShowLoginModal(false)}>
                    <MDBModalDialog centered>
                        <MDBModalContent>
                            <MDBModalHeader>
                                <MDBModalTitle>Login Required</MDBModalTitle>
                                <MDBBtn className='btn-close' color='none' onClick={() => setShowLoginModal(false)}></MDBBtn>
                            </MDBModalHeader>
                            <MDBModalBody>
                                <p>You need to be logged in to rate recipes.</p>
                            </MDBModalBody>
                            <MDBModalFooter>
                                <MDBBtn color='secondary' onClick={() => setShowLoginModal(false)}>
                                    Cancel
                                </MDBBtn>
                                <MDBBtn onClick={handleLoginRedirect}>
                                    Go to Login
                                </MDBBtn>
                            </MDBModalFooter>
                        </MDBModalContent>
                    </MDBModalDialog>
                </MDBModal>
            )}
        </div>
    );
};

RatingSection.propTypes = {
    recipeId: PropTypes.string.isRequired
};

export default RatingSection;
