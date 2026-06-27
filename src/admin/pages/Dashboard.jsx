import { useEffect, useState } from 'react';
import { Link } from 'react-router-dom';
import { api } from '../../api';

const cards = [
  { label: 'Hero Section', icon: '🏠', to: '/admin/hero', desc: 'Name, tagline & subtitle' },
  { label: 'About Me', icon: '👤', to: '/admin/about', desc: 'Bio, photo & typing words' },
  { label: 'Stats', icon: '📊', to: '/admin/stats', desc: 'Achievement counters' },
  { label: 'Experience', icon: '💼', to: '/admin/experience', desc: 'Work timeline entries' },
  { label: 'Education', icon: '🎓', to: '/admin/education', desc: 'Academic journey' },
  { label: 'Tech Stack', icon: '⚙️', to: '/admin/tech', desc: 'Skills & technologies' },
  { label: 'Projects', icon: '🚀', to: '/admin/projects', desc: 'Portfolio showcase' },
];

const Dashboard = () => {
  const [counts, setCounts] = useState({});

  useEffect(() => {
    Promise.all([
      api.getStats().then(d => d.length),
      api.getExperiences().then(d => d.length),
      api.getEducation().then(d => d.length),
      api.getTech().then(d => d.length),
      api.getProjects().then(d => d.length),
    ]).then(([stats, exp, edu, tech, proj]) => {
      setCounts({ stats, exp, edu, tech, proj });
    }).catch(() => {});
  }, []);

  const countMap = {
    'Stats': counts.stats,
    'Experience': counts.exp,
    'Education': counts.edu,
    'Tech Stack': counts.tech,
    'Projects': counts.proj,
  };

  const metaStats = [
    { label: 'Experiences', value: counts.exp, icon: '💼' },
    { label: 'Projects', value: counts.proj, icon: '🚀' },
    { label: 'Technologies', value: counts.tech, icon: '⚙️' },
    { label: 'Education', value: counts.edu, icon: '🎓' },
  ];

  return (
    <div>
      <div style={{ marginBottom: '2rem' }}>
        <h1 className="text-2xl font-bold text-white">Dashboard</h1>
        <p className="text-gray-400 text-sm" style={{ marginTop: '0.25rem' }}>Manage all sections of your portfolio from here.</p>
      </div>

      {/* Stats row */}
      <div className="grid grid-cols-2 md:grid-cols-4" style={{ gap: '1rem', marginBottom: '2rem' }}>
        {metaStats.map(s => (
          <div
            key={s.label}
            className="rounded-xl"
            style={{ padding: '1rem', background: 'rgba(255,255,255,0.03)', border: '1px solid rgba(255,255,255,0.05)' }}
          >
            <div style={{ fontSize: '1.5rem', marginBottom: '0.25rem' }}>{s.icon}</div>
            <div className="text-2xl font-bold text-white">{s.value ?? '—'}</div>
            <div className="text-gray-500 text-xs" style={{ marginTop: '0.25rem' }}>{s.label}</div>
          </div>
        ))}
      </div>

      <h2 className="text-gray-400 text-xs font-semibold uppercase tracking-wider" style={{ marginBottom: '1rem' }}>Quick Access</h2>
      <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3" style={{ gap: '1rem' }}>
        {cards.map(card => (
          <Link
            key={card.to}
            to={card.to}
            className="group rounded-2xl transition-all duration-200 cursor-pointer block"
            style={{ padding: '1.25rem', background: 'rgba(255,255,255,0.03)', border: '1px solid rgba(255,255,255,0.05)' }}
            onMouseEnter={e => { e.currentTarget.style.borderColor = 'rgba(145,94,255,0.4)'; }}
            onMouseLeave={e => { e.currentTarget.style.borderColor = 'rgba(255,255,255,0.05)'; }}
          >
            <div className="flex items-start justify-between" style={{ marginBottom: '0.75rem' }}>
              <span style={{ fontSize: '1.875rem' }}>{card.icon}</span>
              {countMap[card.label] !== undefined && (
                <span
                  className="text-xs text-[#915eff] rounded-full"
                  style={{ padding: '0.25rem 0.5rem', border: '1px solid rgba(145,94,255,0.3)', background: 'rgba(145,94,255,0.1)' }}
                >
                  {countMap[card.label]} items
                </span>
              )}
            </div>
            <h3 className="text-white font-semibold text-base group-hover:text-[#915eff] transition-colors">{card.label}</h3>
            <p className="text-gray-500 text-sm" style={{ marginTop: '0.25rem' }}>{card.desc}</p>
          </Link>
        ))}
      </div>
    </div>
  );
};

export default Dashboard;
