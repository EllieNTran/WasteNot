# 🥕 WasteNot

**WasteNot** is a mobile application designed to help households reduce food waste by intelligently identifying ingredients from fridge or cupboard images and generating recipe suggestions using AI.  
It combines **computer vision** and **generative AI** to make meal planning simple, sustainable, and cost-effective.

---

## 📂 Repository Structure

This repository contains two main components:

```
WasteNot/
├── mobile-app/          # React Native mobile app (Expo)
│   ├── app/             # App layout and navigation
│   ├── assets/          # Images and static assets
│   ├── components/      # UI components
│   ├── constants/       # Theme and config
│   ├── hooks/           # Custom React hooks
│   ├── scripts/         # Utility scripts
│   ├── .vscode/         # Editor settings
│   ├── package.json     # App dependencies
│   └── README.md        # Mobile app documentation
│
├── ai-services/         # FastAPI-based backend for AI-powered processing
│   ├── app/
│   │   ├── main.py              # API endpoints
│   │   ├── settings.py          # Environment/config
│   │   ├── connectors/          # GCS and other integrations
│   │   ├── models/              # Pydantic models for requests/outputs
│   │   └── services/            # Ingredient detection & recipe generation logic
│   ├── requirements.txt         # Python dependencies
│   └── README.md                # Backend documentation
│
├── README.md            # This file
```

---

## 💡 Overview

### 🎯 **Goal**

Minimize household food waste by helping users discover meal ideas based on ingredients they already have.

### 🧠 **Core Features**

* 📸 **Ingredient Detection** — Users upload a photo of their fridge or cupboard. A custom-trained **object detection model** (Roboflow) identifies visible ingredients.
* 🍳 **AI Recipe Generation** — A **Large Language Model (LLM)** (via OpenAI API) generates recipes tailored to available ingredients and dietary preferences.
* 🧾 **Ingredient Tracking** — Future versions may include expiry tracking and smart shopping list generation.
* 🌍 **Sustainability Impact** — Supports UN Sustainable Development Goals:
  * Goal 12: *Responsible Consumption and Production*
  * Goal 13: *Climate Action*

---

## ⚙️ Tech Stack

| Component      | Technology                                                                 |
| -------------- | -------------------------------------------------------------------------- |
| **Mobile App** | React Native (Expo)                                                        |
| **Backend**    | FastAPI (Python)                                                           |
| **AI Models**  | Roboflow (YOLO/EfficientDet) for object detection, OpenAI GPT for recipes  |
| **Storage**    | Google Cloud Storage (user images)                                         |
| **Hosting**    | Dockerized microservices (optionally on GCP / AWS)                         |

---

## 🧩 System Architecture

```
[Mobile App] <--> [AI Services API]
       |                   |
       |                   ├── Ingredient Detection (Roboflow)
       |                   ├── Recipe Generation (LLM via OpenAI)
       |                   └── Cloud Storage (GCS)
```

* **Mobile App**: Handles image capture/upload, ingredient selection, and displays generated recipes.
* **AI Services**: Processes images, identifies ingredients, and queries the LLM for recipe creation.
* **Cloud Storage**: Stores user-uploaded images.

---

## 🚀 Getting Started

See the individual `README.md` files in `mobile-app/` and `ai-services/` for setup instructions.
