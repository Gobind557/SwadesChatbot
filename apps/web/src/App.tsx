import { useState } from "react";
import { hc } from "hono/client";
import type { AppType } from "@customer-support/api";
import "./App.css";

const client = hc<AppType>("/");

type ChatResponse = {
  response: string;
  agent: string;
  reasoning: string;
  conversationId: number;
};

function App() {
  const [message, setMessage] = useState("");
  const [response, setResponse] = useState<ChatResponse | null>(null);
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState<string | null>(null);

  const sendMessage = async () => {
    const trimmedMessage = message.trim();
    if (!trimmedMessage || loading) {
      return;
    }

    setLoading(true);
    setError(null);
    try {
      const res = await client.api.chat.messages.$post({
        json: { message: trimmedMessage },
      });
      if (!res.ok) {
        throw new Error("Failed to reach support service");
      }
      const data = (await res.json()) as ChatResponse;
      setResponse(data);
      setMessage("");
    } catch (error) {
      console.error(error);
      setError("We couldn't send your message. Please try again.");
    }
    setLoading(false);
  };

  return (
    <main className="app-shell">
      <section className="hero">
        <p className="eyebrow">SwadesChatbot</p>
        <h1>Multi-Agent Customer Support Console</h1>
        <p className="hero-copy">
          Ask anything about orders, billing, or support. The router assigns the
          best specialist and returns a structured answer in one flow.
        </p>
        <div className="pill-row">
          <span className="pill">Hono RPC</span>
          <span className="pill">Drizzle + PostgreSQL</span>
          <span className="pill">Typed Monorepo</span>
        </div>
      </section>

      <section className="chat-card">
        <div className="chat-head">
          <h2>Start a conversation</h2>
          <span className={`status ${loading ? "busy" : "ready"}`}>
            {loading ? "Routing..." : "Ready"}
          </span>
        </div>

        <div className="composer">
          <input
            type="text"
            value={message}
            onChange={(e) => setMessage(e.target.value)}
            onKeyDown={(e) => {
              if (e.key === "Enter") {
                void sendMessage();
              }
            }}
            placeholder="Try: Where is order #1021?"
            aria-label="Type your support message"
          />
          <button
            onClick={() => {
              void sendMessage();
            }}
            disabled={loading || !message.trim()}
          >
            {loading ? "Thinking..." : "Send"}
          </button>
        </div>

        {error && <p className="feedback error">{error}</p>}

        {!response && !error && !loading && (
          <p className="feedback hint">
            Your response will appear below with routed agent details.
          </p>
        )}

        {response && (
          <div className="response-panel">
            <article className="response-block primary">
              <p className="label">Assistant Reply</p>
              <p>{response.response}</p>
            </article>
            <div className="response-grid">
              <article className="response-block">
                <p className="label">Selected Agent</p>
                <p className="value">{response.agent}</p>
              </article>
              <article className="response-block">
                <p className="label">Conversation ID</p>
                <p className="value">#{response.conversationId}</p>
              </article>
              <article className="response-block span-2">
                <p className="label">Routing Reasoning</p>
                <p>{response.reasoning}</p>
              </article>
            </div>
          </div>
        )}
      </section>
    </main>
  );
}

export default App;
