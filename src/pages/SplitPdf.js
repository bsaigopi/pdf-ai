import React, { useState } from 'react';
import axios from 'axios';
import './SplitPdf.css';

const SplitPdf = () => {
  const [file, setFile] = useState(null);
  const [mode, setMode] = useState('range');
  const [range, setRange] = useState({ from: '', to: '' });
  const [customPages, setCustomPages] = useState('');
  const [loading, setLoading] = useState(false);
  const [message, setMessage] = useState({ text: '', type: '' });

  const handleFileChange = (e) => {
    const selected = e.target.files[0];
    if (selected?.type !== 'application/pdf') {
      setMessage({ text: '❌ Only PDF files are allowed.', type: 'error' });
      return;
    }
    setFile(selected);
    setMessage({ text: '', type: '' });
  };

  const handleSplit = async () => {
    if (!file) {
      setMessage({ text: '⚠️ Please upload a PDF file.', type: 'error' });
      return;
    }

    if (mode === 'range' && (!range.from || !range.to)) {
      setMessage({ text: '⚠️ Please enter a valid page range.', type: 'error' });
      return;
    }

    if (mode === 'custom' && !customPages.trim()) {
      setMessage({ text: '⚠️ Please enter custom page numbers.', type: 'error' });
      return;
    }

    setLoading(true);
    setMessage({ text: '', type: '' });

    try {
      const reader = new FileReader();
      reader.onloadend = async () => {
        const base64File = reader.result.split(',')[1];
        const payload = {
          pdf: base64File,
          ...(mode === 'range'
            ? { pages: Array.from({ length: range.to - range.from + 1 }, (_, i) => parseInt(range.from) + i) }
            : { pages: customPages.split(',').map(p => parseInt(p.trim())) }),
        };

        const response = await axios.post(
          'https://boc8k35g70.execute-api.us-east-1.amazonaws.com/prod/split-pdf',
          payload,
          { headers: { 'Content-Type': 'application/json' } }
        );

        const { files } = response.data;

        files.forEach((base64, index) => {
          const blob = new Blob([Uint8Array.from(atob(base64), c => c.charCodeAt(0))], {
            type: 'application/pdf',
          });

          const url = URL.createObjectURL(blob);
          const link = document.createElement('a');
          link.href = url;
          link.download = `split_page_${index + 1}.pdf`;
          link.click();
        });

        setMessage({ text: '✅ PDF split successfully!', type: 'success' });
        setFile(null);
        setRange({ from: '', to: '' });
        setCustomPages('');
      };
      reader.readAsDataURL(file);
    } catch (error) {
      console.error(error);
      setMessage({ text: '❌ Split failed. Try again.', type: 'error' });
    } finally {
      setLoading(false);
    }
  };

  return (
    <div className="docx-wrapper">
      <div className="docx-card">
        <h2 className="docx-heading">✂️ Split PDF</h2>
        <p className="docx-subtext">Upload a PDF and select the pages you want to extract.</p>

        <input
          type="file"
          accept=".pdf"
          onChange={handleFileChange}
          className="docx-input"
          disabled={loading}
        />

        <div className="split-mode-toggle">
          <label>
            <input
              type="radio"
              value="range"
              checked={mode === 'range'}
              onChange={() => setMode('range')}
            /> Range (e.g. 2 to 5)
          </label>
          <label>
            <input
              type="radio"
              value="custom"
              checked={mode === 'custom'}
              onChange={() => setMode('custom')}
            /> Custom (e.g. 1,3,7)
          </label>
        </div>

        {mode === 'range' ? (
          <div className="range-inputs">
            <input
              type="number"
              placeholder="From"
              value={range.from}
              onChange={(e) => setRange({ ...range, from: e.target.value })}
              className="docx-input"
            />
            <input
              type="number"
              placeholder="To"
              value={range.to}
              onChange={(e) => setRange({ ...range, to: e.target.value })}
              className="docx-input"
            />
          </div>
        ) : (
          <input
            type="text"
            placeholder="Pages (e.g. 1,3,5)"
            value={customPages}
            onChange={(e) => setCustomPages(e.target.value)}
            className="docx-input"
          />
        )}

        <button
          className="docx-button"
          onClick={handleSplit}
          disabled={loading}
        >
          {loading ? 'Splitting...' : 'Split PDF'}
        </button>

        {message.text && (
          <p className={`docx-message ${message.type}`}>{message.text}</p>
        )}
      </div>
    </div>
  );
};

export default SplitPdf;
