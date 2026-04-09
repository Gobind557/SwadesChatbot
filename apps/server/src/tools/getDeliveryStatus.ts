import { db } from "@customer-support/db";
import { orders } from "@customer-support/db";
import { eq } from "drizzle-orm";

export const getDeliveryStatus = {
  name: "getDeliveryStatus",
  description: "Fetch delivery status of an order",
  async execute({ orderId }: { orderId: number }) {
    const order = await db
      .select({ status: orders.status })
      .from(orders)
      .where(eq(orders.id, orderId))
      .limit(1);
    return order[0]?.status || "unknown";
  },
};
