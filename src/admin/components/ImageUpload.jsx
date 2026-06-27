import { useState, useRef } from 'react';
import { api } from '../../api';

const ImageUpload = ({ value, onChange, folder = 'general', label = 'Image', accept = 'image/*' }) => {
  const [uploading, setUploading] = useState(false);
  const [error, setError] = useState('');
  const inputRef = useRef();

  const handleFile = async (e) => {
    const file = e.target.files[0];
    if (!file) return;
    setUploading(true);
    setError('');
    try {
      const isFile = accept.includes('pdf') || accept.includes('application');
      const res = isFile ? await api.uploadFile(file) : await api.uploadImage(file, folder);
      onChange(res.url);
    } catch (err) {
      setError('Upload failed: ' + err.message);
    } finally {
      setUploading(false);
    }
  };

  const isFileType = accept.includes('pdf') || accept.includes('application');

  return (
    <div className="flex flex-col" style={{ gap: '0.5rem' }}>
      <label className="text-sm font-medium text-gray-300">{label}</label>
      <div className="flex flex-col" style={{ gap: '0.75rem' }}>
        {value && (
          <div style={{ maxWidth: 200 }}>
            {isFileType ? (
              <a href={value} target="_blank" rel="noreferrer" className="text-[#915eff] text-sm underline break-all">
                View uploaded file
              </a>
            ) : (
              <img src={value} alt="preview" className="w-full object-cover rounded-lg" style={{ height: 120, border: '1px solid rgba(255,255,255,0.1)' }} />
            )}
          </div>
        )}
        <div className="flex items-center" style={{ gap: '0.75rem' }}>
          <button
            type="button"
            onClick={() => inputRef.current?.click()}
            disabled={uploading}
            className="rounded-lg text-sm font-medium transition-all duration-200 cursor-pointer"
            style={{ padding: '0.5rem 1rem', background: uploading ? '#4a4a6a' : '#915eff', color: '#fff', opacity: uploading ? 0.7 : 1 }}
          >
            {uploading ? 'Uploading...' : value ? 'Replace' : 'Upload'}
          </button>
          {value && (
            <button
              type="button"
              onClick={() => onChange('')}
              className="rounded-lg text-sm text-red-400 hover:bg-red-400/10 transition-all duration-200 cursor-pointer"
              style={{ padding: '0.5rem 0.75rem', border: '1px solid rgba(239,68,68,0.3)' }}
            >
              Remove
            </button>
          )}
          <input ref={inputRef} type="file" accept={accept} className="hidden" onChange={handleFile} />
        </div>
        {error && <p className="text-red-400 text-xs">{error}</p>}
        <input
          type="text"
          value={value || ''}
          onChange={(e) => onChange(e.target.value)}
          placeholder="Or paste image URL directly"
          className="w-full rounded-lg text-sm text-white focus:outline-none"
          style={{
            padding: '0.5rem 0.75rem',
            background: 'rgba(255,255,255,0.05)',
            border: '1px solid rgba(255,255,255,0.1)',
          }}
        />
      </div>
    </div>
  );
};

export default ImageUpload;
