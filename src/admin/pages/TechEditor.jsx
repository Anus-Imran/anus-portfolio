import { useEffect, useState } from 'react';
import { api } from '../../api';
import ImageUpload from '../components/ImageUpload';
import Toast from '../components/Toast';

const empty = { name: '', icon_url: '', width: 40, height: 40, percentage: 70, display_order: 0 };
const inp = { width: '100%', padding: '0.75rem 1rem', background: 'rgba(255,255,255,0.05)', border: '1px solid rgba(255,255,255,0.1)', borderRadius: '0.75rem', color: '#fff' };

const TechEditor = () => {
  const [items, setItems] = useState([]);
  const [loading, setLoading] = useState(true);
  const [form, setForm] = useState(empty);
  const [editId, setEditId] = useState(null);
  const [showForm, setShowForm] = useState(false);
  const [saving, setSaving] = useState(false);
  const [toast, setToast] = useState(null);

  const load = () => api.getTech().then(setItems).catch(() => {}).finally(() => setLoading(false));
  useEffect(() => { load(); }, []);

  const openEdit = (item) => {
    setEditId(item.id);
    setForm({ name: item.name, icon_url: item.icon_url || '', width: item.width || 40, height: item.height || 40, percentage: item.percentage || 70, display_order: item.display_order || 0 });
    setShowForm(true);
    setTimeout(() => document.getElementById('tech-form')?.scrollIntoView({ behavior: 'smooth' }), 100);
  };
  const reset = () => { setEditId(null); setForm(empty); setShowForm(false); };

  const handleSave = async (e) => {
    e.preventDefault();
    setSaving(true);
    try {
      const data = { ...form, width: parseInt(form.width), height: parseInt(form.height), percentage: parseInt(form.percentage), display_order: parseInt(form.display_order) || 0 };
      if (editId) await api.updateTech(editId, data);
      else await api.createTech(data);
      setToast({ message: editId ? 'Tech updated!' : 'Tech added!', type: 'success' });
      reset(); load();
    } catch (err) {
      setToast({ message: err.message, type: 'error' });
    } finally {
      setSaving(false);
    }
  };

  const handleDelete = async (id) => {
    if (!confirm('Delete this tech?')) return;
    try { await api.deleteTech(id); setToast({ message: 'Deleted', type: 'info' }); load(); }
    catch (err) { setToast({ message: err.message, type: 'error' }); }
  };

  if (loading) return <div className="text-gray-400 text-center" style={{ paddingTop: '5rem' }}>Loading...</div>;

  return (
    <div style={{ maxWidth: '56rem' }}>
      {toast && <Toast {...toast} onClose={() => setToast(null)} />}

      <div className="flex items-center justify-between" style={{ marginBottom: '1.5rem' }}>
        <div>
          <h1 className="text-2xl font-bold text-white">Tech Stack</h1>
          <p className="text-gray-400 text-sm" style={{ marginTop: '0.25rem' }}>Manage your skills and technologies.</p>
        </div>
        <button onClick={() => { setEditId(null); setForm(empty); setShowForm(true); }} className="rounded-xl text-sm font-semibold text-white cursor-pointer" style={{ padding: '0.625rem 1rem', background: 'linear-gradient(135deg, #915eff, #5c3d9e)' }}>
          + Add Tech
        </button>
      </div>

      {/* Grid */}
      <div className="grid grid-cols-3 sm:grid-cols-4 md:grid-cols-6" style={{ gap: '0.75rem', marginBottom: '1.5rem' }}>
        {items.map(item => (
          <div key={item.id} className="relative group flex flex-col items-center rounded-xl" style={{ gap: '0.5rem', padding: '0.75rem', background: 'rgba(255,255,255,0.03)', border: '1px solid rgba(255,255,255,0.05)' }}>
            {item.icon_url ? (
              <img src={item.icon_url} alt={item.name} className="object-contain" style={{ width: item.width || 40, height: item.height || 40 }} />
            ) : (
              <div className="rounded-lg flex items-center justify-center text-[#915eff] text-xs font-bold" style={{ width: 40, height: 40, background: 'rgba(145,94,255,0.2)' }}>{item.name?.[0]}</div>
            )}
            <span className="text-white text-xs text-center font-medium leading-tight">{item.name}</span>
            <span className="text-[#915eff] text-xs">{item.percentage}%</span>
            <div className="absolute inset-0 rounded-xl flex items-center justify-center opacity-0 group-hover:opacity-100 transition-opacity" style={{ background: 'rgba(0,0,0,0.7)', gap: '0.5rem' }}>
              <button onClick={() => openEdit(item)} className="rounded-lg text-xs text-blue-400 bg-blue-400/10 cursor-pointer" style={{ padding: '0.25rem 0.5rem', border: '1px solid rgba(59,130,246,0.3)' }}>Edit</button>
              <button onClick={() => handleDelete(item.id)} className="rounded-lg text-xs text-red-400 bg-red-400/10 cursor-pointer" style={{ padding: '0.25rem 0.5rem', border: '1px solid rgba(239,68,68,0.3)' }}>Del</button>
            </div>
          </div>
        ))}
      </div>

      {showForm && (
        <div id="tech-form" className="rounded-2xl" style={{ padding: '1.5rem', background: 'rgba(145,94,255,0.05)', border: '1px solid rgba(145,94,255,0.2)' }}>
          <h3 className="text-white font-semibold" style={{ marginBottom: '1.25rem' }}>{editId ? 'Edit Technology' : 'Add Technology'}</h3>
          <form onSubmit={handleSave} className="flex flex-col" style={{ gap: '1.25rem' }}>
            <div className="grid grid-cols-2 sm:grid-cols-3" style={{ gap: '1rem' }}>
              <div className="col-span-2 sm:col-span-1">
                <label className="block text-sm font-medium text-gray-300" style={{ marginBottom: '0.5rem' }}>Tech Name *</label>
                <input value={form.name} onChange={e => setForm(f => ({ ...f, name: e.target.value }))} required placeholder="React JS" style={inp} className="focus:outline-none" />
              </div>
              <div>
                <label className="block text-sm font-medium text-gray-300" style={{ marginBottom: '0.5rem' }}>Proficiency %</label>
                <input type="number" min="0" max="100" value={form.percentage} onChange={e => setForm(f => ({ ...f, percentage: e.target.value }))} style={inp} className="focus:outline-none" />
              </div>
              <div>
                <label className="block text-sm font-medium text-gray-300" style={{ marginBottom: '0.5rem' }}>Display Order</label>
                <input type="number" value={form.display_order} onChange={e => setForm(f => ({ ...f, display_order: e.target.value }))} style={inp} className="focus:outline-none" />
              </div>
              <div>
                <label className="block text-sm font-medium text-gray-300" style={{ marginBottom: '0.5rem' }}>Icon Width (px)</label>
                <input type="number" value={form.width} onChange={e => setForm(f => ({ ...f, width: e.target.value }))} style={inp} className="focus:outline-none" />
              </div>
              <div>
                <label className="block text-sm font-medium text-gray-300" style={{ marginBottom: '0.5rem' }}>Icon Height (px)</label>
                <input type="number" value={form.height} onChange={e => setForm(f => ({ ...f, height: e.target.value }))} style={inp} className="focus:outline-none" />
              </div>
            </div>
            <ImageUpload value={form.icon_url} onChange={url => setForm(f => ({ ...f, icon_url: url }))} folder="tech" label="Technology Icon Image" />
            {form.icon_url && (
              <div className="flex items-center rounded-xl" style={{ gap: '1rem', padding: '1rem', background: 'rgba(255,255,255,0.03)', border: '1px solid rgba(255,255,255,0.05)' }}>
                <span className="text-gray-400 text-sm">Preview:</span>
                <img src={form.icon_url} alt={form.name} style={{ width: form.width, height: form.height }} className="object-contain" />
                <span className="text-white text-sm">{form.name}</span>
              </div>
            )}
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

export default TechEditor;
