# AI Dost 🤖

Your friendly AI companion for coding, learning, and creative tasks. AI Dost features a premium dark theme, real-time message streaming, and a smooth, responsive user interface.

## 🚀 Deployment Instructions

Follow these steps to upload your project to GitHub and deploy it on Render.

### 1. Upload to GitHub

1. **Sign in to GitHub**: Go to [github.com](https://github.com) and log in.
2. **Create a New Repository**:
   - Click the **+** icon in the top right and select **New repository**.
   - Name it `ai-dost`.
   - Set it to **Public** (or Private if you prefer).
   - Click **Create repository**.
3. **Push your code**:
   Open your terminal in the project folder and run:
   ```bash
   git init
   git add .
   git commit -m "Initial commit: AI Dost Complete"
   git branch -M main
   git remote add origin https://github.com/rachitkumar2105/AI-Dost.git
   git push -u origin main
   ```
   *(Replace `YOUR_USERNAME` with your actual GitHub username)*

---

### 2. Deploy on Render

#### Option A: Blueprint (Faster)
1. Sign in to [render.com](https://render.com).
2. Click **New +** -> **Blueprint**.
3. Connect your GitHub repo `AI-Dost`.
4. Render will read `render.yaml` and ask for your Supabase keys.

#### Option B: Manual Static Site (Recommended if Option A fails)
1. Sign in to [render.com](https://render.com).
2. Click **New +** -> **Static Site**.
3. Connect your GitHub repository `rachitkumar2105/AI-Dost`.
4. **Configuration Settings**:
   - **Build Command**: `npm run build`
   - **Publish Directory**: `dist`
5. **Add Environment Variables**:
   - Click the **Environment** tab on the left.
   - Click **Add Environment Variable**.
   - Add `VITE_SUPABASE_URL` with your Supabase URL.
   - Add `VITE_SUPABASE_PUBLISHABLE_KEY` with your Supabase Key.
6. **Add Rewrites (CRITICAL for Blank Screen Fix)**:
   - Click the **Redirects/Rewrites** tab on the left.
   - Click **Add Rule**.
   - **Source**: `/*`
   - **Destination**: `/index.html`
   - **Type**: `Rewrite`
7. Click **Deploy Static Site**.

---

## 🛠 Tech Stack

- **Frontend**: React, Vite, Tailwind CSS, Shadcn UI
- **Icons**: Lucide React
- **Backend**: Supabase
- **Animations**: CSS Keyframes + Framer-like transitions

## 👨‍💻 Author

**(made by Rachit Kumar Singh.)**
