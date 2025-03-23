import { Modal, Button } from 'react-bootstrap';
import PropTypes from 'prop-types';

const DeleteConfirmationModal = ({ show, onCancel, onConfirm }) => {
    return (
        <Modal show={show} onHide={onCancel}>
            <Modal.Header closeButton>
                <Modal.Title>Confirm Delete</Modal.Title>
            </Modal.Header>
            <Modal.Body>Are you sure you want to delete this recipe?</Modal.Body>
            <Modal.Footer>
                <Button variant='secondary' onClick={onCancel}>Cancel</Button>
                <Button variant='danger' onClick={onConfirm}>Delete</Button>
            </Modal.Footer>
        </Modal>
    );
};

DeleteConfirmationModal.propTypes = {
    show: PropTypes.bool.isRequired,
    onCancel: PropTypes.func.isRequired,
    onConfirm: PropTypes.func.isRequired,
};

export default DeleteConfirmationModal;