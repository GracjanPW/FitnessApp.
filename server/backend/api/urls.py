from django.urls import path
from rest_framework_simplejwt import views as jwt_views
from .views import UserCreateView, UserGoalsView
urlpatterns = [
    path('token/obtain/', jwt_views.TokenObtainPairView.as_view(), name='token_create'),  # override sjwt stock token
    path('token/refresh/', jwt_views.TokenRefreshView.as_view(), name='token_refresh'),
    path('user/create/', UserCreateView.as_view(), name="create_user"),
    path('user/goals/', UserGoalsView.as_view(), name="user_goals")
]