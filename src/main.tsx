import { createRoot } from "react-dom/client";
import App from "./App.tsx";
import "./index.css";

const supabaseUrl = import.meta.env.VITE_SUPABASE_URL;
const supabaseKey = import.meta.env.VITE_SUPABASE_PUBLISHABLE_KEY;

if (!supabaseUrl || !supabaseKey) {
    createRoot(document.getElementById("root")!).render(
        <div style={{
            minHeight: '100vh',
            display: 'flex',
            alignItems: 'center',
            justifyContent: 'center',
            backgroundColor: '#000',
            color: '#fff',
            fontFamily: 'sans-serif',
            padding: '20px',
            textAlign: 'center'
        }}>
            <div style={{ maxWidth: '400px', border: '1px solid #333', padding: '30px', borderRadius: '12px', background: '#111' }}>
                <h1 style={{ color: '#0ea5e9', marginBottom: '10px' }}>AI Dost Deployment</h1>
                <p style={{ color: '#999', marginBottom: '20px' }}>Supabase variables are missing in your environment.</p>
                <div style={{ textAlign: 'left', background: '#000', padding: '15px', borderRadius: '8px', fontSize: '13px', border: '1px solid #222' }}>
                    <p style={{ margin: '5px 0' }}>✅ Add these to Render Environment:</p>
                    <code style={{ color: '#0ea5e9', display: 'block', margin: '5px 0' }}>VITE_SUPABASE_URL</code>
                    <code style={{ color: '#0ea5e9', display: 'block', margin: '5px 0' }}>VITE_SUPABASE_PUBLISHABLE_KEY</code>
                </div>
                <p style={{ marginTop: '20px', fontSize: '12px', color: '#666' }}>After adding them, your app will work automatically.</p>
            </div>
        </div>
    );
} else {
    createRoot(document.getElementById("root")!).render(<App />);
}
