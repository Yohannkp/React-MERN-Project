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
      const res = await API.get('/api/listings');
      setListings(res.data);
    } catch (err) {
      console.error('Erreur chargement des annonces', err);
    }
  };

  const handleDelete = async (id) => {
    if (!window.confirm('Supprimer cette annonce ?')) return;
    try {
      await API.delete(`/api/listings/${id}`);
      fetchListings();
    } catch (err) {
      alert("Erreur lors de la suppression.");
    }
  };

  useEffect(() => {
    fetchListings();
  }, []);

  return (
    <div style={{
      padding: '40px 20px',
      background: 'linear-gradient(135deg, #f6d365 0%, #fda085 100%)',
      minHeight: '100vh'
    }}>
      <h2 style={{
        marginBottom: '40px',
        textAlign: 'center',
        fontSize: '2rem',
        color: '#222',
        textShadow: '1px 1px 3px rgba(0,0,0,0.3)'
      }}>
        ✨ Nos annonces récentes
      </h2>

      <div style={{ maxWidth: '1000px', margin: 'auto' }}>
        {listings.length === 0 ? (
          <p style={{ textAlign: 'center', color: '#333', fontSize: '18px' }}>Aucune annonce disponible.</p>
        ) : (
          listings.map(ad => {
            const isOwner = isLoggedIn && ad.author && getCurrentUserId() === ad.author._id;
            return (
              <div
                key={ad._id}
                style={{
                  borderRadius: '15px',
                  boxShadow: '0 12px 25px rgba(0,0,0,0.15)',
                  padding: '25px',
                  marginBottom: '30px',
                  background: 'white',
                  transition: 'all 0.3s ease',
                  transform: 'perspective(1000px) translateZ(0)',
                  animation: 'fadeIn 0.6s ease'
                }}
                onMouseEnter={e => {
                  e.currentTarget.style.transform = 'scale(1.02)';
                  e.currentTarget.style.boxShadow = '0 20px 40px rgba(0,0,0,0.25)';
                }}
                onMouseLeave={e => {
                  e.currentTarget.style.transform = 'scale(1)';
                  e.currentTarget.style.boxShadow = '0 12px 25px rgba(0,0,0,0.15)';
                }}
              >
                <h3 style={{ marginBottom: '10px', fontSize: '22px' }}>{ad.title}</h3>
                <p style={{ fontSize: '16px', marginBottom: '6px' }}>
                  💰 <strong>{ad.price} €</strong> • {ad.category}
                </p>
                <p style={{ fontSize: '14px', color: '#777' }}>
                  Posté par : <strong>{ad.author?.username}</strong> {isOwner && '👑 (Vous)'}
                </p>
                <div style={{ marginTop: '15px' }}>
                  <Link to={`/listings/${ad._id}`} style={actionLink}>🔍 Voir</Link>
                  {isOwner && (
                    <>
                      <button
                        onClick={() => navigate(`/listings/${ad._id}/edit`)}
                        style={{ ...actionButton, backgroundColor: '#1976D2' }}
                      >
                        ✏️ Modifier
                      </button>
                      <button
                        onClick={() => handleDelete(ad._id)}
                        style={{ ...actionButton, backgroundColor: '#D32F2F' }}
                      >
                        🗑️ Supprimer
                      </button>
                    </>
                  )}
                </div>
              </div>
            );
          })
        )}
      </div>

      <style>{`
        @keyframes fadeIn {
          from { opacity: 0; transform: translateY(15px); }
          to { opacity: 1; transform: translateY(0); }
        }
      `}</style>
    </div>
  );
}

const actionLink = {
  marginRight: '10px',
  padding: '8px 12px',
  backgroundColor: '#FFB74D',
  color: '#222',
  borderRadius: '5px',
  textDecoration: 'none',
  fontWeight: 'bold'
};

const actionButton = {
  marginRight: '10px',
  padding: '8px 12px',
  color: 'white',
  border: 'none',
  borderRadius: '5px',
  cursor: 'pointer',
  fontWeight: 'bold'
};
