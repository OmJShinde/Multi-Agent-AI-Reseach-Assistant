from django.db import models
from .ResearchQuery import ResearchQuery

class AgentLog(models.Model):
    query = models.ForeignKey(ResearchQuery, on_delete=models.CASCADE, related_name='logs')
    agent_name = models.CharField(max_length=50)
    step_description = models.TextField()
    created_at = models.DateTimeField(auto_now_add=True)
    metadata = models.JSONField(default=dict)

    def __str__(self):
        return f"{self.agent_name} - {self.step_description[:30]}"
