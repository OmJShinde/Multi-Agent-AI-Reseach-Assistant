from rest_framework import serializers

class ResearchQuerySerializer(serializers.Serializer):
    query = serializers.CharField(max_length=1000, min_length=5)

class ResearchResponseSerializer(serializers.Serializer):
    answer = serializers.CharField()
    confidence = serializers.FloatField()
    sources = serializers.ListField()
    flags = serializers.ListField()
