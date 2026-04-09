export const routerAgent = {
  route(message: string): string {
    const lower = message.toLowerCase();
    if (
      lower.includes("order") ||
      lower.includes("tracking") ||
      lower.includes("ship")
    ) {
      return "order";
    }
    if (
      lower.includes("payment") ||
      lower.includes("refund") ||
      lower.includes("bill")
    ) {
      return "billing";
    }
    if (
      lower.includes("faq") ||
      lower.includes("help") ||
      lower.includes("support")
    ) {
      return "support";
    }
    return "fallback";
  },
};
