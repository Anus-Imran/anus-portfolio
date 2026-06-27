import { useEffect, useState } from 'react';
import { api } from '../../api';
import ImageUpload from '../components/ImageUpload';
import PointsEditor from '../components/PointsEditor';
import Toast from '../components/Toast';

const empty = { degree: '', institution: '', location: '', start_date: '', end_date: '', grade: '', icon_url: '', icon_bg: '#383E56', details: [], display_order: 0 };
const inp = { width: '100%', padding: '0.75rem 1rem', background: 'rgba(255,255,255,0.05)', border: '1px solid rgba(255,255,255,0.1)', borderRadius: '0.75rem', color: '#fff' };

const EducationEditor = () => {
  const [items, setItems] = useState([]);
  const [loading, setLoading] = useState(true);
  const [form, setForm] = useState(empty);
  const [editId, setEditId] = useState(null);
  const [showForm, setShowForm] = useState(false);
  const [saving, setSaving] = useState(false);
  const [toast, setToast] = useState(null);

  const load = () => api.getEducation().then(setItems).catch(() => {}).finally(() => setLoading(false));
  useEffect(() => { load(); }, []);

  const openEdit = (item) => {
    setEditId(item.id);
    setForm({ degree: item.degree, institution: item.institution, location: item.location || '', start_date: item.start_date || '', end_date: item.end_date || '', grade: item.grade || '', icon_url: item.icon_url || '', icon_bg: item.icon_bg || '#383E56', details: item.details || [], display_order: item.display_order || 0 });
    setShowForm(true);
    setTimeout(() => document.getElementById('edu-form')?.scrollIntoView({ behavior: 'smooth' }), 100);
  };
  const reset = () => { setEditId(null); setForm(empty); setShowForm(false); };

  const handleSave = async (e) => {
    e.preventDefault();
    setSaving(true);
    try {
      if (editId) await api.updateEducation(editId, form);
      else await api.createEducation(form);
      setToast({ message: editId ? 'Education updated!' : 'Education added!', type: 'success' });
      reset(); load();
    } catch (err) {
      setToast({ message: err.message, type: 'error' });
    } finally {
      setSaving(false);
    }
  };

  const handleDelete = async (id) => {
    if (!confirm('Delete this education entry?')) return;
    try { await api.deleteEducation(id); setToast({ message: 'Deleted', type: 'info' }); load(); }
    catch (err) { setToast({ message: err.message, type: 'error' }); }
  };

  if (loading) return <div className="text-gray-400 text-center" style={{ paddingTop: '5rem' }}>Loading...</div>;

  return (
    <div style={{ maxWidth: '48rem' }}>
      {toast && <Toast {...toast} onClose={() => setToast(null)} />}

      <div className="flex items-center justify-between" style={{ marginBottom: '1.5rem' }}>
        <div>
          <h1 className="text-2xl font-bold text-white">Education</h1>
          <p className="text-gray-400 text-sm" style={{ marginTop: '0.25rem' }}>Manage your academic timeline.</p>
        </div>
        <button onClick={() => { setEditId(null); setForm(empty); setShowForm(true); }} className="rounded-xl text-sm font-semibold text-white cursor-pointer" style={{ padding: '0.625rem 1rem', background: 'linear-gradient(135deg, #915eff, #5c3d9e)' }}>
          + Add Education
        </button>
      </div>

      <div className="flex flex-col" style={{ gap: '0.75rem', marginBottom: '1.5rem' }}>
        {items.map(item => (
          <div key={item.id} className="flex items-center rounded-xl group" style={{ gap: '1rem', padding: '1rem', background: 'rgba(255,255,255,0.03)', border: '1px solid rgba(255,255,255,0.05)' }}>
            {item.icon_url ? (
              <img src={item.icon_url} alt={item.institution} className="rounded-lg object-contain flex-shrink-0" style={{ width: 48, height: 48, background: 'rgba(0,0,0,0.2)', padding: '0.25rem' }} />
            ) : (
              <div className="rounded-lg flex-shrink-0 flex items-center justify-center text-white font-bold" style={{ width: 48, height: 48, background: item.icon_bg || '#383E56' }}>
                {item.institution?.[0]}
              </div>
            )}
            <div className="flex-1 min-w-0">
              <h3 className="text-white font-semibold text-sm truncate">{item.degree}</h3>
              <p className="text-gray-500 text-xs">{item.institution} • {item.location}</p>
              <p className="text-gray-600 text-xs" style={{ marginTop: '0.25rem' }}>{item.start_date} – {item.end_date} {item.grade && `• ${item.grade}`}</p>
            </div>
            <div className="flex opacity-0 group-hover:opacity-100 transition-opacity" style={{ gap: '0.5rem' }}>
              <button onClick={() => openEdit(item)} className="rounded-lg text-xs text-blue-400 hover:bg-blue-400/10 cursor-pointer" style={{ padding: '0.375rem 0.75rem', border: '1px solid rgba(59,130,246,0.3)' }}>Edit</button>
              <button onClick={() => handleDelete(item.id)} className="rounded-lg text-xs text-red-400 hover:bg-red-400/10 cursor-pointer" style={{ padding: '0.375rem 0.75rem', border: '1px solid rgba(239,68,68,0.3)' }}>Delete</button>
            </div>
          </div>
        ))}
      </div>

      {showForm && (
        <div id="edu-form" className="rounded-2xl" style={{ padding: '1.5rem', background: 'rgba(145,94,255,0.05)', border: '1px solid rgba(145,94,255,0.2)' }}>
          <h3 className="text-white font-semibold" style={{ marginBottom: '1.25rem' }}>{editId ? 'Edit Education' : 'New Education'}</h3>
          <form onSubmit={handleSave} className="flex flex-col" style={{ gap: '1.25rem' }}>
            <div className="grid grid-cols-1 sm:grid-cols-2" style={{ gap: '1rem' }}>
              <div className="sm:col-span-2">
                <label className="block text-sm font-medium text-gray-300" style={{ marginBottom: '0.5rem' }}>Degree / Qualification *</label>
                <input value={form.degree} onChange={e => setForm(f => ({ ...f, degree: e.target.value }))} required placeholder="Bachelor of Science in Software Engineering" style={inp} className="focus:outline-none" />
              </div>
              <div>
                <label className="block text-sm font-medium text-gray-300" style={{ marginBottom: '0.5rem' }}>Institution *</label>
                <input value={form.institution} onChange={e => setForm(f => ({ ...f, institution: e.target.value }))} required placeholder="University Name" style={inp} className="focus:outline-none" />
              </div>
              <div>
                <label className="block text-sm font-medium text-gray-300" style={{ marginBottom: '0.5rem' }}>Location</label>
                <input value={form.location} onChange={e => setForm(f => ({ ...f, location: e.target.value }))} placeholder="City, Country" style={inp} className="focus:outline-none" />
              </div>
              <div>
                <label className="block text-sm font-medium text-gray-300" style={{ marginBottom: '0.5rem' }}>Start Date</label>
                <input value={form.start_date} onChange={e => setForm(f => ({ ...f, start_date: e.target.value }))} placeholder="October 2022" style={inp} className="focus:outline-none" />
              </div>
              <div>
                <label className="block text-sm font-medium text-gray-300" style={{ marginBottom: '0.5rem' }}>End Date</label>
                <input value={form.end_date} onChange={e => setForm(f => ({ ...f, end_date: e.target.value }))} placeholder="Present" style={inp} className="focus:outline-none" />
              </div>
              <div>
                <label className="block text-sm font-medium text-gray-300" style={{ marginBottom: '0.5rem' }}>Grade / CGPA</label>
                <input value={form.grade} onChange={e => setForm(f => ({ ...f, grade: e.target.value }))} placeholder="3.44/4.0 CGPA" style={inp} className="focus:outline-none" />
              </div>
              <div>
                <label className="block text-sm font-medium text-gray-300" style={{ marginBottom: '0.5rem' }}>Icon Background</label>
                <div className="flex items-center" style={{ gap: '0.75rem' }}>
                  <input type="color" value={form.icon_bg} onChange={e => setForm(f => ({ ...f, icon_bg: e.target.value }))} className="rounded-lg cursor-pointer border-0" style={{ width: 48, height: 48 }} />
                  <input value={form.icon_bg} onChange={e => setForm(f => ({ ...f, icon_bg: e.target.value }))} style={{ ...inp, flex: 1, width: 'auto' }} className="focus:outline-none" />
                </div>
              </div>
            </div>
            <ImageUpload value={form.icon_url} onChange={url => setForm(f => ({ ...f, icon_url: url }))} folder="education" label="Institution Logo" />
            <PointsEditor value={form.details} onChange={d => setForm(f => ({ ...f, details: d }))} label="Details / Description Points" />
            <div className="flex" style={{ gap: '0.75rem' }}>
              <button type="submit" disabled={saving} className="rounded-xl font-semibold text-white disabled:opacity-50 cursor-pointer" style={{ padding: '0.75rem 1.5rem', background: 'linear-gradient(135deg, #915eff, #5c3d9e)' }}>
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

export default EducationEditor;
