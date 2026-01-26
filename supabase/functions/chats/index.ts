
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

FORMATTING RULES (IMPORTANT):
- Use Markdown for all your responses.
- ALWAYS use double newlines between paragraphs to ensure they render correctly.
- When writing code, ALWAYS start a new line before the code block.
- Example:
  Here is the code:

  \`\`\`python
  print("Hello")
  \`\`\`
- Do not output inline code blocks immediately after text without a line break unless it's a small variable name.`;

    const contents = (messages || [])
      .filter((msg: any) => msg.role !== 'system')
      .map((msg: any) => ({
        role: msg.role === 'assistant' ? 'model' : 'user',
        parts: [{ text: msg.content }]
      }));

    const finalContents = [
      {
        role: 'user',
        parts: [{ text: `System Instruction:\n${systemInstruction}\n\nUser Request:` }]
      },
      ...contents
    ];

    const response = await fetch(
      `https://generativelanguage.googleapis.com/v1beta/models/gemini-flash-latest:generateContent?key=${GEMINI_API_KEY}`,
      {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify({
          contents: finalContents,
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
      return new Response(JSON.stringify({ error: `Gemini API Error: ${response.status}`, details: errorText, version: "v7-safe" }), {
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
    // CRITICAL: Always return 200 OK so client sees the error message
    return new Response(JSON.stringify({ error: e instanceof Error ? e.message : "Unknown error", version: "v7-safe-catch" }), {
      status: 200,
      headers: { ...corsHeaders, "Content-Type": "application/json" },
    });
  }
});
