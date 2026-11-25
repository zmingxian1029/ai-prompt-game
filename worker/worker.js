// Cloudflare Worker: proxies the free-practice sandbox to DeepSeek.
// The API key is NOT stored here; it lives in the Worker secret DEEPSEEK_API_KEY.

const MODEL = "deepseek-chat";
const MAX_PROMPT_LENGTH = 500;
const MAX_TOKENS = 200;

function json(data, status) {
  return new Response(JSON.stringify(data), {
    status: status || 200,
    headers: { "content-type": "application/json" }
  });
}

function cors(response) {
  const headers = new Headers(response.headers);
  headers.set("access-control-allow-origin", "*");
  headers.set("access-control-allow-methods", "POST, OPTIONS");
  headers.set("access-control-allow-headers", "content-type");
  return new Response(response.body, {
    status: response.status,
    statusText: response.statusText,
    headers: headers
  });
}

export default {
  async fetch(request, env) {
    if (request.method === "OPTIONS") {
      return cors(new Response(null, { status: 204 }));
    }

    const url = new URL(request.url);
    if (request.method !== "POST" || url.pathname !== "/api/generate") {
      return cors(json({ error: "not found" }, 404));
    }

    try {
      const body = await request.json();
      const prompt = String(body.prompt || "").trim();

      if (!prompt) {
        return cors(json({ error: "prompt is empty" }, 400));
      }
      if (prompt.length > MAX_PROMPT_LENGTH) {
        return cors(json({ error: "prompt is too long" }, 400));
      }

      const apiKey = env.DEEPSEEK_API_KEY;
      if (!apiKey) {
        return cors(json({ error: "server is not configured" }, 500));
      }

      const upstream = await fetch("https://api.deepseek.com/chat/completions", {
        method: "POST",
        headers: {
          "content-type": "application/json",
          "authorization": "Bearer " + apiKey
        },
        body: JSON.stringify({
          model: MODEL,
          messages: [
            {
              role: "system",
              content: "You are a friendly assistant. Answer the user's request briefly and clearly."
            },
            {
              role: "user",
              content: prompt
            }
          ],
          max_tokens: MAX_TOKENS,
          temperature: 0.7
        })
      });

      if (!upstream.ok) {
        return cors(json({ error: "upstream error " + upstream.status }, 502));
      }

      const data = await upstream.json();
      const text =
        data &&
        data.choices &&
        data.choices[0] &&
        data.choices[0].message
          ? data.choices[0].message.content
          : "";

      return cors(json({ text: text }));
    } catch (e) {
      return cors(json({ error: "internal error" }, 500));
    }
  }
};
