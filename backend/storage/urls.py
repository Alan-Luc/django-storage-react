from django.conf.urls import url
from django.contrib import admin
from storage import views

urlpatterns = [
    url(r'^admin/', admin.site.urls),
    url(r'^api/storage$', views.storage_list),
    url(r'^api/storage/(?P<pk>[0-9]+)$', views.storage_detail),
]