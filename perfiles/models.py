from django.contrib.auth.models import User
from django.db import models


class Familia(models.Model):
    nombre = models.CharField(max_length=100)
    usuario = models.OneToOneField(User, on_delete=models.CASCADE, related_name='familia')

    def __str__(self):
        return self.nombre


class AuPair(models.Model):
    usuario = models.OneToOneField(User, on_delete=models.SET_NULL, null=True, blank=True, related_name='aupair')
    familia = models.ForeignKey(Familia, on_delete=models.SET_NULL, null=True, blank=True, related_name='aupairs')
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


class Actividad(models.Model):
    aupair = models.ForeignKey(AuPair, on_delete=models.CASCADE, related_name='actividades')
    fecha = models.DateField()
    titulo = models.CharField(max_length=150)
    descripcion = models.TextField()
    creada = models.DateTimeField(auto_now_add=True)

    class Meta:
        ordering = ['-fecha', '-creada']
        verbose_name_plural = 'actividades'

    def __str__(self):
        return f"{self.titulo} ({self.fecha})"
    
    
class Horario(models.Model):
    DIAS = [
        (0, 'Lunes'),
        (1, 'Martes'),
        (2, 'Miércoles'),
        (3, 'Jueves'),
        (4, 'Viernes'),
        (5, 'Sábado'),
        (6, 'Domingo'),
    ]
    