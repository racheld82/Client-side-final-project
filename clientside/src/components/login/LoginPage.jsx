import React, { useState } from 'react';
import { useNavigate } from 'react-router-dom';
import LoginForm from './LoginForm';

const LoginPage = () => {
  const [isLoggedIn, setIsLoggedIn] = useState(false);
  const navigate = useNavigate();

  const handleLogin = (success, role) => {
    setIsLoggedIn(success);
    if (success) {
      navigate('/main', { state: { role } }); 
    }
  };

  return (
    <div>
      {!isLoggedIn ? (
        <LoginForm handleLogin={handleLogin} />
      ) : (
        <p>כבר התחברת</p>
      )}
    </div>
  );
};

export default LoginPage;
