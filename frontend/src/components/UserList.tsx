import { useState, useEffect } from 'react';

interface User {
  id: string;
  nama: string;
  email: string;
  dibuat: string;
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
        setUsers(data);
        setError(null);
      } catch (err) {
        setError(err instanceof Error ? err.message : 'Failed to fetch users');
        console.error('Error fetching users:', err);
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
        <p>Loading users...</p>
      </div>
    );
  }

  if (error) {
    return (
      <div className="user-list error">
        <h3>⚠️ Error Loading Users</h3>
        <p>{error}</p>
      </div>
    );
  }

  return (
    <div className="user-list">
      <h3>👥 Users</h3>
      
      {users.length === 0 ? (
        <p>No users found. Add some users to see them here!</p>
      ) : (
        <div className="users-grid">
          {users.map((user) => (
            <div key={user.id} className="user-card">
              <h4>{user.nama}</h4>
              <p><strong>Email:</strong> {user.email}</p>
              <p><strong>Created:</strong> {new Date(user.dibuat).toLocaleDateString()}</p>
            </div>
          ))}
        </div>
      )}
    </div>
  );
}