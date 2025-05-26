from collections import defaultdict
from typing import List
from datetime import datetime, timedelta

from ..database.models import Exercise

def group_exercises_by_muscle(exercises: List[Exercise]):
    grouped = defaultdict(list)
    
    for exercise in exercises:
        muscle = exercise.muscular_group
        
        cleaned_exercise = {
            'id': exercise.id,
            'submuscular_group': exercise.submuscular_group,
            'exercise_name': exercise.exercise_name
        }
        grouped[muscle].append(cleaned_exercise)
    
    return dict(grouped)

def get_week_bounds(date_input):
    if isinstance(date_input, str):
        date_input = datetime.strptime(date_input, "%Y-%m-%d").date()
    
    weekday = date_input.weekday()
    
    monday = date_input - timedelta(days=weekday)
    sunday = date_input + timedelta(days=(6 - weekday))
    
    return monday, sunday

