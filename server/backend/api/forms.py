from django.contrib.auth.forms import UserCreationForm, UserChangeForm

from .models import MyUser

class CustomUserCreationForm(UserCreationForm):
    class Meta(UserCreationForm):
        model = MyUser
        fields = ('email',)

class CustomUserChangeForm(UserChangeForm):
    class meta:
        model = MyUser
        fields = ('email',)