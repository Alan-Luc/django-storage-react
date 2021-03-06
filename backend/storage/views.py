from django.shortcuts import render, redirect
from django.http.response import JsonResponse
from rest_framework.parsers import JSONParser, FormParser, MultiPartParser
from rest_framework import status
from rest_framework.exceptions import ParseError

from rest_framework.decorators import api_view, parser_classes
from storage.serializers import StorageSerializer
from storage.models import Storage

# Create your views here.

@api_view(['GET', 'POST', 'DELETE'])
@parser_classes([MultiPartParser, JSONParser])
def storage_list(request):
    if request.method == 'GET':
        storage = Storage.objects.all()
        
        name = request.GET.get('name', None)
        if name is not None:
            storage = storage.filter(name__icontains=name)
        
        storage_serializer = StorageSerializer(storage, many=True)
        return JsonResponse(storage_serializer.data, safe=False)
        
    elif request.method == 'POST':
        storage_serializer = StorageSerializer(data=request.data)
        if storage_serializer.is_valid():
            storage_serializer.save()
            return JsonResponse(storage_serializer.data, status=status.HTTP_201_CREATED)

        return JsonResponse(storage_serializer.errors, status=status.HTTP_400_BAD_REQUEST)

    elif request.method == 'DELETE':
        count = Storage.objects.all().delete()
        return JsonResponse({'message': '{} Entries were deleted successfully!'.format(count[0])}, status=status.HTTP_204_NO_CONTENT)

@api_view(['GET', 'PUT', 'DELETE'])
def storage_detail(request, pk):
    # find storage by pk (id)
    try: 
        storage = Storage.objects.get(pk=pk) 
    except Storage.DoesNotExist: 
        return JsonResponse({'message': 'The entry does not exist'}, status=status.HTTP_404_NOT_FOUND) 

    if request.method == 'GET': 
        storage_serializer = StorageSerializer(storage) 
        return JsonResponse(storage_serializer.data) 
    
    elif request.method == 'PUT': 
        #storage_data = JSONParser().parse(request) 
        storage_serializer = StorageSerializer(storage, data=request.data) 
        if storage_serializer.is_valid(): 
            storage_serializer.save() 
            return JsonResponse(storage_serializer.data) 
        return JsonResponse(storage_serializer.errors, status=status.HTTP_400_BAD_REQUEST) 

    elif request.method == 'DELETE': 
        storage.delete() 
        return JsonResponse({'message': 'Entry was deleted successfully!'}, status=status.HTTP_204_NO_CONTENT)
    # GET / PUT / DELETE storage