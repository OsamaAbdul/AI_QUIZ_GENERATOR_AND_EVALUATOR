import React, { useState } from 'react';
import { useNavigate } from 'react-router-dom';
import { MdEmail } from 'react-icons/md';
import { RiLockPasswordFill } from 'react-icons/ri';
import { AiOutlineEye, AiOutlineEyeInvisible } from 'react-icons/ai';
import { FaSpinner } from 'react-icons/fa';
import { toast } from 'react-toastify';

const Register = () => {
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const [showPassword, setShowPassword] = useState(false);
  const [loading, setLoading] = useState(false);

  const navigate = useNavigate();

  const handleSubmit = async (e) => {
    e.preventDefault();

    if (!email.trim() || !password.trim()) {
      toast.error('Please fill in both fields');
      return;
    }

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
        toast.success('Registration successful! You can now log in.');
        navigate('/login');
      } else {
        toast.error(result.error || 'Something went wrong');
      }
    } catch (err) {
      setLoading(false);
      toast.error('Network error, please try again');
    }
  };

  return (
    <div className="wrapper">
      <form className="form_container" onSubmit={handleSubmit}>
        <div className="title_container">
          <p className="title">Sign Up for your Account</p>
          <span className="subtitle">
            Get started with our app, just create an account and enjoy the experience.
          </span>
        </div>

        <div className="input_container icon_input">
          <label className="input_label" htmlFor="email_field">Email</label>
          <div className="input_with_icon">
            <MdEmail className="input_icon" />
            <input
              type="email"
              id="email_field"
              placeholder="osamaabdul@mail.com"
              className="input_field"
              value={email}
              onChange={(e) => setEmail(e.target.value)}
              required
            />
          </div>
        </div>

        <div className="input_container icon_input">
          <label className="input_label" htmlFor="password_field">Password</label>
          <div className="input_with_icon">
            <RiLockPasswordFill className="input_icon" />
            <input
              type={showPassword ? 'text' : 'password'}
              id="password_field"
              placeholder="••••••••"
              className="input_field"
              value={password}
              onChange={(e) => setPassword(e.target.value)}
              required
            />
            <span
              className="toggle_eye"
              onClick={() => setShowPassword(!showPassword)}
            >
              {showPassword ? <AiOutlineEyeInvisible /> : <AiOutlineEye />}
            </span>
          </div>
        </div>

        <button type="submit" className="sign-in_btn" disabled={loading}>
          <center>
            {loading ? <FaSpinner className="spinner" /> : 'Sign Up'}
          </center>
        </button>

        <p>Already have an account?</p>
        <button
          type="button"
          className="sign-in_btn secondary_btn"
          onClick={() => navigate('/login')}
        >
          Log In
        </button>
      </form>

      <style>{`
        .spinner {
          animation: spin 1s linear infinite;
        }
        @keyframes spin {
          0% { transform: rotate(0deg); }
          100% { transform: rotate(360deg); }
        }
        .wrapper {
          min-height: 100vh;
          display: flex;
          justify-content: center;
          align-items: center;
          padding: 20px;
        }
        .form_container {
          width: 100%;
          max-width: 400px;
          background: white;
          padding: 30px;
          border-radius: 10px;
          box-shadow: 0 0 20px rgba(0,0,0,0.05);
        }
        .title_container {
          text-align: center;
          margin-bottom: 20px;
          color: black;
        }
        .title {
          font-size: 1.5rem;
          font-weight: bold;
          color: black;
        }
        .subtitle {
          font-size: 0.9rem;
          color: black;
        }
        .input_container {
          margin-bottom: 15px;
        }
        .input_label {
          font-size: 0.9rem;
          display: block;
          margin-bottom: 5px;
          color: black;
        }
        .input_with_icon {
          position: relative;
        }
        .input_icon {
          position: absolute;
          top: 50%;
          left: 10px;
          transform: translateY(-50%);
          color: #555;
        }
        .toggle_eye {
          position: absolute;
          top: 50%;
          right: 10px;
          transform: translateY(-50%);
          cursor: pointer;
          color: #555;
        }
        .input_field {
          width: 100%;
          padding: 10px 35px 10px 35px;
          border: 1px solid #ccc;
          border-radius: 6px;
          outline: none;
          color: black;
        }
        .sign-in_btn {
          width: 100%;
          padding: 12px;
          background-color: #4a90e2;
          color: white;
          font-weight: bold;
          border: none;
          border-radius: 6px;
          cursor: pointer;
          margin-bottom: 15px;
        }
        .sign-in_btn:hover {
          background-color: #3b7fd6;
        }
        .secondary_btn {
          background-color: #eee;
          color: #333;
        }
        
        p {
         color: black;
        }
      `}</style>
    </div>
  );
};

export default Register;