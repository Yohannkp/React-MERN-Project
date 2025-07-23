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
    API.get(`/api/listings/${id}`)
      .then(res => setListing(res.data))
      .catch(err => {
        alert("Erreur lors du chargement.");
        console.error(err);
      });
  }, [id]);

  const handleDelete = async () => {
    if (!window.confirm("Supprimer cette annonce ?")) return;
    try {
      await API.delete(`/api/listings/${id}`);
      navigate('/listings');
    } catch (err) {
      alert("Erreur lors de la suppression.");
    }
  };

  if (!listing) return <p style={{ textAlign: 'center', marginTop: '100px' }}>Chargement...</p>;

  return (
    <div style={{
      display: 'flex',
      justifyContent: 'center',
      alignItems: 'center',
      minHeight: '90vh',
      background: 'linear-gradient(to right, #ff9a9e, #fad0c4)',
      padding: '40px'
    }}>
      <div style={{
        background: 'rgba(255, 255, 255, 0.95)',
        backdropFilter: 'blur(6px)',
        padding: '35px',
        borderRadius: '16px',
        boxShadow: '0 15px 35px rgba(0,0,0,0.25)',
        maxWidth: '550px',
        width: '100%',
        animation: 'fadeIn 0.6s ease-in-out'
      }}>
        <h2 style={{
          marginBottom: '15px',
          fontSize: '24px',
          color: '#333'
        }}>{listing.title}</h2>

        <p><strong>📄 Description :</strong> {listing.description}</p>
        <p><strong>💰 Prix :</strong> {listing.price} €</p>
        <p><strong>📦 Catégorie :</strong> {listing.category}</p>
        <p><strong>👤 Posté par :</strong> {listing.author?.username} {getCurrentUserId() === listing.author?._id && "🧑‍💻 (Vous)"}</p>

        {isLoggedIn && listing.author && getCurrentUserId() === listing.author._id && (
          <div style={{ marginTop: '20px' }}>
            <Link to={`/listings/${id}/edit`}>
              <button style={buttonStyle("#1976D2")}>✏️ Modifier</button>
            </Link>
            <button onClick={handleDelete} style={buttonStyle("#E53935")}>🗑️ Supprimer</button>
          </div>
        )}
      </div>

      <style>{`
        @keyframes fadeIn {
          from { opacity: 0; transform: translateY(20px); }
          to { opacity: 1; transform: translateY(0); }
        }
      `}</style>
    </div>
  );
}

const buttonStyle = (bgColor) => ({
  marginRight: '10px',
  padding: '10px 16px',
  backgroundColor: bgColor,
  color: '#fff',
  border: 'none',
  borderRadius: '6px',
  fontWeight: 'bold',
  cursor: 'pointer',
  fontSize: '15px',
  transition: 'background 0.3s'
});
