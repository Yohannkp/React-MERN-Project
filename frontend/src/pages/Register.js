import { useState } from 'react';
import { useNavigate } from 'react-router-dom';
import API from '../services/api';

export default function Register() {
  const [form, setForm] = useState({ username: '', email: '', password: '' });
  const [loading, setLoading] = useState(false);
  const navigate = useNavigate();

  const handleChange = (e) => {
    setForm({ ...form, [e.target.name]: e.target.value });
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    setLoading(true);
    try {
      const res = await API.post('/api/auth/register', form);
      localStorage.setItem('token', res.data.token);
      navigate('/listings');
    } catch (err) {
      alert("Erreur : utilisateur déjà existant ou données invalides.");
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
      background: 'linear-gradient(135deg, #ff9a9e 0%, #fad0c4 100%)',
      padding: '20px'
    }}>
      <form
        onSubmit={handleSubmit}
        style={{
          backgroundColor: 'white',
          padding: '35px',
          borderRadius: '15px',
          boxShadow: '0 20px 50px rgba(0,0,0,0.25)',
          width: '100%',
          maxWidth: '400px',
          transition: 'transform 0.3s ease',
          animation: 'popIn 0.5s ease-out'
        }}
      >
        <h2 style={{
          textAlign: 'center',
          marginBottom: '25px',
          color: '#bb377d',
          textShadow: '1px 1px 2px rgba(0,0,0,0.1)'
        }}>
          🚀 Créez votre compte
        </h2>

        <input
          type="text"
          name="username"
          placeholder="👤 Nom d'utilisateur"
          value={form.username}
          onChange={handleChange}
          required
          style={inputStyle}
        />
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
            backgroundColor: '#bb377d',
            color: 'white',
            border: 'none',
            borderRadius: '8px',
            fontWeight: 'bold',
            fontSize: '16px',
            cursor: 'pointer',
            transition: 'background 0.3s'
          }}
        >
          {loading ? "✨ Création..." : "💎 S'inscrire"}
        </button>
      </form>

      <style>{`
        @keyframes popIn {
          from { opacity: 0; transform: scale(0.95); }
          to { opacity: 1; transform: scale(1); }
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
  border: '1px solid #ddd',
  fontSize: '15px',
  boxShadow: 'inset 0 2px 4px rgba(0,0,0,0.03)'
};
