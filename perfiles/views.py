from django.shortcuts import render
from django.contrib.auth.decorators import login_required
from .models import AuPair


@login_required
def lista_aupairs(request):
    aupairs = AuPair.objects.all()
    return render(request, 'perfiles/lista_aupairs.html', {'aupairs': aupairs})