📄 PDF Chat AI

An AI-powered PDF platform that combines classic PDF utilities with the ability to chat with your PDF using GPT-4.
Built with AWS Lambda, Python and OpenAI GPT-4, this project demonstrates serverless AI deployment and real-world document intelligence.

✨ Features
🔧 PDF Tools

📎 Merge PDF – Combine multiple PDF files into one.

✂️ Split PDF – Extract specific pages into a new file.

📝 Text → PDF – Convert plain text into a styled PDF.

💧 Watermark PDF – Add custom watermarks for branding/security.

🤖 Chat with PDF

📤 Upload any PDF

🧠 GPT-4 understands the document

💬 Ask natural language questions like:

"Summarize section 2"

"What are the payment terms?"

"Extract all key deadlines"

🖼️ UI Screenshots
🔧 PDF Utilities Dashboard

<img width="1672" height="795" alt="image" src="https://github.com/user-attachments/assets/d48ec224-2d4a-4e9f-9285-f91132ab97ca" />
<img width="1664" height="719" alt="image" src="https://github.com/user-attachments/assets/90d6c921-9c69-4306-b0a2-153261acda27" />
<img width="1676" height="905" alt="image" src="https://github.com/user-attachments/assets/aaf83af4-3a5e-41d5-885b-d657a9b4656f" />




🤖 Chat with PDF Interface

🏗️ Architecture
graph TD
  A[User] -->|Upload PDF| B[S3 Bucket]
  B --> C[Lambda - PDF Tools]
  A -->|Ask Question| D[API Gateway]
  D --> E[Lambda - PDF Q&A]
  E --> F[GPT-4]
  F -->|Response| A

🛠️ Tech Stack

Backend: Python 3.10, AWS Lambda, API Gateway, S3

AI/ML: GPT-4 via OpenAI API

PDF Processing: PyPDF2, pdfplumber, ReportLab

Vector DB: FAISS (local) / Pinecone (cloud)

Frontend (optional): React + Tailwind

🚀 Deployment

Set API Keys

export OPENAI_API_KEY=your_api_key


Deploy Lambda

serverless deploy


Run Frontend

npm install && npm run dev
