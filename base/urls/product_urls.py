from django.urls import path
from base.views import product_views as views

urlpatterns = [
    path('<str:pk>', views.getProduct, name="products"),
]