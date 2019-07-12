from rest_framework import serializers
from . import models

class FileSerializer(serializers.ModelSerializer):
    album = serializers.ReadOnlyField(source='album.id')
    class Meta:
        model = models.Image
        fields = "__all__"


class AlbumSerializer(serializers.ModelSerializer):
    owner = serializers.ReadOnlyField(source='owner.username')
    class Meta:
        model = models.Album
        fields = "__all__"