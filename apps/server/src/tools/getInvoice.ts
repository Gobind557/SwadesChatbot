import { db } from "@customer-support/db";
import { payments } from "@customer-support/db";
import { eq } from "drizzle-orm";

export const getInvoice = {
  name: "getInvoice",
  description: "Fetch invoice details for an order",
  async execute({ orderId }: { orderId: number }) {
    const invoice = await db
      .select()
      .from(payments)
      .where(eq(payments.orderId, orderId))
      .limit(1);
    return invoice[0] || null;
  },
};
