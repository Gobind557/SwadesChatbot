import { db } from "@customer-support/db";
import { conversations, messages } from "@customer-support/db";
import { eq, desc } from "drizzle-orm";
import { routerAgent } from "../agents/routerAgent";
import { agentRegistry } from "../agents/agentRegistry";

export class ChatService {
  async handleMessage(message: string, conversationId?: number) {
    const trimmedMessage = message.trim();

    // Create or get conversation
    let convId = conversationId;
    if (!convId) {
      const now = new Date();
      const [conv] = await db
        .insert(conversations)
        .values({ createdAt: now, updatedAt: now })
        .returning();
      convId = conv.id;
    }

    // Fetch context: last 10 messages
    const context = await db
      .select()
      .from(messages)
      .where(eq(messages.conversationId, convId))
      .orderBy(desc(messages.createdAt))
      .limit(10);

    await db.insert(messages).values({
      conversationId: convId,
      role: "user",
      content: trimmedMessage,
    });

    // Route message
    const agentType = routerAgent.route(trimmedMessage);

    // Get agent
    const agent = agentRegistry[agentType] ?? agentRegistry.support;

    // Execute agent
    const result = await agent.execute({
      message: trimmedMessage,
      context: {
        conversationId: convId,
        messages: context,
      },
    });

    // Persist response
    await db.insert(messages).values({
      conversationId: convId,
      role: "assistant",
      content: result.response,
      agent: result.agent,
      reasoning: result.reasoning,
    });

    return { ...result, conversationId: convId };
  }
}
