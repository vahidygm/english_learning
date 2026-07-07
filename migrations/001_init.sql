CREATE TABLE lessons (
    id SERIAL PRIMARY KEY,
    number INT,
    title TEXT,
    cover_image TEXT,
    created_at TIMESTAMP,
    updated_at TIMESTAMP
);

CREATE TABLE objectives (
    id SERIAL PRIMARY KEY,
    lesson_id INT,
    unit_code TEXT,
    skill TEXT,
    grammar TEXT,
    vocabulary TEXT,
    pronunciation TEXT,
    writing TEXT
);

CREATE TABLE units (
    id SERIAL PRIMARY KEY,
    lesson_id INT,
    code TEXT,
    title TEXT,
    grammar_summary TEXT,
    vocabulary_summary TEXT,
    pronunciation_summary TEXT
);

CREATE TABLE sections (
    id SERIAL PRIMARY KEY,
    unit_id INT,
    name TEXT,
    "order" INT
);

CREATE TABLE exercises (
    id SERIAL PRIMARY KEY,
    section_id INT,
    number TEXT,
    title TEXT,
    type TEXT,
    instruction TEXT,
    "order" INT
);

CREATE TABLE questions (
    id SERIAL PRIMARY KEY,
    exercise_id INT,
    number TEXT,
    text TEXT,
    answer TEXT,
    "order" INT
);

CREATE TABLE dialogues (
    id SERIAL PRIMARY KEY,
    exercise_id INT,
    title TEXT
);

CREATE TABLE dialogue_lines (
    id SERIAL PRIMARY KEY,
    dialogue_id INT,
    speaker TEXT,
    text TEXT,
    "order" INT
);

CREATE TABLE vocabularies (
    id SERIAL PRIMARY KEY,
    exercise_id INT,
    category TEXT,
    word TEXT,
    meaning TEXT,
    example TEXT,
    "order" INT
);

CREATE TABLE grammars (
    id SERIAL PRIMARY KEY,
    exercise_id INT,
    topic TEXT,
    rule TEXT,
    example TEXT,
    "order" INT
);

CREATE TABLE pronunciations (
    id SERIAL PRIMARY KEY,
    exercise_id INT,
    topic TEXT,
    text TEXT,
    ipa TEXT,
    audio_id INT,
    "order" INT
);

CREATE TABLE media (
    id SERIAL PRIMARY KEY,
    exercise_id INT,
    type TEXT,
    url TEXT,
    caption TEXT,
    "order" INT
);