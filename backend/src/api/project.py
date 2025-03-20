import openai
import os
from fastapi import APIRouter, HTTPException
from dotenv import load_dotenv
import asyncio
import json
from src.models import ProjectRequest
from fastapi.responses import JSONResponse

load_dotenv()

OPENAI_API_KEY = os.getenv("OPENAI_API_KEY")

if not OPENAI_API_KEY:
    raise ValueError("Missing OpenAI API Key! Set the 'OPENAI_API_KEY' environment variable.")

client = openai.AsyncOpenAI(api_key=OPENAI_API_KEY)

router = APIRouter()


async def make_project(request: ProjectRequest):
    """
    Generates a full React project with dynamic files using OpenAI.
    """
    prompt = f"""
    You are an advanced AI assistant that generates **React projects**.
    Follow best practices for TypeScript and React.

    ### **Project Requirements**
    - Use **React with TypeScript**.
    - Ensure all files are **properly structured**.
    - Use **functional components** with hooks where needed.
    - If the project needs **global state**, create a `context/` folder with React Context API.
    - If the project needs **API calls**, create a `services/` folder with API handlers.
    - If the project has **multiple pages**, create a `pages/` folder and use React Router.
    - Avoid inline styles, prefer `styles/` for CSS files.

    ### **Project Description**
    {request.description}

    ### **Expected Output (JSON Format)**
    {{
      "files": [
        // ✅ Entry point
        {{"name": "src/index.tsx", "content": "import React from 'react';\\nimport ReactDOM from 'react-dom/client';\\nimport App from './App';\\nReactDOM.createRoot(document.getElementById('root')!).render(<App />);"}},

        // ✅ Main component
        {{"name": "src/App.tsx", "content": "import React from 'react';\\nexport default function App() {{ return <h1>Hello React!</h1>; }}"}},

        // ✅ Styles
        {{"name": "src/styles/global.css", "content": "body {{ font-family: Arial, sans-serif; background: #f4f4f4; }} h1 {{ color: #333; }}" }},

        // ✅ Example reusable component
        {{"name": "src/components/Button.tsx", "content": "import React from 'react';\\nexport default function Button() {{ return <button className='btn'>Click Me</button>; }}"}},

        // ✅ Dynamic generation based on project complexity
        {{"name": "src/pages/Home.tsx", "content": "import React from 'react';\\nexport default function Home() {{ return <h1>Home Page</h1>; }}"}},
        {{"name": "src/context/AppContext.tsx", "content": "import {{ createContext }} from 'react';\\nexport const AppContext = createContext(null);"}}
      ]
    }}

    - Generate files dynamically based on the project's needs.
    - **DO NOT limit to predefined files**, create what is needed for the project.
    - Ensure **proper imports** in each file.
    - **DO NOT** include extra explanations, markdown artifacts, or placeholder text.
    """


    try:
        response = await client.chat.completions.create(
            model="gpt-3.5-turbo",
            messages=[{"role": "system", "content": prompt}],
            temperature=0,
            max_tokens=4096,
            stream=True
        )

        project_data = ""
        async for chunk in response:
            if chunk.choices[0].delta.content:
                project_data += chunk.choices[0].delta.content
                await asyncio.sleep(0)  # ✅ Yield control to the event loop

        # ✅ Ensure JSON Parsing happens only after full response is received
        return json.loads(project_data)

    except openai.APIConnectionError as e:
        raise HTTPException(status_code=500, detail=f"OpenAI API connection error: {e}")
    except openai.RateLimitError as e:
        raise HTTPException(status_code=429, detail=f"Rate limit exceeded: {e}")
    except openai.APIStatusError as e:
        raise HTTPException(status_code=500, detail=f"OpenAI API error: {e}")
    except json.JSONDecodeError:
        raise HTTPException(status_code=500, detail="Failed to parse AI response into JSON.")
    except Exception as e:
        raise HTTPException(status_code=500, detail=f"Unexpected error: {e}")

@router.post("/project")
async def generate_code_api(request: ProjectRequest):
    """
    API Endpoint to generate code using OpenAI's API.
    """
    project = await make_project(request)

    if "error" in project:
        raise HTTPException(status_code=500, detail=project["error"])

    return JSONResponse(content=project)