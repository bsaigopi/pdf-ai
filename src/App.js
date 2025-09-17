import { BrowserRouter as Router, Routes, Route } from 'react-router-dom';
import Header from '../src/components/Header';
import Footer from '../src/components/Footer';
import DocxToPdf from './pages/DocxToPdf'; 
import Home from './pages/Home';
import ImageToPdf from './pages/ImageToPdf'
import MergePdf from './pages/MergePdf';
import ExcelToPdf from './pages/ExcelToPdf';
import TextToPdf from './pages/TextToPdf';
import SplitPdf from './pages/SplitPdf';
import AddWaterMark from './pages/AddWatermark';
import AiPdfChatsection from './pages/AiPdfChat';
import PdfChatWindowSection from './pages/PdfChatWindowSection';
// import PdfFormFiller from './pages/PdfFormFiller'
// import { pdfjs } from 'react-pdf';


function App() {
  return (
    <Router>
      <Header />
      <Routes>
        <Route path="/" element={<Home />} />
       <Route path="/docx-to-pdf" element={<DocxToPdf />} />
       <Route path="/image-to-pdf" element={<ImageToPdf />} /> 
        <Route path="/merge-pdf" element={<MergePdf />} /> 
         <Route path="/excel-to-pdf" element={<ExcelToPdf />} /> 
        <Route path="/text-to-pdf" element={<TextToPdf />} /> 
        <Route path="/split-pdf" element={<SplitPdf />} /> 
        <Route path="/add-watermark" element={<AddWaterMark />} /> 
        <Route path="/pdf-chat-section" element={< AiPdfChatsection/>} /> 
         <Route path="/pdf-chat-screen" element={< PdfChatWindowSection/>} /> 
        
        {/* <Route path="/pdf-filler" element={<PdfFormFiller />} />  */}
      </Routes>
      <Footer />
    </Router>
  );
}

export default App;
