// import React, { useState } from 'react';
// import LoginForm from './LoginForm';

// const LoginPage = () => {
//   const [isLoggedIn, setIsLoggedIn] = useState(false);

//   const handleLogin = (success) => {
//     setIsLoggedIn(success);
//     if (success) {
//       window.location.href = '/main';
//     }
//   };

//   return (
//     <div>
//       {!isLoggedIn ? (
//         <LoginForm handleLogin={handleLogin} />
//       ) : (
//         <p>כבר התחברת</p>
//       )}
//     </div>
//   );
// };

// export default LoginPage;


import React, { useState } from 'react';
import { useNavigate } from 'react-router-dom';
import LoginForm from './LoginForm';

const LoginPage = () => {
  const [isLoggedIn, setIsLoggedIn] = useState(false);
  const navigate = useNavigate();

  const handleLogin = (success, role) => {
    setIsLoggedIn(success);
    if (success) {
      navigate('/main', { state: { role } }); // Navigate to '/main' and pass 'role' as state
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
