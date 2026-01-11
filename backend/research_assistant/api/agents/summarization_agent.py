from .base import AgentResponse
from research_assistant.core.llm import LLMEngine
from research_assistant.core.prompts import SUMMARIZATION_AGENT_SYSTEM_PROMPT

def summarization_agent(sources: list) -> AgentResponse:
    """
    Summarizes key insights from a list of sources.
    """
    if not sources:
        return {"summary": "No sources available to summarize."}

    # Extract content
    source_content = "\n\n".join([f"Source '{s['title']}': {s['content']}" for s in sources])
    
    # We instantiate LLM here. To keep it "pure" we might pass it in, 
    # but for practical Django usage, instantiating a stateless helper is fine.
    llm = LLMEngine()
    
    prompt = f"{SUMMARIZATION_AGENT_SYSTEM_PROMPT}\n\nSources:\n{source_content}\n\nSummarize the key information."
    
    summary = llm.generate(prompt)

    return {
        "summary": summary
    }
