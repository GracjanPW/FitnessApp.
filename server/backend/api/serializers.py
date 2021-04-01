from rest_framework import serializers
from rest_framework.validators import UniqueValidator
from .models import MyUser, UserGoals, Exercise, Workout

class UserSerializer(serializers.ModelSerializer):
    email = serializers.EmailField(required=True,validators=[UniqueValidator(queryset=MyUser.objects.all())])
    password = serializers.CharField(min_length=8, write_only=True)
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
            print('\n\nahhh\n\n')
            instance.set_password(password)
        instance.save()
        return instance

class UserGoalsSerializer(serializers.ModelSerializer):
    class Meta:
        model = UserGoals
        fields = ['goals']

    def update(self,instance,validated_data):
        data = validated_data.get('goals')[0]
        if 'id' in data.keys():
            goals = instance.goals
            for i in range(0,len(goals)):
                if goals[i]['id'] == data['id']:
                    goal = goals[i]
                    if 'delete' in data.keys():
                        if data['delete']:
                            goals.remove(goal)
                            instance.goals = goals
                            instance.save()
                            return instance
                    goals[i] = {
                        "id":goal['id'],
                        "desc":data.get('desc',goal['desc']),
                        "done":data.get('done',goal['done']),
                        "created":goal['created'],
                        "completed":data.get("completed",goal['completed'])
                    }
                    instance.goals = goals
                    instance.save()
                    return instance
        else:
            if data.get('desc') == None or data.get('created') == None:
                pass
            else:
                id = instance.goalsId
                instance.goals.append({
                    "id":id,
                    "desc":data.get('desc'),
                    "done":False,
                    "created":data.get("created"),
                    "completed":''                   
                })
            instance.goalsId +=1
            instance.save()
            return instance.goals[-1]
        
class ExerciseSerializer(serializers.ModelSerializer):
    class Meta:
        model = Exercise
        fields = '__all__'

    def create(self, validated_data):
        return self.Meta.model(**validated_data)

    def update(self,instance,validated_data):
        instance.name = validated_data.get('name', instance.name)
        instance.instructions = validated_data.get('instructions',instance.instructions)
        instance.desc = validated_data.get('desc',instance.desc)
        instance.save()
        return instance

class WorkoutSerializer(serializers.ModelSerializer):
    class Meta:
        model = Workout
        fields = '__all__'
    
    def create(self,validated_data):
        return self.Meta.model(**validated_data)
    
    def update(self,instance,validated_data):
        instance.name = validated_data.get('name', instance.name)
        pass