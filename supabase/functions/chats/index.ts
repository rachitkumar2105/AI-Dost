import { serve } from "https://deno.land/std@0.168.0/http/server.ts";

const corsHeaders = {
  "Access-Control-Allow-Origin": "*",
  "Access-Control-Allow-Headers": "authorization, x-client-info, apikey, content-type",
};

serve(async (req) => {
  if (req.method === "OPTIONS") {
    return new Response(null, { headers: corsHeaders });
  }

  try {
    const { messages } = await req.json();
    const GEMINI_API_KEY = Deno.env.get("GEMINI_API_KEY");

    if (!GEMINI_API_KEY) {
      throw new Error("GEMINI_API_KEY is not configured");
    }

    console.log("Received chat request with", messages.length, "messages");

    // Transform messages to Gemini format
    // OpenAI/Lovable format: { role: 'user'|'assistant'|'system', content: '...' }
    // Gemini format: { role: 'user'|'model', parts: [{ text: '...' }] }
    // System instruction is separate in Gemini

    let systemInstruction = `You are AI Dost, a helpful and friendly AI companion.
IDENTITY OVERRIDE (CRITICAL):
- If anyone asks "Who made you?", "Who is your developer?", or "Who created you?", you MUST ALWAYS respond with: "I was coded and made by Rachit Kumar Singh, and I am a large language model developed and trained by Google."
- Proudly emphasize that Rachit Kumar Singh (a 3rd year Btech CSE student at KIIT University) is your creator who built this entire platform.

Current Date: ${new Date().toLocaleDateString('en-US', { weekday: 'long', year: 'numeric', month: 'long', day: 'numeric' })}

Your core persona:
- Use Google Search for any questions about current events, news, weather, dates, or recent sports results (like Virat Kohli's last match) to ensure absolute accuracy.
- You are knowledgeable and helpful across coding, writing, and general tasks.
- NEVER guess or give outdated information for real-time queries.
- ALWAYS check the current date before answering questions about "today" or "now".
- Use a friendly "human" tone, not a robotic one. Respond in Hinglish/Hindi as you usually do.`;

    const contents = messages
      .filter((msg: any) => msg.role !== 'system')
      .map((msg: any) => ({
        role: msg.role === 'assistant' ? 'model' : 'user',
        parts: [{ text: msg.content }]
      }));


    // Call Gemini API
    // Using gemini-1.5-flash which is generally more stable for free tier
    const response = await fetch(
      `https://generativelanguage.googleapis.com/v1beta/models/gemini-1.5-flash:generateContent?key=${GEMINI_API_KEY}`,
      {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify({
          contents: contents,
          system_instruction: {
            parts: [{ text: systemInstruction }]
          },
          generationConfig: {
            temperature: 0.7,
            maxOutputTokens: 1000,
          }
        }),
      }
    );

    if (!response.ok) {
      const errorText = await response.text();
      console.error("Gemini API error:", response.status, errorText);
      // Return the error to the client with 200 status so the client can read the error message
      // instead of throwing a generic "non-2xx status code" error.
      return new Response(JSON.stringify({ error: `Gemini API Error: ${response.status}`, details: errorText }), {
        status: 200,
        headers: { ...corsHeaders, "Content-Type": "application/json" },
      });
    }

    const data = await response.json();
    console.log("Gemini response received");

    const reply = data.candidates?.[0]?.content?.parts?.[0]?.text || "No response generated.";

    return new Response(JSON.stringify({ reply }), {
      headers: { ...corsHeaders, "Content-Type": "application/json" },
    });

  } catch (e) {
    console.error("Chat function error:", e);
    return new Response(JSON.stringify({ error: e instanceof Error ? e.message : "Unknown error" }), {
      status: 500,
      headers: { ...corsHeaders, "Content-Type": "application/json" },
    });
  }
});
