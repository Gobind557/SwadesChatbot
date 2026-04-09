import { Agent } from "../types/agent";
import { getInvoice } from "../tools/getInvoice";
import { checkRefundStatus } from "../tools/checkRefundStatus";

export const billingAgent: Agent = {
  name: "billing",
  description: "Handles payments, refunds",
  tools: [getInvoice, checkRefundStatus],
  async execute({ message, context }) {
    // Assume orderId or paymentId
    const orderId = context.orderId || 1;
    const invoice = await getInvoice.execute({ orderId });
    return {
      response: `Your invoice for order ${orderId} is ${invoice?.amount || "N/A"}.`,
      agent: "billing",
      reasoning: "Billing query detected",
    };
  },
};
