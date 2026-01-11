import os
from openai import OpenAI
from dotenv import load_dotenv

# Force reload env
load_dotenv(override=True)

class LLMEngine:
    def __init__(self):
        self.api_key = os.getenv('GROQ_API_KEY')
        if not self.api_key:
            print("Warning: GROQ_API_KEY not found in environment variables.")
            self.client = None
        else:
            self.client = OpenAI(
                api_key=self.api_key,
                base_url="https://api.groq.com/openai/v1",
            )
    
    def generate(self, prompt, model="llama-3.3-70b-versatile"):
        if not self.client:
            return f"Simulated response (Missing GROQ_API_KEY) for: {prompt[:30]}..."
            
        try:
            response = self.client.chat.completions.create(
                model=model,
                messages=[
                    {"role": "system", "content": "You are a helpful and precise research assistant."},
                    {"role": "user", "content": prompt},
                ],
                temperature=0.5,
                max_tokens=1024,
            )
            return response.choices[0].message.content
        except Exception as e:
            return f"Error generating response: {str(e)}"
