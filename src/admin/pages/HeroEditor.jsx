import { useEffect, useState } from 'react';
import { api } from '../../api';
import Toast from '../components/Toast';

const inp = {
  width: '100%', padding: '0.75rem 1rem',
  background: 'rgba(255,255,255,0.05)',
  border: '1px solid rgba(255,255,255,0.1)',
  borderRadius: '0.75rem', color: '#fff',
};

const HeroEditor = () => {
  const [form, setForm] = useState({ name: '', tagline: '', subtitle: '' });
  const [loading, setLoading] = useState(true);
  const [saving, setSaving] = useState(false);
  const [toast, setToast] = useState(null);

  useEffect(() => {
    api.getHero().then(d => {
      setForm({ name: d.name || '', tagline: d.tagline || '', subtitle: d.subtitle || '' });
      setLoading(false);
    }).catch(() => setLoading(false));
  }, []);

  const handleSave = async (e) => {
    e.preventDefault();
    setSaving(true);
    try {
      await api.updateHero(form);
      setToast({ message: 'Hero section updated!', type: 'success' });
    } catch (err) {
      setToast({ message: err.message, type: 'error' });
    } finally {
      setSaving(false);
    }
  };

  if (loading) return <div className="text-gray-400 text-center" style={{ paddingTop: '5rem' }}>Loading...</div>;

  return (
    <div style={{ maxWidth: '42rem' }}>
      {toast && <Toast {...toast} onClose={() => setToast(null)} />}

      <div style={{ marginBottom: '1.5rem' }}>
        <h1 className="text-2xl font-bold text-white">Hero Section</h1>
        <p className="text-gray-400 text-sm" style={{ marginTop: '0.25rem' }}>Edit the main hero text displayed at the top of your portfolio.</p>
      </div>

      {/* Preview */}
      <div className="rounded-xl" style={{ padding: '1.25rem', background: 'rgba(255,255,255,0.03)', border: '1px solid rgba(255,255,255,0.05)', marginBottom: '1.5rem' }}>
        <p className="text-xs text-gray-500 uppercase tracking-wider" style={{ marginBottom: '0.75rem' }}>Live Preview</p>
        <p className="text-gray-400 text-lg">{form.tagline} <span className="text-[#915eff] font-bold">{form.name}</span></p>
        <p className="text-gray-500 text-sm" style={{ marginTop: '0.5rem', maxWidth: '28rem' }}>{form.subtitle}</p>
      </div>

      <form onSubmit={handleSave} className="rounded-2xl flex flex-col" style={{ padding: '1.5rem', background: 'rgba(255,255,255,0.03)', border: '1px solid rgba(255,255,255,0.05)', gap: '1.25rem' }}>
        <div>
          <label className="block text-sm font-medium text-gray-300" style={{ marginBottom: '0.5rem' }}>Tagline</label>
          <input value={form.tagline} onChange={e => setForm(f => ({ ...f, tagline: e.target.value }))} placeholder="Hi, I'm" style={inp} className="focus:outline-none" />
        </div>
        <div>
          <label className="block text-sm font-medium text-gray-300" style={{ marginBottom: '0.5rem' }}>Your Name</label>
          <input value={form.name} onChange={e => setForm(f => ({ ...f, name: e.target.value }))} placeholder="Anus Imran" style={inp} className="focus:outline-none" />
        </div>
        <div>
          <label className="block text-sm font-medium text-gray-300" style={{ marginBottom: '0.5rem' }}>Subtitle / Description</label>
          <textarea value={form.subtitle} onChange={e => setForm(f => ({ ...f, subtitle: e.target.value }))} rows={3} placeholder="I Develop User Interfaces..." style={{ ...inp, resize: 'none' }} className="focus:outline-none" />
        </div>
        <button
          type="submit" disabled={saving}
          className="self-start rounded-xl font-semibold text-white transition-all duration-200 disabled:opacity-50 cursor-pointer"
          style={{ padding: '0.75rem 1.5rem', background: 'linear-gradient(135deg, #915eff, #5c3d9e)' }}
        >
          {saving ? 'Saving...' : 'Save Changes'}
        </button>
      </form>
    </div>
  );
};

export default HeroEditor;
