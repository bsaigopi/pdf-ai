import React, { useState } from 'react';
import './DocxToPdf.css';

const ImageToPdf = () => {
  const [file, setFile] = useState(null);
  const [isLoading, setLoading] = useState(false);
  const [message, setMessage] = useState({ text: '', type: '' });

  const handleFileChange = (e) => {
    const selected = e.target.files[0];
    const validImageTypes = ['image/jpeg', 'image/png', 'image/jpg'];

    if (selected && !validImageTypes.includes(selected.type)) {
      setMessage({ text: '❌ Please upload a valid image (.jpg, .jpeg, .png).', type: 'error' });
      setFile(null);
    } else {
      setFile(selected);
      setMessage({ text: '', type: '' });
    }
  };

  const fileToBase64 = (file) =>
    new Promise((resolve, reject) => {
      const reader = new FileReader();
      reader.onload = () => resolve(reader.result.split(",")[1]);
      reader.onerror = reject;
      reader.readAsDataURL(file);
    });

  const base64ToBlob = (base64, type = "application/pdf") => {
    const binaryString = window.atob(base64);
    const len = binaryString.length;
    const bytes = new Uint8Array(len);
    for (let i = 0; i < len; i++) {
      bytes[i] = binaryString.charCodeAt(i);
    }
    return new Blob([bytes], { type });
  };

  const convertImageToPDF = async (file) => {
    const base64 = await fileToBase64(file);

    const response = await fetch("https://bdlndydt29.execute-api.us-east-1.amazonaws.com/prod/image-to-pdf", {
      method: "POST",
      body: JSON.stringify({ image_base64: base64 }),
      headers: {
        "Content-Type": "application/json"
      }
    });

    const rawText = await response.text();
    console.log("Raw response text:", rawText);

    if (!response.ok) {
      throw new Error(`Server error: ${response.statusText}`);
    }

    let responseBody;
    try {
      responseBody = JSON.parse(rawText);
    } catch (e) {
      throw new Error("❌ Invalid JSON returned: " + rawText);
    }

    if (!responseBody.body) {
      throw new Error('❌ No PDF data returned.');
    }

    const pdfData = responseBody.body;
    const pdfBlob = base64ToBlob(pdfData, "application/pdf");

    const url = window.URL.createObjectURL(pdfBlob);
    const link = document.createElement("a");
    link.href = url;
    link.download = "image.pdf";
    document.body.appendChild(link);
    link.click();
    link.remove();
  };

  const handleConvert = async () => {
    if (!file) {
      setMessage({ text: '⚠️ Please upload an image before converting.', type: 'error' });
      return;
    }

    try {
      setLoading(true);
      setMessage({ text: '', type: '' });
      await convertImageToPDF(file);
      setMessage({ text: '✅ Your image has been converted and downloaded as PDF!', type: 'success' });
    } catch (error) {
      console.error("Conversion error:", error);
      setMessage({ text: error.message || '❌ Conversion failed. Please try again.', type: 'error' });
    } finally {
      setLoading(false);
    }
  };

  return (
    <div className="docx-wrapper">
      <div className="docx-card">
        <h2 className="docx-heading">🖼️ Image to PDF</h2>
        <p className="docx-subtext">Easily convert your images into beautiful PDFs.</p>

        <input
          type="file"
          accept=".jpg,.jpeg,.png"
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

export default ImageToPdf;
