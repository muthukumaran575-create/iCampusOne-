import React, { useState } from 'react';
import { registerUser, loginUser, logoutUser } from './services/authService';

function App() {
  const [isRegistering, setIsRegistering] = useState(false);
  const [user, setUser] = useState(null);
  const [status, setStatus] = useState('');

  const [formData, setFormData] = useState({
    name: '',
    systemId: '',
    role: 'Student',
    email: '',
    password: ''
  });

  const handleChange = (e) => {
    setFormData({ ...formData, [e.target.name]: e.target.value });
  };

  const handleRegister = async (e) => {
    e.preventDefault();
    setStatus('Processing...');
    try {
      const res = await registerUser(
        formData.email,
        formData.password,
        formData.name,
        formData.role,
        formData.systemId
      );
      setUser(res);
      setStatus('');
    } catch (err) {
      setStatus('Error: ' + err.message);
    }
  };

  const handleLogin = async (e) => {
    e.preventDefault();
    setStatus('Processing...');
    try {
      const res = await loginUser(formData.email, formData.password);
      setUser(res);
      setStatus('');
    } catch (err) {
      setStatus('Error: ' + err.message);
    }
  };

  const handleLogout = async () => {
    await logoutUser();
    setUser(null);
  };

  // Modern Styling
  const styles = {
    container: {
      minHeight: '100vh',
      background: 'linear-gradient(135deg, #0f172a 0%, #1e293b 50%, #334155 100%)',
      display: 'flex',
      justifyContent: 'center',
      alignItems: 'center',
      padding: '20px',
      fontFamily: "'Segoe UI', Tahoma, Geneva, Verdana, sans-serif"
    },
    card: {
      background: '#ffffff',
      padding: '35px 30px',
      borderRadius: '16px',
      boxShadow: '0 20px 25px -5px rgba(0, 0, 0, 0.3), 0 10px 10px -5px rgba(0, 0, 0, 0.04)',
      width: '100%',
      maxWidth: '400px',
      textAlign: 'center'
    },
    logoContainer: {
      marginBottom: '20px',
      display: 'flex',
      flexDirection: 'column',
      alignItems: 'center',
      gap: '10px'
    },
    logoImg: {
      width: '75px',
      height: '75px',
      borderRadius: '12px',
      objectFit: 'cover'
    },
    logoText: {
      fontSize: '22px',
      fontWeight: 'bold',
      color: '#0f172a',
      margin: '0'
    },
    inputGroup: {
      marginBottom: '15px',
      textAlign: 'left'
    },
    label: {
      display: 'block',
      fontSize: '14px',
      fontWeight: '600',
      color: '#475569',
      marginBottom: '5px'
    },
    input: {
      width: '100%',
      padding: '12px',
      borderRadius: '8px',
      border: '1px solid #cbd5e1',
      fontSize: '14px',
      boxSizing: 'border-box',
      outline: 'none'
    },
    button: {
      width: '100%',
      padding: '12px',
      backgroundColor: '#2563eb',
      color: '#ffffff',
      border: 'none',
      borderRadius: '8px',
      fontWeight: 'bold',
      fontSize: '16px',
      cursor: 'pointer',
      marginTop: '10px'
    },
    toggleLink: {
      marginTop: '15px',
      color: '#2563eb',
      cursor: 'pointer',
      fontSize: '14px',
      fontWeight: '500'
    }
  };

  if (user) {
    return (
      <div style={styles.container}>
        <div style={styles.card}>
          <div style={styles.logoContainer}>
            <img 
              src="https://cdn-icons-png.flaticon.com/512/3135/3135715.png" 
              alt="iCampusOne Logo" 
              style={styles.logoImg} 
            />
            <h3 style={styles.logoText}>iCampusOne</h3>
          </div>
          <h2>Welcome, {user.name}!</h2>
          <p><strong>Role:</strong> {user.role}</p>
          <p><strong>System ID:</strong> {user.systemId}</p>
          <p><strong>Institution:</strong> CAMPUS-01</p>
          <button onClick={handleLogout} style={{ ...styles.button, backgroundColor: '#ef4444' }}>
            Logout
          </button>
        </div>
      </div>
    );
  }

  return (
    <div style={styles.container}>
      <div style={styles.card}>
        <div style={styles.logoContainer}>
          {/* Unge kitta சொந்த Logo Image URL irundha replace pannikalam */}
          <img 
            src="https://cdn-icons-png.flaticon.com/512/3135/3135715.png" 
            alt="iCampusOne Logo" 
            style={styles.logoImg} 
          />
          <h3 style={styles.logoText}>iCampusOne</h3>
        </div>

        <h4 style={{ color: '#64748b', marginBottom: '20px', marginTop: '0' }}>
          {isRegistering ? 'Create Account' : 'Sign In'}
        </h4>

        {status && <p style={{ color: '#2563eb', fontSize: '14px' }}>{status}</p>}

        <form onSubmit={isRegistering ? handleRegister : handleLogin}>
          {isRegistering && (
            <>
              <div style={styles.inputGroup}>
                <label style={styles.label}>Full Name:</label>
                <input
                  type="text"
                  name="name"
                  value={formData.name}
                  onChange={handleChange}
                  required
                  style={styles.input}
                />
              </div>
              <div style={styles.inputGroup}>
                <label style={styles.label}>System ID:</label>
                <input
                  type="text"
                  name="systemId"
                  value={formData.systemId}
                  onChange={handleChange}
                  required
                  style={styles.input}
                />
              </div>
              <div style={styles.inputGroup}>
                <label style={styles.label}>Role:</label>
                <select
                  name="role"
                  value={formData.role}
                  onChange={handleChange}
                  style={styles.input}
                >
                  <option value="Student">Student</option>
                  <option value="Teacher">Teacher</option>
                  <option value="Admin">Admin</option>
                </select>
              </div>
            </>
          )}

          <div style={styles.inputGroup}>
            <label style={styles.label}>Email Address:</label>
            <input
              type="email"
              name="email"
              value={formData.email}
              onChange={handleChange}
              required
              style={styles.input}
            />
          </div>

          <div style={styles.inputGroup}>
            <label style={styles.label}>Password:</label>
            <input
              type="password"
              name="password"
              value={formData.password}
              onChange={handleChange}
              required
              style={styles.input}
            />
          </div>

          <button type="submit" style={styles.button}>
            {isRegistering ? 'Register' : 'Login'}
          </button>
        </form>

        <p
          style={styles.toggleLink}
          onClick={() => {
            setIsRegistering(!isRegistering);
            setStatus('');
          }}
        >
          {isRegistering
            ? 'Already have an account? Sign In'
            : "Don't have an account? Register here"}
        </p>
      </div>
    </div>
  );
}

export default App;
      
