from .base import AgentResponse
from .search_agent import search_agent
from .summarization_agent import summarization_agent
from .verification_agent import verification_agent

def orchestrator(query: str) -> AgentResponse:
    """
    Coordinates the agents to answer a research query.
    1. Search
    2. Summarize
    3. Verify
    """
    # 1. Search
    sources = search_agent(query)
    # search_agent returns a list directly now, not a dict
    if isinstance(sources, dict) and "sources" in sources:
       sources = sources["sources"]
    
    # 2. Summarize
    summarization_result = summarization_agent(sources)
    summary = summarization_result.get("summary", "")
    
    # 3. Verify
    verification_result = verification_agent(summary, sources)
    
    return {
        "answer": summary,
        "confidence": verification_result.get("confidence", 0.0),
        "flags": verification_result.get("flags", []),
        "sources": [
            {"title": s["title"], "url": s["url"]}
            for s in sources
        ]
    }
