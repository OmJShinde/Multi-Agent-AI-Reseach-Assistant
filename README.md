# Multi-Agent AI Research Assistant

A **full-stack AI research assistant** that utilizes a **multi-agent orchestration pattern** to fetch, summarize, and verify information in response to research queries.
It is built with a **Django backend**, **React frontend**, and **multiple AI agents** working collaboratively to simulate professional research workflows.

## Overview

This project demonstrates a modern AI application architecture that:

- Breaks down complex research tasks into specialized autonomous agents.
- Utilizes distinct **Search**, **Summarization**, and **Verification** agents.
- Structures results with **confidence scores and citations** for transparency.
- Provides a polished, responsive interface for interacting with AI responses.
- Is designed with **scalability, security, and real-world relevance** in mind.

## System Architecture

The system is composed of the following specialized components:

### Search Agent
Fetches relevant articles, documents, and references from verified online sources.

### Summarization Agent
Analyzes retrieved content and synthesizes a concise, coherent research summary.

### Verification Agent
Cross-checks the generated summary against the original sources to detect hallucinations and assigns a confidence score.

### Orchestrator
Coordinates these agents in a linear pipeline:
1.  **Search**: Gather data on the topic.
2.  **Summarize**: Distill key information.
3.  **Verify**: Validate accuracy and consistency.

Returns the final structured research results to the frontend.

This **orchestration pattern** is essential for building robust agent-based workflows in production AI systems.

## Tech Stack

| Layer | Technology |
|-------|------------|
| **Backend** | Django, Django REST Framework |
| **Frontend** | React, Vite, TailwindCSS, shadcn/ui |
| **Agents** | Python modules (Search / Summarize / Verify) |
| **AI Models** | LLMs (via Groq/OpenAI APIs) |
| **Database** | SQLite (Development) / PostgreSQL (Production) |

## Key Features

- **Agent Orchestration**: Clean separation of concerns between discovery, synthesis, and verification.
- **Modular Backend**: Extensible Django architecture allowing for easy addition of new agents.
- **Modern Frontend UI**: Professional interface built with React and TailwindCSS.
- **Trust & Safety**: Integrated confidence scoring and source tracking.
- **Configuration**: Secure environment variable-based configuration for API keys.

## Getting Started

### Backend Setup

1. Clone the repository:
   ```bash
   git clone https://github.com/OmJShinde/Multi-Agent-AI-Reseach-Assistant.git
   cd Multi-Agent-AI-Reseach-Assistant/backend
   ```

2. Create and activate a virtual environment:
   ```bash
   # Windows
   python -m venv venv
   .\venv\Scripts\Activate

   # macOS/Linux
   python3 -m venv venv
   source venv/bin/activate
   ```

3. Install dependencies:
   ```bash
   pip install -r requirements.txt
   ```

4. Configure Environment:
   Create a `.env` file in the `backend` directory and add your API keys:
   ```env
   GROQ_API_KEY=your_api_key_here
   DEBUG=True
   DJANGO_SECRET_KEY=your_secret_key
   ```

5. Run Migrations and Server:
   ```bash
   python manage.py migrate
   python manage.py runserver
   ```

### Frontend Setup

1. Navigate to the frontend directory:
   ```bash
   cd ../frontend
   ```

2. Install dependencies:
   ```bash
   npm install
   ```

3. Run the development server:
   ```bash
   npm run dev
   ```

Access the application at `http://localhost:5173`.
