import openai
import os
from fastapi import APIRouter
from dotenv import load_dotenv
import asyncio
from src.models import PromptRequest
from fastapi.responses import StreamingResponse

load_dotenv()

OPENAI_API_KEY = os.getenv("OPENAI_API_KEY")

if not OPENAI_API_KEY:
    raise ValueError("Missing OpenAI API Key! Set the 'OPENAI_API_KEY' environment variable.")

client = openai.AsyncOpenAI(api_key=OPENAI_API_KEY)

router = APIRouter()


async def openai_stream(language: str, task: str):
    """
    Calls OpenAI's API and streams the response properly.
    """
    TEMPLATE = f"""You are an AI coding assistant. Generate {language} code that {task}.
    Please output in the following format:
    ### Code:
    <Insert your code here>

    ### Explanation:
    <Insert explanation here>
    Do not include any extra text.
    """
    try:
        # ✅ FIX: Properly await the OpenAI API call
        response = await client.chat.completions.create(
            model="gpt-3.5-turbo",
            messages=[{"role": "system", "content": TEMPLATE.format(language=language, task=task)}],
            temperature=0.7,
            max_tokens=2048,
            stream=True  # ✅ Enable streaming
        )

        async for chunk in response:
            content = chunk.choices[0].delta.content
            if content:
                yield content
                await asyncio.sleep(0)  # ✅ Yield control to the event loop

    except openai.APIConnectionError as e:
        yield f"OpenAI API connection error: {e}"
    except openai.RateLimitError as e:
        yield f"Rate limit exceeded: {e}"
    except openai.APIStatusError as e:
        yield f"OpenAI API error: {e}"
    except Exception as e:
        yield f"Unexpected error: {e}"
        
@router.post("/generate")
async def generate_code_api(request: PromptRequest):
    """
    API Endpoint to generate code using OpenAI's API.
    """
    return StreamingResponse(openai_stream(request.language, request.task), media_type="text/plain")
