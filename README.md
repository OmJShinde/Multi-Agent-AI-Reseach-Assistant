# Multi-Agent AI Research Assistant

## Overview
This is a multi-agent AI research assistant building using Django (Backend) and React (Frontend).
It uses an orchestrator pattern to manage Search, Summarization, and Verification agents.

## Setup

### Backend
1. Create a virtual environment:
   ```bash
   python -m venv .venv
   .\.venv\Scripts\Activate
   ```
2. Install dependencies:
   ```bash
   pip install -r backend/requirements.txt
   ```
3. Run migrations:
   ```bash
   python backend/manage.py migrate
   ```
4. Start the server:
   ```bash
   python backend/manage.py runserver
   ```

### Frontend
1. Navigate to frontend:
   ```bash
   cd frontend
   ```
2. Install dependencies:
   ```bash
   npm install
   ```
3. Start the dev server:
   ```bash
   npm run dev
   ```

## Architecture
- **Backend**: Django REST Framework + Postgres (configured for SQLite dev)
- **Frontend**: React + Vite + TailwindCSS + shadcn/ui
- **Agents**: located in `backend/research_assistant/api/agents/`

## Configuration
- Update `.env` with Gemini API key (`GEMINI_API_KEY`).
- Adjust `backend/research_assistant/settings.py` for database/logging.
