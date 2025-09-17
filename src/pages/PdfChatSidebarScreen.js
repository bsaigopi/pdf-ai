import React from 'react';
import './PdfChatSidebarScreen.css';

const PdfChatSidebarScreen = () => {
  return (
    <div className="pdf-sidebar">
      <h2>Your Document</h2>
      <p className="filename">report.pdf</p>
      <button className="upload-btn">📄 Upload New</button>

      <hr />

      <h3>Navigation</h3>
      <ul className="page-nav">
        <li>📄 Page 1</li>
        <li>📄 Page 2</li>
        <li>📄 Page 3</li>
      </ul>

      <hr />

      <div className="meta">
        <h3>Metadata</h3>
        <p>Pages: 12</p>
        <p>Size: 1.2 MB</p>
        <p>Uploaded: Today</p>
      </div>
    </div>
  );
};

export default PdfChatSidebarScreen;
