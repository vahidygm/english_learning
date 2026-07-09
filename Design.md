I think this is the point where we stop thinking like software engineers and start thinking like a **product company**.

Looking at your backend and importer, **the data model is already the strongest part of the project**.

The weak part is that the frontend is still acting like a database viewer instead of a learning product.

If I were hired as the lead architect for this project, **I would freeze frontend development for about a week** and produce a proper product specification first.

---

# Vision

This is **not** another English book reader.

It should become:

> **The most modern English learning platform built from traditional textbooks.**

Think:

* Duolingo motivation
* Busuu lesson organization
* BBC Learning English content quality
* Notion clean UI
* Linear polished UX
* Raycast-level animations

---

# Core Principles

Every screen should answer **one** question.

| Screen     | User Question                  |
| ---------- | ------------------------------ |
| Dashboard  | What should I do now?          |
| Lesson     | What will I learn?             |
| Unit       | What activities are available? |
| Exercise   | What is today's task?          |
| Vocabulary | What words should I review?    |
| Review     | What have I forgotten?         |
| Profile    | How am I improving?            |

Never expose the database hierarchy directly.

---

# Product Architecture

```text
                Dashboard
                     │
    ┌────────────────┼────────────────┐
    │                │                │
Continue        Vocabulary       Review
    │                │                │
    ▼                ▼                ▼
Lesson          Flashcards      Spaced Repetition
    │
    ▼
Unit
    │
    ▼
Exercise Engine
```

Notice:

The user almost never manually browses lessons.

They continue learning.

---

# Design System

## Color Palette

Don't use the default Tailwind colors.

Use semantic colors.

```text
Primary        #2563EB
Success        #22C55E
Warning        #F59E0B
Danger         #EF4444

Background     #FAFAFA
Surface        #FFFFFF

Text Primary   #111827
Text Secondary #6B7280

Border         #E5E7EB
```

Dark mode from day one.

---

## Typography

Use **Geist**.

Hierarchy:

```text
Display

H1

H2

H3

Body Large

Body

Caption

Label
```

---

## Spacing

Adopt an 8-point grid.

Everything:

```
8
16
24
32
40
48
64
```

Nothing arbitrary.

---

# Component Library

Instead of random components, define categories.

## Layout

```
AppShell

Sidebar

TopBar

BottomBar (mobile)

PageContainer

Section
```

---

## Navigation

```
Breadcrumb

Tabs

ProgressTabs

SidebarItem

NavigationRail
```

---

## Cards

```
LessonCard

UnitCard

ExerciseCard

VocabularyCard

AchievementCard

ReviewCard
```

---

## Learning Components

```
ExerciseRenderer

Question

AudioPlayer

DialoguePlayer

GrammarBox

VocabularyChip

ProgressIndicator

Hint

Timer

XPToast
```

---

## Feedback

```
Loading

Skeleton

Success

Confetti

Completion

StreakPopup
```

---

# Information Architecture

Instead of

```
Lesson

↓

Unit

↓

Section
```

I recommend

```
Dashboard

↓

Continue

↓

Exercise

↓

Review

↓

Lesson Explorer
```

---

# Dashboard

This is the heart of the app.

```
──────────────────────────────

Continue Learning

Lesson 3

Unit 3B

Resume

──────────────────────────────

Daily Goal

████████░░░

──────────────────────────────

Vocabulary Review

12 words

──────────────────────────────

Achievements

──────────────────────────────

Recent Lessons

──────────────────────────────
```

No tables.

No lists.

Cards.

---

# Lesson Page

```
Cover

Lesson title

Progress

Objectives

Unit cards

Vocabulary count

Grammar topics

Estimated duration

Start

Continue
```

The user should understand the lesson in 5 seconds.

---

# Unit Page

```
Listening

Reading

Grammar

Vocabulary

Speaking

Writing

Review
```

Not "Section 1", "Section 2".

Use learning categories.

---

# Exercise Engine

This is the most important part.

Don't create one giant renderer.

Create a registry.

```
Exercise Registry

↓

Listening

Grammar

Dialogue

Fill Blank

Multiple Choice

Matching

Drag Drop

Speaking

Reading

Writing
```

Every exercise is a plugin.

---

# Audio Experience

Think Spotify.

```
Play

Pause

Speed

Repeat

Transcript

Download

Waveform
```

---

# Vocabulary

Don't show tables.

Use cards.

```
Hello

🔊

Definition

Example

Image

Mark Known

Favorite

Review Later
```

---

# Review Mode

This is where retention happens.

```
20 Questions

Mixed

Listening

Vocabulary

Grammar

Dialogue
```

Spaced repetition later.

---

# Progress

Don't use percentages only.

Use achievements.

```
XP

Level

Streak

Completed Lessons

Vocabulary Learned

Hours Studied

Weekly Goal
```

People love progress.

---

# Gamification

Minimal.

Not childish.

```
XP

Badges

Achievements

Daily Goal

Streak

Weekly Challenge
```

Avoid coins and cartoon characters.

---

# Mobile First

The majority of learning happens on phones.

Desktop should feel like an enhanced experience, not the primary target.

---


### Design

* User personas
* Learning journeys
* Design system
* Component inventory
* UX flows
