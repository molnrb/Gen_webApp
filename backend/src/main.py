from fastapi import FastAPI
from fastapi.middleware.cors import CORSMiddleware
from src.api import modify
from src.api import generate

# ✅ Initialize FastAPI
app = FastAPI()

# ✅ Enable CORS
app.add_middleware(
    CORSMiddleware,
    allow_origins=["*"],
    allow_credentials=True,
    allow_methods=["*"],
    allow_headers=["*"],
)

# ✅ Include routers
app.include_router(modify.router)
app.include_router(generate.router)
