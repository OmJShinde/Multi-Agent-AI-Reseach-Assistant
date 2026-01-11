from rest_framework.views import APIView
from rest_framework.decorators import api_view, throttle_classes
from rest_framework.response import Response
from rest_framework import status
from research_assistant.core.rate_limit import QueryRateThrottle
from research_assistant.core.security import Security
from .serializers import ResearchQuerySerializer, ResearchResponseSerializer
from research_assistant.api.agents.orchestrator import orchestrator
import logging

logger = logging.getLogger(__name__)

class ResearchQueryView(APIView):
    throttle_classes = [QueryRateThrottle]

    def post(self, request):
        # 1. Validate Input Structure
        input_serializer = ResearchQuerySerializer(data=request.data)
        if not input_serializer.is_valid():
            return Response(input_serializer.errors, status=status.HTTP_400_BAD_REQUEST)
        
        query = input_serializer.validated_data['query']
        
        # 2. Security / Sanitization
        safe_query = Security.sanitize_input(query)
        
        # 3. Execution Phase
        try:
            result = orchestrator(safe_query)
            
            response_serializer = ResearchResponseSerializer(result)
            

            
            data = response_serializer.data
            data['agent_steps'] = ["search", "summarize", "verify"] # Static for now as per flow
            
            return Response(data, status=status.HTTP_200_OK)

        except Exception as e:
            logger.error(f"Orchestration failed: {str(e)}", exc_info=True)
            return Response(
                {"error": "Internal processing error", "details": str(e)}, 
                status=status.HTTP_500_INTERNAL_SERVER_ERROR
            )
