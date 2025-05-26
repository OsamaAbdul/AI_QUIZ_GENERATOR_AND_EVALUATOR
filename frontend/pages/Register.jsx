import React, { useState } from 'react';
import { useNavigate } from 'react-router-dom';

const Register = () => {
  // State to store email and password
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const [error, setError] = useState('');
  const [loading, setLoading] = useState(false);

  const navigate = useNavigate();
  // Handle form submission
  const handleSubmit = async (e) => {
    e.preventDefault(); // Prevent page reload on form submit

    // Input validation (simple check for empty fields)
    if (!email || !password) {
      setError('Please fill in both fields');
      return;
    }

    // Clear any previous error messages
    setError('');
    setLoading(true);

    try {
      const apiUrl = import.meta.env.VITE_API_URL;
      const response = await fetch(`${apiUrl}/api/user/register`, { 
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify({
          email,
          password,
        }),
      });

      const result = await response.json();
      setLoading(false);

      if (response.ok) {
        // Registration successful
        alert('Registration successful! You can now log in.');
        navigate('/')
        // You can redirect the user to login page or dashboard here
      } else {
        // Registration failed
        setError(result.error || 'Something went wrong');
      }
    } catch (err) {
      setLoading(false);
      setError('Network error, please try again');
    }
  };

  return (
    <div className='wrapper'>
      <form className="form_container" onSubmit={handleSubmit}>
        <div className="logo_container"></div>
        <div className="title_container">
          <p className="title">Sign Up for your Account</p>
          <span className="subtitle">
            Get started with our app, just create an account and enjoy the experience.
          </span>
        </div>
        <br />

        <div className="input_container">
          <label className="input_label" htmlFor="email_field">Email</label>
          <input
            placeholder="name@mail.com"
            type="email"
            className="input_field"
            id="email_field"
            value={email}
            onChange={(e) => setEmail(e.target.value)} // Update email state
          />
        </div>

        <div className="input_container">
          <label className="input_label" htmlFor="password_field">Password</label>
          <input
            placeholder="Password"
            type="password"
            className="input_field"
            id="password_field"
            value={password}
            onChange={(e) => setPassword(e.target.value)} // Update password state
          />
        </div>

        {error && (
          <p className="text-red-600 bg-red-100 border border-red-300 px-4 py-2 rounded-md font-semibold mt-4">
            ⚠️ {error}
          </p>
        )}

        <button
          type="submit"
          className="sign-in_btn"
          disabled={loading} // Disable button while loading
        >
          <span>{loading ? 'Signing up...' : 'Sign Up'}</span>
        </button>

        {/* <div className="separator">
          <hr className="line" />
          <span>Or</span>
          <hr className="line" />
        </div> */}

        {/* Google and Apple sign-in buttons go here */}

        <p>Already have an accoount?</p>
        <button
          type="button"
          className="sign-in_btn secondary_btn"
          onClick={() => navigate('/')}
        >
          Login In
        </button>
      </form>
    </div>
  );
};

export default Register;
