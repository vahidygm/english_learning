# Part 1

> Version: 2.0
>
> Status: Planning
>
> Project: English Learning Platform
>
> Frontend: Next.js 16 + React 19 + TypeScript
>
> Backend: Golang + Gin + GORM + PostgreSQL
>
> Last Updated: 2026-07-08

---

# 1. Introduction

Phase 1 focused on designing the project architecture and implementing the content importer.

At the end of Phase 1 we have:

- MinerU parser
- PostgreSQL schema
- GORM models
- Repository layer
- Next.js application architecture
- Feature-based frontend structure

However, the frontend is still disconnected from the backend.

The primary goal of Phase 2 is to transform the project from an architecture skeleton into a fully working learning platform capable of loading lessons directly from PostgreSQL.

This phase intentionally ignores:

- Authentication
- Authorization
- Progress saving
- XP
- Review scheduling
- Gamification

The only objective is:

> Display the complete English book inside the application using live data stored in PostgreSQL.

---

# 2. Phase Goal

The end result of Phase 2 should allow a user to:

1. Open the application.
2. View available lessons.
3. Open a lesson.
4. View lesson units.
5. Open a unit.
6. Read sections.
7. Complete exercises.
8. View dialogues.
9. View vocabulary.
10. View grammar notes.
11. Listen to lesson audio.
12. View lesson images.

Everything must come directly from PostgreSQL.

No mock data.

No static JSON.

No hardcoded examples.

---

# 3. Current State

## Backend

Implemented

- MinerU JSON parser
- Lesson parser
- Unit parser
- Exercise parser
- Vocabulary parser
- Dialogue parser
- Media parser
- Repository layer
- GORM models
- PostgreSQL

Missing

- REST API
- Service layer
- DTO mapping
- HTTP handlers
- Static media server

---

## Frontend

Implemented

- Next.js
- Feature architecture
- Routing
- Providers
- React Query structure
- Zustand
- Components
- Module architecture

Missing

- API client implementation
- Live data loading
- Screen rendering
- Navigation using backend data

---

# 4. Target Architecture

```

```
                 MinerU JSON
                      │
                      ▼
              Importer Pipeline
                      │
                      ▼
                 PostgreSQL
                      │
                      ▼
             Repository Layer
                      │
                      ▼
              Service Layer
                      │
                      ▼
               REST API (Gin)
                      │
             JSON DTO Responses
                      │
                      ▼
           Axios + React Query
                      │
                      ▼
               Next.js Modules
                      │
                      ▼
                  User Interface

```

This architecture intentionally separates every responsibility.

No layer should know implementation details of another layer.

---

# 5. Architectural Principles

## Principle 1

The frontend never knows the database schema.

The frontend only consumes DTOs.

Never expose GORM models directly.

---

## Principle 2

The frontend never communicates with repositories.

```

Browser

↓

HTTP

↓

Handler

↓

Service

↓

Repository

↓

Database

```

Never

```

Browser

↓

Repository

↓

Database

```

---

## Principle 3

Repositories never return HTTP DTOs.

Repositories return domain models.

Services convert models into DTOs.

---

## Principle 4

Pages never call Axios directly.

```

Page

↓

Hook

↓

React Query

↓

API

↓

Axios

```

---

## Principle 5

Every feature owns its implementation.

Example

```

Lesson

API

Hooks

Components

Types

Store

```

Nothing outside the Lesson module should know its internal structure.

---

# 6. High-Level Data Flow

```

Database

↓

Lesson Repository

↓

Lesson Service

↓

Lesson DTO

↓

REST API

↓

Axios

↓

React Query

↓

Lesson Hook

↓

Lesson Component

↓

Browser

```

Exactly the same architecture will be used for

- Units
- Sections
- Exercises
- Dialogues
- Vocabulary
- Grammar
- Media

---

# 7. Feature Hierarchy

The English book naturally follows this hierarchy.

```

Lesson

│

├── Objectives

│

├── Units

│ ├── Sections

│ │ ├── Exercises

│ │ │ ├── Questions

│ │ │ ├── Dialogue

│ │ │ ├── Vocabulary

│ │ │ ├── Grammar

│ │ │ ├── Pronunciation

│ │ │ └── Media

```

This hierarchy will never change.

Everything in the application is built around this structure.

---

# 8. Backend Responsibilities

The backend has one responsibility:

> Transform database content into frontend-ready learning objects.

It is **not** responsible for UI rendering.

It **is** responsible for assembling complete lesson data.

Example

Instead of requiring

```

GET /lessons

GET /units

GET /sections

GET /exercises

```

the backend should provide aggregated endpoints.

Example

```

GET /api/v1/lessons

↓

Lesson summaries

```

```

GET /api/v1/lessons/{id}

↓

Lesson

Units

Sections

Exercises

Vocabulary

Grammar

Media

```

One request.

Everything required to render the lesson page.

---

# 9. Frontend Responsibilities

The frontend has one responsibility:

Display learning content.

The frontend should never:

- build SQL-like queries
- assemble lesson trees
- merge API responses
- understand database relationships

Those responsibilities belong to the backend.

The frontend only renders.

---

# 10. API Philosophy

The REST API is **screen-oriented**, not table-oriented.

Bad

```

GET /units

GET /sections

GET /questions

```

Good

```

GET /dashboard

GET /lessons

GET /lessons/{id}

GET /units/{id}

```

The backend should return exactly what each screen needs.

---

# 11. Development Strategy

Implementation will proceed vertically.

Each milestone must produce a usable feature.

Example

```

Lesson

↓

API

↓

Hook

↓

Components

↓

Page

↓

Running UI

```

Only after the Lesson feature works do we move to Units.

Then Sections.

Then Exercises.

This minimizes debugging and keeps every phase testable.

---

# 12. Definition of Success

Phase 2 is complete when:

- PostgreSQL contains imported lessons.
- Go API exposes lesson endpoints.
- Next.js loads lesson data from the API.
- Lesson pages render without mock data.
- Units render correctly.
- Sections render correctly.
- Exercises render correctly.
- Dialogues display.
- Vocabulary displays.
- Grammar displays.
- Images display.
- Audio files play.
- Navigation between lessons and units works.

No authentication or gamification is required.

---

# 13. Deliverables

At the end of Phase 2 the project will include:

### Backend

- REST API
- Service layer
- DTO layer
- Repository integration
- Media endpoints
- JSON serialization
- Error handling

### Frontend

- Live API integration
- React Query implementation
- Lesson pages
- Unit pages
- Exercise rendering
- Audio playback
- Image rendering
- Vocabulary views
- Grammar views

### Infrastructure

- Docker Compose
- PostgreSQL
- Backend
- Frontend

Running with a single command.

---

# 14. Next Document

Part 2 will define the implementation in detail, including:

- Complete REST API specification
- DTO contracts
- Request/response schemas
- Backend folder organization
- Repository interfaces
- Service interfaces
- Handler responsibilities
- Endpoint-by-endpoint implementation plan
- Media serving strategy
- API versioning
- Error response specification

This document becomes the implementation guide for building the backend API that powers the frontend.

----------------------------------------------------------------------------------------------------------------------------------------

# PART 2 — Backend Architecture, REST API & DTO Design

---

# 15. Backend Architecture

The backend will follow a strict layered architecture.

```
HTTP Request
      │
      ▼
 Gin Handler
      │
      ▼
Application Service
      │
      ▼
Repository
      │
      ▼
 PostgreSQL
```

Each layer has a single responsibility.

---

# 16. Backend Folder Structure

```
apps/
└── backend/
    ├── cmd/
    │   └── server/
    │       └── main.go
    │
    ├── internal/
    │
    │   ├── handlers/
    │   │
    │   │   lesson_handler.go
    │   │   unit_handler.go
    │   │   exercise_handler.go
    │   │   media_handler.go
    │   │   health_handler.go
    │   │
    │   ├── service/
    │   │
    │   │   lesson_service.go
    │   │   unit_service.go
    │   │   exercise_service.go
    │   │   media_service.go
    │   │
    │   ├── repository/
    │   │
    │   │   lesson_repository.go
    │   │   unit_repository.go
    │   │   exercise_repository.go
    │   │   media_repository.go
    │   │
    │   ├── dto/
    │   │
    │   │   lesson.go
    │   │   unit.go
    │   │   exercise.go
    │   │   dialogue.go
    │   │   vocabulary.go
    │   │   grammar.go
    │   │   media.go
    │   │
    │   ├── mapper/
    │   │
    │   │   lesson_mapper.go
    │   │   unit_mapper.go
    │   │   exercise_mapper.go
    │   │
    │   ├── models/
    │   │
    │   └── database/
    │
    └── pkg/
```

---

# 17. Responsibilities

## Handler

Responsible for

- reading HTTP request
- validation
- query parameters
- path parameters
- calling services
- returning JSON

Handlers NEVER access repositories.

---

## Service

Responsible for

- business logic
- assembling lesson tree
- filtering
- sorting
- DTO mapping

Services NEVER know HTTP.

---

## Repository

Responsible for

- GORM
- SQL
- joins
- pagination
- eager loading

Repositories NEVER return DTOs.

---

## Mapper

Responsible for converting

```
Database Model

↓

DTO
```

No other layer performs mapping.

---

# 18. API Version

All APIs begin with

```
/api/v1
```

Future versions

```
/api/v2
```

No breaking changes inside v1.

---

# 19. Initial Endpoints

We intentionally keep the API small.

## Health

```
GET /api/v1/health
```

Returns

```
{
    "status":"ok"
}
```

---

## Dashboard

```
GET /api/v1/dashboard
```

Returns

- latest lesson
- recent lessons
- statistics

Progress is ignored for now.

---

## Lessons

```
GET /api/v1/lessons
```

Returns

```
[
    LessonSummary,
    LessonSummary
]
```

---

## Lesson Details

```
GET /api/v1/lessons/{lessonId}
```

Returns complete lesson.

---

## Unit Details

```
GET /api/v1/units/{unitId}
```

Returns complete unit.

---

## Media

```
GET /api/v1/media/{id}
```

Returns media metadata.

Static file

```
GET /media/{filename}
```

Returns image/audio/video.

---

# 20. Why We Don't Expose Everything

We intentionally do NOT expose

```
GET /sections

GET /questions

GET /vocabulary

GET /dialogues
```

Those are implementation details.

Instead

```
GET /units/10
```

returns

```
Unit

Sections

Exercises

Questions

Dialogue

Vocabulary

Grammar

Media
```

Everything required by the screen.

---

# 21. DTO Philosophy

DTOs are immutable.

Frontend never receives database models.

Example

Database

```
LessonModel
```

↓

Mapper

↓

```
LessonDTO
```

↓

JSON

---

# 22. DTO Hierarchy

```
LessonDTO

├── Objectives

├── Units

│   ├── Sections

│   │   ├── Exercises

│   │   │   ├── Questions

│   │   │   ├── Dialogue

│   │   │   ├── Vocabulary

│   │   │   ├── Grammar

│   │   │   └── Media
```

Exactly matches the frontend.

---

# 23. Lesson Summary DTO

Returned by

```
GET /lessons
```

Contains

```
id

number

title

subtitle

description

thumbnail

totalUnits

estimatedDuration
```

Nothing more.

---

# 24. Lesson Detail DTO

Returned by

```
GET /lessons/{id}
```

Contains

```
Lesson

Objectives

Units

Sections

Exercises

Media

Vocabulary

Grammar
```

Everything needed for Lesson page.

---

# 25. Unit DTO

Returned by

```
GET /units/{id}
```

Contains

```
Unit

Sections

Exercises

Dialogue

Vocabulary

Grammar

Media
```

Enough for Unit page.

---

# 26. Exercise DTO

Contains

```
Exercise

Questions

Hints

Instructions

Answers

Media
```

No database fields.

---

# 27. Question DTO

Contains

```
id

type

text

choices

correctAnswer

media

explanation
```

---

# 28. Dialogue DTO

Contains

```
title

speakers

lines

audio
```

---

# 29. Vocabulary DTO

Contains

```
word

phonetic

partOfSpeech

meaning

translation

image

audio

examples
```

---

# 30. Grammar DTO

Contains

```
title

rules

examples

notes
```

---

# 31. Media DTO

Contains

```
id

type

url

caption

duration

width

height
```

The frontend never sees storage paths.

---

# 32. Response Wrapper

Every response uses

```
{
    "success": true,
    "data": ...
}
```

Errors

```
{
    "success": false,
    "error": {
        "code": "...",
        "message": "..."
    }
}
```

---

# 33. Pagination

Only list endpoints paginate.

```
GET /lessons?page=1&pageSize=20
```

Lesson detail never paginates.

---

# 34. Database Loading Strategy

Repositories should eagerly load related entities.

Example

```
Lesson

↓

Units

↓

Sections

↓

Exercises

↓

Questions

↓

Media
```

Avoid N+1 queries.

Prefer controlled eager loading (`Preload` in GORM) or optimized joins where appropriate.

---

# 35. Mapper Responsibilities

Mapper transforms

```
Model

↓

DTO
```

Example

```
LessonModel

↓

LessonDTO
```

The frontend should never depend on GORM tags or database-specific fields.

---

# 36. Media Serving

Media files remain outside PostgreSQL.

Database stores only metadata.

```
id

type

filename

mime

width

height

duration
```

Backend generates public URLs.

Example

```
/media/audio/unit1.mp3
```

Frontend never constructs file paths.

---

# 37. Error Strategy

Standard HTTP codes

```
200

201

400

401 (reserved for future auth)

403 (reserved)

404

409

422

500
```

Error body remains consistent across all endpoints.

---

# 38. API Principles

Every endpoint should be:

- predictable
- cache-friendly
- independent
- screen-oriented
- versioned
- stateless

The frontend should never need to combine multiple endpoints to render a single screen unless there is a clear performance or caching reason.

---

# 39. Implementation Order

Backend development order:

```
Health API

↓

Lesson Repository

↓

Lesson Service

↓

Lesson Mapper

↓

Lesson Handler

↓

Lesson Endpoints

↓

Unit Repository

↓

Unit Service

↓

Unit Handler

↓

Media

↓

Exercise
```

Each completed endpoint should be testable with curl or Postman before integrating it into the frontend.

---

# 40. End of Part 2

Part 3 will cover:

- Next.js architecture
- React Query strategy
- Axios client
- Feature modules
- Zustand stores
- Component hierarchy
- Dashboard implementation
- Lesson page implementation
- Unit page implementation
- End-to-end frontend data flow


-----------------------------------------------------------------------------------------------------------------------------------------
# PART 3 — Frontend Architecture, Data Flow & Integration Strategy

---

# 41. Frontend Philosophy

The frontend is **not** a CRUD application.

It is a Learning Platform.

Its responsibility is to present educational content in a fast, responsive and intuitive way.

The frontend must never:

- know database structure
- know SQL relationships
- know GORM models
- build lesson trees
- merge API responses

The backend is responsible for all data aggregation.

The frontend only renders data.

---

# 42. Frontend Architecture

The frontend follows a Feature-First architecture.

```
Browser

↓

Next.js App Router

↓

Feature Module

↓

React Query

↓

API Client

↓

REST API

↓

Go Backend
```

Every feature is isolated.

---

# 43. Frontend Folder Structure

```
app/

components/

modules/

lib/

hooks/

styles/

types/
```

The only directories allowed to communicate directly with the backend are

```
modules/*/api

lib/api
```

Nothing else performs HTTP requests.

---

# 44. Feature Architecture

Every feature has exactly the same structure.

Example

```
modules/

lesson/

api/

hooks/

components/

store/

utils/

index.ts
```

Exactly the same applies to

```
unit

exercise

dialogue

grammar

vocabulary

media

progress
```

---

# 45. Feature Isolation

Each feature owns

- components
- hooks
- API
- local store
- utilities

Example

```
Lesson

↓

Lesson API

↓

Lesson Hooks

↓

Lesson Components
```

Exercise module cannot directly import Lesson internals.

Only public exports.

---

# 46. Public API

Every module exposes

```
index.ts
```

External imports

Good

```
import {
    LessonCard,
    useLesson
}
from "@/modules/lesson"
```

Bad

```
import LessonCard
from "@/modules/lesson/components/LessonCard"
```

The internal structure must remain private.

---

# 47. React Query

React Query is responsible for

- fetching
- caching
- invalidation
- retries
- loading
- background refresh

React components never call Axios directly.

---

# 48. Axios

Axios exists only once.

```
lib/api/client.ts
```

Responsibilities

- base URL
- interceptors
- timeout
- headers
- error normalization

Feature modules use

```
lesson.api.ts

unit.api.ts

exercise.api.ts
```

Those wrap Axios.

---

# 49. Data Flow

Example

```
Lesson Page

↓

useLesson()

↓

React Query

↓

lesson.api.ts

↓

Axios

↓

Backend

↓

JSON

↓

DTO

↓

Component
```

Every screen follows this flow.

---

# 50. Component Hierarchy

Lesson screen

```
LessonPage

↓

LessonHeader

↓

LessonObjectives

↓

LessonUnits

↓

UnitCard

↓

SectionCard

↓

ExerciseCard
```

Each component has a single responsibility.

---

# 51. Dashboard

Dashboard is only a navigation page.

It does not contain learning logic.

It displays

```
Continue Learning

Latest Lessons

Recent Lessons

Bookmarks

Statistics (future)
```

---

# 52. Lesson Screen

The Lesson screen displays

```
Lesson

Objectives

Description

Units

Media
```

No exercises yet.

Exercises appear after selecting a Unit.

---

# 53. Unit Screen

The Unit screen displays

```
Unit

Sections

Exercises

Dialogue

Vocabulary

Grammar

Media
```

This is where learning begins.

---

# 54. Section Screen

A section is not a separate page.

Sections are rendered inside the Unit page.

Example

```
Unit

↓

Section

↓

Exercise

↓

Questions
```

---

# 55. Exercise Rendering

We will not use a huge switch statement.

Bad

```
switch(type)
```

Instead

```
ExerciseRegistry

↓

Renderer
```

Example

```
Multiple Choice

Fill Blank

Listening

Reading

Writing

Matching

Ordering
```

Each renderer is independent.

---

# 56. Exercise Registry

```
ExerciseRenderer

↓

Registry

↓

Component
```

Pseudo flow

```
registry.get(type)

↓

MatchingExercise

↓

Render
```

Adding a new exercise requires only registering a renderer.

---

# 57. Audio

Audio is centralized.

```
AudioPlayer

↓

Howler

↓

Backend Media URL
```

No component loads audio directly.

---

# 58. Images

Images use

```
Next/Image
```

Source

```
Backend URL
```

Never hardcoded.

---

# 59. Navigation

Navigation hierarchy

```
Dashboard

↓

Lesson

↓

Unit

↓

Exercise
```

Browser Back must always work.

Deep links should work.

---

# 60. React Query Keys

Every feature owns its keys.

Example

```
lessonKeys

unitKeys

exerciseKeys
```

No global string literals.

---

# 61. Zustand

Global state should remain very small.

Only

```
Theme

Audio Player

UI

Future Authentication
```

Lesson data must remain inside React Query.

Never duplicate server data into Zustand.

---

# 62. Component Design Rules

Every component

- small
- reusable
- typed
- testable

Target

```
100~150 lines
```

Maximum

```
250 lines
```

Larger components should be split.

---

# 63. Loading States

Every page provides

```
Loading

Error

Empty

Success
```

No blank pages.

---

# 64. Error Handling

Errors are displayed using

```
Error Component
```

Not browser alerts.

---

# 65. Routing

Current routing

```
/

↓

Dashboard

↓

Lessons

↓

Lesson

↓

Unit
```

Future

```
Exercise Review

Vocabulary Review

Profile

Settings
```

---

# 66. Styling

Use

```
Tailwind

shadcn/ui

Motion
```

Avoid custom CSS unless necessary.

Theme colors remain centralized.

---

# 67. Frontend Implementation Order

Frontend implementation follows vertical slices.

```
Lesson

↓

Unit

↓

Exercise

↓

Dialogue

↓

Vocabulary

↓

Grammar

↓

Media

↓

Dashboard
```

Each slice becomes functional before moving on.

---

# 68. First Vertical Slice

Goal

```
GET /api/v1/lessons

↓

Lesson API

↓

Lesson Hook

↓

Lesson Page

↓

Lesson Cards

↓

User clicks Lesson

↓

GET /api/v1/lessons/{id}

↓

Lesson Detail Page
```

This validates the complete frontend-backend integration.

---

# 69. Testing Strategy

Each feature should be tested independently.

API

↓

Hook

↓

Component

↓

Page

↓

End-to-End

Avoid testing implementation details.

Test behavior instead.

---

# 70. Definition of Done

The frontend integration is considered complete when:

- Lessons load from the backend.
- Lesson detail pages render correctly.
- Units display with live data.
- Sections display within units.
- Exercises render using the registry.
- Audio and images load from backend media endpoints.
- No mock data remains.
- React Query manages all server state.
- The application compiles and runs without placeholder implementations.

---

# 71. End-to-End Request Flow

```
User opens Dashboard

↓

GET /api/v1/lessons

↓

Lesson summaries displayed

↓

User selects Lesson

↓

GET /api/v1/lessons/{id}

↓

Lesson rendered

↓

User selects Unit

↓

GET /api/v1/units/{id}

↓

Exercises rendered

↓

User interacts with learning content
```

At this point, the application becomes a fully functional English learning platform backed by PostgreSQL and the Go API.

---

# 72. End of Part 3

Part 4 will complete the implementation blueprint with:

- Media pipeline
- Import pipeline integration
- Docker orchestration
- Development workflow
- Backend/frontend integration milestones
- Testing strategy
- Performance considerations
- Future phases (authentication, progress, XP, review scheduling)
- Definition of Done for the entire project
- Complete implementation checklist

----------------------------------------------------------------------------------------------------------------------------------------
# PART 4 — Integration Roadmap, Infrastructure, Media Pipeline & Implementation Checklist

---

# 73. Phase 2 Objective

At the completion of Phase 2, the application should behave as if it were a finished product from the user's perspective.

The only missing features should be:

- Authentication
- Progress persistence
- XP
- Streaks
- Review scheduling
- Gamification
- Notifications

Everything related to lesson content must be functional.

---

# 74. End-to-End System

```
                     English Book

                           │

                           ▼

                    MinerU Extraction

                           │

                           ▼

                     JSON Documents

                           │

                           ▼

                 Importer (Current Project)

                           │

                           ▼

                     PostgreSQL Database

                           │

                           ▼

                 Repository Layer (Go)

                           │

                           ▼

                  Service Layer (Go)

                           │

                           ▼

                 DTO Mapper Layer (Go)

                           │

                           ▼

                   REST API (Gin)

                           │

                           ▼

                     Axios Client

                           │

                           ▼

                   React Query Cache

                           │

                           ▼

                  Next.js Feature Modules

                           │

                           ▼

                        Browser
```

---

# 75. Data Ownership

Every piece of data has exactly one owner.

| Layer | Owns |
|--------|------|
| Importer | Raw MinerU JSON |
| PostgreSQL | Persistent data |
| Repository | Database queries |
| Service | Business logic |
| DTO | API contract |
| React Query | Server state |
| React Component | Rendering |
| Zustand | UI state only |

Never duplicate ownership.

---

# 76. Media Pipeline

Media is a first-class citizen.

The importer already discovers media.

The backend must expose it.

```
MinerU

↓

Media Parser

↓

Media Table

↓

Media Service

↓

Media Endpoint

↓

Frontend
```

---

# 77. Media Storage

Media should remain outside PostgreSQL.

Recommended

```
storage/

images/

audio/

video/
```

Database stores

```
id

filename

mime

size

width

height

duration

checksum
```

---

# 78. Static Media Server

Backend serves

```
/media/images/...

/media/audio/...

/media/video/...
```

Frontend only receives

```
url
```

Example

```
https://api.example.com/media/audio/lesson1.mp3
```

No path construction inside React.

---

# 79. Exercise Flow

```
User opens Unit

↓

Unit loaded

↓

Exercise list

↓

Registry

↓

Renderer

↓

Question

↓

Answer

↓

Next Exercise
```

The frontend never requests individual questions.

---

# 80. Frontend Navigation Flow

```
Dashboard

↓

Lessons

↓

Lesson

↓

Unit

↓

Exercise

↓

Next Exercise

↓

Back

↓

Dashboard
```

Navigation must remain predictable.

---

# 81. Docker Architecture

```
docker-compose

│

├── postgres

├── backend

├── frontend

└── pgadmin (optional)
```

---

# 82. Startup Sequence

```
PostgreSQL

↓

Migration

↓

Importer (optional)

↓

Backend

↓

Frontend
```

The frontend must never start before the backend API is available in production.

---

# 83. Environment Variables

Backend

```
DATABASE_URL

PORT

MEDIA_ROOT

PUBLIC_MEDIA_URL
```

Frontend

```
NEXT_PUBLIC_API_URL

NEXT_PUBLIC_MEDIA_URL
```

Never hardcode URLs.

---

# 84. CORS

During development

```
Frontend

localhost:3000

↓

Backend

localhost:8080
```

Backend enables CORS.

Production uses the same domain when possible.

---

# 85. API Versioning Strategy

Current

```
/api/v1
```

Future

```
/api/v2
```

Never break existing clients.

---

# 86. React Query Strategy

React Query owns all server state.

Examples

```
Lessons

Lesson

Unit

Exercise

Media
```

Do NOT store these in Zustand.

---

# 87. Zustand Strategy

Only UI state.

Examples

```
Theme

Sidebar

Audio Player

Current Volume

Current Playback

Dialog Visibility
```

No lesson data.

---

# 88. API Cache Strategy

```
Lessons

Long Cache

Lesson

Medium Cache

Unit

Medium Cache

Media

Long Cache
```

Exercise answers are not cached in Phase 2.

---

# 89. Import Pipeline

Importer remains independent.

```
MinerU

↓

Importer

↓

Database
```

Importer never communicates with frontend.

Importer never serves HTTP.

---

# 90. Backend Testing

Each layer tested independently.

Repository

↓

Service

↓

Handler

↓

Integration

No UI involved.

---

# 91. Frontend Testing

Each feature

```
API

↓

Hook

↓

Component

↓

Page
```

Later

End-to-End

---

# 92. Integration Testing

The most important tests.

```
Importer

↓

Database

↓

API

↓

Frontend

↓

Rendered Lesson
```

This validates the complete platform.

---

# 93. Performance Goals

Dashboard

```
< 1 second
```

Lesson

```
< 2 seconds
```

Unit

```
< 1 second
```

Exercise navigation

```
Instant
```

Media should load progressively.

---

# 94. Logging

Backend

```
Incoming Request

↓

Handler

↓

Service

↓

Repository

↓

Database
```

Every error includes request context.

Frontend logs only during development.

---

# 95. Error Recovery

If media fails

Show placeholder.

If lesson fails

Show retry.

If backend unavailable

Show offline screen.

Never crash.

---

# 96. Development Order

## Milestone 1

Backend

```
Health

Lessons

Units
```

Frontend

```
Lesson List

Lesson Page
```

---

## Milestone 2

Backend

```
Exercises

Dialogue

Vocabulary
```

Frontend

```
Exercise Rendering
```

---

## Milestone 3

Backend

```
Media

Grammar
```

Frontend

```
Audio

Images

Grammar
```

---

## Milestone 4

Complete integration.

No mock data.

---

# 97. Definition of Done

Backend

- API documented
- DTO mapping complete
- Repository complete
- Services complete
- Handlers complete
- Media served
- Database seeded

Frontend

- Dashboard works
- Lessons load
- Lesson page works
- Unit page works
- Exercises work
- Audio works
- Images work
- Vocabulary works
- Grammar works

Infrastructure

- Docker works
- PostgreSQL works
- Backend works
- Frontend works

---

# 98. Future Phases

These are intentionally excluded from Phase 2.

## Phase 3

Authentication

JWT

OAuth

Profile

Settings

---

## Phase 4

Learning Progress

Completed lessons

Bookmarks

History

Review

---

## Phase 5

Gamification

XP

Levels

Achievements

Daily goals

Streaks

Leaderboard

---

## Phase 6

Advanced Learning

Spaced repetition

Pronunciation scoring

AI feedback

Writing correction

Adaptive learning

Personal recommendations

---

# 99. Final Architecture

```
                    Frontend

                Next.js 16

                     │

              React Query

                     │

                 Axios

                     │

               REST API

                     │

              Gin Handlers

                     │

          Application Services

                     │

            Repository Layer

                     │

              PostgreSQL

                     ▲

                     │

             Importer Pipeline

                     ▲

                     │

               MinerU JSON
```

Every layer has one responsibility.

Every dependency flows downward.

No circular dependencies.

No shared mutable state.

---

# 100. Master Implementation Checklist

## Infrastructure

- [ ] Docker Compose configured
- [ ] PostgreSQL running
- [ ] Backend running
- [ ] Frontend running
- [ ] Media storage configured

## Backend

- [ ] Health endpoint
- [ ] Lesson repository
- [ ] Lesson service
- [ ] Lesson mapper
- [ ] Lesson handler
- [ ] Lesson endpoint
- [ ] Unit endpoint
- [ ] Exercise endpoint
- [ ] Media endpoint
- [ ] DTOs finalized
- [ ] Error handling
- [ ] API documentation

## Frontend

- [ ] Axios configured
- [ ] React Query configured
- [ ] Dashboard connected
- [ ] Lesson list connected
- [ ] Lesson page connected
- [ ] Unit page connected
- [ ] Exercise renderer connected
- [ ] Dialogue rendering
- [ ] Vocabulary rendering
- [ ] Grammar rendering
- [ ] Media rendering
- [ ] Audio playback

## Integration

- [ ] Import JSON into PostgreSQL
- [ ] Backend serves imported data
- [ ] Frontend consumes live API
- [ ] No mock data remains
- [ ] Complete lesson can be studied end-to-end

---

# 101. Conclusion

Phase 2 marks the transition from **project scaffolding** to a **working English learning platform**.

By the end of this phase:

- The importer transforms MinerU output into structured PostgreSQL data.
- The Go backend exposes stable, screen-oriented REST APIs.
- The Next.js frontend consumes those APIs through React Query.
- Lessons, units, exercises, dialogues, vocabulary, grammar, audio, and images are all rendered from live data.
- The application is fully usable for learning, even though user accounts, progress tracking, and gamification are intentionally deferred.

This architecture provides a clean separation of concerns, minimizes coupling between backend and frontend, and creates a solid foundation for future phases without requiring major refactoring.