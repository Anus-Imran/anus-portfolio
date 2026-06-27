import { useEffect, useState } from 'react';
import { api } from '../../api';
import ImageUpload from '../components/ImageUpload';
import Toast from '../components/Toast';

const inp = {
  width: '100%', padding: '0.75rem 1rem',
  background: 'rgba(255,255,255,0.05)',
  border: '1px solid rgba(255,255,255,0.1)',
  borderRadius: '0.75rem', color: '#fff',
};
const card = { padding: '1.5rem', background: 'rgba(255,255,255,0.03)', border: '1px solid rgba(255,255,255,0.05)', borderRadius: '1rem' };

const AboutEditor = () => {
  const [form, setForm] = useState({ bio: '', typing_words: [], cv_url: '', profile_image_url: '' });
  const [wordInput, setWordInput] = useState('');
  const [loading, setLoading] = useState(true);
  const [saving, setSaving] = useState(false);
  const [toast, setToast] = useState(null);

  useEffect(() => {
    api.getAbout().then(d => {
      setForm({ bio: d.bio || '', typing_words: d.typing_words || [], cv_url: d.cv_url || '', profile_image_url: d.profile_image_url || '' });
      setLoading(false);
    }).catch(() => setLoading(false));
  }, []);

  const addWord = () => {
    const w = wordInput.trim();
    if (!w || form.typing_words.includes(w)) return;
    setForm(f => ({ ...f, typing_words: [...f.typing_words, w] }));
    setWordInput('');
  };

  const removeWord = (i) => setForm(f => ({ ...f, typing_words: f.typing_words.filter((_, idx) => idx !== i) }));

  const handleSave = async (e) => {
    e.preventDefault();
    setSaving(true);
    try {
      await api.updateAbout(form);
      setToast({ message: 'About section updated!', type: 'success' });
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
        <h1 className="text-2xl font-bold text-white">About Me</h1>
        <p className="text-gray-400 text-sm" style={{ marginTop: '0.25rem' }}>Update your bio, profile photo, typing animation words and CV.</p>
      </div>

      <form onSubmit={handleSave} className="flex flex-col" style={{ gap: '1.5rem' }}>
        {/* Profile Image */}
        <div style={card}>
          <h3 className="text-white font-semibold" style={{ marginBottom: '1rem' }}>Profile Image</h3>
          <ImageUpload value={form.profile_image_url} onChange={url => setForm(f => ({ ...f, profile_image_url: url }))} folder="profile" label="Profile Photo" />
        </div>

        {/* Bio */}
        <div style={card}>
          <h3 className="text-white font-semibold" style={{ marginBottom: '1rem' }}>Bio</h3>
          <textarea
            value={form.bio}
            onChange={e => setForm(f => ({ ...f, bio: e.target.value }))}
            rows={7}
            placeholder="Write your bio here..."
            style={{ ...inp, resize: 'none', fontSize: '0.875rem' }}
            className="focus:outline-none"
          />
        </div>

        {/* Typing Words */}
        <div style={card}>
          <h3 className="text-white font-semibold">Typing Animation Words</h3>
          <p className="text-gray-500 text-xs" style={{ marginTop: '0.25rem', marginBottom: '1rem' }}>These words cycle in the "I am a ___" typing animation.</p>
          <div className="flex flex-wrap" style={{ gap: '0.5rem', marginBottom: '1rem' }}>
            {form.typing_words.map((w, i) => (
              <span
                key={i}
                className="flex items-center text-sm text-[#915eff] rounded-full"
                style={{ gap: '0.5rem', padding: '0.375rem 0.75rem', border: '1px solid rgba(145,94,255,0.3)', background: 'rgba(145,94,255,0.1)' }}
              >
                {w}
                <button type="button" onClick={() => removeWord(i)} className="text-gray-500 hover:text-red-400 cursor-pointer" style={{ fontSize: '1.125rem', lineHeight: 1 }}>×</button>
              </span>
            ))}
          </div>
          <div className="flex" style={{ gap: '0.5rem' }}>
            <input
              type="text" value={wordInput} onChange={e => setWordInput(e.target.value)}
              onKeyDown={e => e.key === 'Enter' && (e.preventDefault(), addWord())}
              placeholder="e.g. Web Developer"
              style={{ ...inp, fontSize: '0.875rem' }}
              className="flex-1 focus:outline-none"
            />
            <button
              type="button" onClick={addWord}
              className="rounded-xl text-sm text-[#915eff] hover:bg-[#915eff]/30 transition-all cursor-pointer"
              style={{ padding: '0.625rem 1rem', background: 'rgba(145,94,255,0.2)', border: '1px solid rgba(145,94,255,0.3)' }}
            >
              Add
            </button>
          </div>
        </div>

        {/* CV Upload */}
        <div style={card}>
          <h3 className="text-white font-semibold" style={{ marginBottom: '1rem' }}>CV / Resume</h3>
          <ImageUpload value={form.cv_url} onChange={url => setForm(f => ({ ...f, cv_url: url }))} folder="cv" label="Upload CV (PDF)" accept=".pdf,application/pdf" />
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

export default AboutEditor;
