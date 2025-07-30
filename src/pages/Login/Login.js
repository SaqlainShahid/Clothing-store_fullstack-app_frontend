import React, { useState } from 'react';
import { Link, useNavigate } from 'react-router-dom';
import { FiLock, FiMail, FiArrowRight, FiShield } from 'react-icons/fi';
import { useAuth } from '../../context/AuthContext';
import './Login.css';

const Login = () => {
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const [isAdminLogin, setIsAdminLogin] = useState(false);
  const [error, setError] = useState('');
  const [isLoading, setIsLoading] = useState(false);
  const navigate = useNavigate();
  const { login } = useAuth();

  const handleSubmit = async (e) => {
    e.preventDefault();

    try {
      setError('');
      setIsLoading(true);

      const result = await login(email, password, isAdminLogin);
      
      if (result.success) {
        // Redirect based on login type and user role
        if (isAdminLogin || result.user.isAdmin) {
          navigate('/admin');
        } else {
          navigate('/');
        }
      }
    } catch (err) {
      setError(
        err.message ||
        'Login failed. Please check your credentials.'
      );
    } finally {
      setIsLoading(false);
    }
  };

  return (
    <div className="auth-container">
      <div className="auth-card">
        <div className="auth-header">
          <h2>{isAdminLogin ? 'Admin Login' : 'Welcome Back'}</h2>
          <p>{isAdminLogin ? 'Sign in to access admin panel' : 'Sign in to access your account'}</p>
        </div>

        {/* Admin Login Toggle */}
        <div className="admin-toggle">
          <label className="toggle-switch">
            <input
              type="checkbox"
              checked={isAdminLogin}
              onChange={(e) => setIsAdminLogin(e.target.checked)}
            />
            <span className="toggle-slider"></span>
          </label>
          <span className="toggle-label">
            {isAdminLogin ? <><FiShield /> Admin Login</> : 'Regular Login'}
          </span>
        </div>

        {error && <div className="auth-error">{error}</div>}

        <form onSubmit={handleSubmit} className={`auth-form ${isAdminLogin ? 'admin-form' : ''}`}>
          <div className="input-group">
            <label htmlFor="email">Email</label>
            <div className="input-field">
              <FiMail className="input-icon" />
              <input
                type="email"
                id="email"
                value={email}
                onChange={(e) => setEmail(e.target.value)}
                placeholder="Enter your email"
                required
              />
            </div>
          </div>

          <div className="input-group">
            <label htmlFor="password">Password</label>
            <div className="input-field">
              <FiLock className="input-icon" />
              <input
                type="password"
                id="password"
                value={password}
                onChange={(e) => setPassword(e.target.value)}
                placeholder="Enter your password"
                required
              />
            </div>
            {!isAdminLogin && (
              <div className="forgot-password">
                <Link to="/forgot-password">Forgot password?</Link>
              </div>
            )}
          </div>

          <button type="submit" className={`auth-button ${isAdminLogin ? 'admin-button' : ''}`} disabled={isLoading}>
            {isLoading ? 'Signing in...' : (
              <>
                {isAdminLogin ? 'Admin Sign In' : 'Sign In'} <FiArrowRight />
              </>
            )}
          </button>
        </form>

        {!isAdminLogin && (
          <>
            <div className="auth-footer">
              <p>Don't have an account? <Link to="/register">Create one</Link></p>
            </div>

            <div className="social-login">
              <p>Or sign in with</p>
              <div className="social-buttons">
                <button type="button" className="social-button google">
                  <img src="https://upload.wikimedia.org/wikipedia/commons/5/53/Google_%22G%22_Logo.svg" alt="Google" />
                  Google
                </button>
                <button type="button" className="social-button facebook">
                  <img src="https://upload.wikimedia.org/wikipedia/commons/5/51/Facebook_f_logo_%282019%29.svg" alt="Facebook" />
                  Facebook
                </button>
              </div>
            </div>
          </>
        )}
      </div>

      <div className="auth-image">
        <img 
          src="https://images.unsplash.com/photo-1529139574466-a303027c1d8b?ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D&auto=format&fit=crop&w=687&q=80" 
          alt="Fashionable person" 
          loading="lazy"
        />
      </div>
    </div>
  );
};

export default Login;
