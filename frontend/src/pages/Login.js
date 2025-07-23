import { useState } from 'react';
import { useNavigate } from 'react-router-dom';
import API from '../services/api';

export default function Login() {
  const [form, setForm] = useState({ email: '', password: '' });
  const navigate = useNavigate();
  const [loading, setLoading] = useState(false);

  const handleChange = e => {
    setForm({ ...form, [e.target.name]: e.target.value });
  };

  const handleSubmit = async e => {
    e.preventDefault();
    setLoading(true);
    try {
      const res = await API.post('/api/auth/login', form);
      localStorage.setItem('token', res.data.token);
      navigate('/listings');
    } catch (err) {
      alert("Email ou mot de passe invalide.");
    } finally {
      setLoading(false);
    }
  };

  return (
    <div style={{
      display: 'flex',
      justifyContent: 'center',
      alignItems: 'center',
      minHeight: '100vh',
      background: 'linear-gradient(135deg, #89f7fe 0%, #66a6ff 100%)',
      padding: '20px'
    }}>
      <form
        onSubmit={handleSubmit}
        style={{
          backgroundColor: '#fff',
          padding: '35px',
          borderRadius: '15px',
          boxShadow: '0 20px 40px rgba(0,0,0,0.2)',
          width: '100%',
          maxWidth: '400px',
          animation: 'slideIn 0.5s ease-out'
        }}
      >
        <h2 style={{
          textAlign: 'center',
          marginBottom: '25px',
          color: '#4CAF50',
          textShadow: '1px 1px 2px rgba(0,0,0,0.1)'
        }}>
          🔐 Connexion
        </h2>

        <input
          type="email"
          name="email"
          placeholder="📧 Email"
          value={form.email}
          onChange={handleChange}
          required
          style={inputStyle}
        />
        <input
          type="password"
          name="password"
          placeholder="🔒 Mot de passe"
          value={form.password}
          onChange={handleChange}
          required
          style={inputStyle}
        />

        <button
          type="submit"
          disabled={loading}
          style={{
            width: '100%',
            padding: '12px',
            backgroundColor: '#4CAF50',
            color: 'white',
            border: 'none',
            borderRadius: '8px',
            fontWeight: 'bold',
            fontSize: '16px',
            cursor: 'pointer',
            transition: 'background 0.3s'
          }}
        >
          {loading ? "🔄 Connexion..." : "🚪 Se connecter"}
        </button>
      </form>

      <style>{`
        @keyframes slideIn {
          from { opacity: 0; transform: translateY(-20px); }
          to { opacity: 1; transform: translateY(0); }
        }
      `}</style>
    </div>
  );
}

const inputStyle = {
  width: '100%',
  padding: '12px',
  marginBottom: '18px',
  borderRadius: '8px',
  border: '1px solid #ccc',
  fontSize: '15px',
  boxShadow: 'inset 0 2px 4px rgba(0,0,0,0.03)'
};
