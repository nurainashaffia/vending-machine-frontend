import './login.css';
import { useState } from 'react';
import logoImage from "../../images/logo.png";
import { useNavigate } from 'react-router-dom';

const Login = () => {
  const navigate = useNavigate();
  const [role, setRole] = useState('user');
  const [username, setUsername] = useState('');
  const [password, setPassword] = useState('');
  const [usernameError, setUsernameError] = useState(false);
  const [passwordError, setPasswordError] = useState(false);

  const handleRoleChange = (selectedRole) => {
    setRole(selectedRole);
  };

  const handleLogin = () => {
    if (role === 'admin') {
      if (username !== 'admin') {
        setUsernameError(true);
        setPasswordError(false);
        return;
      } else {
        setUsernameError(false);
      }
  
      if (password !== 'password123') {
        setPasswordError(true);
        return;
      } else {
        setPasswordError(false);
      }
  
      navigate('/slots-admin');
    } else if (role === 'user') {
      navigate('/slots-user');
    }
  };  

  return (
    <div className="login-page">
      <div className="logo-image-container-login">
        <img src={logoImage} alt="Logo" className="logo-image" />
      </div>
      <h2 className="login-title">Login</h2>
      <div className="role-selection">
        <div
          className={`role-box ${role === 'user' ? 'active' : ''}`}
          onClick={() => handleRoleChange('user')}
        >
          User
        </div>
        
        <div
          className={`role-box ${role === 'admin' ? 'active' : ''}`}
          onClick={() => handleRoleChange('admin')}
        >
          Admin
        </div>
      </div>
      <form
        className='form-input'
        onSubmit={(e) => {
          e.preventDefault();
          handleLogin();
        }}
      >
        {role === 'admin' && (
          <div className="admin-login-container">
            <input
              type="text"
              placeholder="Username"
              value={username}
              onChange={(e) => {
                setUsername(e.target.value);
                setUsernameError(false);
              }}
              className="login-input"
            />
            <input
              type="password"
              placeholder="Password"
              value={password}
              onChange={(e) => {
                setPassword(e.target.value);
                setPasswordError(false);
              }}
              className="login-input"
            />
            <div className="error-container">
              <div className={`error-message ${usernameError ? 'visible' : 'hidden'}`}>
                Invalid username
              </div>
              <div className={`error-message ${(!usernameError && passwordError) ? 'visible' : 'hidden'}`}>
                Invalid password
              </div>
            </div>  
          </div>
        )}
        
        <button
          type="submit"
          onClick={handleLogin}
          className="login-button"
          disabled={role === '' || (role === 'admin' && (!username || !password))}
        >
          Login
        </button>
      </form>
    </div>
  );
};

export default Login;
