import { db } from "@customer-support/db";
import { orders } from "@customer-support/db";
import { eq } from "drizzle-orm";

export const getOrderDetails = {
  name: "getOrderDetails",
  description: "Fetch details of an order by ID",
  async execute({ orderId }: { orderId: number }) {
    const order = await db
      .select()
      .from(orders)
      .where(eq(orders.id, orderId))
      .limit(1);
    return order[0] || null;
  },
};
