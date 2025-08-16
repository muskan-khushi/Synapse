<div align="center">

# ✨ Synapse  
*Where Documents Come Alive* 🌌  

[![License: MIT](https://img.shields.io/badge/License-MIT-gold.svg?style=for-the-badge&labelColor=1a1a1a)](https://opensource.org/licenses/MIT)
[![TypeScript](https://img.shields.io/badge/Frontend-Next.js-3178C6?style=for-the-badge&logo=next.js&logoColor=white&labelColor=1a1a1a)](https://nextjs.org/)
[![Python](https://img.shields.io/badge/Backend-FastAPI-009688?style=for-the-badge&logo=fastapi&logoColor=white&labelColor=1a1a1a)](https://fastapi.tiangolo.com/)
[![AI](https://img.shields.io/badge/AI-RAG%20Pipeline-magenta?style=for-the-badge&logo=openai&logoColor=white&labelColor=1a1a1a)](#)

> **The Art of Intelligent Document Conversation**  
> Static PDFs → Living Dialogues ✨

</div>

---

## 🌌 Vision

What if your documents could **speak back**?  
Synapse transforms static files into **conversational companions**.  

Instead of scrolling endlessly, you ask questions like you would to a colleague:  
- *“Summarize section 2 in three lines.”*  
- *“Compare results from table 3 with the conclusion.”*  
- *“What assumptions are hidden in the methodology?”*  

Behind this, the system runs **Retrieval-Augmented Generation (RAG)**:  
1. Splits the document into small **chunks** 📄  
2. Embeds them into a **vector space** 🌐 (where meaning is geometry)  
3. Retrieves the **closest knowledge** for your query 🔍  
4. Feeds both **your question + retrieved chunks** into an **LLM** 🧠  

The answer is **grounded, contextual, and transparent**.  
Not AI hallucination — but **AI amplified by retrieval**.

---

## 🌟 Features

- 📄 **PDF Uploads** → Any report, research, policy, or notes.  
- 💬 **Natural Language Q&A** → Just ask, no syntax needed.  
- 🔍 **Source Transparency** → Exact page + snippet citations.  
- ⚡ **Local & Fast** → Privacy-first, no external API calls.  
- 🎨 **Elegant UI** → Next.js + Tailwind design, sleek & minimal.  
- 🧠 **Configurable AI** → Swap models, tweak chunk size, tune temperature.  

---

## 🧠 Technology Craftsmanship

| **Layer**           | **What We Use**                                                                                                                                                              | **Why It Matters**                                                                                   |
|----------------------|------------------------------------------------------------------------------------------------------------------------------------------------------------------------------|-------------------------------------------------------------------------------------------------------|
| **Frontend** 🎨      | Next.js · React · TypeScript · TailwindCSS                                                                                                                                   | Smooth, modern, responsive UI.                                                                      |
| **Backend** 🔧       | FastAPI (Python)                                                                                                                                                             | Lightweight, async API server for handling queries + embeddings.                                     |
| **AI Core** 🧠       | LangChain · Ollama · Phi-3 / LLaMA models                                                                                                                                   | Orchestrates retrieval + generation. Models run locally via Ollama.                                  |
| **Vector DB** 📊     | ChromaDB                                                                                                                                                                     | Stores embeddings of document chunks, enabling fast semantic search.                                 |
| **Embeddings** 🔮    | Sentence Transformers / Instructor models                                                                                                                                   | Converts text → vectors in high-dimensional space (meaningful proximity).                            |

---

## 🏛️ Architecture

Here’s how Synapse works under the hood:  

```
        ┌──────────────┐
        │   PDF Upload │ 📄
        └───────┬──────┘
                │
        ┌───────▼─────────┐
        │   Preprocessor  │ ✂️
        │ (chunk + clean) │
        └───────┬─────────┘
                │
        ┌───────▼─────────┐
        │  Embeddings     │ 🔮
        │ (Vectorization) │
        └───────┬─────────┘
                │
        ┌───────▼─────────┐
        │  Vector DB      │ 📊
        │   (Chroma)      │
        └───────┬─────────┘
                │
        ┌───────▼─────────┐
 Query  │   Retriever     │ 🔍
  💬 ──▶│ (find relevant) │
        └───────┬─────────┘
                │
        ┌───────▼─────────┐
        │   LLM Engine    │ 🧠
        │ (Phi-3 / LLaMA) │
        └───────┬─────────┘
                │
        ┌───────▼─────────┐
        │  Response +     │ ✨
        │  Citations      │
        └─────────────────┘
```

---

## 🚀 Quickstart

### **1. Prerequisites**
- Node.js ≥ 18  
- Python ≥ 3.10  
- [Ollama](https://ollama.com/) installed  
- 4GB+ RAM  

---

### **2. Clone & Setup**
```bash
git clone https://github.com/your-username/synapse.git
cd synapse
```

#### Backend
```bash
cd server
python -m venv venv
source venv/bin/activate   # (Mac/Linux)
.\venv\Scripts\activate    # (Windows)

pip install -r requirements.txt
```

#### Frontend
```bash
cd ../client
npm install
```

---

### **3. AI Model Setup**

#### Option A: Custom Local Model (Recommended)
```bash
# Download Phi-3 Mini (3.9 GB) from HuggingFace
cp phi3.Modelfile.example phi3.Modelfile
# Update file path to gguf model
ollama create phi3-local -f phi3.Modelfile
```

#### Option B: Quick Start
```bash
ollama pull phi3:mini
```

---

### **4. Run Synapse**

**Backend (Terminal 1):**
```bash
cd server
uvicorn main:app --reload --port 8000
```

**Frontend (Terminal 2):**
```bash
cd client
npm run dev
```

🌐 Visit → [http://localhost:3000](http://localhost:3000)  

---

## 🎯 Usage Examples

Ask your documents like a friend:  
- “Summarize this in 5 bullet points.”  
- “Which section mentions neural networks?”  
- “Explain section 4 as if I’m 12 years old.”  
- “Compare methodology with conclusion.”  

Every answer → with **citations & context** 🔍.  

---

## 🔧 Configuration

Tune your AI in `server/.env`:

```env
MODEL_NAME=phi3-local
OLLAMA_BASE_URL=http://localhost:11434
CHUNK_SIZE=1000
TEMPERATURE=0.1
```

- `CHUNK_SIZE`: how much text per vector slice  
- `TEMPERATURE`: creativity of responses (0 = factual, 1 = creative)  

---

## 🌌 Philosophy

Synapse is not just code — it’s **a belief**.  
That documents are meant to be **alive, not static**.  
That **AI should be transparent, not black-boxed**.  
That embeddings + neural nets can feel almost *poetic* in how they connect meaning across dimensions.  

It is research, but it is also art.  
A bridge between **mathematical rigor** and **dreamy interaction** ✨.  

---

## 📜 License

MIT License — free to use, remix, and explore.  

---

<div align="center">

✨ Crafted with curiosity & code by Muskan ✨  
*Turning documents into conversations* 🌸  

![Stars](https://img.shields.io/github/stars/your-username/synapse?style=social)

</div>
