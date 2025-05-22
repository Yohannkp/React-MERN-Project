import { useEffect, useState } from 'react';
import { Link, useNavigate } from 'react-router-dom';
import API from '../services/api';
import { getCurrentUserId } from '../services/auth';


export default function Listings() {
  const [listings, setListings] = useState([]);
  const navigate = useNavigate();
  const isLoggedIn = !!localStorage.getItem('token');

  const fetchListings = async () => {
    try {
      const res = await API.get('/listings');
      setListings(res.data);
    } catch (err) {
      console.error('Erreur chargement des annonces', err);
    }
  };

  const handleDelete = async (id) => {
    if (!window.confirm('Supprimer cette annonce ?')) return;
    try {
      await API.delete(`/listings/${id}`);
      fetchListings();
    } catch (err) {
      alert("Erreur lors de la suppression.");
    }
  };

  useEffect(() => {
    fetchListings();
  }, []);

  return (
    <div style={{ padding: '20px' }}>
      <h2>Annonces</h2>
      {listings.length === 0 ? (
        <p>Aucune annonce disponible.</p>
      ) : (
        listings.map(ad => (
          <div key={ad._id} style={{ border: '1px solid #ccc', padding: '10px', marginBottom: '10px' }}>
            <h3>{ad.title}</h3>
            <p>{ad.price} € - {ad.category}</p>
            <Link to={`/listings/${ad._id}`}>Voir</Link>
            {isLoggedIn && ad.author && getCurrentUserId() === ad.author._id && (
  <>
    <button onClick={() => navigate(`/listings/${ad._id}/edit`)} style={{ marginRight: '10px' }}>
      Modifier
    </button>
    <button onClick={() => handleDelete(ad._id)}>Supprimer</button>
  </>
)}
          </div>
        ))
      )}
    </div>
  );
}
