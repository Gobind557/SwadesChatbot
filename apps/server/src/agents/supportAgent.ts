import { Agent } from "../types/agent";
import { getConversationHistory } from "../tools/getConversationHistory";

export const supportAgent: Agent = {
  name: "support",
  description: "Handles FAQs, general queries",
  tools: [getConversationHistory],
  async execute({ message, context }) {
    // Simple logic: use tool to get history and respond
    const history = await getConversationHistory.execute({
      conversationId: context.conversationId,
    });
    // For now, hardcoded response
    return {
      response:
        "I'm here to help with your general queries. How can I assist you?",
      agent: "support",
      reasoning: "General support query detected",
    };
  },
};
