import React, { useState } from 'react';

const RegisterForm = () => {
  const [userName, setUserName] = useState('');
  const [password, setPassword] = useState('');
  const [confirmPassword, setConfirmPassword] = useState('');

  const handleSubmit = async (event) => {
    event.preventDefault();

    if (password !== confirmPassword) {
      alert('Passwords do not match. Please try again.');
      return;
    }

    const formData = {
      userName: userName,
      password: password
    };

    try {
      const response = await fetch('http://localhost:8080/users', {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
        },
        credentials: 'include', // Include credentials
        body: JSON.stringify(formData)
      });

      if (response.ok) {
        window.location.href = '/families'; // Redirect upon successful registration
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
    <form onSubmit={handleSubmit}>
      <h2>Register</h2>
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
      <input
        type="password"
        placeholder="Confirm Password"
        value={confirmPassword}
        onChange={(e) => setConfirmPassword(e.target.value)}
        required
      />
      <br />
      <button type="submit">Register</button>
    </form>
  );
};

export default RegisterForm;


// import React, { useState } from 'react';

// const RegisterForm = ({ handleRegister }) => {
//   const [userName, setUserName] = useState('');
//   const [password, setPassword] = useState('');
//   const [confirmPassword, setConfirmPassword] = useState('');

//   const handleSubmit = async (event) => {
//     event.preventDefault();

//     if (password !== confirmPassword) {
//       alert('Passwords do not match. Please try again.');
//       return;
//     }

//     const formData = {
//       userName: userName,
//       password: password
//     };

//     try {
//       const response = await fetch('http://localhost:8080/users', {
//         method: 'POST',
//         headers: {
//           'Content-Type': 'application/json',
//         },
//         credentials: 'include', // Include credentials
//         body: JSON.stringify(formData)
//       });

//       const data = await response.json();
//       if (response.ok) {
//         window.location.href = '/families'; // Redirect upon successful registration
//       } else {
//         alert('Registration failed. Username may already exist.');
//       }
//     } catch (error) {
//       console.error('Error during registration:', error);
//       alert('An error occurred during registration. Please try again later.');
//     }
//   };

//   return (
//     <form onSubmit={handleSubmit}>
//       <h2>Register</h2>
//       <input
//         type="text"
//         placeholder="Username"
//         value={userName}
//         onChange={(e) => setUserName(e.target.value)}
//         required
//       />
//       <br />
//       <input
//         type="password"
//         placeholder="Password"
//         value={password}
//         onChange={(e) => setPassword(e.target.value)}
//         required
//       />
//       <br />
//       <input
//         type="password"
//         placeholder="Confirm Password"
//         value={confirmPassword}
//         onChange={(e) => setConfirmPassword(e.target.value)}
//         required
//       />
//       <br />
//       <button type="submit">Register</button>
//     </form>
//   );
// };

// export default RegisterForm;
