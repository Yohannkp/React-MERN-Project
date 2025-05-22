// src/components/AdCard.js
import { Link } from 'react-router-dom';
import './AdCard.css';

export default function AdCard({ ad }) {
  return (
    <div className="ad-card">
      <h2>{ad.title}</h2>
      <p><strong>Prix:</strong> {ad.price} €</p>
      <p><strong>Catégorie:</strong> {ad.category}</p>
      <Link to={`/listings/${ad._id}`}>Voir l'annonce</Link>
    </div>
  );
}
