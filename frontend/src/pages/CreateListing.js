import { useState } from 'react';
import { useNavigate } from 'react-router-dom';
import API from '../services/api';

export default function CreateListing() {
  const [form, setForm] = useState({
    title: '',
    description: '',
    price: '',
    category: ''
  });

  const navigate = useNavigate();

  const handleChange = e => {
    setForm({ ...form, [e.target.name]: e.target.value });
  };

  const handleSubmit = async e => {
    e.preventDefault();
    try {
      await API.post('/api/listings', form);
      navigate('/listings');
    } catch (err) {
      alert("Erreur lors de la création.");
    }
  };

  return (
    <div style={{
      display: 'flex',
      justifyContent: 'center',
      alignItems: 'center',
      minHeight: '90vh',
      background: 'linear-gradient(to right, #ffecd2, #fcb69f)',
      padding: '40px'
    }}>
      <form
        onSubmit={handleSubmit}
        style={{
          backgroundColor: '#fff',
          padding: '35px',
          borderRadius: '15px',
          boxShadow: '0 15px 30px rgba(0,0,0,0.2)',
          width: '100%',
          maxWidth: '500px',
          animation: 'fadeIn 0.6s ease-in-out'
        }}
      >
        <h2 style={{
          textAlign: 'center',
          marginBottom: '25px',
          color: '#f57c00',
          fontWeight: '600'
        }}>
          ✍️ Créer une annonce
        </h2>

        <input
          name="title"
          placeholder="📝 Titre"
          value={form.title}
          onChange={handleChange}
          required
          style={inputStyle}
        />
        <textarea
          name="description"
          placeholder="📄 Description"
          value={form.description}
          onChange={handleChange}
          required
          style={{ ...inputStyle, height: '90px' }}
        />
        <input
          name="price"
          type="number"
          placeholder="💰 Prix"
          value={form.price}
          onChange={handleChange}
          required
          style={inputStyle}
        />
        <input
          name="category"
          placeholder="📦 Catégorie"
          value={form.category}
          onChange={handleChange}
          required
          style={inputStyle}
        />

        <button
          type="submit"
          style={{
            width: '100%',
            padding: '12px',
            backgroundColor: '#f57c00',
            color: 'white',
            border: 'none',
            borderRadius: '6px',
            fontWeight: 'bold',
            fontSize: '16px',
            cursor: 'pointer',
            transition: 'background 0.3s'
          }}
        >
          🚀 Publier
        </button>

        <style>{`
          @keyframes fadeIn {
            from { opacity: 0; transform: scale(0.95); }
            to { opacity: 1; transform: scale(1); }
          }
        `}</style>
      </form>
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
  boxShadow: 'inset 0 1px 3px rgba(0,0,0,0.05)'
};
