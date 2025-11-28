# gr33njj.dev — Multitool Engineer Portfolio

![Status](https://img.shields.io/website?url=https%3A%2F%2Fgr33njj.dev&style=for-the-badge&label=gr33njj.dev)
![Tech](https://img.shields.io/badge/Next.js-14-black?style=for-the-badge&logo=next.js)
![Style](https://img.shields.io/badge/Style-Technocratic-9a13e8?style=for-the-badge)

Modern, dark-themed portfolio website for a multitool engineer. Built with a focus on performance, "vibe coding" aesthetics, and engineering discipline.

🌐 **Live:** [https://gr33njj.dev](https://gr33njj.dev)

---

## ✨ Features

- **Technocratic Design**: Dark theme, monospace typography, neon accents (`#9a13e8`).
- **Web3 Aesthetics**: Custom Canvas-based particle network background.
- **Bilingual**: Full support for English and Russian languages.
- **Blog System**: Git-based CMS using MDX for engineering notes.
- **Tech Stack Showcase**: Visual grid of backend, devops, and frontend skills.
- **Contact Form**: Integrated with Nodemailer and SMTP.

## 🛠 Tech Stack

- **Framework**: [Next.js 14](https://nextjs.org/) (App Router)
- **Styling**: [Tailwind CSS](https://tailwindcss.com/)
- **Animations**: [Framer Motion](https://www.framer.com/motion/) + HTML5 Canvas
- **Content**: MDX + [Gray Matter](https://github.com/jonschlinkert/gray-matter)
- **Icons**: [Lucide React](https://lucide.dev/)
- **Deployment**: Self-hosted (Ubuntu + Nginx + PM2)

## 📂 Project Structure

```bash
├── app/                  # Next.js App Router
│   ├── api/              # API Routes (Contact, Blog)
│   ├── blog/             # Blog pages
│   ├── layout.tsx        # Root layout & providers
│   └── page.tsx          # Landing page
├── components/           # React Components
│   ├── ui/               # Primitives & Visuals
│   ├── Hero.tsx          # Main section
│   └── ...
├── content/              # Blog Posts (MDX)
├── lib/                  # Utilities (i18n, blog logic)
└── public/               # Static assets
```

## 🚀 Local Development

1. **Clone the repository:**
   ```bash
   git clone https://github.com/gr33njj/gr33njj-dev-landing.git
   cd gr33njj-dev-landing
   ```

2. **Install dependencies:**
   ```bash
   npm install
   ```

3. **Set up environment variables:**
   Create `.env.local` file:
   ```ini
   SMTP_HOST=connect.smtp.bz
   SMTP_PORT=465
   SMTP_USER=your_user
   SMTP_PASS=your_pass
   CONTACT_EMAIL=your_email
   ```

4. **Run development server:**
   ```bash
   npm run dev
   ```

## 📝 Blogging

To add a new post, simply create a `.mdx` file in `content/blog/`:

```markdown
---
title: "My New Engineering Post"
date: "2024-11-28"
excerpt: "Short description for the card."
tags: ["devops", "coding"]
lang: "en"
---

# Hello World
Content goes here...
```

## 📄 License

MIT © [gr33njj](https://github.com/gr33njj)
