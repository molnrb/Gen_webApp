from pydantic import BaseModel

class ModifyRequest(BaseModel):
    feedback: str
    code: str


# ✅ Define request schema
class PromptRequest(BaseModel):
    language: str
    task: str
    
class ProjectRequest(BaseModel):
    description: str
    project_type: str
