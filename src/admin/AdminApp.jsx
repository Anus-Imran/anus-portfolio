import { useState, useEffect } from 'react';
import { Routes, Route, Navigate } from 'react-router-dom';
import AdminLogin from './AdminLogin';
import AdminLayout from './AdminLayout';
import Dashboard from './pages/Dashboard';
import HeroEditor from './pages/HeroEditor';
import AboutEditor from './pages/AboutEditor';
import StatsEditor from './pages/StatsEditor';
import ExperienceEditor from './pages/ExperienceEditor';
import EducationEditor from './pages/EducationEditor';
import TechEditor from './pages/TechEditor';
import ProjectsEditor from './pages/ProjectsEditor';
import { api } from '../api';

const AdminApp = () => {
  const [authed, setAuthed] = useState(null); // null = checking

  useEffect(() => {
    const token = localStorage.getItem('admin_token');
    if (!token) { setAuthed(false); return; }
    api.verify().then(({ valid }) => setAuthed(valid)).catch(() => setAuthed(false));
  }, []);

  if (authed === null) {
    return (
      <div className="min-h-screen flex items-center justify-center" style={{ background: '#050816' }}>
        <div className="w-8 h-8 border-2 border-[#915eff] border-t-transparent rounded-full animate-spin" />
      </div>
    );
  }

  if (!authed) {
    return <AdminLogin onLogin={() => setAuthed(true)} />;
  }

  return (
    <AdminLayout onLogout={() => setAuthed(false)}>
      <Routes>
        <Route index element={<Dashboard />} />
        <Route path="hero" element={<HeroEditor />} />
        <Route path="about" element={<AboutEditor />} />
        <Route path="stats" element={<StatsEditor />} />
        <Route path="experience" element={<ExperienceEditor />} />
        <Route path="education" element={<EducationEditor />} />
        <Route path="tech" element={<TechEditor />} />
        <Route path="projects" element={<ProjectsEditor />} />
        <Route path="*" element={<Navigate to="/admin" replace />} />
      </Routes>
    </AdminLayout>
  );
};

export default AdminApp;
