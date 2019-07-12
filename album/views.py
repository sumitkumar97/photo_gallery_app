from rest_framework.parsers import FileUploadParser
from rest_framework.response import Response
from django.http import HttpResponse, JsonResponse
from rest_framework.views import APIView
from rest_framework import status
from django.core import serializers

from .serializers import FileSerializer, AlbumSerializer
from .models import Album, Image
import json


class FileUploadView(APIView):
    parser_class = (FileUploadParser,)
    def post(self, request, *args, **kwargs):
      file_serializer = FileSerializer(data=request.data)
      if file_serializer.is_valid():
          # file_serializer.user = self.request.user
          # import pdb;pdb.set_trace()
          file_serializer.save(album = Album.objects.get(id=self.request.data['album']))
          return Response(file_serializer.data, status=status.HTTP_201_CREATED)
      else:
          return Response(file_serializer.errors, status=status.HTTP_400_BAD_REQUEST)


class AlbumView(APIView):
    parser_class = (FileUploadParser,)
    def post(self, request, *args, **kwargs):
        album_serializer = AlbumSerializer(data=request.data)
        if album_serializer.is_valid():
            album_serializer.save(owner = self.request.user)
            return Response(album_serializer.data, status=status.HTTP_201_CREATED)
        else:
            return Response(album_serializer.errors, status=status.HTTP_400_BAD_REQUEST)


class AlbumListPublic(APIView):
    def get(self, request, format=None):
        return JsonResponse(AlbumSerializer(Album.objects.all().filter(privacy=1),many=True).data,safe=False)

class AlbumListPrivate(APIView):
    def get(self, request, format=None):
        return JsonResponse(AlbumSerializer(Album.objects.all().filter(owner=self.request.user),many=True).data,safe=False)

class AlbumImageList(APIView):
    def get(self, request, album_id, format=None):
        return JsonResponse(FileSerializer(Album.objects.get(id=album_id).images,many=True).data,safe=False)

class AlbumDeleteView(APIView):
    def get(self, request, album_id, format=None):
        Album.objects.get(id=album_id).delete()
        return Response(status=status.HTTP_204_NO_CONTENT)

class ImageDeleteView(APIView):
    def get(self, request, image_id, format=None):
        img = Image.objects.get(id=image_id)
        if img.album.owner == self.request.user:
            img.delete()
            return Response(status=status.HTTP_204_NO_CONTENT)
        else:
            return Response(status=status.HTTP_403_FORBIDDEN)