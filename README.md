🇵🇱 [Czytaj po polsku](README.pl.md)
# 📚 Flashcards App

A web-based PWA for learning English vocabulary, built on a **Spaced Repetition System (SRS)**.

Built from scratch as a learning project — step by step, no frameworks.

---

## 🌐 Demo

👉 **[flashcards-app-chi-six.vercel.app](https://flashcards-app-chi-six.vercel.app)**

> You can install the app on your phone as a PWA — open the link above in your mobile browser and add it to your home screen.

---

## ✨ Features

- 🎯 **SRS system** — 4 rating levels (Again / Hard / Good / Easy), smart review scheduling
- 📖 **Example sentences** — every word comes with a contextual example
- 🆘 **S.O.S. mode** — quick review of words you got wrong earlier that day
- 🔥 **Streak counter** — tracks consecutive days of study
- 📊 **Statistics** — progress per level, words due for review, study history
- 🌍 **Two study directions** — English → Polish and Polish → English
- 📱 **PWA** — installs like a native app on your phone, works offline

---

## 📦 Levels and categories

| Level | Words | Categories |
|-------|-------|-----------|
| A1 | ~70 | Food, Travel, Home, Animals, School |
| B1 | ~155 | Food, Travel, Home, Animals, School, Work, Health, Technology, Environment, Personality |
| B2 | ~150 | Food, Travel, Home, Animals, School, Work, Health, Technology, Environment, Personality |

---

## 🛠️ Tech stack

| Layer | Technology | Why |
|-------|------------|-----|
| Frontend | HTML + CSS + Vanilla JS | Zero dependencies, maximum simplicity |
| Database | [Supabase](https://supabase.com) (PostgreSQL) | Free tier, REST API out of the box |
| Hosting | [Vercel](https://vercel.com) | Free, automatic deployment from GitHub |
| PWA | Web App Manifest + Service Worker | Installable on phone, offline support |

---

## 🗄️ Database schema

```sql
-- Vocabulary words
CREATE TABLE words (
  id              bigint PRIMARY KEY,
  created_at      timestamptz DEFAULT now(),
  english         text NOT NULL,
  polish          text NOT NULL,
  level           text,          -- A1, A2, B1, B2
  category        text,          -- food, travel, home...
  example_eng     text,          -- example sentence in English
  example_pl      text,          -- example sentence in Polish
  next_review_at  timestamptz,   -- when the next review is due
  interval_days   int4,          -- current SRS interval
  sos_date        date           -- date of the last mistake
);

-- Study sessions (used to calculate the streak)
CREATE TABLE study_sessions (
  id              bigint PRIMARY KEY,
  studied_at      date UNIQUE,
  words_reviewed  int4
);
```

---

## 📁 Project structure

```
flashcards-app/
├── index.html          # The entire app (HTML + CSS + JS)
├── manifest.json        # PWA configuration
├── service-worker.js   # Caching and offline support
└── icon.png             # App icon
```

---

## 🚀 Running it locally

1. Clone the repository:
```bash
git clone https://github.com/DawidMck/flashcards-app.git
cd flashcards-app
```

2. Create a project on [Supabase](https://supabase.com) and create the tables using the schema above

3. In `index.html`, replace the keys:
```javascript
const SUPABASE_URL = "https://your-project.supabase.co";
const SUPABASE_KEY = "your-anon-key";
```

4. Open `index.html` in a browser, or serve it with a local server

---

## 📈 SRS algorithm

After each review, the user rates the word — the app schedules the next review accordingly:

| Rating | Next review |
|--------|-------------|
| 😰 Again | in 10 minutes |
| 😓 Hard | in 1 day |
| 🙂 Good | in 3 days |
| 😄 Easy | in 7 days |

Words rated "Again" are added to the **S.O.S. queue** and can be reviewed again at any point during the same day.

---

## 🗺️ Roadmap

- [x] SRS system with 4 rating levels
- [x] Vocabulary sets for A1, B1, B2 with example sentences
- [x] S.O.S. mode
- [x] Statistics and streak tracking
- [x] PWA (installable on phone)
- [ ] User authentication (Supabase Auth)
- [ ] Push notifications
- [ ] Admin panel for managing words
- [ ] Quiz mode with a final score

---

## 👨‍💻 About this project

Built iteratively as a way to learn web development and cloud architecture. Every step was deliberately planned — from a single database table, through the SRS logic, all the way to deployment as a PWA.

**Principles followed throughout:**
- One step at a time — verify before moving forward
- Free-tier-only stack (Supabase Free Tier + Vercel Hobby)
- Readable, commented code instead of "magic" libraries

---

*Actively in development* 🚧
