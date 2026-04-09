/// <reference types="node" />

export const config = {
  databaseUrl:
    process.env.DATABASE_URL ||
    "postgresql://postgres:NewStrongPass1234@localhost:5432/customer_support",
  port: process.env.PORT || 3000,
};
