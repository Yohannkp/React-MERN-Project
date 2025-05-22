import { Link, useNavigate } from 'react-router-dom';

export default function Navbar() {
  const navigate = useNavigate();
  const token = localStorage.getItem('token');

  const logout = () => {
    localStorage.removeItem('token');
    navigate('/login');
  };

  return (
    <nav style={{
      display: 'flex',
      justifyContent: 'space-between',
      alignItems: 'center',
      padding: '15px 30px',
      backgroundColor: '#ffffff',
      borderBottom: '2px solid #e0e0e0',
      boxShadow: '0 2px 6px rgba(0,0,0,0.05)',
      position: 'sticky',
      top: 0,
      zIndex: 1000
    }}>
      <div>
        <Link to="/listings" style={linkStyle}>🏠 Annonces</Link>
        {token && <Link to="/create" style={linkStyle}>➕ Créer</Link>}
      </div>
      <div>
        {!token ? (
          <>
            <Link to="/login" style={linkStyle}>Connexion</Link>
            <Link to="/register" style={linkStyle}>Inscription</Link>
          </>
        ) : (
          <button
            onClick={logout}
            style={{
              padding: '6px 12px',
              backgroundColor: '#D32F2F',
              color: '#fff',
              border: 'none',
              borderRadius: '4px',
              cursor: 'pointer',
              fontWeight: 'bold'
            }}
          >
            Déconnexion
          </button>
        )}
      </div>
    </nav>
  );
}

const linkStyle = {
  marginRight: '15px',
  textDecoration: 'none',
  color: '#333',
  fontWeight: 'bold',
  fontSize: '16px'
};
