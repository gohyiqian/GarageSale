from django.urls import path
from base.views import user_views as views

urlpatterns = [
    path('login/', views.MyTokenObtainPairView.as_view(),name='token_obtain_pair'),
    path('register/', views.registerUser, name='register_user'),
    path('update/<str:pk>/',views.updateUser, name='update_user'),
    path('delete/<str:pk>/',views.deleteUser, name='delete_user'), #admin_only
    path('', views.getAllUsers, name='get_all_users'), #admin_only
    path('profile/',views.getUserProfile, name='get_user_profile'), #???
    path('profile/update/', views.updateUserProfile, name='update_user_profile'),
    path('<str:pk>/',views.getUserById, name='get_user_by_id'), #admin_only
]