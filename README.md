# CS313x — Interactive Information Retrieval Course

An interactive course website for **CS313x Information Retrieval**, featuring hands-on visualizations, step-by-step tutorials, and practice quizzes designed for deep understanding.

![Next.js](https://img.shields.io/badge/Next.js-16-black?logo=next.js)
![Vercel](https://img.shields.io/badge/Deployed_on-Vercel-000?logo=vercel)
![License](https://img.shields.io/badge/License-MIT-blue)

## ✨ Features

- **37 Interactive Visualizations** — Learn by doing with real-time parameter manipulation
- **4 Comprehensive Chapters** covering core IR topics
- **Progress Tracking** — Track your learning journey with localStorage-based progress
- **Category Filtering** — Filter visualizations by topic area
- **Practice Quizzes** — 100+ questions with instant feedback
- **PDF Lecture Slides** — Downloadable for each chapter
- **Responsive Design** — Works on desktop, tablet, and mobile
- **Glassmorphism UI** — Modern dark theme with particle background animation

## 📚 Chapters

| Chapter | Topic | Visualizations |
|---------|-------|:-:| 
| Week 2 | Text Processing & Tokenization | 7 |
| Week 3 | Vector Space Model & TF-IDF Scoring | 11 |
| Week 4 | Index Construction & Compression | 7 |
| Week 6 | Evaluation in Information Retrieval | 12 |

## 🚀 Getting Started

### Prerequisites
- Node.js 18+
- npm

### Installation

```bash
git clone https://github.com/mizatrix/cs313x-course.git
cd cs313x-course
npm install
```

### Development

```bash
npm run dev
```

Open [http://localhost:3000](http://localhost:3000) in your browser.

### Production Build

```bash
npm run build
npm start
```

## 🌐 Deployment

This project is optimized for **Vercel**:

1. Push to GitHub
2. Import the repo on [vercel.com](https://vercel.com)
3. Vercel auto-detects Next.js — click Deploy
4. Share the URL with your students!

## 🛠️ Tech Stack

- **Framework**: [Next.js 16](https://nextjs.org/) (App Router)
- **Styling**: Vanilla CSS with custom design tokens
- **Font**: [Inter](https://fonts.google.com/specimen/Inter)
- **Deployment**: [Vercel](https://vercel.com)
- **Visualizations**: Standalone HTML/JS embedded via iframe

## 📁 Project Structure

```
cs313x-web/
├── app/
│   ├── globals.css              # Design system (glassmorphism tokens)
│   ├── layout.js                # Root layout + SEO metadata
│   ├── page.js                  # Homepage
│   ├── data/chapters.js         # Chapter & visualization data
│   ├── components/
│   │   ├── ParticleCanvas.js    # Animated particle background
│   │   ├── Navbar.js            # Sticky glassmorphism navbar
│   │   └── ChapterHub.js       # Hub with cards, filters, progress
│   └── chapters/[id]/
│       ├── page.js              # Chapter hub page (SSG)
│       ├── viz/[vizId]/page.js  # Visualization iframe page
│       └── fullpage/page.js     # Full-page iframe
└── public/static/               # Original chapter HTML/CSS/JS/PDF
```

## 👨‍🏫 For Instructors

To add a new chapter:

1. Add the chapter's HTML files to `public/static/chapterXX/`
2. Add the chapter data to `app/data/chapters.js`
3. The hub page and visualization routes are generated automatically

---

Made with ❤️ for CS313x students
