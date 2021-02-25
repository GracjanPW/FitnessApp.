from django.db import models
from django.contrib.postgres.fields import ArrayField
from django.contrib.auth.models import AbstractBaseUser
from django.contrib.auth.models import PermissionsMixin
from django.utils.translation import gettext_lazy as _
from django.utils import timezone
from datetime import date, datetime
from dateutil.relativedelta import relativedelta
from .managers import CustomUserManager

# Create your models here.
class MyUser(AbstractBaseUser,PermissionsMixin):
    email = models.EmailField(_('Email'),unique=True)
    name = models.CharField(max_length=35, blank=True)
    lastname = models.CharField(max_length=35, blank=True)
    dob = models.DateField(_('Date of birth'), null=True, blank=True)
    gender =  models.CharField(choices=(('m','Male'),('f','Female'),('o','Other')), null=True, blank=True, max_length=6)
    is_staff = models.BooleanField(default=False)
    is_active = models.BooleanField(default=False)
    first_time_setup = models.BooleanField(default=True)
    date_joined = models.DateTimeField(default=timezone.now, editable=False)

    USERNAME_FIELD = 'email'
    REQUIRED_FIELDS =[]
    objects = CustomUserManager()

    def __str__(self):
        return self.email