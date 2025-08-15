
````markdown
# Synapse

**Transforming documents into intelligent conversations through advanced AI.**

---

## Overview

Synapse represents a sophisticated approach to document intelligence, enabling natural language interaction with any PDF through a carefully architected Retrieval-Augmented Generation (RAG) system. This full-stack application demonstrates the seamless integration of modern AI technologies with enterprise-grade development practices.

The system processes documents through an intelligent pipeline, creating contextual embeddings that enable precise, source-attributed responses to complex queries. Built with scalability and maintainability in mind, Synapse showcases professional-grade implementation of cutting-edge AI capabilities.

---

## Core Capabilities

- **Document Intelligence** - Advanced PDF processing with intelligent chunking and semantic understanding, transforming static content into queryable knowledge bases.

- **Contextual AI Responses** - Leverages state-of-the-art language models through a sophisticated RAG pipeline, ensuring responses are both accurate and grounded in source material.

- **Source Transparency** - Every response includes precise citations and source attribution, maintaining full traceability and trust in the AI-generated content.

- **Production-Ready Architecture** - Clean separation of concerns with a robust FastAPI backend and modern React frontend, designed for scalability and maintainability.

---

## Technical Foundation

### Backend Infrastructure
- **FastAPI** - High-performance async API framework
- **LangChain** - Advanced orchestration for AI workflows
- **ChromaDB** - Efficient vector storage and retrieval
- **Ollama** - Local LLM inference engine

### Frontend Experience
- **Next.js** - React-based framework with SSR capabilities
- **Tailwind CSS** - Utility-first styling framework
- **TypeScript** - Type-safe JavaScript development

---

## Quick Start

### Prerequisites

Ensure you have the following installed:
- Node.js (v18 or later)
- Python (v3.10 or later)
- Ollama runtime environment

### Installation

**1. Repository Setup**
```bash
git clone [https://github.com/your-username/synapse.git](https://github.com/your-username/synapse.git)
cd synapse
````

**2. Backend Configuration**

```bash
cd server
python -m venv venv
source venv/bin/activate  # On Windows: .\venv\Scripts\activate
pip install -r requirements.txt
```

**3. Frontend Setup**

```bash
cd ../client
npm install
```

**4. AI Model Preparation (Manual Method)**
This method is recommended for reliability on all network connections.

A. **Download the Model File**: Download the `phi-3-mini` GGUF file from Hugging Face.

  - **Link:** [**Download `phi-3-mini-4k-instruct-q4.gguf` (3.92 GB)**](https://www.google.com/search?q=https://huggingface.co/microsoft/Phi-3-mini-4k-instruct-gguf/resolve/main/Phi-3-mini-4k-instruct-q4.gguf%3Fdownload%3Dtrue)
  - Save the file to a memorable location (e.g., your `Downloads` folder).

B. **Create a `Modelfile`**: In the root `synapse` directory, create a file named `phi3.Modelfile`. Add the following line, replacing the path with the actual path to your downloaded file.

```
FROM C:\Users\YourUsername\Downloads\Phi-3-mini-4k-instruct-q4.gguf
```

C. **Import the Model into Ollama**: Run the following command from the root `synapse` directory to create a local model named `phi3-local`.

```sh
ollama create phi3-local -f phi3.Modelfile
```

D. **Verify Backend Configuration**: Ensure that in `server/core.py`, the `Ollama` instance is configured to use the newly created local model.

```python
llm = Ollama(model="phi3-local", temperature=0)
```

### Launch Sequence

**Backend Service**

```bash
cd server
uvicorn main:app --reload
# Service available at http://localhost:8000
```

**Frontend Application**

```bash
cd client
npm run dev
# Application available at http://localhost:3000
```

-----

## Architecture

```
synapse/
├── server/           # AI engine and API layer
│   ├── main.py       # FastAPI application entry
│   ├── core.py       # RAG pipeline implementation
│   └── ...
├── client/           # User interface and experience
│   ├── app/
│   │   └── page.tsx  # Main application component
│   └── ...
└── README.md
```

-----

## Development Notes

This project demonstrates modern AI application development practices, including:

  - **Modular Architecture**: Clear separation between AI logic and user interface
  - **Type Safety**: Comprehensive typing across both Python and TypeScript codebases
  - **Async Processing**: Non-blocking operations for optimal performance
  - **Vector Operations**: Efficient similarity search and retrieval mechanisms
  - **Professional Tooling**: Industry-standard development and deployment practices

-----

*Built with precision, designed for impact.*

```
```