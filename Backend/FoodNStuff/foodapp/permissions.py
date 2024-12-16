from rest_framework import permissions

# imported from webservice security lab, modified to include django admin superusers marked as is_staff
class IsOwnerOrStaff(permissions.BasePermission):
    
    # Custom permission to only allow owners of an object to view it.
    def has_object_permission(self, request, view, obj):
        # allow access if a staff member
        if request.user.is_staff:
            return True
        # else return true if the user is the object owner
        return obj.recipe_owner == request.user
    