import React from 'react';
import PdfSidebar from './PdfChatSidebarScreen';
import PdfChatWindow from './PdfChatWindowSection';
import './PdfChatSidebarScreen';
import PdfChatSidebarScreen from './PdfChatSidebarScreen';

const PdfChatscreen = () => {
  return (
    <div className="pdf-chat-page">
      <aside className="sidebar">
        <PdfSidebar />
      </aside>
      <main className="chat-window">
        <PdfChatWindow />
      </main>
    </div>
  );
};

export default PdfChatscreen;
