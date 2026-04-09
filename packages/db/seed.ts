import { db } from "./index";
import { orders, payments } from "./schema";

async function seed() {
  // Sample orders
  await db.insert(orders).values([
    { customerId: 1, status: "pending" },
    { customerId: 1, status: "shipped" },
    { customerId: 2, status: "delivered" },
  ]);

  // Sample payments
  await db.insert(payments).values([
    { orderId: 1, amount: "100.00", status: "success" },
    { orderId: 2, amount: "200.00", status: "failed" },
    { orderId: 3, amount: "150.00", status: "refunded" },
  ]);

  console.log("Seeded database");
}

seed().catch(console.error);
