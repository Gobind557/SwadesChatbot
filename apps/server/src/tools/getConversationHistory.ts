import { db } from "@customer-support/db";
import { messages } from "@customer-support/db";
import { eq, desc } from "drizzle-orm";

export const getConversationHistory = {
  name: "getConversationHistory",
  description: "Fetch the last 10 messages from a conversation",
  async execute({ conversationId }: { conversationId: number }) {
    const history = await db
      .select()
      .from(messages)
      .where(eq(messages.conversationId, conversationId))
      .orderBy(desc(messages.createdAt))
      .limit(10);
    return history;
  },
};
