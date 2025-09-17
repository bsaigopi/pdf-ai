import React, { useState } from 'react';
import './PdfChatWindowSection.css';

const PdfChatWindowSection = () => {
  const [pdfName, setPdfName] = useState('');
  const [message, setMessage] = useState('');
  const [isUploading, setIsUploading] = useState(false);
  const [pdfFile, setPdfFile] = useState(null);

  const handleUpload = (e) => {
    const file = e.target.files[0];
    if (file && file.type === 'application/pdf') {
      setIsUploading(true);
      const reader = new FileReader();
      reader.onload = () => {
        setPdfFile(reader.result.split(',')[1]); 
        setPdfName(file.name);
        setIsUploading(false);
      };
      reader.readAsDataURL(file);
    }
  };

  const handleSend = async () => {
    if (!message.trim() || !pdfFile) return;

    setIsUploading(true);

    try {
      const res = await fetch("https://uaz13omi3i.execute-api.us-east-1.amazonaws.com/prod/gate-pdf-chat", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({
          pdf: pdfFile,
          question: message
        })
      });

      const result = await res.json();
      const answer = result.answer || result.error || "No response received";
      console.log("✅ Lambda Response:", answer);
      alert(answer);
    } catch (err) {
      console.error("Error:", err);
      alert("Something went wrong");
    } finally {
      setMessage('');
      setIsUploading(false);
    }
  };

  return (
    <div className="pdf-chat-background">
      <div className="shape rhombus shape1"></div>
      <div className="shape circle shape2"></div>
      <div className="shape square shape3"></div>
      <div className="shape rhombus shape4"></div>
      <div className="shape circle shape5"></div>

      <div className="pdf-chat-container">
        <div className="chat-box" role="main" aria-live="polite">
          <h2 className="product-title">Ask Your PDF</h2>
          <p className="product-tagline">
            No more hunting for answers. Just ask — your AI PDF-Gate is open.
          </p>

          {!pdfName && !isUploading ? (
            <div className="upload-box" aria-label="Upload your PDF">
              <label htmlFor="pdf-upload" className="upload-label" tabIndex={0}>
                Upload your PDF
              </label>
              <input
                id="pdf-upload"
                type="file"
                accept="application/pdf"
                onChange={handleUpload}
                hidden
              />
            </div>
          ) : isUploading ? (
            <div className="upload-box" style={{ cursor: 'wait' }}>
              <p style={{ color: '#7c3aed', fontWeight: '600', fontSize: '1.2rem' }}>
                Processing... <span className="dot-pulse">...</span>
              </p>
            </div>
          ) : (
            <div className="chat-input-area">
              <p className="pdf-status" aria-live="assertive">📄 {pdfName}</p>
              <div className="chat-input-wrapper">
                <input
                  type="text"
                  placeholder="Ask something about your PDF..."
                  value={message}
                  onChange={(e) => setMessage(e.target.value)}
                  aria-label="Chat input"
                />
                <button onClick={handleSend} aria-label="Send message">➤</button>
              </div>
            </div>
          )}
        </div>
      </div>
    </div>
  );
};

export default PdfChatWindowSection;
