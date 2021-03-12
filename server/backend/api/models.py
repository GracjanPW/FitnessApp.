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
    # TODO change is_active default to False and implement email confirmation for opening an account
    is_active = models.BooleanField(default=True)
    first_time_setup = models.BooleanField(default=True)
    date_joined = models.DateTimeField(default=timezone.now, editable=False)

    USERNAME_FIELD = 'email'
    REQUIRED_FIELDS =[]
    objects = CustomUserManager()

    def __str__(self):
        return self.email

class UserGoals(models.Model):
    user = models.OneToOneField(MyUser,on_delete=models.CASCADE)
    goals = ArrayField(models.JSONField(default=dict),default=list,null=True,blank=True)
    goalsId = models.IntegerField(default=0,editable=False)

    def __str__(self):
        return str(self.user)

class Exercise(models.Model):
    user = models.ForeignKey(MyUser, on_delete=models.CASCADE)
    name = models.CharField(max_length=40)
    desc = models.TextField(blank=True, null=True)
    instructions = ArrayField(models.CharField(max_length=100),default=list,null=True, blank=True)

class Workout(models.Model):
    user = models.ForeignKey(MyUser, on_delete=models.CASCADE)
    name = models.CharField(max_length=40)
    exercises = ArrayField(models.JSONField(default=dict),default=list)