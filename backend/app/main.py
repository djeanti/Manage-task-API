# app/main.py
# FastAPI application entry point
# Configures CORS and registers routers

from fastapi import FastAPI
from fastapi.middleware.cors import CORSMiddleware
from app.database import Base, engine
from app.routers import tasks

# Create database tables if they don't exist
Base.metadata.create_all(bind=engine)

# Initialize FastAPI application
app = FastAPI()

# CORS configuration for React frontend
origins = [
    "http://localhost:3000",  # React development server
]

app.add_middleware(
    CORSMiddleware,
    allow_origins=origins,
    allow_credentials=True,
    allow_methods=["*"],  # Allow all HTTP methods
    allow_headers=["*"],  # Allow all headers
)

# Register task router
app.include_router(tasks.router)