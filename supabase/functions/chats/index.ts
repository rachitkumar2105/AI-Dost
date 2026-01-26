
const corsHeaders = {
  "Access-Control-Allow-Origin": "*",
  "Access-Control-Allow-Headers": "authorization, x-client-info, apikey, content-type",
};

Deno.serve(async (req) => {
  // Handle CORS preflight requests
  if (req.method === "OPTIONS") {
    return new Response("ok", { headers: corsHeaders });
  }

  try {
    let messages;
    try {
      const body = await req.json();
      messages = body.messages;
    } catch (e) {
      throw new Error("Invalid JSON body received");
    }

    const GEMINI_API_KEY = Deno.env.get("GEMINI_API_KEY");

    if (!GEMINI_API_KEY) {
      // Return 200 with error details instead of 500
      return new Response(JSON.stringify({ error: "GEMINI_API_KEY is not configured on server", version: "v7-safe" }), {
        status: 200,
        headers: { ...corsHeaders, "Content-Type": "application/json" },
      });
    }

    console.log("Received chat request with", messages?.length, "messages");

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
- Use a friendly "human" tone, not a robotic one. Respond in Hinglish/Hindi as you usually do.
- Be concise. Keep your responses short and to the point unless asked for a detailed explanation. Avoid unnecessary fluff.

FORMATTING RULES (IMPORTANT):
- Use Markdown for all your responses.
- SPACING IS CRITICAL: You MUST use double newlines (\n\n) between EVERY SINGLE paragraph, list item, header, and code block.
- NEVER output text like "Step 1:...\nStep 2:...". It MUST be "Step 1:...\n\nStep 2:...".
- LISTS: Use proper Markdown lists (1. or -). Do not just bold the text (e.g. **Step 1** is bad, 1. **Step 1** is good).
- Sections: Use ### Headers with integers spacing.
- Visuals: Aim for an airy, easy-to-read structure.
- When writing code, ALWAYS start a new line before the code block.
- Example:
  Here is the code:

  \`\`\`python
  print("Hello")
  \`\`\`
- Do not output inline code blocks immediately after text without a line break unless it's a small variable name.`;

    const messagesForOpenRouter = [
      {
        role: "system",
        content: systemInstruction
      },
      ...(messages || []).map((msg: any) => ({
        role: msg.role === 'assistant' ? 'assistant' : 'user',
        content: msg.content
      }))
    ];

    console.log("Sending request to OpenRouter/Gemini...");

    const response = await fetch(
      "https://openrouter.ai/api/v1/chat/completions",
      {
        method: "POST",
        headers: {
          "Authorization": `Bearer ${GEMINI_API_KEY}`,
          "HTTP-Referer": "https://ai-dost.vercel.app",
          "X-Title": "AI Dost",
          "Content-Type": "application/json"
        },
        body: JSON.stringify({
          model: "google/gemini-2.0-flash-001",
          messages: messagesForOpenRouter,
          temperature: 0.7,
        }),
      }
    );

    if (!response.ok) {
      const errorText = await response.text();
      console.error("OpenRouter API error:", response.status, errorText);
      return new Response(JSON.stringify({ error: `OpenRouter API Error: ${response.status}`, details: errorText, version: "v8-openrouter" }), {
        status: 200,
        headers: { ...corsHeaders, "Content-Type": "application/json" },
      });
    }

    const data = await response.json();
    console.log("OpenRouter response received");

    // OpenRouter (OpenAI format) response parsing
    const reply = data.choices?.[0]?.message?.content || "No response generated.";

    return new Response(JSON.stringify({ reply }), {
      headers: { ...corsHeaders, "Content-Type": "application/json" },
    });

  } catch (e) {
    console.error("Chat function error:", e);
    // CRITICAL: Always return 200 OK so client sees the error message
    return new Response(JSON.stringify({ error: e instanceof Error ? e.message : "Unknown error", version: "v7-safe-catch" }), {
      status: 200,
      headers: { ...corsHeaders, "Content-Type": "application/json" },
    });
  }
});
