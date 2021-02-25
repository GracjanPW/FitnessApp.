from django.contrib import admin
from django.contrib.auth.admin import UserAdmin

from .models import MyUser
from .forms import CustomUserCreationForm, CustomUserChangeForm

class CustomUserAdmin(UserAdmin):
    add_form = CustomUserCreationForm
    form = CustomUserChangeForm
    model = MyUser
    list_display = ('email','is_staff','is_active',)
    list_filter = ('email','is_staff','is_active',)
    fieldsets = (
        (None, {'fields': ('email', 'password','name','lastname','dob','gender','first_time_setup')}),
        ('Permissions', {'fields':('is_staff','is_active')}),
    )
    add_fieldsets = (
        (None, {
            'classes' : ('wide',),
            'fields' : ('email','password1','password2','is_staff','is_active','first_time_setup','name','lastname','dob','gender')}
        ),
    )
    search_fields = ('email',)
    ordering = ('email',)


admin.site.register(MyUser, CustomUserAdmin)