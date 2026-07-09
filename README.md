
# English Learning Platform

A full-stack English learning platform built from scanned English textbooks.

The project imports textbook content extracted by **MinerU**, converts it into a structured learning model, stores it in **PostgreSQL**, and serves it through a **Go backend** and a **Next.js frontend**.

The long-term goal is to provide a Duolingo-style learning experience while preserving the original textbook structure (Lessons → Units → Sections → Exercises).

---

# Features

* Import English books extracted with MinerU
* Automatic lesson parsing
* Automatic unit detection
* Automatic section detection
* Dialogue extraction
* Vocabulary extraction
* Grammar extraction
* Pronunciation extraction
* Exercise extraction
* Media extraction
* PostgreSQL storage
* REST API
* React / Next.js frontend
* Progress tracking
* Review mode

---

# Technology Stack

## Backend

* Go 1.22+
* Gin
* GORM
* PostgreSQL

## Frontend

* Next.js 16
* React 19
* TypeScript
* Tailwind CSS 4
* shadcn/ui
* TanStack Query
* Zustand

## Database

* PostgreSQL

## Importer

* MinerU JSON Parser

---

# Architecture

```
MinerU JSON
        │
        ▼
Importer
        │
        ▼
Lesson Parser
        │
        ▼
Unit Parser
        │
        ▼
Section Parser
        │
        ▼
Exercise Parser
        │
        ▼
DTO Mapper
        │
        ▼
PostgreSQL
        │
        ▼
Go REST API
        │
        ▼
Next.js Frontend
```

---

# Repository Structure

```
.
├── apps
│   └── web
│
├── backend
│
├── internal
│   ├── importer
│   ├── models
│   ├── repository
│   └── db
│
├── migrations
│
├── docker
│
└── README.md
```

---

# Import Pipeline

```
Book PDF
      │
      ▼
MinerU
      │
      ▼
JSON
      │
      ▼
Importer
      │
      ▼
DTO
      │
      ▼
Database
```

---

# Frontend Architecture

```
modules/

lesson

unit

section

exercise

dialogue

grammar

pronunciation

media

progress
```

Every feature is implemented as an independent module.

---

# Backend Architecture

```
Importer

↓

Lesson Parser

↓

Unit Parser

↓

Section Parser

↓

Exercise Parser

↓

Mapper

↓

Repository

↓

Database
```

---

# Prerequisites

Install:

* Go 1.22+
* PostgreSQL
* Node.js 22+
* pnpm
* Docker (optional)

---

# Backend Setup

Clone the repository.

```bash
git clone https://github.com/vahidygm/english_learning.git

cd english_learning
```

Install Go dependencies.

```bash
cd backend
go mod tidy
```

Configure your environment.

```bash
cp .env.example .env
```

Update database settings.

Example:

```text
DB_HOST=localhost
DB_PORT=5436
DB_USER=postgres
DB_PASSWORD=postgres
DB_NAME=english_learning
```

---

# Database

Start PostgreSQL.

Create the database.

```sql
CREATE DATABASE english;
```

Run migrations.

```bash
go run ./cmd/migrate
```

---

# Importing a Book

Run the importer.

```bash
go run ./cmd/importer
```

Or import a specific JSON file.

```bash
go run ./cmd/importer --file ./books/lesson1.json
```

---

# Running Backend

```bash
go run ./cmd/server
```

Server:

```
http://localhost:8083
```

---

# Frontend Setup

Go to the frontend.

```bash
cd web/language_learning
```

Install packages.

```bash
pnpm install
```

Run the development server.

```bash
pnpm dev
```

Frontend:

```
http://localhost:3009
```

---

# Useful pnpm Commands

Install dependencies.

```bash
pnpm install
```

Development.

```bash
pnpm dev
```

Production build.

```bash
pnpm build
```

Run production server.

```bash
pnpm start
```

Lint.

```bash
pnpm lint
```

---

# Bootstrap Scripts

The repository contains helper scripts used during development.

## Initial Frontend Bootstrap

```bash
bash bootstrap_frontend.sh
```

Creates the initial frontend project structure.

---

## Phase 2

```bash
bash prepare_phase2.sh
```

Creates the domain layer.

---

## Phase 2.1

```bash
bash prepare_phase2_1.sh
```

Creates TypeScript DTO files.

---

## Phase 3

```bash
bash prepare_phase3.sh
```

Creates API infrastructure.

---

## Phase 4

```bash
bash prepare_phase4.sh
```

Creates the application shell.

---

# Development Workflow

## Backend

```
Change Parser

↓

Test Import

↓

Save DTO

↓

Persist Database

↓

Expose REST API
```

---

## Frontend

```
DTO

↓

API

↓

Hook

↓

Store

↓

Component

↓

Page
```

---

# Lesson Hierarchy

```
Lesson

├── Unit

│   ├── Section

│   │   ├── Exercise

│   │   │   ├── Question

│   │   │   ├── Dialogue

│   │   │   ├── Vocabulary

│   │   │   ├── Grammar

│   │   │   ├── Pronunciation

│   │   │   └── Media
```

---

# Planned Features

* Authentication
* User profiles
* Learning progress
* Daily streaks
* Review mode
* Flashcards
* Audio playback
* Pronunciation practice
* Spaced repetition
* AI-assisted explanations
* Admin dashboard
* Book importer UI

---

# Current Development Status

| Module          | Status         |
| --------------- | -------------- |
| Importer        | 🚧 In Progress |
| Backend API     | 🚧 In Progress |
| Database        | 🚧 In Progress |
| Frontend        | 🚧 In Progress |
| Authentication  | ⏳ Planned      |
| Learning Engine | 🚧 In Progress |
| Review System   | ⏳ Planned      |

---

# License

This project is under active development.
