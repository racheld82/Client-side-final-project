import React, { useState } from 'react';
import { Link } from 'react-router-dom';

const LoginForm = ({ handleLogin }) => {
  const [userName, setUserName] = useState('');
  const [password, setPassword] = useState('');

  // const handleSubmit = async (event) => {
  //   event.preventDefault();
    
  //   // Create an object with username and password
  //   const formData = {
  //     userName: userName,
  //     password: password
  //   };

  //   try {
  //     // Send form data to server for validation
  //     const response = await fetch(`http://localhost:8080/users/verify`, {
  //       method: 'POST',
  //       headers: {
  //         'Content-Type': 'application/json'
  //       },
  //       body: JSON.stringify(formData)
  //     });

  //     const data = await response.json();

  //     if (data.length>0) {
  //       handleLogin(true); 
  //     } else {
  //       alert('Login failed. Please check your credentials or register.');
  //     }
  //   } catch (error) {
  //     console.error('Error during login:', error);
  //     alert('An error occurred during login. Please try again later.');
  //   }
  // };

  const handleSubmit = async (event) => {
    event.preventDefault();

    const formData = {
        userName: userName,
        password: password
    };

    try {
        const response = await fetch(`http://localhost:8080/users/verify`, {
            method: 'POST',           
            headers: {
                'Content-Type': 'application/json'
            },
            credentials: 'include',
            body: JSON.stringify(formData)
        });

        const data = await response.json();

        if (response.status === 200) {
            handleLogin(true);
        } else {
            alert(data.message);
        }
    } catch (error) {
        console.error('Error during login:', error);
        alert('An error occurred during login. Please try again later.');
    }
};


  return (
    <>
    <form onSubmit={handleSubmit}>
      <h2>Login</h2>
      <input
        type="text"
        placeholder="Username"
        value={userName}
        onChange={(e) => setUserName(e.target.value)}
        required
      />
      <br />
      <input
        type="password"
        placeholder="Password"
        value={password}
        onChange={(e) => setPassword(e.target.value)}
        required
      />
      <br />
      <button type="submit">Login</button>
    </form>
    </>
  );
};

export default LoginForm;
