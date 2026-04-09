import { Hono } from "hono";
import { ChatService } from "../services/chatService";
import { db } from "@customer-support/db";
import { conversations, messages } from "@customer-support/db";
import { eq } from "drizzle-orm";
import { agentRegistry } from "../agents/agentRegistry";

const chatService = new ChatService();

export const chatController = new Hono();

chatController.post("/messages", async (c) => {
  try {
    const body = await c.req.json();
    const message =
      typeof body.message === "string" ? body.message.trim() : undefined;
    const conversationId =
      typeof body.conversationId === "number" ? body.conversationId : undefined;

    if (!message) {
      return c.json({ error: "Message is required" }, 400);
    }

    const result = await chatService.handleMessage(message, conversationId);
    return c.json(result);
  } catch (error) {
    console.error("POST /api/chat/messages failed", error);
    return c.json({ error: "Failed to process message" }, 500);
  }
});

chatController.get("/conversations", async (c) => {
  const convs = await db.select().from(conversations);
  return c.json(convs);
});

chatController.get("/conversations/:id", async (c) => {
  const id = parseInt(c.req.param("id"));
  const conv = await db
    .select()
    .from(conversations)
    .where(eq(conversations.id, id))
    .limit(1);
  if (!conv[0]) return c.json({ error: "Not found" }, 404);
  const msgs = await db
    .select()
    .from(messages)
    .where(eq(messages.conversationId, id));
  return c.json({ conversation: conv[0], messages: msgs });
});

chatController.delete("/conversations/:id", async (c) => {
  const id = parseInt(c.req.param("id"));
  await db.delete(messages).where(eq(messages.conversationId, id));
  await db.delete(conversations).where(eq(conversations.id, id));
  return c.json({ success: true });
});

export const agentController = new Hono();

agentController.get("/agents", async (c) => {
  const agents = Object.keys(agentRegistry).map((key) => ({
    name: agentRegistry[key].name,
    description: agentRegistry[key].description,
  }));
  return c.json(agents);
});

agentController.get("/agents/:type/capabilities", async (c) => {
  const type = c.req.param("type");
  const agent = agentRegistry[type];
  if (!agent) return c.json({ error: "Agent not found" }, 404);
  return c.json({
    name: agent.name,
    description: agent.description,
    tools: agent.tools.map((t) => ({
      name: t.name,
      description: t.description,
    })),
  });
});
