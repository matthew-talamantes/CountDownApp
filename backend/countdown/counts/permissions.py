from rest_framework import permissions

class CountdownPermissions(permissions.BasePermission):
    def has_object_permission(self, request, view, obj):
        if request.user == obj.created_by:
            return True
        if request.method in permissions.SAFE_METHODS:
            if obj.public_link:
                return True
            if request.user in obj.shared_with.all():
                return True
        return False