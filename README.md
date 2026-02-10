# Multi-Agent AI Research Assistant

A **full-stack AI research assistant** that utilizes a **multi-agent orchestration pattern** to fetch, summarize, and verify information in response to research queries.
It is built with a **Django backend**, **React frontend**, and **multiple AI agents** working collaboratively to simulate professional research workflows.

![UI Screenshot](https://via.placeholder.com/800x400?text=Multi-Agent+Research+Assistant+UI)

## 🚀 Key Features

- **Multi-Agent Orchestration**: 
  - **Search Agent**: Discovers diverse and reliable sources.
  - **Summarization Agent**: Synthesizes deep, comprehensive insights.
  - **Verification Agent**: Cross-checks claims and flags potential inaccuracies.
- **Gemini-like UI**: 
  - **Main View**: Deep answer and source context.
  - **Side Panel**: Real-time confidence scores and concise verification flags.
- **Modern Tech Stack**: Django REST Framework, React + Vite, TailwindCSS.
- **Robust Architecture**: Modular agent system designed for scalability.

## 🛠️ Tech Stack

| Layer | Technology |
|-------|------------|
| **Backend** | Django, Django REST Framework, Python |
| **Frontend** | React, Vite, TailwindCSS, shadcn/ui |
| **Agents** | Custom Python Modules (Search / Summarize / Verify) |
| **AI Models** | Groq (Llama 3 70B) / OpenAI Compatible APIs |
| **Database** | SQLite (Dev) / PostgreSQL (Prod) |

## 🏁 Getting Started

### Prerequisites
- Python 3.10+
- Node.js 18+
- Groq API Key (or OpenAI compatible key)

### Backend Setup

1. **Clone the repository:**
   ```bash
   git clone https://github.com/OmJShinde/Multi-Agent-AI-Reseach-Assistant.git
   cd Multi-Agent-AI-Reseach-Assistant/backend
   ```

2. **Create and activate a virtual environment:**
   ```bash
   # Windows
   python -m venv .venv
   .\.venv\Scripts\Activate

   # macOS/Linux
   python3 -m venv .venv
   source .venv/bin/activate
   ```

3. **Install dependencies:**
   ```bash
   pip install -r requirements.txt
   ```

4. **Configure Environment:**
   Create a `.env` file in the `backend` directory:
   ```env
   GROQ_API_KEY=your_groq_api_key_here
   DEBUG=True
   DJANGO_SECRET_KEY=your_secret_key
   ```

5. **Run Migrations and Server:**
   ```bash
   python manage.py migrate
   
   # Run on 0.0.0.0 to avoid localhost binding issues
   python manage.py runserver 0.0.0.0:8000
   ```

### Frontend Setup

1. **Navigate to the frontend directory:**
   ```bash
   cd ../frontend
   ```

2. **Install dependencies:**
   ```bash
   npm install
   ```

3. **Run the development server:**
   ```bash
   npm run dev
   ```

4. **Access the application:**
   Open [http://localhost:5173](http://localhost:5173) in your browser.

## 🧩 Architecture

The system follows a linear orchestration pipeline:

1.  **User Query** -> **Orchestrator**
2.  **Orchestrator** -> **Search Agent** (Fetches Documents)
3.  **Orchestrator** -> **Summarization Agent** (Generates Deep Answer)
4.  **Orchestrator** -> **Verification Agent** (Validates Answer)
5.  **Result** -> **Frontend** (Displayed in Gemini-like Layout)

## 📄 License

This project is licensed under the MIT License.
