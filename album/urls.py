from django.urls import path
from .views import *

urlpatterns = [
    path('add', FileUploadView.as_view()), #add image to the album   POST
    path('create', AlbumView.as_view()), #create new album   POST
    path('list/private',AlbumListPrivate.as_view()), #get private + public albums GET
    path('list/public',AlbumListPublic.as_view()), #get public albums  GET
    path('<int:album_id>/images',AlbumImageList.as_view()), #list album images  GET
    path('delete/<int:album_id>',AlbumDeleteView.as_view()), #delete album  GET
    path('delete/image/<int:image_id>',ImageDeleteView.as_view()) #delete image  GET
]