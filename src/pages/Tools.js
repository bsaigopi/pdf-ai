import React from 'react';
import { useNavigate } from 'react-router-dom';
import './Tools.css';

const toolsList = [
  // { name: "Docx to PDF", route: "/docx-to-pdf" },
  { name: "Image to PDF", route: "/image-to-pdf"},
  { name: "MergePDF", route: "/merge-pdf"},
  // { name: "Excel to PDF", route: "/excel-to-pdf"},
  {name: "Text to PDF", route: "/text-to-pdf"},
  {name: "Split PDF" , route :"/split-pdf"},
  {name: "Add Water Mark" , route :"/add-watermark"},
  // {name: "Pdf Form Filler" , route :"/pdf-filler"},
];

const Tools = () => {
  const navigate = useNavigate();

  return (
    <section className="tools-section">
      <h2 className="tools-heading">Powerful PDF Tools</h2>
      <p className="tools-subtext">All the tools you need, all in one place.</p>

      <div className="tools-grid">
        {toolsList.map((tool, index) => (
          <div
            key={index}
            className="tool-card"
            onClick={() => navigate(tool.route)}
            style={{ cursor: 'pointer' }}
          >
            <div className="tool-icon">📄</div>
            <h3 className="tool-name">{tool.name}</h3>
          </div>
        ))}
      </div>
    </section>
  );
};

export default Tools;
