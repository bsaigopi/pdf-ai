import React, { useState } from 'react';
import axios from 'axios';
import './DocxToPdf.css'; // You can reuse the same styles

const ExcelToPdf = () => {
  const [file, setFile] = useState(null);
  const [isLoading, setLoading] = useState(false);
  const [message, setMessage] = useState({ text: '', type: '' });

  const handleFileChange = (e) => {
    const selected = e.target.files[0];
    const validTypes = [
      'application/vnd.ms-excel',
      'application/vnd.openxmlformats-officedocument.spreadsheetml.sheet'
    ];

    if (selected && !validTypes.includes(selected.type)) {
      setMessage({ text: 'Please upload a valid .xls or .xlsx file.', type: 'error' });
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
        "http://127.0.0.1:5000/convert-excel",
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

      setMessage({ text: '✅ Your Excel file has been converted to PDF! 🎉', type: 'success' });
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
        <h2 className="docx-heading">📊 Excel to PDF</h2>
        <p className="docx-subtext">Turn your Excel sheets into print-ready PDFs instantly.</p>

        <input
          type="file"
          accept=".xls,.xlsx"
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

export default ExcelToPdf;
