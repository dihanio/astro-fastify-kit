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
        if (!healthResponse.ok) {
          throw new Error(`Pemeriksaan kesehatan gagal: ${healthResponse.status}`);
        }
        
        const contentType = healthResponse.headers.get('content-type');
        if (!contentType || !contentType.includes('application/json')) {
          throw new Error('Endpoint kesehatan mengembalikan respons non-JSON');
        }
        
        const healthData = await healthResponse.json();
        setHealth(healthData);

        // Fetch API info using the hello endpoint (which is proxied)
        const apiResponse = await fetch('/api/hello');
        if (!apiResponse.ok) {
          throw new Error(`API hello gagal: ${apiResponse.status}`);
        }
        
        const apiContentType = apiResponse.headers.get('content-type');
        if (!apiContentType || !apiContentType.includes('application/json')) {
          throw new Error('Endpoint API hello mengembalikan respons non-JSON');
        }
        
        const apiData = await apiResponse.json();
        // Create mock API info based on what we know about the backend
        setApiInfo({
          pesan: apiData.pesan || 'Astro-Fastify Starter Kit',
          versi: '1.0.0',
          endpoints: {
            kesehatan: '/health',
            ping: '/ping',
            api: '/api/hello',
            pengguna: '/api/users'
          }
        });
        
        setError(null);
      } catch (err) {
        setError(err instanceof Error ? err.message : 'Gagal mengambil data');
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
        <p>Memuat status API...</p>
      </div>
    );
  }

  if (error) {
    return (
      <div className="api-status error">
        <h3>⚠️ Kesalahan Koneksi API</h3>
        <p>{error}</p>
        <p>Pastikan server backend berjalan di port 3001</p>
      </div>
    );
  }

  return (
    <div className="api-status success">
      <h3>🚀 Status API</h3>
      
      {health && (
        <div className="health-info">
          <h4>Pemeriksaan Kesehatan</h4>
          <p><strong>Status:</strong> {health.status}</p>
          <p><strong>Waktu:</strong> {new Date(health.waktu).toLocaleString()}</p>
          <p><strong>Uptime:</strong> {Math.floor(health.uptime / 60)} menit</p>
        </div>
      )}

      {apiInfo && (
        <div className="api-info">
          <h4>Informasi API</h4>
          <p><strong>Pesan:</strong> {apiInfo.pesan}</p>
          <p><strong>Versi:</strong> {apiInfo.versi}</p>
          
          <div className="endpoints">
            <h5>Endpoint Tersedia:</h5>
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