export function decodeToken(): any | null {
  const token = sessionStorage.getItem('token');
  if (!token) return null;

  try {
    const payload = JSON.parse(atob(token.split('.')[1]));
    return payload;
  } catch (e) {
    console.error('Token invalide', e);
    return null;
  }
}
