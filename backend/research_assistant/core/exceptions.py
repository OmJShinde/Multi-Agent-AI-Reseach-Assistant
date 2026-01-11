class AgentError(Exception):
    pass

class SearchError(AgentError):
    pass

class OrchestrationError(AgentError):
    pass
