import { useState } from 'react';
import { api } from '../api';

const AdminLogin = ({ onLogin }) => {
  const [password, setPassword] = useState('');
  const [error, setError] = useState('');
  const [loading, setLoading] = useState(false);

  const handleSubmit = async (e) => {
    e.preventDefault();
    setLoading(true);
    setError('');
    try {
      const { token } = await api.login(password);
      localStorage.setItem('admin_token', token);
      onLogin();
    } catch {
      setError('Invalid password. Please try again.');
    } finally {
      setLoading(false);
    }
  };

  return (
    <div
      className="min-h-screen flex items-center justify-center"
      style={{ background: 'linear-gradient(135deg, #050816 0%, #0f0a1e 50%, #050816 100%)' }}
    >
      {/* Background glow */}
      <div className="absolute inset-0 overflow-hidden pointer-events-none">
        <div
          className="absolute top-1/3 left-1/2"
          style={{
            transform: 'translate(-50%, -50%)',
            width: 600, height: 600,
            borderRadius: '50%',
            background: 'radial-gradient(circle, #915eff 0%, transparent 70%)',
            opacity: 0.1,
          }}
        />
      </div>

      <div className="relative z-10 w-full max-w-md" style={{ padding: '0 1rem' }}>
        <div
          className="rounded-2xl shadow-2xl"
          style={{
            padding: '2rem',
            background: 'rgba(15, 10, 30, 0.8)',
            border: '1px solid rgba(255,255,255,0.1)',
            backdropFilter: 'blur(20px)',
          }}
        >
          {/* Logo / Title */}
          <div className="text-center" style={{ marginBottom: '2rem' }}>
            <div
              className="flex items-center justify-center rounded-2xl text-2xl font-bold text-white"
              style={{
                width: 64, height: 64,
                margin: '0 auto 1rem',
                background: 'linear-gradient(135deg, #915eff, #5c3d9e)',
              }}
            >
              A
            </div>
            <h1 className="text-2xl font-bold text-white">Admin Panel</h1>
            <p className="text-gray-400 text-sm" style={{ marginTop: '0.25rem' }}>
              Enter your password to continue
            </p>
          </div>

          <form onSubmit={handleSubmit} className="flex flex-col" style={{ gap: '1rem' }}>
            <div>
              <label
                className="block text-sm font-medium text-gray-300"
                style={{ marginBottom: '0.5rem' }}
              >
                Password
              </label>
              <input
                type="password"
                value={password}
                onChange={(e) => setPassword(e.target.value)}
                placeholder="Enter admin password"
                className="w-full rounded-xl text-white focus:outline-none transition-all"
                style={{
                  padding: '0.75rem 1rem',
                  background: 'rgba(255,255,255,0.05)',
                  border: '1px solid rgba(255,255,255,0.1)',
                }}
                autoFocus
              />
            </div>

            {error && (
              <div
                className="rounded-xl text-red-400 text-sm"
                style={{
                  padding: '0.75rem 1rem',
                  background: 'rgba(239,68,68,0.1)',
                  border: '1px solid rgba(239,68,68,0.3)',
                }}
              >
                {error}
              </div>
            )}

            <button
              type="submit"
              disabled={loading || !password}
              className="w-full rounded-xl font-semibold text-white transition-all duration-200 disabled:opacity-50 disabled:cursor-not-allowed cursor-pointer"
              style={{
                padding: '0.75rem',
                marginTop: '0.5rem',
                background: loading ? '#5c3d9e' : 'linear-gradient(135deg, #915eff, #5c3d9e)',
              }}
            >
              {loading ? 'Signing in...' : 'Sign In'}
            </button>
          </form>

          <p className="text-center text-gray-600 text-xs" style={{ marginTop: '1.5rem' }}>
            Portfolio Admin Panel — Restricted Access
          </p>
        </div>
      </div>
    </div>
  );
};

export default AdminLogin;
