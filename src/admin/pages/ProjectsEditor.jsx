import { useEffect, useState } from 'react';
import {
  DndContext, closestCenter, PointerSensor, useSensor, useSensors
} from '@dnd-kit/core';
import {
  SortableContext, verticalListSortingStrategy, useSortable, arrayMove
} from '@dnd-kit/sortable';
import { CSS } from '@dnd-kit/utilities';
import { api } from '../../api';
import ImageUpload from '../components/ImageUpload';
import PointsEditor from '../components/PointsEditor';
import Toast from '../components/Toast';

const empty = {
  title: '', description: '', full_description: '', image_url: '',
  live_demo_link: '', github_link: '', tech_stack: [], key_features: [],
  category: 'Basic', display_order: 0,
};
const inp = {
  width: '100%', padding: '0.75rem 1rem',
  background: 'rgba(255,255,255,0.05)', border: '1px solid rgba(255,255,255,0.1)',
  borderRadius: '0.75rem', color: '#fff',
};

// ── Sortable row ────────────────────────────────────────────────────────────
const SortableRow = ({ item, onEdit, onDelete }) => {
  const { attributes, listeners, setNodeRef, transform, transition, isDragging } =
    useSortable({ id: item.id });

  return (
    <div
      ref={setNodeRef}
      style={{
        transform: CSS.Transform.toString(transform),
        transition,
        opacity: isDragging ? 0.5 : 1,
        display: 'flex', alignItems: 'center', gap: '0.75rem',
        padding: '0.875rem 1rem',
        background: isDragging ? 'rgba(145,94,255,0.08)' : 'rgba(255,255,255,0.03)',
        border: `1px solid ${isDragging ? 'rgba(145,94,255,0.4)' : 'rgba(255,255,255,0.05)'}`,
        borderRadius: '0.75rem',
        marginBottom: '0.5rem',
      }}
    >
      {/* Drag handle */}
      <div
        {...attributes} {...listeners}
        style={{
          cursor: 'grab', padding: '0.25rem', color: 'rgba(255,255,255,0.3)',
          display: 'flex', flexDirection: 'column', gap: '3px', flexShrink: 0,
        }}
        title="Drag to reorder"
      >
        {[0,1,2].map(i => (
          <div key={i} style={{ display: 'flex', gap: '3px' }}>
            <div style={{ width: 4, height: 4, borderRadius: '50%', background: 'currentColor' }} />
            <div style={{ width: 4, height: 4, borderRadius: '50%', background: 'currentColor' }} />
          </div>
        ))}
      </div>

      {/* Thumbnail */}
      {item.image_url ? (
        <img src={item.image_url} alt={item.title} style={{ width: 52, height: 36, objectFit: 'cover', borderRadius: '0.375rem', flexShrink: 0 }} />
      ) : (
        <div style={{ width: 52, height: 36, borderRadius: '0.375rem', background: 'rgba(145,94,255,0.15)', display: 'flex', alignItems: 'center', justifyContent: 'center', flexShrink: 0, color: '#915eff', fontSize: '1.25rem' }}>🚀</div>
      )}

      {/* Info */}
      <div style={{ flex: 1, minWidth: 0 }}>
        <p className="text-white font-medium text-sm truncate">{item.title}</p>
        <div style={{ display: 'flex', alignItems: 'center', gap: '0.5rem', marginTop: '0.2rem' }}>
          <span style={{
            fontSize: '0.65rem', padding: '0.1rem 0.45rem', borderRadius: 99,
            background: item.category === 'Advanced' ? 'rgba(239,68,68,0.15)' : 'rgba(34,197,94,0.15)',
            color: item.category === 'Advanced' ? '#f87171' : '#4ade80',
            border: `1px solid ${item.category === 'Advanced' ? 'rgba(239,68,68,0.3)' : 'rgba(34,197,94,0.3)'}`,
          }}>{item.category}</span>
          <span className="text-gray-600 text-xs">{item.tech_stack?.length || 0} techs</span>
        </div>
      </div>

      {/* Actions */}
      <div style={{ display: 'flex', gap: '0.4rem', flexShrink: 0 }}>
        <button
          onClick={() => onEdit(item)}
          className="rounded-lg text-xs text-blue-400 hover:bg-blue-400/10 cursor-pointer"
          style={{ padding: '0.35rem 0.7rem', border: '1px solid rgba(59,130,246,0.3)' }}
        >Edit</button>
        <button
          onClick={() => onDelete(item.id)}
          className="rounded-lg text-xs text-red-400 hover:bg-red-400/10 cursor-pointer"
          style={{ padding: '0.35rem 0.7rem', border: '1px solid rgba(239,68,68,0.3)' }}
        >Del</button>
      </div>
    </div>
  );
};

// ── Main component ──────────────────────────────────────────────────────────
const ProjectsEditor = () => {
  const [items, setItems] = useState([]);
  const [loading, setLoading] = useState(true);
  const [form, setForm] = useState(empty);
  const [editId, setEditId] = useState(null);
  const [showForm, setShowForm] = useState(false);
  const [saving, setSaving] = useState(false);
  const [savingOrder, setSavingOrder] = useState(false);
  const [orderDirty, setOrderDirty] = useState(false);
  const [toast, setToast] = useState(null);
  const [techInput, setTechInput] = useState('');

  const sensors = useSensors(useSensor(PointerSensor, { activationConstraint: { distance: 5 } }));

  const load = () =>
    api.getProjects()
      .then(d => { setItems(d || []); setOrderDirty(false); })
      .catch(() => {})
      .finally(() => setLoading(false));

  useEffect(() => { load(); }, []);

  // ── DnD handler ──
  const handleDragEnd = ({ active, over }) => {
    if (!over || active.id === over.id) return;
    setItems(prev => {
      const oldIdx = prev.findIndex(i => i.id === active.id);
      const newIdx = prev.findIndex(i => i.id === over.id);
      return arrayMove(prev, oldIdx, newIdx);
    });
    setOrderDirty(true);
  };

  const saveOrder = async () => {
    setSavingOrder(true);
    try {
      const orders = items.map((item, idx) => ({ id: item.id, display_order: idx + 1 }));
      await api.reorderProjects(orders);
      setOrderDirty(false);
      setToast({ message: 'Order saved!', type: 'success' });
    } catch (err) {
      setToast({ message: err.message, type: 'error' });
    } finally {
      setSavingOrder(false);
    }
  };

  // ── Form helpers ──
  const openEdit = (item) => {
    setEditId(item.id);
    setForm({
      title: item.title, description: item.description || '',
      full_description: item.full_description || '', image_url: item.image_url || '',
      live_demo_link: item.live_demo_link || '', github_link: item.github_link || '',
      tech_stack: item.tech_stack || [], key_features: item.key_features || [],
      category: item.category || 'Basic', display_order: item.display_order || 0,
    });
    setShowForm(true);
    setTimeout(() => document.getElementById('proj-form')?.scrollIntoView({ behavior: 'smooth' }), 100);
  };

  const reset = () => { setEditId(null); setForm(empty); setTechInput(''); setShowForm(false); };

  const addTech = () => {
    const t = techInput.trim();
    if (!t || form.tech_stack.includes(t)) return;
    setForm(f => ({ ...f, tech_stack: [...f.tech_stack, t] }));
    setTechInput('');
  };
  const removeTech = (i) => setForm(f => ({ ...f, tech_stack: f.tech_stack.filter((_, idx) => idx !== i) }));

  const handleSave = async (e) => {
    e.preventDefault();
    setSaving(true);
    try {
      const data = { ...form, display_order: parseInt(form.display_order) || 0 };
      if (editId) await api.updateProject(editId, data);
      else await api.createProject(data);
      setToast({ message: editId ? 'Project updated!' : 'Project added!', type: 'success' });
      reset(); load();
    } catch (err) {
      setToast({ message: err.message, type: 'error' });
    } finally {
      setSaving(false);
    }
  };

  const handleDelete = async (id) => {
    if (!confirm('Delete this project?')) return;
    try { await api.deleteProject(id); setToast({ message: 'Deleted', type: 'info' }); load(); }
    catch (err) { setToast({ message: err.message, type: 'error' }); }
  };

  if (loading) return <div className="text-gray-400 text-center" style={{ paddingTop: '5rem' }}>Loading...</div>;

  return (
    <div style={{ maxWidth: '52rem' }}>
      {toast && <Toast {...toast} onClose={() => setToast(null)} />}

      {/* Header */}
      <div className="flex items-center justify-between" style={{ marginBottom: '1.5rem' }}>
        <div>
          <h1 className="text-2xl font-bold text-white">Projects</h1>
          <p className="text-gray-400 text-sm" style={{ marginTop: '0.25rem' }}>Drag rows to reorder. Set category (Basic / Advanced) for tab view.</p>
        </div>
        <div style={{ display: 'flex', gap: '0.75rem', alignItems: 'center' }}>
          {orderDirty && (
            <button
              onClick={saveOrder}
              disabled={savingOrder}
              className="rounded-xl text-sm font-semibold text-white cursor-pointer disabled:opacity-50"
              style={{ padding: '0.6rem 1.1rem', background: 'linear-gradient(135deg, #22c55e, #16a34a)' }}
            >
              {savingOrder ? 'Saving…' : '💾 Save Order'}
            </button>
          )}
          <button
            onClick={() => { setEditId(null); setForm(empty); setShowForm(true); }}
            className="rounded-xl text-sm font-semibold text-white cursor-pointer"
            style={{ padding: '0.6rem 1.1rem', background: 'linear-gradient(135deg, #915eff, #5c3d9e)' }}
          >+ Add Project</button>
        </div>
      </div>

      {/* Sortable list */}
      <DndContext sensors={sensors} collisionDetection={closestCenter} onDragEnd={handleDragEnd}>
        <SortableContext items={items.map(i => i.id)} strategy={verticalListSortingStrategy}>
          <div style={{ marginBottom: '1.5rem' }}>
            {items.map(item => (
              <SortableRow key={item.id} item={item} onEdit={openEdit} onDelete={handleDelete} />
            ))}
          </div>
        </SortableContext>
      </DndContext>

      {orderDirty && (
        <div className="text-xs text-yellow-400 text-center" style={{ marginBottom: '1rem' }}>
          Unsaved order changes — click "Save Order" to persist.
        </div>
      )}

      {/* Form */}
      {showForm && (
        <div id="proj-form" className="rounded-2xl" style={{ padding: '1.5rem', background: 'rgba(145,94,255,0.05)', border: '1px solid rgba(145,94,255,0.2)' }}>
          <h3 className="text-white font-semibold" style={{ marginBottom: '1.25rem' }}>{editId ? 'Edit Project' : 'Add Project'}</h3>
          <form onSubmit={handleSave} className="flex flex-col" style={{ gap: '1.25rem' }}>
            <div className="grid grid-cols-1 sm:grid-cols-2" style={{ gap: '1rem' }}>
              <div className="sm:col-span-2">
                <label className="block text-sm font-medium text-gray-300" style={{ marginBottom: '0.5rem' }}>Project Title *</label>
                <input value={form.title} onChange={e => setForm(f => ({ ...f, title: e.target.value }))} required placeholder="My Awesome Project" style={inp} className="focus:outline-none" />
              </div>
              <div>
                <label className="block text-sm font-medium text-gray-300" style={{ marginBottom: '0.5rem' }}>Category</label>
                <div style={{ display: 'flex', gap: '0.75rem' }}>
                  {['Basic', 'Advanced'].map(cat => (
                    <button
                      key={cat} type="button"
                      onClick={() => setForm(f => ({ ...f, category: cat }))}
                      style={{
                        flex: 1, padding: '0.65rem', borderRadius: '0.75rem',
                        border: form.category === cat
                          ? (cat === 'Advanced' ? '2px solid #f87171' : '2px solid #4ade80')
                          : '2px solid rgba(255,255,255,0.1)',
                        background: form.category === cat
                          ? (cat === 'Advanced' ? 'rgba(239,68,68,0.15)' : 'rgba(34,197,94,0.15)')
                          : 'rgba(255,255,255,0.03)',
                        color: form.category === cat
                          ? (cat === 'Advanced' ? '#f87171' : '#4ade80')
                          : '#9ca3af',
                        fontWeight: 600, fontSize: '0.875rem', cursor: 'pointer',
                      }}
                    >{cat}</button>
                  ))}
                </div>
              </div>
              <div>
                <label className="block text-sm font-medium text-gray-300" style={{ marginBottom: '0.5rem' }}>Live Demo URL</label>
                <input value={form.live_demo_link} onChange={e => setForm(f => ({ ...f, live_demo_link: e.target.value }))} placeholder="https://..." style={inp} className="focus:outline-none" />
              </div>
              <div>
                <label className="block text-sm font-medium text-gray-300" style={{ marginBottom: '0.5rem' }}>GitHub URL</label>
                <input value={form.github_link} onChange={e => setForm(f => ({ ...f, github_link: e.target.value }))} placeholder="https://github.com/..." style={inp} className="focus:outline-none" />
              </div>
            </div>

            <div>
              <label className="block text-sm font-medium text-gray-300" style={{ marginBottom: '0.5rem' }}>Short Description (card preview)</label>
              <textarea value={form.description} onChange={e => setForm(f => ({ ...f, description: e.target.value }))} rows={3} placeholder="Brief description shown on the project card..." style={{ ...inp, resize: 'none', fontSize: '0.875rem' }} className="focus:outline-none" />
            </div>
            <div>
              <label className="block text-sm font-medium text-gray-300" style={{ marginBottom: '0.5rem' }}>Full Description (details page)</label>
              <textarea value={form.full_description} onChange={e => setForm(f => ({ ...f, full_description: e.target.value }))} rows={5} placeholder="Full project description..." style={{ ...inp, resize: 'none', fontSize: '0.875rem' }} className="focus:outline-none" />
            </div>

            <ImageUpload value={form.image_url} onChange={url => setForm(f => ({ ...f, image_url: url }))} folder="projects" label="Project Screenshot / Cover Image" />
            <PointsEditor value={form.key_features} onChange={kf => setForm(f => ({ ...f, key_features: kf }))} label="Key Features" />

            {/* Tech Stack */}
            <div>
              <label className="block text-sm font-medium text-gray-300" style={{ marginBottom: '0.5rem' }}>Tech Stack Used</label>
              <div className="flex flex-wrap" style={{ gap: '0.5rem', marginBottom: '0.75rem' }}>
                {form.tech_stack.map((t, i) => (
                  <span key={i} className="flex items-center text-sm text-[#915eff] rounded-full" style={{ gap: '0.375rem', padding: '0.375rem 0.75rem', border: '1px solid rgba(145,94,255,0.3)', background: 'rgba(145,94,255,0.1)' }}>
                    {t}
                    <button type="button" onClick={() => removeTech(i)} className="text-gray-500 hover:text-red-400 cursor-pointer">×</button>
                  </span>
                ))}
              </div>
              <div className="flex" style={{ gap: '0.5rem' }}>
                <input type="text" value={techInput} onChange={e => setTechInput(e.target.value)}
                  onKeyDown={e => e.key === 'Enter' && (e.preventDefault(), addTech())}
                  placeholder="e.g. React JS" style={{ ...inp, fontSize: '0.875rem' }} className="flex-1 focus:outline-none" />
                <button type="button" onClick={addTech}
                  className="rounded-xl text-sm text-[#915eff] cursor-pointer"
                  style={{ padding: '0.625rem 1rem', background: 'rgba(145,94,255,0.2)', border: '1px solid rgba(145,94,255,0.3)' }}>
                  Add
                </button>
              </div>
            </div>

            <div className="flex" style={{ gap: '0.75rem' }}>
              <button type="submit" disabled={saving}
                className="rounded-xl font-semibold text-white disabled:opacity-50 cursor-pointer"
                style={{ padding: '0.75rem 1.5rem', background: 'linear-gradient(135deg, #915eff, #5c3d9e)' }}>
                {saving ? 'Saving...' : editId ? 'Update' : 'Add Project'}
              </button>
              <button type="button" onClick={reset}
                className="rounded-xl font-semibold text-gray-400 hover:bg-white/5 cursor-pointer"
                style={{ padding: '0.75rem 1.5rem', border: '1px solid rgba(255,255,255,0.1)' }}>
                Cancel
              </button>
            </div>
          </form>
        </div>
      )}
    </div>
  );
};

export default ProjectsEditor;
