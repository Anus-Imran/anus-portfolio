import { useState } from 'react';

const PointsEditor = ({ value = [], onChange, label = 'Points' }) => {
  const [input, setInput] = useState('');

  const add = () => {
    const trimmed = input.trim();
    if (!trimmed) return;
    onChange([...value, trimmed]);
    setInput('');
  };

  const remove = (i) => onChange(value.filter((_, idx) => idx !== i));

  const update = (i, v) => {
    const copy = [...value];
    copy[i] = v;
    onChange(copy);
  };

  return (
    <div className="flex flex-col" style={{ gap: '0.5rem' }}>
      <label className="text-sm font-medium text-gray-300">{label}</label>
      <div className="flex flex-col" style={{ gap: '0.5rem' }}>
        {value.map((pt, i) => (
          <div key={i} className="flex items-start" style={{ gap: '0.5rem' }}>
            <span className="text-[#915eff] text-xs" style={{ marginTop: '0.625rem' }}>•</span>
            <textarea
              value={pt}
              onChange={(e) => update(i, e.target.value)}
              rows={2}
              className="flex-1 rounded-lg text-sm text-white resize-none focus:outline-none"
              style={{
                padding: '0.5rem 0.75rem',
                background: 'rgba(255,255,255,0.05)',
                border: '1px solid rgba(255,255,255,0.1)',
              }}
            />
            <button
              type="button"
              onClick={() => remove(i)}
              className="text-red-400 hover:text-red-300 cursor-pointer"
              style={{ marginTop: '0.375rem', fontSize: '1.25rem', lineHeight: 1 }}
            >
              ×
            </button>
          </div>
        ))}
        <div className="flex" style={{ gap: '0.5rem', marginTop: '0.25rem' }}>
          <input
            type="text"
            value={input}
            onChange={(e) => setInput(e.target.value)}
            onKeyDown={(e) => e.key === 'Enter' && (e.preventDefault(), add())}
            placeholder="Add a point and press Enter"
            className="flex-1 rounded-lg text-sm text-white focus:outline-none"
            style={{
              padding: '0.5rem 0.75rem',
              background: 'rgba(255,255,255,0.05)',
              border: '1px solid rgba(255,255,255,0.1)',
            }}
          />
          <button
            type="button"
            onClick={add}
            className="rounded-lg text-sm text-[#915eff] hover:bg-[#915eff]/30 transition-all cursor-pointer"
            style={{
              padding: '0.5rem 1rem',
              background: 'rgba(145,94,255,0.2)',
              border: '1px solid rgba(145,94,255,0.3)',
            }}
          >
            Add
          </button>
        </div>
      </div>
    </div>
  );
};

export default PointsEditor;
