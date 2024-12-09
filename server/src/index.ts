/* eslint-disable @typescript-eslint/no-unused-vars */
import { Hono } from "hono";
import { getCustomers } from "./db/query/selectCustomers";

export type Env = {
  DATABASE_URL: string;
};

const app = new Hono<{ Bindings: Env }>();

app.get("/", async (c) => {
  const allCustomers = await getCustomers();
  return c.json(allCustomers);
});

export default app;
