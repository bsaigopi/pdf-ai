import React, { useState } from 'react';
import axios from 'axios';
import './DocxToPdf.css';

const DocxToPdf = () => {
  const [file, setFile] = useState(null);
  const [isLoading, setLoading] = useState(false);
  const [message, setMessage] = useState({ text: '', type: '' });

  const handleFileChange = (e) => {
    const selected = e.target.files[0];
    const validTypes = ['application/msword', 'application/vnd.openxmlformats-officedocument.wordprocessingml.document'];

    if (selected && !validTypes.includes(selected.type)) {
      setMessage({ text: 'Please upload a valid .doc or .docx file.', type: 'error' });
      setFile(null);
    } else {
      setFile(selected);
      setMessage({ text: '', type: '' });
    }
  };

  const handleConvert = async () => {
    if (!file) {
      setMessage({ text: 'Please upload a file before converting.', type: 'error' });
      return;
    }

    const formData = new FormData();
    formData.append("file", file);

    try {
      setLoading(true);
      setMessage({ text: '', type: '' });

      const response = await axios.post(
        "http://127.0.0.1:5000/convert",
        formData,
        { responseType: "blob" }
      );

      const url = window.URL.createObjectURL(new Blob([response.data]));
      const link = document.createElement("a");
      link.href = url;
      link.setAttribute("download", "converted.pdf");
      document.body.appendChild(link);
      link.click();
      link.remove();

      setMessage({ text: '✅ Your PDF has been downloaded successfully! 💥', type: 'success' });
    } catch (error) {
      setMessage({ text: '❌ Conversion failed. Please try again later.', type: 'error' });
      console.error(error);
    } finally {
      setLoading(false);
    }
  };

  return (
    <div className="docx-wrapper">
      <div className="docx-card">
        <h2 className="docx-heading">📄 Docx to PDF</h2>
        <p className="docx-subtext">Convert your Word documents into polished PDFs in seconds.</p>

        <input
          type="file"
          accept=".doc,.docx"
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

export default DocxToPdf;
