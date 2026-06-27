import { useState } from 'react';
import { NavLink, useNavigate } from 'react-router-dom';

const navItems = [
  { to: '/admin', label: 'Dashboard', icon: '⊞', exact: true },
  { to: '/admin/hero', label: 'Hero', icon: '🏠' },
  { to: '/admin/about', label: 'About Me', icon: '👤' },
  { to: '/admin/stats', label: 'Stats', icon: '📊' },
  { to: '/admin/experience', label: 'Experience', icon: '💼' },
  { to: '/admin/education', label: 'Education', icon: '🎓' },
  { to: '/admin/tech', label: 'Tech Stack', icon: '⚙️' },
  { to: '/admin/projects', label: 'Projects', icon: '🚀' },
];

const AdminLayout = ({ children, onLogout }) => {
  const [sidebarOpen, setSidebarOpen] = useState(false);
  const navigate = useNavigate();

  const handleLogout = () => {
    localStorage.removeItem('admin_token');
    onLogout();
    navigate('/admin');
  };

  return (
    <div className="min-h-screen flex" style={{ background: '#070712' }}>
      {/* Mobile overlay */}
      {sidebarOpen && (
        <div
          className="fixed inset-0 z-20 lg:hidden"
          style={{ background: 'rgba(0,0,0,0.5)' }}
          onClick={() => setSidebarOpen(false)}
        />
      )}

      {/* Sidebar */}
      <aside
        className={`fixed top-0 left-0 h-full z-30 flex flex-col lg:translate-x-0 lg:static lg:z-auto transition-transform duration-300 ${sidebarOpen ? 'translate-x-0' : '-translate-x-full'}`}
        style={{
          width: 256,
          background: 'linear-gradient(180deg, #0d0b1e 0%, #0a0818 100%)',
          borderRight: '1px solid rgba(145,94,255,0.15)',
        }}
      >
        {/* Header */}
        <div style={{ padding: '1.5rem', borderBottom: '1px solid rgba(255,255,255,0.05)' }}>
          <div className="flex items-center" style={{ gap: '0.75rem' }}>
            <div
              className="flex items-center justify-center rounded-xl text-white font-bold text-lg flex-shrink-0"
              style={{ width: 40, height: 40, background: 'linear-gradient(135deg, #915eff, #5c3d9e)' }}
            >
              A
            </div>
            <div>
              <p className="text-white font-bold text-sm">Anus Imran</p>
              <p className="text-gray-500 text-xs">Portfolio Admin</p>
            </div>
          </div>
        </div>

        {/* Nav */}
        <nav className="flex-1 overflow-y-auto" style={{ padding: '1rem 0.75rem' }}>
          <p className="text-gray-600 text-xs font-semibold uppercase tracking-wider" style={{ padding: '0 0.75rem', marginBottom: '0.75rem' }}>
            Sections
          </p>
          <div className="flex flex-col" style={{ gap: '0.25rem' }}>
            {navItems.map((item) => (
              <NavLink
                key={item.to}
                to={item.to}
                end={item.exact}
                onClick={() => setSidebarOpen(false)}
                className={({ isActive }) =>
                  `flex items-center rounded-xl text-sm font-medium transition-all duration-200 ${isActive ? 'text-white' : 'text-gray-400 hover:text-white'}`
                }
                style={({ isActive }) => ({
                  gap: '0.75rem',
                  padding: '0.625rem 0.75rem',
                  ...(isActive ? {
                    background: 'linear-gradient(135deg, rgba(145,94,255,0.25), rgba(92,61,158,0.15))',
                    border: '1px solid rgba(145,94,255,0.3)',
                  } : {}),
                })}
              >
                <span style={{ fontSize: '1rem' }}>{item.icon}</span>
                {item.label}
              </NavLink>
            ))}
          </div>
        </nav>

        {/* Logout */}
        <div style={{ padding: '1rem', borderTop: '1px solid rgba(255,255,255,0.05)' }}>
          <button
            onClick={handleLogout}
            className="w-full flex items-center rounded-xl text-sm font-medium text-red-400 hover:bg-red-400/10 transition-all duration-200 cursor-pointer"
            style={{ gap: '0.75rem', padding: '0.625rem 0.75rem' }}
          >
            <span>↩</span> Logout
          </button>
        </div>
      </aside>

      {/* Main */}
      <div className="flex-1 flex flex-col min-w-0">
        {/* Top bar */}
        <header
          className="sticky top-0 z-10 flex items-center justify-between"
          style={{
            padding: '1rem 1.5rem',
            background: 'rgba(7,7,18,0.95)',
            borderBottom: '1px solid rgba(255,255,255,0.05)',
            backdropFilter: 'blur(10px)',
          }}
        >
          <button
            onClick={() => setSidebarOpen(true)}
            className="lg:hidden text-gray-400 hover:text-white cursor-pointer"
          >
            ☰
          </button>
          <div className="hidden lg:flex items-center text-gray-500 text-sm" style={{ gap: '0.5rem' }}>
            <span>Portfolio</span>
            <span>/</span>
            <span className="text-white">Admin Panel</span>
          </div>
          <a
            href="/"
            target="_blank"
            rel="noreferrer"
            className="text-xs text-[#915eff] hover:bg-[#915eff]/10 transition-all rounded-lg"
            style={{ padding: '0.375rem 0.75rem', border: '1px solid rgba(145,94,255,0.3)' }}
          >
            View Site ↗
          </a>
        </header>

        {/* Content */}
        <main className="flex-1 overflow-auto" style={{ padding: '1.5rem' }}>
          {children}
        </main>
      </div>
    </div>
  );
};

export default AdminLayout;
