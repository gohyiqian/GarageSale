from django.urls import path
from base.views import shop_views as views

urlpatterns = [
    path('create/', views.createShop,  name="create_shop"),
    path('all/',views.getAllShops, name='get_all_shops'),
    path('<str:pk>/',views.getShop, name='get_shop'),
    path('update/<str:pk>/', views.updateShop, name="update_shop"),
    path('delete/<str:pk>/', views.deleteShop, name="delete_shop"),
]