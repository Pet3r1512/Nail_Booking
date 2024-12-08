/* eslint-disable @typescript-eslint/no-explicit-any */
import { Hono } from "hono";
import { customers } from "./db/schema";
import db from "./db";
type Bindings = {
  MY_NAME: string;
  MY_KV: KVNamespace;
};

const app = new Hono<{ Bindings: Bindings }>();

app.get("/", (c) => {
  return c.json({
    message: "ok",
  });
});

app.post("/customers", async (c) => {
  try {
    const { name, phoneNumber } = await c.req.json();

    if (
      !name ||
      typeof name !== "string" ||
      !phoneNumber ||
      typeof phoneNumber !== "string"
    ) {
      return c.json(
        {
          error: "Invalid credentials",
        },
        400,
      );
    }

    const customer = { name, phoneNumber };

    const result = await db.insert(customers).values(customer).returning();

    return c.json(
      {
        customer: result[0],
      },
      201,
    );
  } catch (e) {
    return c.json(
      {
        error: (e as Error).message || "An unexpected error occurred",
      },
      400,
    );
  }
});

export default app;
