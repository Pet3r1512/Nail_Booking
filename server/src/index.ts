/* eslint-disable @typescript-eslint/no-unused-vars */
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
    origin: "nail-booking.pages.dev",
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

app.post("/bookings/", async (c) => {
  const bookingData = await c.req.json();

  try {
    if (!bookingData || typeof bookingData !== "object") {
      return c.json({ error: "Invalid Booking Data" }, 400);
    }

    const postgresql = neon(c.env.DATABASE_URL);
    const db = drizzle(postgresql);

    const existingCustomer = await db
      .select()
      .from(customers)
      .where(eq(customers.phoneNumber, bookingData.phoneNumber));

    let customerId;
    if (existingCustomer.length === 0) {
      const [newCustomer] = await db
        .insert(customers)
        .values({
          name: bookingData.name,
          phoneNumber: bookingData.phoneNumber,
        })
        .returning({ customerId: customers.id });
      customerId = newCustomer.customerId;
    } else {
      customerId = existingCustomer[0].id;
    }

    const newBooking = await db
      .insert(bookings)
      .values({
        date: bookingData.date,
        time: bookingData.time,
        customerId: customerId,
      })
      .returning();

    return c.json({ success: true, booking: newBooking }, 201);
  } catch (error) {
    console.error(error);
    return c.json({ error: "Something went wrong." }, 500);
  }
});

export default app;
