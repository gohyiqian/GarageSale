from django.urls import path
from base.views import product_views as views

urlpatterns = [
    path('<str:pk>', views.getProduct, name="products"),
    path('top/', views.getTopProducts, name='top_products'),
    path('create/', views.createProduct, name="product_create"),
    path('upload/', views.uploadImage, name="image_upload"),
    path('update/<str:pk>/', views.updateProduct, name="product_update"),
    path('delete/<str:pk>/', views.deleteProduct, name="product_delete"),
]