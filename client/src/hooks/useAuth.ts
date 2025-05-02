// client/src/hooks/useAuth.ts
export function useAuth() {
    const token = localStorage.getItem('id_token');
    if (!token) return { user: null };
    const [, payload] = token.split('.'); // naive decode
    try {
      return { user: JSON.parse(atob(payload)) };
    } catch { return { user: null }; }
  }
  