import { useEffect, useState } from 'react';
import { useParams, useNavigate, Link } from 'react-router-dom';
import API from '../services/api';
import { getCurrentUserId } from '../services/auth';


export default function ListingDetails() {
  const { id } = useParams();
  const [listing, setListing] = useState(null);
  const navigate = useNavigate();
  const isLoggedIn = !!localStorage.getItem('token');

  useEffect(() => {
    API.get(`/listings/${id}`)
      .then(res => setListing(res.data))
      .catch(err => {
        alert("Erreur lors du chargement.");
        console.error(err);
      });
  }, [id]);

  const handleDelete = async () => {
    if (!window.confirm("Supprimer cette annonce ?")) return;
    try {
      await API.delete(`/listings/${id}`);
      navigate('/listings');
    } catch (err) {
      alert("Erreur lors de la suppression.");
    }
  };

  if (!listing) return <p>Chargement...</p>;

  return (
    <div style={{ padding: '20px' }}>
      <h2>{listing.title}</h2>
      <p><strong>Description :</strong> {listing.description}</p>
      <p><strong>Prix :</strong> {listing.price} €</p>
      <p><strong>Catégorie :</strong> {listing.category}</p>
      <p><strong>Posté par :</strong> {listing.author?.username}</p>

      {isLoggedIn && listing.author && getCurrentUserId() === listing.author._id && (
  <div style={{ marginTop: '10px' }}>
    <Link to={`/listings/${id}/edit`}>
      <button style={{ marginRight: '10px' }}>Modifier</button>
    </Link>
    <button onClick={handleDelete}>Supprimer</button>
  </div>
)}

    </div>
  );
}
