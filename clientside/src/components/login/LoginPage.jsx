import React, { useState } from 'react';
import LoginForm from './LoginForm';

const LoginPage = () => {
  const [isLoggedIn, setIsLoggedIn] = useState(false);

  const handleLogin = (success) => {
    setIsLoggedIn(success);
    if (success) {
      // Redirect or navigate to FAMILYMAIN page
      window.location.href = '/main';
    }
  };

  return (
    <div>
      {!isLoggedIn ? (
        <LoginForm handleLogin={handleLogin} />
      ) : (
        <p>You are already logged in.</p>
      )}
    </div>
  );
};

export default LoginPage;
