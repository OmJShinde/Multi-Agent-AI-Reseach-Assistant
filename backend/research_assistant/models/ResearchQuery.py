from django.db import models

class ResearchQuery(models.Model):
    query_text = models.TextField()
    response_text = models.TextField(blank=True, null=True)
    confidence_score = models.FloatField(default=0.0)
    created_at = models.DateTimeField(auto_now_add=True)

    def __str__(self):
        return self.query_text[:50]
