import { Agent } from "../types/agent";
import { getOrderDetails } from "../tools/getOrderDetails";
import { getDeliveryStatus } from "../tools/getDeliveryStatus";

export const orderAgent: Agent = {
  name: "order",
  description: "Handles order status, tracking",
  tools: [getOrderDetails, getDeliveryStatus],
  async execute({ message, context }) {
    // Extract order ID from message, for simplicity assume it's provided or use a default
    const orderId = context.orderId || 1; // TODO: parse from message
    const order = await getOrderDetails.execute({ orderId });
    const status = await getDeliveryStatus.execute({ orderId });
    return {
      response: `Your order ${orderId} is ${status}.`,
      agent: "order",
      reasoning: "Order query detected",
    };
  },
};
