import { useState } from "react";
import { hc } from "hono/client";
import type { AppType } from "@customer-support/api";

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

  const sendMessage = async () => {
    setLoading(true);
    try {
      const res = await client.api.chat.messages.$post({
        json: { message },
      });
      const data = (await res.json()) as ChatResponse;
      setResponse(data);
    } catch (error) {
      console.error(error);
    }
    setLoading(false);
  };

  return (
    <div style={{ padding: "20px" }}>
      <h1>Customer Support Chat</h1>
      <input
        type="text"
        value={message}
        onChange={(e) => setMessage(e.target.value)}
        placeholder="Type your message"
        style={{ width: "300px", marginRight: "10px" }}
      />
      <button onClick={sendMessage} disabled={loading}>
        Send
      </button>
      {loading && <p>Thinking...</p>}
      {response && (
        <div>
          <p>
            <strong>Response:</strong> {response.response}
          </p>
          <p>
            <strong>Agent:</strong> {response.agent}
          </p>
          <p>
            <strong>Reasoning:</strong> {response.reasoning}
          </p>
        </div>
      )}
    </div>
  );
}

export default App;
