const BASE = import.meta.env.VITE_API_URL || 'http://localhost:5000';

const getToken = () => localStorage.getItem('admin_token');

const headers = (isForm = false) => {
  const h = { Authorization: `Bearer ${getToken()}` };
  if (!isForm) h['Content-Type'] = 'application/json';
  return h;
};

const req = async (method, path, body, isForm = false) => {
  const opts = { method, headers: headers(isForm) };
  if (body) opts.body = isForm ? body : JSON.stringify(body);
  const res = await fetch(`${BASE}${path}`, opts);
  if (!res.ok) {
    const err = await res.json().catch(() => ({ error: res.statusText }));
    throw new Error(err.error || 'Request failed');
  }
  return res.json();
};

export const api = {
  // Auth
  login: (password) => req('POST', '/api/auth/login', { password }),
  verify: () => req('POST', '/api/auth/verify'),

  // Upload
  uploadImage: (file, folder) => {
    const fd = new FormData();
    fd.append('image', file);
    fd.append('folder', folder);
    return req('POST', '/api/upload/image', fd, true);
  },
  uploadFile: (file) => {
    const fd = new FormData();
    fd.append('file', file);
    return req('POST', '/api/upload/file', fd, true);
  },

  // Hero
  getHero: () => fetch(`${BASE}/api/hero`).then(r => r.json()),
  updateHero: (data) => req('PUT', '/api/hero', data),

  // About
  getAbout: () => fetch(`${BASE}/api/about`).then(r => r.json()),
  updateAbout: (data) => req('PUT', '/api/about', data),

  // Stats
  getStats: () => fetch(`${BASE}/api/stats`).then(r => r.json()),
  createStat: (data) => req('POST', '/api/stats', data),
  updateStat: (id, data) => req('PUT', `/api/stats/${id}`, data),
  deleteStat: (id) => req('DELETE', `/api/stats/${id}`),

  // Experiences
  getExperiences: () => fetch(`${BASE}/api/experiences`).then(r => r.json()),
  createExperience: (data) => req('POST', '/api/experiences', data),
  updateExperience: (id, data) => req('PUT', `/api/experiences/${id}`, data),
  deleteExperience: (id) => req('DELETE', `/api/experiences/${id}`),

  // Education
  getEducation: () => fetch(`${BASE}/api/education`).then(r => r.json()),
  createEducation: (data) => req('POST', '/api/education', data),
  updateEducation: (id, data) => req('PUT', `/api/education/${id}`, data),
  deleteEducation: (id) => req('DELETE', `/api/education/${id}`),

  // Tech
  getTech: () => fetch(`${BASE}/api/tech`).then(r => r.json()),
  createTech: (data) => req('POST', '/api/tech', data),
  updateTech: (id, data) => req('PUT', `/api/tech/${id}`, data),
  deleteTech: (id) => req('DELETE', `/api/tech/${id}`),

  // Projects
  getProjects: () => fetch(`${BASE}/api/projects`).then(r => r.json()),
  getProject: (id) => fetch(`${BASE}/api/projects/${id}`).then(r => r.json()),
  createProject: (data) => req('POST', '/api/projects', data),
  updateProject: (id, data) => req('PUT', `/api/projects/${id}`, data),
  deleteProject: (id) => req('DELETE', `/api/projects/${id}`),
  reorderProjects: (orders) => req('PUT', '/api/projects/reorder/bulk', { orders }),
};
