from rest_framework.pagination import PageNumberPagination
from rest_framework.response import Response

def paginate(data, request, page_size=30):
    paginator = PageNumberPagination()
    paginator.page_size = page_size
    paginated_data = paginator.paginate_queryset(data, request)
    return Response({
        'pages': paginator.page.paginator.num_pages,
        'data': paginated_data
    })