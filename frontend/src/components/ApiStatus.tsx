import { useState, useEffect } from 'react';

interface HealthStatus {
  status: string;
  waktu: string;
  uptime: number;
}

interface ApiInfo {
  pesan: string;
  versi: string;
  endpoints: {
    kesehatan: string;
    ping: string;
    api: string;
    pengguna: string;
  };
}

export default function ApiStatus() {
  const [health, setHealth] = useState<HealthStatus | null>(null);
  const [apiInfo, setApiInfo] = useState<ApiInfo | null>(null);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState<string | null>(null);

  useEffect(() => {
    const fetchData = async () => {
      try {
        setLoading(true);
        
        // Fetch health status
        const healthResponse = await fetch('/health');
        const healthData = await healthResponse.json();
        setHealth(healthData);

        // Fetch API info
        const apiResponse = await fetch('/api');
        if (!apiResponse.ok) {
          // If /api doesn't exist, try root endpoint
          const rootResponse = await fetch('/');
          const rootData = await rootResponse.json();
          setApiInfo(rootData);
        } else {
          const apiData = await apiResponse.json();
          setApiInfo(apiData);
        }
        
        setError(null);
      } catch (err) {
        setError(err instanceof Error ? err.message : 'Failed to fetch data');
        console.error('Error fetching API data:', err);
      } finally {
        setLoading(false);
      }
    };

    fetchData();
  }, []);

  if (loading) {
    return (
      <div className="api-status loading">
        <div className="spinner"></div>
        <p>Loading API status...</p>
      </div>
    );
  }

  if (error) {
    return (
      <div className="api-status error">
        <h3>⚠️ API Connection Error</h3>
        <p>{error}</p>
        <p>Make sure the backend server is running on port 3001</p>
      </div>
    );
  }

  return (
    <div className="api-status success">
      <h3>🚀 API Status</h3>
      
      {health && (
        <div className="health-info">
          <h4>Health Check</h4>
          <p><strong>Status:</strong> {health.status}</p>
          <p><strong>Time:</strong> {new Date(health.waktu).toLocaleString()}</p>
          <p><strong>Uptime:</strong> {Math.floor(health.uptime / 60)} minutes</p>
        </div>
      )}

      {apiInfo && (
        <div className="api-info">
          <h4>API Information</h4>
          <p><strong>Message:</strong> {apiInfo.pesan}</p>
          <p><strong>Version:</strong> {apiInfo.versi}</p>
          
          <div className="endpoints">
            <h5>Available Endpoints:</h5>
            <ul>
              {Object.entries(apiInfo.endpoints).map(([key, value]) => (
                <li key={key}>
                  <code>{value}</code> - {key}
                </li>
              ))}
            </ul>
          </div>
        </div>
      )}
    </div>
  );
}