import { BrowserRouter as Router, Routes, Route, Navigate } from 'react-router-dom';
import Navbar from './components/Navbar';
import PrivateRoute from './components/PrivateRoute';
import PublicRoute from './components/PublicRoute';
import Listings from './pages/Listings';
import ListingDetails from './pages/ListingDetails';
import CreateListing from './pages/CreateListing';
import EditListing from './pages/EditListing';
import Login from './pages/Login';
import Register from './pages/Register';

function App() {
  return (
    <Router basename="/React-MERN-Project">
      <Navbar />
      <Routes>
        <Route path="/" element={<Navigate to="/listings" />} />
        <Route path="/listings" element={<Listings />} />
        <Route path="/listings/:id" element={<ListingDetails />} />
        <Route path="/listings/:id/edit" element={<PrivateRoute><EditListing /></PrivateRoute>} />
        <Route path="/create" element={<PrivateRoute><CreateListing /></PrivateRoute>} />
        <Route path="/login" element={<PublicRoute><Login /></PublicRoute>} />
        <Route path="/register" element={<PublicRoute><Register /></PublicRoute>} />
      </Routes>
    </Router>
  );
}

export default App;
