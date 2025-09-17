import React, { useState } from 'react';
import axios from 'axios';
import './DocxToPdf.css';

const TextToPdf = () => {
  const [file, setFile] = useState(null);
  const [isLoading, setLoading] = useState(false);
  const [message, setMessage] = useState({ text: '', type: '' });

  const handleFileChange = (e) => {
    const selectedFile = e.target.files[0];
    if (selectedFile && selectedFile.type === 'text/plain') {
      setFile(selectedFile);
      setMessage({ text: '', type: '' });
    } else {
      setMessage({ text: 'Please upload a valid .txt file.', type: 'error' });
      setFile(null);
    }
  };

  const handleConvert = async () => {
    if (!file) {
      setMessage({ text: 'Please upload a file first.', type: 'error' });
      return;
    }

    const reader = new FileReader();
    reader.onload = async () => {
      const base64Text = btoa(reader.result); 

      try {
        setLoading(true);
        setMessage({ text: '', type: '' });

        const response = await axios.post(
          'https://i31gz5lsu0.execute-api.us-east-1.amazonaws.com/prod/text-pdf', 
          { txt: base64Text },
          {
            headers: {
              'Content-Type': 'application/json'
            }
          }
        );

        const base64PDF = response.data.pdf;
        const pdfBlob = new Blob([Uint8Array.from(atob(base64PDF), c => c.charCodeAt(0))], {
          type: 'application/pdf'
        });

        const url = window.URL.createObjectURL(pdfBlob);
        const link = document.createElement('a');
        link.href = url;
        link.setAttribute('download', 'converted.pdf');
        document.body.appendChild(link);
        link.click();
        link.remove();

        setMessage({ text: '✅ PDF downloaded successfully!', type: 'success' });
      } catch (err) {
        console.error(err);
        setMessage({ text: '❌ Conversion failed. Please try again.', type: 'error' });
      } finally {
        setLoading(false);
      }
    };

    reader.readAsText(file);
  };

  return (
    <div className="docx-wrapper">
      <div className="docx-card">
        <h2 className="docx-heading">📄 Text to PDF</h2>
        <p className="docx-subtext">Upload your .txt file to convert it into a PDF.</p>

        <input
          type="file"
          accept=".txt"
          onChange={handleFileChange}
          className="docx-input"
          disabled={isLoading}
        />

        <button
          onClick={handleConvert}
          disabled={isLoading}
          className="docx-button"
        >
          {isLoading ? "Converting..." : "Convert to PDF"}
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

export default TextToPdf;
