import React from 'react';
import landingImage from '../assets/final.png'; // update the path as needed
import './Landing.css';
import Tools from './Tools';


function LandingSection() {
  const handleTryNowClick = () => {
    const toolsSection = document.getElementById("tools");
    if (toolsSection) {
      toolsSection.scrollIntoView({ behavior: "smooth" });
    }
  };

  return (
    <section className="landing-container">
      <div className="text-content">
        <h1 className="landing-heading">
          Convert PDFs with <span className="highlight">One Click</span>
        </h1>
        <p className="landing-subtext">
          Over <strong>100,000 PDFs</strong> converted. Trusted by millions for fast, secure, and easy PDF conversions.
        </p>

        <p className="landing-quote">
          <em>“Documents don’t wait. Convert them the moment you need.”</em>
        </p>

        <div className="cta-buttons">
          <button className="cta primary" onClick={handleTryNowClick}>Try Now</button>
          <button className="cta secondary">Learn More</button>
        </div>

        <div className="trust-indicators">
          <p>✔️ No sign-up required &nbsp; • &nbsp; 🔒 100% secure & private &nbsp; • &nbsp; ⚡ Lightning-fast</p>
        </div>
      </div>

      <div className="graphic">
        <img src={landingImage} alt="PDF Conversion Illustration" />
      </div>
    </section>
  );
}

export default LandingSection;

