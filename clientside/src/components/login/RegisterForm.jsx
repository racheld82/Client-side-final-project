import React, { useState } from 'react';

const RegisterForm = () => {
  const [userName, setUserName] = useState('');
  const [password, setPassword] = useState('');
  const [rank, setRank] = useState('');
  const [confirmPassword, setConfirmPassword] = useState('');

  const handleSubmit = async (event) => {
    event.preventDefault();

    if (password !== confirmPassword) {
      alert('Passwords do not match. Please try again.');
      return;
    }

    const formData = {
      userName: userName,
      password: password,
      userRank:rank
    };

    try {
      const response = await fetch('http://localhost:8080/users', {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
        },
        credentials: 'include', 
        body: JSON.stringify(formData)
      });
      console.log(response);
      if (response.ok) {
        window.location.href = '/main'; // Redirect upon successful registration
      } else {
        const data = await response.json();
        alert(`Registration failed: ${data.message}`);
      }
    } catch (error) {
      console.error('Error during registration:', error);
      alert('An error occurred during registration. Please try again later.');
    }
  };

  return (
    <>
    <form onSubmit={handleSubmit}>
      <h2>Register</h2>
      <input
        type="text"
        placeholder="שם משתמש"
        value={userName}
        onChange={(e) => setUserName(e.target.value)}
        required
      />
      <br />
      <input
        type="password"
        placeholder="סיסמה"
        value={password}
        onChange={(e) => setPassword(e.target.value)}
        required
      />
      <br />
      <input
        type="password"
        placeholder="אשר סיסמה"
        value={confirmPassword}
        onChange={(e) => setConfirmPassword(e.target.value)}
        required
      />
       <input
        type="text"
        placeholder="דרגת הרשאות "
        value={rank}
        onChange={(e) => setRank(e.target.value)}
        required
      />
      <br />
      <button type="submit">Register</button>
    </form>    
    </>
    
  );
};

export default RegisterForm;


