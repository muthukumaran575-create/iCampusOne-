import React, { useState, useEffect } from 'react';
import { loginUser, registerUser, logoutUser, subscribeToAuthChanges } from './services/authService';

export default function App() {
  const [userState, setUserState] = useState({ user: null, profile: null });
  const [isLogin, setIsLogin] = useState(true);
  const [formData, setFormData] = useState({
    email: '',
    password: '',
    fullName: '',
    customId: '',
    role: 'Student',
    institutionId: 'CAMPUS-01'
  });
  const [statusMsg, setStatusMsg] = useState('');

  useEffect(() => {
    const unsubscribe = subscribeToAuthChanges((data) => {
      setUserState(data);
    });
    return () => unsubscribe();
  }, []);

  const handleChange = (e) => {
    setFormData({ ...formData, [e.target.name]: e.target.value });
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    setStatusMsg('Processing...');
    
    if (isLogin) {
      const res = await loginUser(formData.email, formData.password);
      if (!res.success) setStatusMsg('Login Failed: ' + res.error);
      else setStatusMsg('Login Successful!');
    } else {
      const res = await registerUser(
        formData.email, 
        formData.password, 
        formData.fullName, 
        formData.customId, 
        formData.role, 
        formData.institutionId
      );
      if (!res.success) setStatusMsg('Registration Failed: ' + res.error);
      else setStatusMsg('Registration Successful!');
    }
  };

  if (userState.user && userState.profile) {
    return (
      <div style={{ padding: '20px', fontFamily: 'sans-serif' }}>
        <h2>Welcome, {userState.profile.fullName}!</h2>
        <p><strong>Role:</strong> {userState.profile.role}</p>
        <p><strong>System ID:</strong> {userState.profile.customSystemId}</p>
        <p><strong>Institution:</strong> {userState.profile.institutionId}</p>
        <button onClick={logoutUser} style={{ padding: '10px 20px', background: '#d9534f', color: '#fff', border: 'none', borderRadius: '4px' }}>
          Logout
        </button>
      </div>
    );
  }

  return (
    <div style={{ maxWidth: '400px', margin: '40px auto', padding: '20px', border: '1px solid #ccc', borderRadius: '8px', fontFamily: 'sans-serif' }}>
      <h2>iCampusOne Portal</h2>
      <h3>{isLogin ? 'Sign In' : 'Create Account'}</h3>
      
      {statusMsg && <p style={{ color: 'blue' }}>{statusMsg}</p>}

      <form onSubmit={handleSubmit}>
        {!isLogin && (
          <>
            <div style={{ marginBottom: '10px' }}>
              <label>Full Name:</label><br/>
              <input type="text" name="fullName" value={formData.fullName} onChange={handleChange} required style={{ width: '100%', padding: '8px' }} />
            </div>
            <div style={{ marginBottom: '10px' }}>
              <label>System ID (e.g. STD-101):</label><br/>
              <input type="text" name="customId" value={formData.customId} onChange={handleChange} required style={{ width: '100%', padding: '8px' }} />
            </div>
            <div style={{ marginBottom: '10px' }}>
              <label>Role:</label><br/>
              <select name="role" value={formData.role} onChange={handleChange} style={{ width: '100%', padding: '8px' }}>
                <option value="Student">Student</option>
                <option value="Teacher">Teacher</option>
                <option value="Admin">Admin</option>
                <option value="Parent">Parent</option>
              </select>
            </div>
          </>
        )}

        <div style={{ marginBottom: '10px' }}>
          <label>Email Address:</label><br/>
          <input type="email" name="email" value={formData.email} onChange={handleChange} required style={{ width: '100%', padding: '8px' }} />
        </div>

        <div style={{ marginBottom: '10px' }}>
          <label>Password:</label><br/>
          <input type="password" name="password" value={formData.password} onChange={handleChange} required style={{ width: '100%', padding: '8px' }} />
        </div>

        <button type="submit" style={{ width: '100%', padding: '10px', background: '#0275d8', color: '#fff', border: 'none', borderRadius: '4px' }}>
          {isLogin ? 'Login' : 'Register'}
        </button>
      </form>

      <p style={{ marginTop: '15px', cursor: 'pointer', color: '#0275d8' }} onClick={() => setIsLogin(!isLogin)}>
        {isLogin ? "Don't have an account? Register here" : "Already registered? Login here"}
      </p>
    </div>
  );
      }
    
