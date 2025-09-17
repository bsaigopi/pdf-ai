import React, { useState } from 'react';
import axios from 'axios';
import './MergePdf.css';

const MergePdf = () => {
  const [files, setFiles] = useState([]);
  const [isLoading, setLoading] = useState(false);
  const [message, setMessage] = useState({ text: '', type: '' });

  const handleAddFiles = (e) => {
    const selectedFiles = Array.from(e.target.files);
    const validPdfType = 'application/pdf';

    const invalidFile = selectedFiles.find(file => file.type !== validPdfType);
    if (invalidFile) {
      setMessage({ text: '❌ Only PDF files are allowed.', type: 'error' });
      return;
    }

    const newFiles = selectedFiles.filter(
      (newFile) => !files.some(file => file.name === newFile.name && file.size === newFile.size)
    );

    setFiles(prevFiles => [...prevFiles, ...newFiles]);
    setMessage({ text: '', type: '' });

    e.target.value = null;
  };

  const handleRemoveFile = (index) => {
    setFiles(prevFiles => prevFiles.filter((_, i) => i !== index));
  };

  const base64ToBlob = (base64, mime) => {
    const byteCharacters = atob(base64);
    const byteArrays = [];

    for (let offset = 0; offset < byteCharacters.length; offset += 512) {
      const slice = byteCharacters.slice(offset, offset + 512);
      const byteNumbers = new Array(slice.length);
      for (let i = 0; i < slice.length; i++) {
        byteNumbers[i] = slice.charCodeAt(i);
      }
      const byteArray = new Uint8Array(byteNumbers);
      byteArrays.push(byteArray);
    }

    return new Blob(byteArrays, { type: mime });
  };

const handleMerge = async () => {
  if (files.length < 2) {
    setMessage({ text: '⚠️ Please add at least two PDF files to merge.', type: 'error' });
    return;
  }

  setLoading(true);
  setMessage({ text: '', type: '' });

  try {
    // Convert files to base64
    const base64Files = await Promise.all(
      files.map(file =>
        new Promise((resolve, reject) => {
          const reader = new FileReader();
          reader.onload = () => resolve(reader.result.split(',')[1]);
          reader.onerror = reject;
          reader.readAsDataURL(file);
        })
      )
    );

    const response = await axios.post(
      'https://dylth9ymx2.execute-api.us-east-1.amazonaws.com/prod/merge-pdfs', 
      { pdfs: base64Files },
      {
        headers: {
          'Content-Type': 'application/json'
        }
      }
    );

    const { body: mergedBase64 } = response.data;
    const blob = base64ToBlob(mergedBase64, 'application/pdf');

    const url = URL.createObjectURL(blob);
    const link = document.createElement('a');
    link.href = url;
    link.download = 'merged.pdf';
    link.click();

    setMessage({ text: '✅ PDFs merged successfully!', type: 'success' });
    setFiles([]);
  } catch (error) {
    console.error(error);
    setMessage({ text: '❌ Merge failed. Please try again.', type: 'error' });
  } finally {
    setLoading(false);
  }
};

  return (
    <div className="docx-wrapper">
      <div className="docx-card">
        <h2 className="docx-heading">📚 Merge PDFs</h2>
        <p className="docx-subtext">Upload multiple PDFs and merge them into one file.</p>

        <input
          type="file"
          accept=".pdf"
          multiple
          onChange={handleAddFiles}
          disabled={isLoading}
          className="docx-input"
        />

        {files.length > 0 && (
          <div className="file-list">
            <h4>Files to merge:</h4>
            <ul>
              {files.map((file, idx) => (
                <li key={idx}>
                  {file.name} ({(file.size / 1024).toFixed(1)} KB)
                  <button
                    type="button"
                    onClick={() => handleRemoveFile(idx)}
                    disabled={isLoading}
                    className="remove-button"
                  >
                    &times;
                  </button>
                </li>
              ))}
            </ul>
          </div>
        )}

        <button
          onClick={handleMerge}
          disabled={isLoading || files.length < 2}
          className="docx-button"
        >
          {isLoading ? 'Merging...' : 'Merge PDFs'}
        </button>

        {message.text && (
          <p className={`docx-message ${message.type}`}>{message.text}</p>
        )}

        {isLoading && (
          <div className="loader">
            <span></span><span></span><span></span>
          </div>
        )}
      </div>
    </div>
  );
};

export default MergePdf;
