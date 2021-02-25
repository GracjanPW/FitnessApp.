from rest_framework import serializers
from rest_framework.validators import UniqueValidator
from .models import MyUser

class UserSerializer(serializers.ModelSerializer):
    email = serializers.EmailField(required=True,validators=[UniqueValidator(queryset=MyUser.objects.all())])
    password = serializers.CharField(min_length=8)
    name = serializers.CharField(required=False)
    lastname = serializers.CharField(required=False)
    dob = serializers.DateField(required=False)
    gender = serializers.CharField(required=False)

    class Meta:
        model = MyUser
        fields = ('email','password','name','lastname','dob','gender')
        read_only_fields = ['date_joined','password','groups','user_permissions']
        extra_kwargs = {'password':{'write_only':True}}
    
    def create(self, validated_data):
        password = validated_data.pop('password',None)
        instance = self.Meta.model(**validated_data)
        if password is not None:
            instance.set_password(password)
        instance.save()
        return instance
        