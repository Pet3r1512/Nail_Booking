import { drizzle } from "drizzle-orm/neon-http";
import { neon } from "@neondatabase/serverless";
import { Hono } from "hono";
import { bookings, customers } from "./db/schema";
import { eq } from "drizzle-orm";
import { cors } from "hono/cors";

export type Env = {
  DATABASE_URL: string;
};

const app = new Hono<{ Bindings: Env }>();

app.use("/*", cors());
app.use(
  "/*",
  cors({
    origin: "nail-booking.pages.dev", // Ensure this matches your Vite server's origin
    // origin: "http://localhost:5173",
    allowHeaders: ["X-Custom-Header", "Upgrade-Insecure-Requests"],
    allowMethods: ["POST", "GET", "OPTIONS"],
    exposeHeaders: ["Content-Length", "X-Kuma-Revision"],
    maxAge: 600,
    credentials: true,
  }),
);

app.get("/", async (c) => {
  try {
    const postgresql = neon(c.env.DATABASE_URL);

    const db = drizzle(postgresql);

    const result = await db.select().from(customers);

    return c.json({
      result,
    });
  } catch (error) {
    console.log(error);
    return c.json(
      {
        error,
      },
      400,
    );
  }
});

app.post("/bookings/:date", async (c) => {
  const checkDate: string = c.req.param("date");

  try {
    const postgresql = neon(c.env.DATABASE_URL);

    const db = drizzle(postgresql);

    const result = await db
      .select()
      .from(bookings)
      .where(eq(bookings.date, checkDate));
    console.log(result);
    if (result.length >= 4) {
      return c.json({ available: false });
    }

    return c.json({ available: true, bookings: result }, 200);
  } catch (error) {
    return c.json({ error: "Something went wrong." }, 500);
  }
});

export default app;
