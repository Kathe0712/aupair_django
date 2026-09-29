from django.db import models

class AuPair(models.Model):
    nombre = models.CharField(max_length=100)
    apellido = models.CharField(max_length=100)
    edad = models.IntegerField()
    pais_origen = models.CharField(max_length=100)
    idiomas = models.CharField(max_length=200)
    email = models.EmailField()
    telefono = models.CharField(max_length=20)
    experiencia = models.TextField(blank=True)
    fecha_registro = models.DateField(auto_now_add=True)

    def __str__(self):
        return f"{self.nombre} {self.apellido}"