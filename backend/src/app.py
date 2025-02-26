from fastapi import FastAPI
from fastapi.middleware.cors import CORSMiddleware
from fastapi.responses import StreamingResponse
from pydantic import BaseModel
import asyncio
from langchain_community.llms import Ollama
from langchain.chains import LLMChain
from langchain.prompts import PromptTemplate

app = FastAPI()

# CORS middleware hozzáadása
app.add_middleware(
    CORSMiddleware,
    allow_origins=["*"],  # Engedélyezett domainek (pl. "http://localhost:3000")
    allow_credentials=True,
    allow_methods=["*"],  # Engedélyezi az összes HTTP metódust (pl. GET, POST, OPTIONS)
    allow_headers=["*"],  # Engedélyezi az összes fejlécet
)

class PromptRequest(BaseModel):
    language: str
    task: str

# Ollama LLM inicializálása
llm = Ollama(model="deepseek-coder:6.7b")

# Prompt template
template = """Generate {language} code, that {task}."""
prompt_template = PromptTemplate(input_variables=["language", "task"], template=template)

# Lánc létrehozása
code_chain = LLMChain(llm=llm, prompt=prompt_template)

async def generate_code_stream(language: str, task: str):
    """Aszinkron generátor, amely streameli a LangChain válaszát"""
    async for chunk in llm.astream(prompt_template.format(language=language, task=task)):
        yield chunk  # Küldjük a következő darabot a frontendnek
        await asyncio.sleep(0)  # Nem blokkolja az event loopot

@app.post("/generate")
async def generate_code_api(request: PromptRequest):
    """Streaming API végpont"""
    return StreamingResponse(generate_code_stream(request.language, request.task), media_type="text/plain")

