import json
import re
from .base import AgentResponse
from research_assistant.core.llm import LLMEngine
from research_assistant.core.prompts import VERIFICATION_AGENT_SYSTEM_PROMPT

def extract_json_from_text(text: str):
    """
    Robustly extract the largest JSON object from a string.
    """
    try:
        if not text:
            return None
        # Try finding the first outermost block bounded by curly braces
        match = re.search(r'\{.*\}', text, re.DOTALL)
        if match:
            json_str = match.group(0)
            return json.loads(json_str)
        # If no braces found, try parsing the whole text
        return json.loads(text)
    except Exception:
        return None

def verification_agent(summary: str, sources: list) -> AgentResponse:
    """
    detect hallucinations & consistency
    """
    if not summary:
        return {"confidence": 0.0, "flags": ["No summary to verify"]}

    source_content = "\n\n".join([f"Source '{s['title']}': {s['content']}" for s in sources])
    
    llm = LLMEngine()
    
    prompt = f"""{VERIFICATION_AGENT_SYSTEM_PROMPT}

Summary: {summary}

Sources:
{source_content}

Verify the summary against the sources. Return ONLY a JSON object with:
- "confidence": float between 0.0 and 1.0 (1.0 = fully supported by sources)
- "flags": list of strings (potential hallucinations, unsupported claims, or contradictions)
IMPORTANT: output must be valid JSON.
"""
    
    try:
        response = llm.generate(prompt)
        
        # Robust JSON extraction
        verdict = extract_json_from_text(response)
        
        if not verdict:
             # If parsing failed, assume it failed to generate valid JSON due to safety or model error
            return {
                "confidence": 0.5,
                "flags": ["Verification Warning: Could not parse agent response. Assuming moderate confidence."]
            }
        
        return {
            "confidence": verdict.get("confidence", 0.0),
            "flags": verdict.get("flags", [])
        }
    except Exception as e:
        return {
            "confidence": 0.5,
            "flags": [f"Verification process error: {str(e)}"]
        }
