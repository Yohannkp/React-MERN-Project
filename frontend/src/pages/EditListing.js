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
    API.get(`/listings/${id}`)
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
      await API.put(`/listings/${id}`, form);
      navigate('/listings');
    } catch (err) {
      alert("Erreur lors de la mise à jour.");
    }
  };

  if (loading) return <p>Chargement...</p>;

  return (
    <div style={{ padding: '20px' }}>
      <h2>Modifier l’annonce</h2>
      <form onSubmit={handleSubmit}>
        <input
          name="title"
          value={form.title}
          onChange={handleChange}
          placeholder="Titre"
          required
        /><br />
        <textarea
          name="description"
          value={form.description}
          onChange={handleChange}
          placeholder="Description"
          required
        /><br />
        <input
          name="price"
          type="number"
          value={form.price}
          onChange={handleChange}
          placeholder="Prix"
          required
        /><br />
        <input
          name="category"
          value={form.category}
          onChange={handleChange}
          placeholder="Catégorie"
          required
        /><br />
        <button type="submit">Mettre à jour</button>
      </form>
    </div>
  );
}
