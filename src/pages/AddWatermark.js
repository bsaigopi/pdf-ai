import React, { useState } from 'react';
import axios from 'axios';
import './AddWatermark.css'; // optional CSS styling

const AddWatermark = () => {
  const [file, setFile] = useState(null);
  const [watermark, setWatermark] = useState('');
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

  const handleAddWatermark = async () => {
    if (!file) {
      setMessage({ text: '⚠️ Please upload a PDF file.', type: 'error' });
      return;
    }

    if (!watermark.trim()) {
      setMessage({ text: '⚠️ Please enter a watermark.', type: 'error' });
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
          watermark: watermark.trim(),
        };

        const response = await axios.post(
          'https://sh3yplikf4.execute-api.us-east-1.amazonaws.com/prod/gate_add_watermark',
          payload,
          { headers: { 'Content-Type': 'application/json' } }
        );

        const { file: base64 } = response.data;

        const blob = new Blob([Uint8Array.from(atob(base64), c => c.charCodeAt(0))], {
          type: 'application/pdf',
        });

        const url = URL.createObjectURL(blob);
        const link = document.createElement('a');
        link.href = url;
        link.download = 'watermarked.pdf';
        link.click();

        setMessage({ text: '✅ Watermark added successfully!', type: 'success' });
        setFile(null);
        setWatermark('');
      };

      reader.readAsDataURL(file);
    } catch (error) {
      console.error(error);
      setMessage({ text: '❌ Watermarking failed. Try again.', type: 'error' });
    } finally {
      setLoading(false);
    }
  };

  return (
    <div className="docx-wrapper">
      <div className="docx-card">
        <h2 className="docx-heading">💧 Add Watermark</h2>
        <p className="docx-subtext">Upload a PDF and enter watermark text to embed.</p>

        <input
          type="file"
          accept=".pdf"
          onChange={handleFileChange}
          className="docx-input"
          disabled={loading}
        />

        <input
          type="text"
          placeholder="Enter watermark text"
          value={watermark}
          onChange={(e) => setWatermark(e.target.value)}
          className="docx-input"
          disabled={loading}
        />

        <button
          className="docx-button"
          onClick={handleAddWatermark}
          disabled={loading}
        >
          {loading ? 'Adding...' : 'Add Watermark'}
        </button>

        {message.text && (
          <p className={`docx-message ${message.type}`}>{message.text}</p>
        )}
      </div>
    </div>
  );
};

export default AddWatermark;
