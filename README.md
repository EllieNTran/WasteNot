# 🥕 WasteNot

**WasteNot** is a mobile application designed to help households reduce food waste by intelligently identifying ingredients from fridge or pantry images and generating recipe suggestions using AI.  
It combines **computer vision** and **generative AI** to guide users to make the most of their available ingredients, promoting sustainable consumption.

---

## 📂 Repository Structure

This repository contains three main components:

```
WasteNot/
├── mobile-app/          # React Native mobile app (Expo)
│   ├── src/
│   │   ├── app/             # Expo Router navigation and screens
│   │   ├── assets/          # Images, icons, and fonts
│   │   ├── components/      # Reusable UI components
│   │   ├── constants/       # Theme and configuration
│   │   ├── contexts/        # React contexts (Auth, etc.)
│   │   ├── hooks/           # Custom React hooks
│   │   ├── lib/             # Database operations (Supabase)
│   │   ├── services/        # API client services
│   │   ├── types/           # TypeScript type definitions
│   │   └── utils/           # Utility functions
│   ├── package.json         # App dependencies
│   └── README.md            # Mobile app documentation
│
├── api/                 # Express.js API middleware layer
│   ├── src/
│   │   ├── server/
│   │   │   ├── app.ts           # Express app setup
│   │   │   ├── routes.ts        # API routes
│   │   │   └── controllers/     # Request handlers
│   │   ├── services/
│   │   │   ├── aiServices/      # AI service integrations
│   │   │   └── storage/         # Cloud storage operations
│   │   ├── connectors/          # External service connections
│   │   └── validation/          # Request validation schemas
│   ├── package.json             # API dependencies
│   └── tsconfig.json            # TypeScript configuration
│
├── ai-services/         # FastAPI backend for AI-powered services
│   ├── app/
│   │   ├── main.py              # FastAPI endpoints
│   │   ├── settings.py          # Environment configuration
│   │   ├── connectors/          # Cloud storage integrations
│   │   ├── models/              # Pydantic models
│   │   └── services/
│   │       ├── ingredient_detection.py  # Roboflow integration
│   │       ├── recipe_generation.py     # LangChain AI agent
│   │       ├── get_recipe_image.py      # Recipe image fetching
│   │       └── embeddings.py            # Vector embeddings
│   ├── requirements.txt         # Python dependencies
│   └── README.md                # Backend documentation
│
└── README.md            # This file
```

---

## 💡 Overview

### 🎯 **Goal**

Minimize household food waste by helping users discover meal ideas based on ingredients they already have.

### 🧠 **Core Features**

* 📸 **Ingredient Detection** — Users capture photos of their fridge or cupboard. A custom-trained **YOLO object detection model** (via Roboflow) identifies visible ingredients with 70%+ confidence.
* 🗂️ **Ingredient Management** — Track ingredients with expiry dates, quantities, and types. Filter by status (available, expired, used) and type (fruit, vegetable, dairy, meat).
* 🍳 **AI Recipe Generation** — A **LangChain-powered AI agent** using Google's Gemini models generates personalized recipes based on:
  * Available ingredients
  * Meal type (breakfast, lunch, dinner)
  * Cooking time preferences (quick, regular, long)
  * Dietary preferences and allergies
* 🖼️ **Recipe Images** — Automatically fetches recipe images from TheMealDB API based on recipe title and ingredients.
* 📝 **Recipe Storage** — Save generated recipes with ingredients, instructions, and cooking times.
* 🔍 **RAG-Enhanced Generation** — Uses vector similarity search to find similar recipes from a database of 2000+ examples for better recipe suggestions.
* 🌍 **Sustainability Impact** — Supports UN Sustainable Development Goals:
  * Goal 12: *Responsible Consumption and Production*
  * Goal 13: *Climate Action*

---

## ⚙️ Tech Stack

### **Mobile App (React Native)**
| Component           | Technology                                                |
| ------------------- | --------------------------------------------------------- |
| Framework           | React Native with Expo Router                             |
| State Management    | TanStack Query (React Query)                              |
| Database            | Supabase (PostgreSQL with pgvector)                       |
| Authentication      | Supabase Auth                                             |
| Storage             | Supabase Storage                                          |
| UI Components       | Custom components with TypeScript                         |
| Navigation          | Expo Router (file-based routing)                          |

### **API Layer (Express.js)**
| Component           | Technology                                                |
| ------------------- | --------------------------------------------------------- |
| Runtime             | Node.js with TypeScript                                   |
| Framework           | Express.js                                                |
| Logging             | Winston                                                   |
| Validation          | Custom middleware                                         |
| File Upload         | Multer                                                    |

### **AI Services (FastAPI)**
| Component           | Technology                                                |
| ------------------- | --------------------------------------------------------- |
| Framework           | FastAPI (Python)                                          |
| Object Detection    | Roboflow (YOLO-based custom model)                        |
| LLM                 | Google Gemini 2.5 Flash (via LangChain)                   |
| Embeddings          | Google Gemini Embedding Model (1536 dimensions)           |
| Vector Search       | Supabase pgvector                                         |
| Image Processing    | Inference SDK                                             |
| Recipe Images       | TheMealDB API                                             |
| Storage             | Supabase Storage                                          |

---

## 🔑 Key Features Implementation

### Ingredient Detection
- Custom YOLOv12 model
- 70% confidence threshold for accurate detection
- Automatic ingredient name extraction

### Recipe Generation
- RAG (Retrieval-Augmented Generation) with vector embeddings
- Context-aware recipe suggestions based on similar recipes
- Automatic image fetching for generated recipes

### Ingredient Management
- Full CRUD operations
- Expiry date tracking and alerts
- Status management (available, expired, used)
- Type categorization (fruit, vegetable, dairy, meat, etc.)
- Quantity tracking

---

## 🚀 Getting Started

### Prerequisites
- Node.js 18+
- Python 3.12+
- Expo CLI
- Supabase account
- Google Gemini API key
- Roboflow API key

### Quick Start

See individual README files in each directory for detailed setup instructions.

---

## 📄 License

This project is part of a Strategic Digital Leadership academic project at Queen Mary University of London.
