// filepath: c:\Users\lacik\Desktop\Suli\RecipeBookApp\rcp-ui\src\components\CommentSection.jsx
import { useState, useEffect } from 'react';
import { 
    MDBTextArea, 
    MDBBtn, 
    MDBCardText,
    MDBListGroup, 
    MDBListGroupItem 
} from 'mdb-react-ui-kit';
import { Alert, Offcanvas } from 'react-bootstrap';
import PropTypes from 'prop-types';
import { getRecipeComments, addComment } from '../service/commentservice';
import AuthService from '../service/authservice';

const CommentSection = ({ recipeId, isOpen, onClose }) => {
    const [comments, setComments] = useState([]);
    const [newComment, setNewComment] = useState('');
    const [error, setError] = useState(null);
    const [isLoggedIn, setIsLoggedIn] = useState(false);
    const [loading, setLoading] = useState(false);

    useEffect(() => {
        const fetchComments = async () => {
            try {
                const commentData = await getRecipeComments(recipeId);
                setComments(commentData);
            } catch {
                setError('Failed to load comments. Please try again later.');
            }
        };

        const checkAuth = async () => {
            const authenticated = await AuthService.checkAuth();
            setIsLoggedIn(authenticated);
        };

        if (isOpen) {
            fetchComments();
            checkAuth();
        }
    }, [recipeId, isOpen]);

    const handleSubmitComment = async () => {
        if (!newComment.trim()) return;
        
        try {
            setLoading(true);
            const comment = await addComment(recipeId, newComment);
            setComments([...comments, comment]);
            setNewComment('');
        } catch {
            setError('Failed to add comment. Please try again later.');
        } finally {
            setLoading(false);
        }
    };

    return (
        <Offcanvas show={isOpen} onHide={onClose} placement="end" className="comments-drawer">
            <Offcanvas.Header closeButton>
                <Offcanvas.Title>Comments</Offcanvas.Title>
            </Offcanvas.Header>
            <Offcanvas.Body>
                {error && <Alert variant="danger">{error}</Alert>}
                
                <MDBListGroup className="mb-4" style={{ maxHeight: '60vh', overflowY: 'auto' }}>
                    {comments.length === 0 ? (
                        <MDBCardText className="text-muted">No comments yet. Be the first to comment!</MDBCardText>
                    ) : (
                        comments.map((comment) => (
                            <MDBListGroupItem key={comment.id} className="d-flex flex-column mb-2">
                                <div>
                                    <strong>{comment.user}</strong>
                                    <small className="text-muted ms-2">{comment.createdAt}</small>
                                </div>
                                <p className="mb-1 mt-2">{comment.text}</p>
                            </MDBListGroupItem>
                        ))
                    )}
                </MDBListGroup>
                
                {isLoggedIn ? (
                    <div>
                        <MDBTextArea
                            label="Add a comment"
                            value={newComment}
                            onChange={(e) => setNewComment(e.target.value)}
                            rows={3}
                            className="mb-3"
                        />
                        <MDBBtn 
                            color="primary" 
                            onClick={handleSubmitComment} 
                            disabled={!newComment.trim() || loading}
                        >
                            {loading ? 'Submitting...' : 'Submit Comment'}
                        </MDBBtn>
                    </div>
                ) : (
                    <Alert variant="info">
                        Please <a href="/login">login</a> to add comments.
                    </Alert>
                )}
            </Offcanvas.Body>
        </Offcanvas>
    );
};

CommentSection.propTypes = {
    recipeId: PropTypes.oneOfType([PropTypes.number, PropTypes.string]).isRequired,
    isOpen: PropTypes.bool.isRequired,
    onClose: PropTypes.func.isRequired,
};

export default CommentSection;