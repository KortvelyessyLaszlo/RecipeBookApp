import { useState } from 'react';
import { useNavigate } from 'react-router-dom';
import 'bootstrap/dist/css/bootstrap.min.css';
import 'mdb-react-ui-kit/dist/css/mdb.min.css';
import { MDBContainer, MDBInput, MDBBtn } from 'mdb-react-ui-kit';
import { Alert } from 'react-bootstrap';
import AuthService from './service/authservice';

const Login = () => {
  const [username, setUsername] = useState('');
  const [password, setPassword] = useState('');
  const [error, setError] = useState('');
  const navigate = useNavigate();

  const handleSubmit = async (e) => {
    e.preventDefault();
    try {
      await AuthService.login(username, password);
      navigate('/');
    } catch (error) {
      if (error.message === 'Network Error') {
        setError('Network error, please try again later.');
      } else {
        setError('Incorrect username or password');
      }
    }
  };

  return (
    <div className="d-flex justify-content-center align-items-center vh-100">
      <MDBContainer className="p-3 my-5 d-flex flex-column w-25">
        {error && <Alert variant='danger'>{error}</Alert>}
        <MDBInput wrapperClass='mb-4' label='Username' id='form1' type='text' onChange={(e) => setUsername(e.target.value)} />
        <MDBInput wrapperClass='mb-4' label='Password' id='form2' type='password' onChange={(e) => setPassword(e.target.value)} />
        <MDBBtn className="mb-4" onClick={handleSubmit}>Sign in</MDBBtn>
        <div className="text-center">
          <p>Not a member? <a href='/register'>Register</a></p>
        </div>
      </MDBContainer>
    </div>
  );
};

export default Login;
