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
      await API.post('/listings', form);
      navigate('/listings');
    } catch (err) {
      alert("Erreur lors de la création.");
    }
  };

  return (
    <div style={{ padding: '20px' }}>
      <h2>Créer une annonce</h2>
      <form onSubmit={handleSubmit}>
        <input
          name="title"
          placeholder="Titre"
          value={form.title}
          onChange={handleChange}
          required
        /><br />
        <textarea
          name="description"
          placeholder="Description"
          value={form.description}
          onChange={handleChange}
          required
        /><br />
        <input
          name="price"
          type="number"
          placeholder="Prix"
          value={form.price}
          onChange={handleChange}
          required
        /><br />
        <input
          name="category"
          placeholder="Catégorie"
          value={form.category}
          onChange={handleChange}
          required
        /><br />
        <button type="submit">Publier</button>
      </form>
    </div>
  );
}
