# ✨ **Synapse**
*Where Documents Come Alive*

<div align="center">

[![License: MIT](https://img.shields.io/badge/License-MIT-gold.svg?style=for-the-badge&labelColor=1a1a1a)](https://opensource.org/licenses/MIT)
[![TypeScript](https://img.shields.io/badge/TypeScript-3178C6?style=for-the-badge&logo=typescript&logoColor=white&labelColor=1a1a1a)](https://www.typescriptlang.org/)
[![Python](https://img.shields.io/badge/Python-FFD43B?style=for-the-badge&logo=python&logoColor=1a1a1a&labelColor=1a1a1a)](https://www.python.org/)
[![FastAPI](https://img.shields.io/badge/FastAPI-009688?style=for-the-badge&logo=fastapi&logoColor=white&labelColor=1a1a1a)](https://fastapi.tiangolo.com/)

**The Art of Intelligent Document Conversation**

*Transforming static PDFs into dynamic dialogues through sophisticated AI*

</div>

---

## 🌟 **The Vision**

Synapse represents the evolution of document interaction—where the traditional boundaries between reader and content dissolve into fluid, intelligent conversation. Every PDF becomes a knowledgeable companion, ready to discuss, explain, and illuminate its contents with the precision of a scholar and the accessibility of a friend.

Built on cutting-edge Retrieval-Augmented Generation technology, Synapse doesn't just process documents—it understands them, contextualizes them, and makes them conversational.

---

## 💫 **Distinctive Capabilities**

### 🧠 **Intelligent Document Processing**
Advanced semantic chunking transforms your PDFs into contextually-aware knowledge graphs, preserving meaning while enabling lightning-fast retrieval.

### 💬 **Natural Conversation Flow**
Experience document interaction reimagined—ask questions as naturally as you would speak to a colleague who has thoroughly studied your material.

### 🔍 **Precision Source Attribution**
Every insight is meticulously traced back to its origin, with exact page references and contextual snippets that ensure complete transparency.

### ⚡ **Enterprise-Grade Performance**
Architected for scale with clean separation of concerns, async processing, and production-ready deployment patterns.

---

## 🎨 **Technology Craftsmanship**

*Powered by a carefully curated stack of premium technologies*

| **Domain** | **Excellence** |
|:-----------|:---------------|
| **Frontend Artistry** | ![Next.js](https://img.shields.io/badge/Next.js-000000?style=flat-square&logo=next.js&logoColor=white) ![React](https://img.shields.io/badge/React-61DAFB?style=flat-square&logo=react&logoColor=black) ![TypeScript](https://img.shields.io/badge/TypeScript-3178C6?style=flat-square&logo=typescript&logoColor=white) ![Tailwind](https://img.shields.io/badge/Tailwind-38B2AC?style=flat-square&logo=tailwind-css&logoColor=white) |
| **Backend Mastery** | ![FastAPI](https://img.shields.io/badge/FastAPI-009688?style=flat-square&logo=fastapi&logoColor=white) ![Python](https://img.shields.io/badge/Python-FFD43B?style=flat-square&logo=python&logoColor=black) |
| **AI Intelligence** | ![LangChain](https://img.shields.io/badge/LangChain-FF6B6B?style=flat-square) ![Ollama](https://img.shields.io/badge/Ollama-4A90E2?style=flat-square) ![ChromaDB](https://img.shields.io/badge/ChromaDB-FF6B35?style=flat-square) |

---

## 🚀 **Elegant Installation**

### **Prerequisites**
- Node.js 18+ (LTS recommended)
- Python 3.10+
- Ollama runtime
- 4GB+ available RAM

### **🎯 Step 1: Acquire the Source**
```bash
git clone https://github.com/your-username/synapse.git
cd synapse
```

### **🐍 Step 2: Backend Preparation**
```bash
cd server
python -m venv venv
source venv/bin/activate  # Windows: venv\Scripts\activate
pip install -r requirements.txt
```

### **⚛️ Step 3: Frontend Configuration**
```bash
cd ../client
npm install
```

### **🧠 Step 4: AI Model Setup**

**Recommended Approach** *(Most Reliable)*
```bash
# 1. Download Phi-3 Mini (3.92 GB)
# Visit: https://huggingface.co/microsoft/Phi-3-mini-4k-instruct-gguf
# Download: Phi-3-mini-4k-instruct-q4.gguf

# 2. Configure your model
cp phi3.Modelfile.example phi3.Modelfile
# Edit phi3.Modelfile with absolute path to downloaded model

# 3. Create local model
ollama create phi3-local -f phi3.Modelfile
```

**Alternative Quick Setup**
```bash
ollama pull phi3:mini
# Update server/core.py to use "phi3:mini" instead of "phi3-local"
```

### **🌟 Step 5: Launch Experience**

**Backend Service** *(Terminal 1)*
```bash
cd server
source venv/bin/activate
uvicorn main:app --reload --port 8000
```

**Frontend Application** *(Terminal 2)*
```bash
cd client
npm run dev
```

Navigate to `http://localhost:3000` and witness intelligence unfold.

---

## 🏛️ **Architecture Overview**

```
synapse/
├── 🎨 client/                    # Next.js Frontend Excellence
│   ├── app/                      # Application core
│   ├── components/               # Reusable UI elements
│   └── lib/                      # Utility functions
├── 🔧 server/                    # FastAPI Backend Engine
│   ├── main.py                   # API orchestration
│   ├── core.py                   # RAG implementation
│   └── models/                   # Data structures
├── 📚 docs/                      # Documentation
└── 🧪 tests/                     # Quality assurance
```

---

## 🎯 **Experience Patterns**

### **Document Upload**
Drag and drop your PDF or browse to select. Watch as Synapse intelligently processes your content with a beautiful progress indicator.

### **Intelligent Querying**
- *"What are the key findings in this research?"*
- *"Explain the methodology used in section 3"*
- *"Compare the conclusions with the introduction"*
- *"Summarize this document in bullet points"*

### **Source Verification**
Each response includes precise page citations and relevant excerpts, ensuring you can verify and explore further with confidence.

---

## 🔧 **Advanced Configuration**

Fine-tune your Synapse experience through environment variables:

```env
# server/.env
OLLAMA_BASE_URL=http://localhost:11434
MODEL_NAME=phi3-local
CHUNK_SIZE=1000
TEMPERATURE=0.1
```

---

## 🎭 **Philosophy & Credits**

Synapse embodies the belief that technology should be both powerful and beautiful. We've crafted every component with attention to detail, from the elegant user interface to the sophisticated AI pipeline.

**Acknowledgments**: Built with appreciation for the open-source community and the brilliant minds behind LangChain, FastAPI, Next.js, and the Phi-3 model.

---

## 📜 **License**

MIT License - Crafted for sharing, building, and innovation.

---

<div align="center">

**✨ Crafted with Precision • Designed for Intelligence • Built for the Future ✨**

*Experience the sophisticated art of document conversation*

![GitHub Stars](https://img.shields.io/github/stars/your-username/synapse?style=social)

</div>