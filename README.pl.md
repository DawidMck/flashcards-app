🇬🇧 [Read in English](README.md)
# 📚 Flashcards App

Aplikacja webowa PWA do nauki słówek języka angielskiego oparta na systemie **Spaced Repetition System (SRS)**.

Zbudowana od zera jako projekt edukacyjny — krok po kroku, bez frameworków.

---

## 🌐 Demo

👉 **[flashcards-app-chi-six.vercel.app](https://flashcards-app-chi-six.vercel.app)**

> Aplikację możesz zainstalować na telefonie jako PWA — wejdź na powyższy link w przeglądarce mobilnej i dodaj do ekranu głównego.

---

## ✨ Funkcje

- 🎯 **System SRS** — 4 poziomy oceny (Nie wiem / Trudne / Dobre / Łatwe), inteligentne planowanie powtórek
- 📖 **Zdania przykładowe** — każde słówko ma przykład użycia w kontekście
- 🆘 **Tryb S.O.S.** — szybka powtórka słówek z błędami z danego dnia
- 🔥 **Streak** — licznik dni nauki z rzędu
- 📊 **Statystyki** — postęp per poziom, słówka do powtórki, historia nauki
- 🌍 **Dwa kierunki nauki** — Angielski → Polski oraz Polski → Angielski
- 📱 **PWA** — działa jak natywna aplikacja na telefonie, dostępna offline

---

## 📦 Poziomy i kategorie

| Poziom | Słówek | Kategorie |
|--------|--------|-----------|
| A1 | ~70 | Jedzenie, Podróże, Dom, Zwierzęta, Szkoła |
| B1 | ~155 | Jedzenie, Podróże, Dom, Zwierzęta, Szkoła, Praca, Zdrowie, Technologia, Środowisko, Osobowość |
| B2 | ~150 | Jedzenie, Podróże, Dom, Zwierzęta, Szkoła, Praca, Zdrowie, Technologia, Środowisko, Osobowość |

---

## 🛠️ Stack technologiczny

| Warstwa | Technologia | Dlaczego |
|---------|-------------|----------|
| Frontend | HTML + CSS + Vanilla JS | Zero zależności, maksymalna prostota |
| Baza danych | [Supabase](https://supabase.com) (PostgreSQL) | Darmowy tier, REST API out-of-the-box |
| Hosting | [Vercel](https://vercel.com) | Darmowy, automatyczny deploy z GitHuba |
| PWA | Web App Manifest + Service Worker | Instalacja na telefonie, tryb offline |

---

## 🗄️ Struktura bazy danych

```sql
-- Słówka
CREATE TABLE words (
  id            bigint PRIMARY KEY,
  created_at    timestamptz DEFAULT now(),
  english       text NOT NULL,
  polish        text NOT NULL,
  level         text,          -- A1, A2, B1, B2
  category      text,          -- food, travel, home...
  example_eng   text,          -- zdanie przykładowe EN
  example_pl    text,          -- zdanie przykładowe PL
  next_review_at timestamptz,  -- kiedy następna powtórka
  interval_days  int4,         -- aktualny interwał SRS
  sos_date      date           -- data ostatniego błędu
);

-- Sesje nauki (do obliczania streaka)
CREATE TABLE study_sessions (
  id            bigint PRIMARY KEY,
  studied_at    date UNIQUE,
  words_reviewed int4
);
```

---

## 📁 Struktura projektu

```
flashcards-app/
├── index.html          # Cała aplikacja (HTML + CSS + JS)
├── manifest.json       # Konfiguracja PWA
├── service-worker.js   # Cache i obsługa offline
└── icon.png            # Ikona aplikacji
```

---

## 🚀 Jak uruchomić lokalnie

1. Sklonuj repozytorium:
```bash
git clone https://github.com/DawidMck/flashcards-app.git
cd flashcards-app
```

2. Utwórz projekt na [Supabase](https://supabase.com) i stwórz tabele według schematu powyżej

3. W pliku `index.html` podmień klucze:
```javascript
const SUPABASE_URL = "https://twoj-projekt.supabase.co";
const SUPABASE_KEY = "twoj-anon-key";
```

4. Otwórz `index.html` w przeglądarce lub użyj lokalnego serwera

---

## 📈 Algorytm SRS

Po każdej powtórce użytkownik ocenia słówko — aplikacja ustawia datę następnej powtórki:

| Ocena | Następna powtórka |
|-------|-------------------|
| 😰 Nie wiem | za 10 minut |
| 😓 Trudne | za 1 dzień |
| 🙂 Dobre | za 3 dni |
| 😄 Łatwe | za 7 dni |

Słówka ocenione jako "Nie wiem" trafiają do **kolejki S.O.S.** i można je powtórzyć w dowolnym momencie tego dnia.

---

## 🗺️ Roadmap

- [x] System SRS z 4 poziomami oceny
- [x] Baza słówek A1, B1, B2 ze zdaniami przykładowymi
- [x] Tryb S.O.S.
- [x] Statystyki i streak
- [x] PWA (instalacja na telefonie)
- [ ] Logowanie użytkowników (Supabase Auth)
- [ ] Powiadomienia push
- [ ] Panel admina do zarządzania słówkami
- [ ] Tryb testu z wynikiem końcowym

---

## 👨‍💻 O projekcie

Projekt budowany iteracyjnie jako nauka programowania webowego i architektury chmurowej. Każdy krok był świadomie zaplanowany — od pojedynczej tabeli w bazie danych, przez logikę SRS, aż po deployment jako PWA.

**Zasady które stosowałem:**
- Jeden krok na raz — weryfikacja przed przejściem dalej
- Tylko darmowe rozwiązania (Supabase Free Tier + Vercel Hobby)
- Czytelny kod z komentarzami zamiast "magicznych" bibliotek

---

*Projekt w aktywnym rozwoju* 🚧
