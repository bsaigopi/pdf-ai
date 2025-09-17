import React, { useState } from "react";
import { Document, Page } from "react-pdf";
import "./PdfFormFiller.css";

const PdfFormFiller = () => {
  const [file, setFile] = useState(null);
  const [numPages, setNumPages] = useState(null);
  const [formData, setFormData] = useState({
    fullName: "",
    email: "",
    address: "",
  });
  const [isLoading, setIsLoading] = useState(false);
  const [message, setMessage] = useState({ text: "", type: "" });

  function onDocumentLoadSuccess({ numPages }) {
    setNumPages(numPages);
  }

  const handleFileChange = (e) => {
    const selected = e.target.files[0];
    if (selected && selected.type === "application/pdf") {
      setFile(selected);
      setMessage({ text: "", type: "" });
    } else {
      setMessage({ text: "Please upload a valid PDF file.", type: "error" });
      setFile(null);
    }
  };

  const handleInputChange = (e) => {
    setFormData({ ...formData, [e.target.name]: e.target.value });
  };

  const handleSubmit = async () => {
    if (!file) {
      setMessage({ text: "Please upload a PDF file first.", type: "error" });
      return;
    }
    // Add your Lambda integration here
    setIsLoading(true);
    setMessage({ text: "", type: "" });
    try {
      // Example: upload PDF + form data
      // Do your form filling API call here
      await new Promise((r) => setTimeout(r, 2000)); // dummy wait
      setMessage({ text: "Form submitted successfully!", type: "success" });
    } catch (e) {
      setMessage({ text: "Submission failed. Try again.", type: "error" });
    } finally {
      setIsLoading(false);
    }
  };

  return (
    <div className="container">
      <div className="pdf-preview">
        <h3>PDF Preview</h3>
        {file ? (
          <Document
            file={file}
            onLoadSuccess={onDocumentLoadSuccess}
            loading="Loading PDF..."
          >
            {[...Array(numPages)].map((_, index) => (
              <Page
                key={`page_${index + 1}`}
                pageNumber={index + 1}
                width={400}
              />
            ))}
          </Document>
        ) : (
          <p>No PDF uploaded yet.</p>
        )}
      </div>

      <div className="form-fields">
        <h3>Fill Form</h3>
        <input
          type="file"
          accept="application/pdf"
          onChange={handleFileChange}
          disabled={isLoading}
        />

        <label>
          Full Name
          <input
            type="text"
            name="fullName"
            value={formData.fullName}
            onChange={handleInputChange}
            disabled={isLoading}
            placeholder="Enter your full name"
          />
        </label>

        <label>
          Email Address
          <input
            type="email"
            name="email"
            value={formData.email}
            onChange={handleInputChange}
            disabled={isLoading}
            placeholder="Enter your email"
          />
        </label>

        <label>
          Address
          <textarea
            name="address"
            value={formData.address}
            onChange={handleInputChange}
            disabled={isLoading}
            placeholder="Enter your address"
          />
        </label>

        <button onClick={handleSubmit} disabled={isLoading}>
          {isLoading ? "Submitting..." : "Submit Form"}
        </button>

        {message.text && (
          <p className={`message ${message.type}`}>{message.text}</p>
        )}
      </div>
    </div>
  );
};

export default PdfFormFiller;
