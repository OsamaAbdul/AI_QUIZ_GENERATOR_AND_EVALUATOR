import React, { useState } from 'react';
import { useNavigate } from 'react-router-dom';
import { toast } from 'react-toastify';
import { MdEmail } from 'react-icons/md';
import { RiLockPasswordFill } from 'react-icons/ri';
import { AiOutlineEye, AiOutlineEyeInvisible } from 'react-icons/ai';
import { FaSpinner, FaFacebookF } from 'react-icons/fa';
import { FcGoogle } from 'react-icons/fc';
import { useUser } from '../src/UseContext.jsx';

const Login = () => {
  const navigate = useNavigate();
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const [showPassword, setShowPassword] = useState(false);
  const [loading, setLoading] = useState(false);
  const { setUser } = useUser();

  const handleLogin = async (e) => {
    e.preventDefault();

    if (!email.trim() || !password.trim()) {
      toast.error('Please enter both email and password.');
      return;
    }

    setLoading(true);

    try {
      const apiUrl = import.meta.env.VITE_API_URL;
      const response = await fetch(`${apiUrl}/api/user/login`, {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({ email, password }),
      });

      const data = await response.json();
      console.log('Login response:', data);

      if (!response.ok) {
        toast.error(data.error || 'Something went wrong. Please try again.');
        return;
      }

      if (!data.token) {
        toast.error('No token received!');
        return;
      }

      localStorage.setItem('token', data.token);
      setUser(data.user);
      console.log('Logged in email:', data.user?.email);
      console.log('Logged in user:', data.user);
      toast.success('Login successful!', data.user?.email);

      localStorage.setItem('user', JSON.stringify(data.user));
      navigate('/upload-pdf');
    } catch (err) {
      console.error('Login error:', err);
      toast.error('Something went wrong. Please try again.');
    } finally {
      setLoading(false);
    }
  };

  return (
    <div className="wrapper">
      <form className="form_container" onSubmit={handleLogin}>
        <div className="title_container">
          <p>OsAI Quiz Master</p>
          <p className="title">Login to your Account</p>
          <span className="subtitle">Enter your credentials to continue</span>
        </div>

        <div className="input_container icon_input">
          <label className="input_label" htmlFor="email">Email</label>
          <div className="input_with_icon">
            <MdEmail className="input_icon" />
            <input
              type="email"
              id="email"
              placeholder="you@example.com"
              className="input_field"
              value={email}
              onChange={(e) => setEmail(e.target.value)}
              required
            />
          </div>
        </div>

        <div className="input_container icon_input">
          <label className="input_label" htmlFor="password">Password</label>
          <div className="input_with_icon">
            <RiLockPasswordFill className="input_icon" />
            <input
              type={showPassword ? 'text' : 'password'}
              id="password"
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
            {loading ? <FaSpinner className="spinner" /> : 'Log In'}
          </center>
        </button>

        <p className='text-black-200'>You do not have an account?</p>
        <button
          type="button"
          className="sign-in_btn secondary_btn"
          onClick={() => navigate('/register')}
        >
          Register
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
          color: #000;
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
        .separator {
          display: flex;
          align-items: center;
          gap: 10px;
          margin: 20px 0;
        }
        .line {
          flex: 1;
          height: 1px;
          background-color: #ccc;
        }
        .social_buttons {
          display: flex;
          flex-direction: column;
          gap: 10px;
          margin-bottom: 15px;
        }
        .social_btn {
          display: flex;
          align-items: center;
          justify-content: center;
          gap: 8px;
          padding: 10px;
          border: none;
          border-radius: 6px;
          font-weight: bold;
          cursor: pointer;
        }
        .google_btn {
          background: #fff;
          border: 1px solid #ccc;
        }
        .fb_btn {
          background: #1877f2;
          color: white;
        }
        .fb_btn:hover {
          background: #145dbf;
        }
        p {
          color: black;
        }
      `}</style>
    </div>
  );
};

export default Login;