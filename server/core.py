from langchain_community.document_loaders import PyPDFLoader
from langchain_community.vectorstores import Chroma
from langchain_community.embeddings import SentenceTransformerEmbeddings
from langchain.text_splitter import RecursiveCharacterTextSplitter
from langchain_community.llms import Ollama
from langchain.chains import RetrievalQA

DB_PATH = "vectorstores/db/"

def process_document(file_path: str):
    print(f"Loading document: {file_path}")
    loader = PyPDFLoader(file_path)
    documents = loader.load()
    print("Splitting document into chunks...")
    text_splitter = RecursiveCharacterTextSplitter(chunk_size=1000, chunk_overlap=100)
    texts = text_splitter.split_documents(documents)
    print("Creating embeddings...")
    embedding_function = SentenceTransformerEmbeddings(model_name="all-MiniLM-L6-v2")
    print("Creating and saving vector store...")
    db = Chroma.from_documents(
        texts,
        embedding_function,
        persist_directory=DB_PATH
    )
    print("Vector store created successfully!")
    return True

def get_qa_chain():
    embedding_function = SentenceTransformerEmbeddings(model_name="all-MiniLM-L6-v2")
    db = Chroma(
        persist_directory=DB_PATH, 
        embedding_function=embedding_function
    )
    retriever = db.as_retriever()
    llm = Ollama(model="phi3:mini", temperature=0)
    qa_chain = RetrievalQA.from_chain_type(
        llm=llm,
        chain_type="stuff",
        retriever=retriever,
        return_source_documents=True
    )
    return qa_chain