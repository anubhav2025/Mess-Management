import React, { useState } from 'react';
import { toast } from 'react-toastify';

function Login() {
   const [email, setEmail] = useState('');
   const [password, setPassword] = useState('');

   const handleSubmit = async (e) => {
      e.preventDefault();

      try {
         const formData = new URLSearchParams();
         formData.append('email', email);
         formData.append('password', password);

         const response = await fetch('http://localhost:5000/api/users/login', {
            method: 'POST',
            headers: {
               'Content-Type': 'application/x-www-form-urlencoded',
            },
            body: formData,
         });

         if (!response.ok) {
            throw new Error('Invalid email or password');
         }

         const data = await response.json();
         // Handle the data received from the API, like setting tokens, user info, etc.
         console.log(data);
      } catch (err) {
         toast.error(err?.data?.message || err.error);
         // Handle error states, display error messages, etc.
      }
   };

   return (
      <form onSubmit={handleSubmit}>
         <div>
            <label>Email:</label>
            <input
               type="email"
               value={email}
               onChange={(e) => setEmail(e.target.value)}
               required
            />
         </div>
         <div>
            <label>Password:</label>
            <input
               type="password"
               value={password}
               onChange={(e) => setPassword(e.target.value)}
               required
            />
         </div>
         <button type="submit">Login</button>
      </form>
   );
}

export default Login;
