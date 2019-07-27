from django.db import models
from users.models import CustomUser

class Album(models.Model):
    name = models.CharField(blank=False, null=False, max_length=200)
    description = models.CharField(blank=True, null=True, max_length=1000)
    owner = models.ForeignKey(CustomUser, related_name="albums", on_delete=models.CASCADE, null=True)
    privacy = models.IntegerField() #0-private, 1-public
    cover = models.ImageField(null=True)

    def __str__(self):
        return self.name


class Image(models.Model):
    file = models.ImageField(blank=False, null=False)
    description = models.CharField(blank=True, null=True, max_length=1000)
    album = models.ForeignKey(Album, related_name='images',on_delete=models.CASCADE, null=True)

    def __str__(self):
        return self.file.name


