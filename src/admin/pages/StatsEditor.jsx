import { useEffect, useState } from 'react';
import { api } from '../../api';
import Toast from '../components/Toast';

const emptyForm = { num: '', text: '', display_order: 0 };
const inp = { width: '100%', padding: '0.75rem 1rem', background: 'rgba(255,255,255,0.05)', border: '1px solid rgba(255,255,255,0.1)', borderRadius: '0.75rem', color: '#fff' };

const StatsEditor = () => {
  const [items, setItems] = useState([]);
  const [loading, setLoading] = useState(true);
  const [form, setForm] = useState(emptyForm);
  const [editId, setEditId] = useState(null);
  const [saving, setSaving] = useState(false);
  const [toast, setToast] = useState(null);

  const load = () => api.getStats().then(setItems).catch(() => {}).finally(() => setLoading(false));
  useEffect(() => { load(); }, []);

  const openEdit = (item) => { setEditId(item.id); setForm({ num: item.num, text: item.text, display_order: item.display_order }); };
  const reset = () => { setEditId(null); setForm(emptyForm); };

  const handleSave = async (e) => {
    e.preventDefault();
    setSaving(true);
    try {
      const data = { num: parseInt(form.num), text: form.text, display_order: parseInt(form.display_order) || 0 };
      if (editId) await api.updateStat(editId, data);
      else await api.createStat(data);
      setToast({ message: editId ? 'Stat updated!' : 'Stat created!', type: 'success' });
      reset(); load();
    } catch (err) {
      setToast({ message: err.message, type: 'error' });
    } finally {
      setSaving(false);
    }
  };

  const handleDelete = async (id) => {
    if (!confirm('Delete this stat?')) return;
    try { await api.deleteStat(id); setToast({ message: 'Stat deleted', type: 'info' }); load(); }
    catch (err) { setToast({ message: err.message, type: 'error' }); }
  };

  if (loading) return <div className="text-gray-400 text-center" style={{ paddingTop: '5rem' }}>Loading...</div>;

  return (
    <div style={{ maxWidth: '48rem' }}>
      {toast && <Toast {...toast} onClose={() => setToast(null)} />}

      <div style={{ marginBottom: '1.5rem' }}>
        <h1 className="text-2xl font-bold text-white">Stats</h1>
        <p className="text-gray-400 text-sm" style={{ marginTop: '0.25rem' }}>Achievement counters shown in the About section.</p>
      </div>

      {/* Current stats */}
      <div className="grid grid-cols-2 md:grid-cols-4" style={{ gap: '0.75rem', marginBottom: '1.5rem' }}>
        {items.map(item => (
          <div key={item.id} className="rounded-xl relative group" style={{ padding: '1rem', background: 'rgba(255,255,255,0.03)', border: '1px solid rgba(255,255,255,0.05)' }}>
            <div className="text-3xl font-bold text-[#915eff]">{item.num}+</div>
            <div className="text-gray-400 text-xs" style={{ marginTop: '0.25rem' }}>{item.text}</div>
            <div className="absolute flex opacity-0 group-hover:opacity-100 transition-opacity" style={{ top: '0.5rem', right: '0.5rem', gap: '0.25rem' }}>
              <button onClick={() => openEdit(item)} className="rounded text-blue-400 hover:bg-blue-400/10 cursor-pointer text-xs" style={{ padding: '0.25rem' }}>✏</button>
              <button onClick={() => handleDelete(item.id)} className="rounded text-red-400 hover:bg-red-400/10 cursor-pointer text-xs" style={{ padding: '0.25rem' }}>✕</button>
            </div>
          </div>
        ))}
      </div>

      {/* Form */}
      <div className="rounded-2xl" style={{ padding: '1.5rem', background: 'rgba(255,255,255,0.03)', border: '1px solid rgba(255,255,255,0.05)' }}>
        <h3 className="text-white font-semibold" style={{ marginBottom: '1.25rem' }}>{editId ? 'Edit Stat' : 'Add New Stat'}</h3>
        <form onSubmit={handleSave} className="grid grid-cols-1 sm:grid-cols-3" style={{ gap: '1rem' }}>
          <div>
            <label className="block text-sm font-medium text-gray-300" style={{ marginBottom: '0.5rem' }}>Number</label>
            <input type="number" value={form.num} onChange={e => setForm(f => ({ ...f, num: e.target.value }))} required placeholder="e.g. 16" style={inp} className="focus:outline-none" />
          </div>
          <div>
            <label className="block text-sm font-medium text-gray-300" style={{ marginBottom: '0.5rem' }}>Label</label>
            <input type="text" value={form.text} onChange={e => setForm(f => ({ ...f, text: e.target.value }))} required placeholder="e.g. Projects Completed" style={inp} className="focus:outline-none" />
          </div>
          <div>
            <label className="block text-sm font-medium text-gray-300" style={{ marginBottom: '0.5rem' }}>Order</label>
            <input type="number" value={form.display_order} onChange={e => setForm(f => ({ ...f, display_order: e.target.value }))} placeholder="0" style={inp} className="focus:outline-none" />
          </div>
          <div className="sm:col-span-3 flex" style={{ gap: '0.75rem' }}>
            <button type="submit" disabled={saving} className="rounded-xl font-semibold text-white transition-all disabled:opacity-50 cursor-pointer" style={{ padding: '0.75rem 1.5rem', background: 'linear-gradient(135deg, #915eff, #5c3d9e)' }}>
              {saving ? 'Saving...' : editId ? 'Update' : 'Add Stat'}
            </button>
            {editId && <button type="button" onClick={reset} className="rounded-xl font-semibold text-gray-400 hover:bg-white/5 transition-all cursor-pointer" style={{ padding: '0.75rem 1.5rem', border: '1px solid rgba(255,255,255,0.1)' }}>Cancel</button>}
          </div>
        </form>
      </div>
    </div>
  );
};

export default StatsEditor;
