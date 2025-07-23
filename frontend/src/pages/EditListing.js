import { useEffect, useState } from 'react';
import { useParams, useNavigate } from 'react-router-dom';
import API from '../services/api';

export default function EditListing() {
  const { id } = useParams();
  const navigate = useNavigate();
  const [form, setForm] = useState({
    title: '',
    description: '',
    price: '',
    category: ''
  });
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    API.get(`/api/listings/${id}`)
      .then(res => {
        const { title, description, price, category } = res.data;
        setForm({ title, description, price, category });
        setLoading(false);
      })
      .catch(err => {
        alert("Erreur lors du chargement.");
        setLoading(false);
      });
  }, [id]);

  const handleChange = e => {
    setForm({ ...form, [e.target.name]: e.target.value });
  };

  const handleSubmit = async e => {
    e.preventDefault();
    try {
      await API.put(`/api/listings/${id}`, form);
      navigate('/listings');
    } catch (err) {
      alert("Erreur lors de la mise à jour.");
    }
  };

  if (loading) return <p style={{ textAlign: 'center', marginTop: '100px' }}>Chargement...</p>;

  return (
    <div style={{
      display: 'flex',
      justifyContent: 'center',
      alignItems: 'center',
      minHeight: '90vh',
      background: 'linear-gradient(to right, #c2e9fb, #a1c4fd)',
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
          animation: 'fadeIn 0.5s ease-in-out'
        }}
      >
        <h2 style={{
          textAlign: 'center',
          marginBottom: '25px',
          color: '#1976D2',
          fontWeight: '600'
        }}>
          🛠️ Modifier votre annonce
        </h2>

        <input
          name="title"
          value={form.title}
          onChange={handleChange}
          placeholder="📝 Titre"
          required
          style={inputStyle}
        />
        <textarea
          name="description"
          value={form.description}
          onChange={handleChange}
          placeholder="📄 Description"
          required
          style={{ ...inputStyle, height: '90px' }}
        />
        <input
          name="price"
          type="number"
          value={form.price}
          onChange={handleChange}
          placeholder="💰 Prix"
          required
          style={inputStyle}
        />
        <input
          name="category"
          value={form.category}
          onChange={handleChange}
          placeholder="📦 Catégorie"
          required
          style={inputStyle}
        />

        <button
          type="submit"
          style={{
            width: '100%',
            padding: '12px',
            backgroundColor: '#1976D2',
            color: 'white',
            border: 'none',
            borderRadius: '6px',
            fontWeight: 'bold',
            fontSize: '16px',
            cursor: 'pointer',
            transition: 'background 0.3s'
          }}
        >
          💾 Mettre à jour
        </button>

        <style>{`
          @keyframes fadeIn {
            from { opacity: 0; transform: translateY(-15px); }
            to { opacity: 1; transform: translateY(0); }
          }
        `}</style>
      </form>
    </div>
  );
}

const inputStyle = {
  width: '100%',
  padding: '12px',
  marginBottom: '16px',
  borderRadius: '8px',
  border: '1px solid #ccc',
  fontSize: '15px',
  boxShadow: 'inset 0 1px 3px rgba(0,0,0,0.05)'
};
