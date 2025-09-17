import { useNavigate } from 'react-router-dom';
import './AiPdfChat.css';
import pdfchat from '../assets/pdfchat.jpg'; 

const AiPdfChat = () => {
  const navigate = useNavigate();

  return (
    <section className="ai-pdf-promo">
            <h1 style={{ color: "#1a252f",textAlign:'center', fontSize:"2.4rem" }}>AI chat PDF </h1>
      <div className="promo-grid">
        <div className="promo-text">
<h1>
  Chat with Your PDF  Instantly, with <span className="highlight-ai">AI Intelligence</span>
</h1>
          <p className="subhead">
            Upload any PDF and start a real-time conversation powered by AI. 
            No more scrolling  get straight to answers in seconds.
          </p>
          <ul className="features">
            <li>✨ Designed for students, professionals & exam aspirants</li>
            <li>📄 Break down complex documents instantly</li>
            <li>⏱️ Save hours spent on reading & searching</li>
          </ul>
          <button onClick={() => navigate('/pdf-chat-screen')} className="primary-button">
            Start Your First AI-Powered PDF Chat
          </button>
        </div>
        <div className="promo-image">
          <img src={pdfchat} alt="AI PDF Chat Illustration" />
        </div>
      </div>
    </section>
  );
};

export default AiPdfChat;

