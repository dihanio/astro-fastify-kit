import { useState, useEffect } from 'react';

interface User {
  id: string;
  name: string;
  email: string;
  createdAt: string;
}

export default function UserList() {
  const [users, setUsers] = useState<User[]>([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState<string | null>(null);

  useEffect(() => {
    const fetchUsers = async () => {
      try {
        setLoading(true);
        const response = await fetch('/api/users');
        
        if (!response.ok) {
          throw new Error(`HTTP error! status: ${response.status}`);
        }
        
        const data = await response.json();
        
        // Handle the backend response structure: { users: [], total: number }
        if (data && Array.isArray(data.users)) {
          setUsers(data.users);
        } else if (Array.isArray(data)) {
          setUsers(data);
        } else {
          setUsers([]);
        }
        
        setError(null);
      } catch (err) {
        setError(err instanceof Error ? err.message : 'Gagal mengambil data pengguna');
        console.error('Error fetching users:', err);
        setUsers([]); // Ensure users is always an array even on error
      } finally {
        setLoading(false);
      }
    };

    fetchUsers();
  }, []);

  if (loading) {
    return (
      <div className="user-list loading">
        <div className="spinner"></div>
        <p>Memuat pengguna...</p>
      </div>
    );
  }

  if (error) {
    return (
      <div className="user-list error">
        <h3>⚠️ Kesalahan Memuat Pengguna</h3>
        <p>{error}</p>
      </div>
    );
  }

  return (
    <div className="user-list">
      <h3>👥 Pengguna</h3>
      
      {!Array.isArray(users) || users.length === 0 ? (
        <p>Tidak ada pengguna ditemukan. Tambahkan beberapa pengguna untuk melihatnya di sini!</p>
      ) : (
        <div className="users-grid">
          {users.map((user) => (
            <div key={user.id} className="user-card">
              <h4>{user.name}</h4>
              <p><strong>Email:</strong> {user.email}</p>
              <p><strong>Dibuat:</strong> {new Date(user.createdAt).toLocaleDateString()}</p>
            </div>
          ))}
        </div>
      )}
    </div>
  );
}