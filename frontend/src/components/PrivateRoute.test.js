import { render, screen } from '@testing-library/react';
import { MemoryRouter, Routes, Route } from 'react-router-dom';
import PrivateRoute from './PrivateRoute';

function ouvrir(chemin) {
  return render(
    <MemoryRouter initialEntries={[chemin]}>
      <Routes>
        <Route path="/login" element={<p>Page de connexion</p>} />
        <Route path="/create" element={<PrivateRoute><p>Formulaire de création</p></PrivateRoute>} />
      </Routes>
    </MemoryRouter>
  );
}

afterEach(() => localStorage.clear());

test('sans jeton, une page protégée renvoie vers la connexion', () => {
  ouvrir('/create');
  expect(screen.getByText('Page de connexion')).toBeInTheDocument();
  expect(screen.queryByText('Formulaire de création')).not.toBeInTheDocument();
});

test('avec un jeton, la page protégée s’affiche', () => {
  localStorage.setItem('token', 'jeton');
  ouvrir('/create');
  expect(screen.getByText('Formulaire de création')).toBeInTheDocument();
});
