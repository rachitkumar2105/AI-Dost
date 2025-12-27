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

1. **Sign in to Render**: Go to [render.com](https://render.com).
2. **Create a New Blueprint Instance**:
   - Render will see your `render.yaml` file.
   - Click **New +** and select **Blueprint**.
   - Connect your GitHub account and select the `ai-dost` repository.
3. **Configure Environment Variables**:
   In the Render dashboard, go to **Environment** and add:
   - `VITE_SUPABASE_URL`: (Your Supabase URL)
   - `VITE_SUPABASE_PUBLISHABLE_KEY`: (Your Supabase Key)
4. **Deploy**:
   Render will automatically use the `buildCommand` and `staticPublishPath` defined in your `render.yaml`.
   - **Build Command**: `npm run build`
   - **Publish Directory**: `dist`

---

## 🛠 Tech Stack

- **Frontend**: React, Vite, Tailwind CSS, Shadcn UI
- **Icons**: Lucide React
- **Backend**: Supabase
- **Animations**: CSS Keyframes + Framer-like transitions

## 👨‍💻 Author

**(made by Rachit Kumar Singh.)**
