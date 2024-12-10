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
    origin: "https://dieptangnail.online/",
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
    // Validate booking data
    const { name, phoneNumber, date, time } = bookingData;
    if (!name || !phoneNumber || !date || !time) {
      return c.json({ error: "Missing required fields" }, 400);
    }

    const postgresql = neon(c.env.DATABASE_URL);
    const db = drizzle(postgresql);

    // Check for existing customer by phone number
    const existingCustomer = await db
      .select({ id: customers.id, name: customers.name })
      .from(customers)
      .where(eq(customers.phoneNumber, phoneNumber))
      .limit(1); // Limit to a single record

    let customerId;
    if (existingCustomer.length > 0) {
      // If the phone number exists, check the name
      const customer = existingCustomer[0];
      if (customer.name !== name) {
        return c.json({ error: "Existed phone number with another name" }, 400);
      }
      customerId = customer.id;
    } else {
      // Create a new customer
      const [newCustomer] = await db
        .insert(customers)
        .values({ name, phoneNumber })
        .returning({ id: customers.id });
      customerId = newCustomer.id;
    }

    // Insert the booking
    const [newBooking] = await db
      .insert(bookings)
      .values({ date, time, customerId })
      .returning();

    return c.json({ success: true, booking: newBooking }, 201);
  } catch (error) {
    console.error("Error creating booking:", error);
    return c.json({ error: "Something went wrong" }, 500);
  }
});

export default app;
