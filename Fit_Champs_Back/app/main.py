from contextlib import asynccontextmanager
import asyncio

from fastapi import FastAPI
from fastapi.middleware.cors import CORSMiddleware

from .crons import schedule_cron_jobs
from .auth.controller import auth_router
from .user.controller import user_router
from .exercises.controller import exercise_router
from .rank.controller import rank_router

@asynccontextmanager
async def lifespan(app: FastAPI):
    loop = asyncio.get_event_loop()
    await loop.run_in_executor(None, schedule_cron_jobs)

    yield

app = FastAPI(lifespan=lifespan)

app.add_middleware(
    CORSMiddleware,
    allow_origins=["*"],  
    allow_credentials=True,
    allow_methods=["*"],  
    allow_headers=["*"],  
)

app.include_router(auth_router)
app.include_router(user_router)
app.include_router(exercise_router)
app.include_router(rank_router)