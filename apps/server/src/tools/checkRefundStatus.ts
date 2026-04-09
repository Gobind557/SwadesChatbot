import { db } from "@customer-support/db";
import { payments } from "@customer-support/db";
import { eq } from "drizzle-orm";

export const checkRefundStatus = {
  name: "checkRefundStatus",
  description: "Check refund status for a payment",
  async execute({ paymentId }: { paymentId: number }) {
    const payment = await db
      .select({ status: payments.status })
      .from(payments)
      .where(eq(payments.id, paymentId))
      .limit(1);
    return payment[0]?.status || "unknown";
  },
};
