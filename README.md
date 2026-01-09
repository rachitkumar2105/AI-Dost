# AI Dost 🤖

Your friendly AI companion for coding, learning, and creative tasks. AI Dost features a premium dark theme, real-time message streaming, and a smooth, responsive user interface.

## ✨ Features

- **Personalized AI Chat**: Intelligent conversations powered by Gemini 2.0 Flash context.
- **Real-time Streaming**: Instant responses with typing indicators.
- **Rich Text Support**: Full Markdown rendering including code blocks, lists, and tables.
- **Responsive Design**: Seamless experience across mobile, tablet, and desktop devices.
- **Project Organization**: Save and manage multiple chat conversations.
- **Premium UI**: Modern dark-themed interface built with Shadcn UI and Tailwind CSS.
- **Voice Capabilities**: (Optional) Text-to-speech integration.

## 🛠 Tech Stack

- **Framework**: [React](https://react.dev/) + [Vite](https://vitejs.dev/) + [TypeScript](https://www.typescriptlang.org/)
- **Styling**: [Tailwind CSS](https://tailwindcss.com/) + [Shadcn UI](https://ui.shadcn.com/) + [Lucide Icons](https://lucide.dev/)
- **State Management**: [TanStack Query](https://tanstack.com/query/latest)
- **Backend/Database**: [Supabase](https://supabase.com/) (Edge Functions for AI proxy)
- **Forms**: React Hook Form + Zod validation
- **Visualization**: Recharts

## 🚀 Getting Started

Follow these steps to run the project locally.

### Prerequisites
- Node.js (v18 or higher)
- npm or yarn

### Installation

1. **Clone the repository**
   ```bash
   git clone https://github.com/rachitkumar2105/AI-Dost.git
   cd AI-Dost
   ```

2. **Install dependencies**
   ```bash
   npm install
   ```

3. **Configure Environment Variables**
   Create a `.env` file in the root directory and add your Supabase credentials:
   ```env
   VITE_SUPABASE_URL=your_supabase_url
   VITE_SUPABASE_PUBLISHABLE_KEY=your_supabase_anon_key
   ```

4. **Run the development server**
   ```bash
   npm run dev
   ```
   Open [http://localhost:8080](http://localhost:8080) to view it in the browser.

## 📦 Deployment Instructions

Follow these steps to deploy your project to production.

### 1. Upload to GitHub

1. **Initialize Git**:
   ```bash
   git init
   git add .
   git commit -m "Initial commit"
   git branch -M main
   git remote add origin https://github.com/rachitkumar2105/AI-Dost.git
   git push -u origin main
   ```

### 2. Deploy on Render

#### Option A: Blueprint (Recommended)
1. Sign in to [render.com](https://render.com).
2. Click **New +** -> **Blueprint**.
3. Connect your GitHub repo `AI-Dost`.
4. Render will auto-detect configuration from `render.yaml`.

#### Option B: Manual Static Site
1. Create a **Static Site** on Render.
2. Connect your repository.
3. **Build Command**: `npm run build`
4. **Publish Directory**: `dist`
5. **Environment Variables**: Add `VITE_SUPABASE_URL` and `VITE_SUPABASE_PUBLISHABLE_KEY`.
6. **Rewrite Rule** (Crucial for SPA):
   - Source: `/*`
   - Destination: `/index.html`
   - Type: `Rewrite`

---

## 👨‍💻 Author

**Rachit Kumar Singh**
