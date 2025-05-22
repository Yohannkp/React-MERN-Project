import { Link, useNavigate } from 'react-router-dom';

export default function Navbar() {
  const navigate = useNavigate();
  const token = localStorage.getItem('token');

  const logout = () => {
    localStorage.removeItem('token');
    navigate('/login');
  };

  return (
    <nav style={{ padding: '10px', borderBottom: '1px solid #ccc' }}>
      <Link to="/listings" style={{ marginRight: '10px' }}>Annonces</Link>
      {token && <Link to="/create" style={{ marginRight: '10px' }}>Créer</Link>}
      {!token ? (
        <>
          <Link to="/login" style={{ marginRight: '10px' }}>Connexion</Link>
          <Link to="/register">Inscription</Link>
        </>
      ) : (
        <button onClick={logout}>Déconnexion</button>
      )}
    </nav>
  );
}
