from fastapi import FastAPI, Depends, HTTPException, status
from fastapi.middleware.cors import CORSMiddleware
from .auth.controller import auth_router
from .user.controller import user_router
from .exercises.controller import exercise_router

app = FastAPI()

origins = [
    "http://localhost:3000",  
    "https://yourfrontenddomain.com",
]

app.add_middleware(
    CORSMiddleware,
    allow_origins=origins,  
    allow_credentials=True,
    allow_methods=["*"],  
    allow_headers=["*"],  
)

app.include_router(auth_router)
app.include_router(user_router)
app.include_router(exercise_router)