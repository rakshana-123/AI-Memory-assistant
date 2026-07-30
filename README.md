\# AI Memory Assistant



An enterprise-grade, multi-modal AI-powered learning and productivity platform designed to transform how students and professionals process, retain, and manage knowledge. 



The platform seamlessly combines advanced retrieval-augmented generation (RAG), vector similarity search, optical character recognition (OCR), speech-to-text processing, and graph-based entity modeling.



\---



\## 🚀 Key Capabilities



\* \*\*Multi-Modal Content Processing\*\*: Ingest and analyze text notes, audio recordings, images, video frames, and scanned PDFs.

\* \*\*Semantic Search \& RAG\*\*: Context-aware AI chat driven by vector search over user memories using `BGE-M3` and `Qwen3`.

\* \*\*Student Workflow Module\*\*: Automated study planning, flashcard generation, quiz generation, and exam tracking.

\* \*\*Professional Workflow Module\*\*: Automated meeting summarization, action-item extraction, report generation, and daily briefings.

\* \*\*Knowledge Graph Engine\*\*: Entity and relationship tracking powered by Neo4j for deep context discovery and recommendations.



\---



\## 🛠️ Technology Stack



| Layer | Technologies \& Models |

| :--- | :--- |

| \*\*Frontend\*\* | React 18+, Next.js, TypeScript, Tailwind CSS, Redux |

| \*\*Backend Services\*\* | Python 3.11 (FastAPI), Node.js (Express Gateway) |

| \*\*Databases\*\* | PostgreSQL (Relational), Qdrant (Vector DB), Neo4j (Graph DB), Redis (Cache)\[cite: 1] |

| \*\*Core AI Models\*\* | Qwen3 8B (LLM), BGE-M3 (Embeddings), BGE-Reranker-v2\[cite: 1] |

| \*\*Vision \& Speech\*\* | Whisper Large V3 (Speech-to-Text), Qwen2.5-VL (Vision), PaddleOCR (OCR)\[cite: 1] |

| \*\*Infrastructure\*\* | Docker, Docker Compose, Kubernetes, Prometheus, Grafana\[cite: 1] |



\---



\## 📁 Repository Structure



```text

AI-Memory-assistant/

├── backend/               # FastAPI microservices \& Python processing pipelines

├── docs/                  # System design, architecture, and API documentation

│   ├── API.md

│   ├── Architecture.md

│   ├── Database.md

│   ├── Project\_Vision.md

│   └── Roadmap.md

├── frontend/              # Next.js UI application \& components

├── .gitignore             # Git ignore rules

└── README.md              # Project root documentation

