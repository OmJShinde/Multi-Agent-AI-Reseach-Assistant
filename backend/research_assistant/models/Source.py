from django.db import models
from .ResearchQuery import ResearchQuery

class Source(models.Model):
    query = models.ForeignKey(ResearchQuery, on_delete=models.CASCADE, related_name='sources')
    title = models.CharField(max_length=255)
    url = models.URLField()
    snippet = models.TextField(blank=True)
    credibility_score = models.FloatField(default=0.0)

    def __str__(self):
        return self.title
