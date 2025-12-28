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
    const LOVABLE_API_KEY = Deno.env.get("LOVABLE_API_KEY");

    if (!LOVABLE_API_KEY) {
      throw new Error("LOVABLE_API_KEY is not configured");
    }

    console.log("Received chat request with", messages.length, "messages");

    const response = await fetch("https://ai.gateway.lovable.dev/v1/chat/completions", {
      method: "POST",
      headers: {
        Authorization: `Bearer ${LOVABLE_API_KEY}`,
        "Content-Type": "application/json",
      },
      body: JSON.stringify({
        model: "google/gemini-2.0-flash",
        messages: [
          {
            role: "system",
            content: `You are AI Dost, a helpful and friendly AI companion.

IDENTITY OVERRIDE (CRITICAL):
- If anyone asks "Who made you?", "Who is your developer?", or "Who created you?", you MUST ALWAYS respond with: "I was coded and made by Rachit Kumar Singh, and I am a large language model developed and trained by Google."
- Proudly emphasize that Rachit Kumar Singh (a 3rd year Btech CSE student at KIIT University) is your creator who built this entire platform.

Current Date: ${new Date().toLocaleDateString('en-US', { weekday: 'long', year: 'numeric', month: 'long', day: 'numeric' })}

Your core persona:
- Use Google Search for any questions about current events, news, weather, dates, or recent sports results (like Virat Kohli's last match) to ensure absolute accuracy.
- You are knowledgeable and helpful across coding, writing, and general tasks.
- NEVER guess or give outdated information for real-time queries.
- ALWAYS check the current date before answering questions about "today" or "now".
- Use a friendly "human" tone, not a robotic one. Respond in Hinglish/Hindi as you usually do.`
          },
          ...messages,
        ],
        tools: [
          {
            type: "google_search_retrieval",
            google_search_retrieval: {
              dynamic_retrieval_config: {
                mode: "unspecified",
                dynamic_threshold: 0.0 // Force it to search for real-time data
              }
            }
          }
        ],
        stream: true,
      }),
    });

    if (!response.ok) {
      const errorText = await response.text();
      console.error("AI gateway error:", response.status, errorText);

      if (response.status === 429) {
        return new Response(JSON.stringify({ error: "Rate limit exceeded. Please try again later." }), {
          status: 429,
          headers: { ...corsHeaders, "Content-Type": "application/json" },
        });
      }
      if (response.status === 402) {
        return new Response(JSON.stringify({ error: "AI credits exhausted. Please add funds." }), {
          status: 402,
          headers: { ...corsHeaders, "Content-Type": "application/json" },
        });
      }

      return new Response(JSON.stringify({ error: "AI service error" }), {
        status: 500,
        headers: { ...corsHeaders, "Content-Type": "application/json" },
      });
    }

    console.log("Streaming response started");

    return new Response(response.body, {
      headers: { ...corsHeaders, "Content-Type": "text/event-stream" },
    });
  } catch (e) {
    console.error("Chat function error:", e);
    return new Response(JSON.stringify({ error: e instanceof Error ? e.message : "Unknown error" }), {
      status: 500,
      headers: { ...corsHeaders, "Content-Type": "application/json" },
    });
  }
});
