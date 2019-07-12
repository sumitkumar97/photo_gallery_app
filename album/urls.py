from django.urls import path
from .views import *

urlpatterns = [
    path('add', FileUploadView.as_view()), #add image to the album   POST   not working for me
    path('create', AlbumView.as_view()), #create new album   POST
    path('list/private',AlbumListPrivate.as_view()), #get private + public albums GET
    path('list/public',AlbumListPublic.as_view()), #get public albums  GET
    path('<int:album_id>/images',AlbumImageList.as_view()), #GET list album images
    path('delete/<int:album_id>',AlbumDeleteView.as_view()), #GET delete album
    path('delete/image/<int:image_id>',ImageDeleteView.as_view()) #GET delete image
]