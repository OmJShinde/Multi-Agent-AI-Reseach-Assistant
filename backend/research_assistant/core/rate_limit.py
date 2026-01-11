from rest_framework.throttling import UserRateThrottle

class QueryRateThrottle(UserRateThrottle):
    rate = '10/minute'
