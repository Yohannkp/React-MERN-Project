import { jwtDecode } from 'jwt-decode'; // ✅

export function getCurrentUserId() {
  const token = localStorage.getItem('token');
  if (!token) return null;

  try {
    const decoded = jwtDecode(token);
    return decoded.id; // car dans le backend on fait: jwt.sign({ id }, ...)
  } catch (err) {
    return null;
  }
}
