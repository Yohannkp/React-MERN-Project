import React from 'react';

const BackendAlert = () => {
  // Vérifier si nous sommes sur GitHub Pages
  const isGitHubPages = window.location.hostname === 'yohannkp.github.io';
  
  if (!isGitHubPages) {
    return null; // Ne pas afficher en local
  }

  return (
    <div style={{
      backgroundColor: '#fef3c7',
      border: '1px solid #f59e0b',
      borderRadius: '8px',
      padding: '16px',
      margin: '20px',
      color: '#92400e'
    }}>
      <div style={{ display: 'flex', alignItems: 'center', marginBottom: '8px' }}>
        <span style={{ fontSize: '20px', marginRight: '8px' }}>⚠️</span>
        <strong>Backend en cours de configuration</strong>
      </div>
      <p style={{ margin: '8px 0' }}>
        Cette démo frontend est déployée sur GitHub Pages. 
        Pour tester les fonctionnalités complètes (connexion, création d'annonces), 
        le backend doit être démarré sur GitHub Codespaces.
      </p>
      <details style={{ marginTop: '12px' }}>
        <summary style={{ cursor: 'pointer', fontWeight: 'bold' }}>
          📋 Instructions pour activer le backend
        </summary>
        <ol style={{ marginTop: '8px', paddingLeft: '20px' }}>
          <li>Allez sur <a href="https://github.com/Yohannkp/React-MERN-Project" target="_blank" rel="noopener noreferrer">le dépôt GitHub</a></li>
          <li>Cliquez sur "Code" → "Codespaces" → "Create codespace"</li>
          <li>Dans le terminal : <code>cd backend && npm install && npm start</code></li>
          <li>Configurez MongoDB Atlas et mettez à jour l'URL dans le frontend</li>
        </ol>
      </details>
    </div>
  );
};

export default BackendAlert;
