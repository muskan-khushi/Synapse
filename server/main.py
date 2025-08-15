from fastapi import FastAPI, UploadFile, File, HTTPException
from fastapi.middleware.cors import CORSMiddleware
from pydantic import BaseModel
import os
import shutil
# Make sure to import from your core.py file
from core import process_document, get_qa_chain

app = FastAPI(
    title="Synapse API",
    description="An API for chatting with your documents.",
    version="1.0.0"
)

app.add_middleware(
    CORSMiddleware,
    allow_origins=["*"], 
    allow_credentials=True,
    allow_methods=["*"], 
    allow_headers=["*"], 
)

UPLOAD_DIR = "uploads"
os.makedirs(UPLOAD_DIR, exist_ok=True)

@app.get("/")
def read_root():
    return {"message": "Welcome to the RAG App API!"}

@app.post("/upload-document/")
async def upload_document(file: UploadFile = File(...)):
    if file.content_type != "application/pdf":
        raise HTTPException(status_code=400, detail="Only PDF files are allowed.")

    file_path = os.path.join(UPLOAD_DIR, file.filename)

    try:
        with open(file_path, "wb") as buffer:
            shutil.copyfileobj(file.file, buffer)
        process_document(file_path=file_path)
    except Exception as e:
        raise HTTPException(status_code=500, detail=f"An error occurred: {e}")
    finally:
        if os.path.exists(file_path):
            os.remove(file_path)

    return {"status": "success", "message": f"Document '{file.filename}' processed successfully."}

class QueryRequest(BaseModel):
    query: str

@app.post("/query/")
async def query_document(request: QueryRequest):
    try:
        qa_chain = get_qa_chain()
        response = qa_chain({"query": request.query})
        answer = response.get("result")
        source_documents = response.get("source_documents", [])
        sources = []
        if source_documents:
            for doc in source_documents:
                sources.append({
                    "source": doc.metadata.get('source', 'N/A'),
                    "page_content": doc.page_content[:200] + "..." 
                })
        return {"answer": answer, "sources": sources}
    except Exception as e:
        raise HTTPException(status_code=500, detail=f"An error occurred: {e}")
