import { useEffect, useState } from 'react';
import { api } from '../../api';
import ImageUpload from '../components/ImageUpload';
import PointsEditor from '../components/PointsEditor';
import Toast from '../components/Toast';

const empty = { title: '', company_name: '', icon_url: '', icon_bg: '#383E56', date_range: '', points: [], display_order: 0 };
const inp = { width: '100%', padding: '0.75rem 1rem', background: 'rgba(255,255,255,0.05)', border: '1px solid rgba(255,255,255,0.1)', borderRadius: '0.75rem', color: '#fff' };

const ExperienceEditor = () => {
  const [items, setItems] = useState([]);
  const [loading, setLoading] = useState(true);
  const [form, setForm] = useState(empty);
  const [editId, setEditId] = useState(null);
  const [showForm, setShowForm] = useState(false);
  const [saving, setSaving] = useState(false);
  const [toast, setToast] = useState(null);

  const load = () => api.getExperiences().then(setItems).catch(() => {}).finally(() => setLoading(false));
  useEffect(() => { load(); }, []);

  const openEdit = (item) => {
    setEditId(item.id);
    setForm({ title: item.title, company_name: item.company_name || '', icon_url: item.icon_url || '', icon_bg: item.icon_bg || '#383E56', date_range: item.date_range || '', points: item.points || [], display_order: item.display_order || 0 });
    setShowForm(true);
    setTimeout(() => document.getElementById('exp-form')?.scrollIntoView({ behavior: 'smooth' }), 100);
  };
  const reset = () => { setEditId(null); setForm(empty); setShowForm(false); };

  const handleSave = async (e) => {
    e.preventDefault();
    setSaving(true);
    try {
      if (editId) await api.updateExperience(editId, form);
      else await api.createExperience(form);
      setToast({ message: editId ? 'Experience updated!' : 'Experience added!', type: 'success' });
      reset(); load();
    } catch (err) {
      setToast({ message: err.message, type: 'error' });
    } finally {
      setSaving(false);
    }
  };

  const handleDelete = async (id) => {
    if (!confirm('Delete this experience?')) return;
    try { await api.deleteExperience(id); setToast({ message: 'Deleted', type: 'info' }); load(); }
    catch (err) { setToast({ message: err.message, type: 'error' }); }
  };

  if (loading) return <div className="text-gray-400 text-center" style={{ paddingTop: '5rem' }}>Loading...</div>;

  return (
    <div style={{ maxWidth: '48rem' }}>
      {toast && <Toast {...toast} onClose={() => setToast(null)} />}

      <div className="flex items-center justify-between" style={{ marginBottom: '1.5rem' }}>
        <div>
          <h1 className="text-2xl font-bold text-white">Work Experience</h1>
          <p className="text-gray-400 text-sm" style={{ marginTop: '0.25rem' }}>Manage your work history timeline.</p>
        </div>
        <button onClick={() => { setEditId(null); setForm(empty); setShowForm(true); }} className="rounded-xl text-sm font-semibold text-white cursor-pointer" style={{ padding: '0.625rem 1rem', background: 'linear-gradient(135deg, #915eff, #5c3d9e)' }}>
          + Add Experience
        </button>
      </div>

      {/* List */}
      <div className="flex flex-col" style={{ gap: '0.75rem', marginBottom: '1.5rem' }}>
        {items.map(item => (
          <div key={item.id} className="flex items-center rounded-xl group" style={{ gap: '1rem', padding: '1rem', background: 'rgba(255,255,255,0.03)', border: '1px solid rgba(255,255,255,0.05)' }}>
            {item.icon_url ? (
              <img src={item.icon_url} alt={item.title} className="rounded-lg object-contain flex-shrink-0" style={{ width: 48, height: 48, background: 'rgba(0,0,0,0.2)', padding: '0.25rem' }} />
            ) : (
              <div className="rounded-lg flex-shrink-0 flex items-center justify-center text-white font-bold text-lg" style={{ width: 48, height: 48, background: item.icon_bg || '#383E56' }}>
                {item.title?.[0]}
              </div>
            )}
            <div className="flex-1 min-w-0">
              <h3 className="text-white font-semibold text-sm truncate">{item.title}</h3>
              <p className="text-gray-500 text-xs">{item.company_name} {item.company_name && '•'} {item.date_range}</p>
              <p className="text-gray-600 text-xs" style={{ marginTop: '0.25rem' }}>{item.points?.length || 0} bullet points</p>
            </div>
            <div className="flex opacity-0 group-hover:opacity-100 transition-opacity" style={{ gap: '0.5rem' }}>
              <button onClick={() => openEdit(item)} className="rounded-lg text-xs text-blue-400 hover:bg-blue-400/10 cursor-pointer" style={{ padding: '0.375rem 0.75rem', border: '1px solid rgba(59,130,246,0.3)' }}>Edit</button>
              <button onClick={() => handleDelete(item.id)} className="rounded-lg text-xs text-red-400 hover:bg-red-400/10 cursor-pointer" style={{ padding: '0.375rem 0.75rem', border: '1px solid rgba(239,68,68,0.3)' }}>Delete</button>
            </div>
          </div>
        ))}
      </div>

      {/* Form */}
      {showForm && (
        <div id="exp-form" className="rounded-2xl" style={{ padding: '1.5rem', background: 'rgba(145,94,255,0.05)', border: '1px solid rgba(145,94,255,0.2)' }}>
          <h3 className="text-white font-semibold" style={{ marginBottom: '1.25rem' }}>{editId ? 'Edit Experience' : 'New Experience'}</h3>
          <form onSubmit={handleSave} className="flex flex-col" style={{ gap: '1.25rem' }}>
            <div className="grid grid-cols-1 sm:grid-cols-2" style={{ gap: '1rem' }}>
              <div>
                <label className="block text-sm font-medium text-gray-300" style={{ marginBottom: '0.5rem' }}>Job Title *</label>
                <input value={form.title} onChange={e => setForm(f => ({ ...f, title: e.target.value }))} required placeholder="Full Stack Developer" style={inp} className="focus:outline-none" />
              </div>
              <div>
                <label className="block text-sm font-medium text-gray-300" style={{ marginBottom: '0.5rem' }}>Company Name</label>
                <input value={form.company_name} onChange={e => setForm(f => ({ ...f, company_name: e.target.value }))} placeholder="Company Name" style={inp} className="focus:outline-none" />
              </div>
              <div>
                <label className="block text-sm font-medium text-gray-300" style={{ marginBottom: '0.5rem' }}>Date Range</label>
                <input value={form.date_range} onChange={e => setForm(f => ({ ...f, date_range: e.target.value }))} placeholder="Jan 2022 - Present" style={inp} className="focus:outline-none" />
              </div>
              <div>
                <label className="block text-sm font-medium text-gray-300" style={{ marginBottom: '0.5rem' }}>Icon Background Color</label>
                <div className="flex items-center" style={{ gap: '0.75rem' }}>
                  <input type="color" value={form.icon_bg} onChange={e => setForm(f => ({ ...f, icon_bg: e.target.value }))} className="rounded-lg cursor-pointer border-0" style={{ width: 48, height: 48 }} />
                  <input value={form.icon_bg} onChange={e => setForm(f => ({ ...f, icon_bg: e.target.value }))} placeholder="#383E56" style={{ ...inp, flex: 1, width: 'auto' }} className="focus:outline-none" />
                </div>
              </div>
            </div>
            <ImageUpload value={form.icon_url} onChange={url => setForm(f => ({ ...f, icon_url: url }))} folder="experience" label="Company Logo / Icon" />
            <PointsEditor value={form.points} onChange={pts => setForm(f => ({ ...f, points: pts }))} label="Bullet Points" />
            <div className="flex" style={{ gap: '0.75rem' }}>
              <button type="submit" disabled={saving} className="rounded-xl font-semibold text-white transition-all disabled:opacity-50 cursor-pointer" style={{ padding: '0.75rem 1.5rem', background: 'linear-gradient(135deg, #915eff, #5c3d9e)' }}>
                {saving ? 'Saving...' : editId ? 'Update' : 'Add'}
              </button>
              <button type="button" onClick={reset} className="rounded-xl font-semibold text-gray-400 hover:bg-white/5 transition-all cursor-pointer" style={{ padding: '0.75rem 1.5rem', border: '1px solid rgba(255,255,255,0.1)' }}>Cancel</button>
            </div>
          </form>
        </div>
      )}
    </div>
  );
};

export default ExperienceEditor;
