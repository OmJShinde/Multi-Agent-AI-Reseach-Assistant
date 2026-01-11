from django.urls import path
from .views import ResearchQueryView

urlpatterns = [
    path('query/', ResearchQueryView.as_view(), name='research-query'),
]
