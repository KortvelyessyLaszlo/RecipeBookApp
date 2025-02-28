import { useState } from 'react';
import { useNavigate } from 'react-router-dom';
import axios from 'axios';
import 'bootstrap/dist/css/bootstrap.min.css';
import 'mdb-react-ui-kit/dist/css/mdb.min.css';
import { MDBContainer, MDBInput, MDBBtn } from 'mdb-react-ui-kit';
import { Alert } from 'react-bootstrap';

const Register = () => {
  const [username, setUsername] = useState('');
  const [password, setPassword] = useState('');
  const [confirmPassword, setConfirmPassword] = useState('');
  const [error, setError] = useState('');
  const navigate = useNavigate();

  const handleSubmit = async (e) => {
    e.preventDefault();
    if (username.length < 4 || password.length < 4) {
      setError('Username and password must be at least 4 characters long.');
      return;
    }
    if (password !== confirmPassword) {
      setError('Passwords do not match.');
      return;
    }
    try {
      await axios.post('http://localhost:8080/api/auth/register', { username, password });
      navigate('/login');
    } catch (error) {
      if (error.message === 'Network Error') {
        setError('Network error, please try again later.');
      } else {
        setError('Username already in use.');
      }
    }
  };

  return (
    <div className="d-flex justify-content-center align-items-center vh-100">
      <MDBContainer className="p-3 my-5 d-flex flex-column w-25">
        {error && <Alert variant='danger' className='mb-4'>{error}</Alert>}
        <MDBInput wrapperClass='mb-4' label='Username' id='form1' type='text' onChange={(e) => setUsername(e.target.value)} />
        <MDBInput wrapperClass='mb-4' label='Password' id='form2' type='password' onChange={(e) => setPassword(e.target.value)} />
        <MDBInput wrapperClass='mb-4' label='Confirm Password' id='form3' type='password' onChange={(e) => setConfirmPassword(e.target.value)} />
        <MDBBtn className="mb-4" onClick={handleSubmit}>Register</MDBBtn>
        <div className="text-center">
          <p>Already a member? <a href='/login'>Login</a></p>
        </div>
      </MDBContainer>
    </div>
  );
};

export default Register;
