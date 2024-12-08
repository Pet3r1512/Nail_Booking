import { relations, sql } from "drizzle-orm";
import { integer, time, pgTable } from "drizzle-orm/pg-core";
import { varchar as pgVarchar } from "drizzle-orm/pg-core";

export const customers = pgTable("customers", {
  id: integer().primaryKey().generatedAlwaysAsIdentity(),
  name: pgVarchar({ length: 50 }).notNull(),
  phoneNumber: pgVarchar({ length: 10 }).notNull(),
});

export const bookings = pgTable("bookings", {
  id: integer().primaryKey().generatedAlwaysAsIdentity(),
  date: pgVarchar({ length: 10 }).notNull(),
  time: pgVarchar({}),
  customerId: integer("customer_id").notNull(),
  createdAt: time().default(sql`now()`),
});

export const customerRelations = relations(customers, ({ many }) => ({
  bookings: many(bookings),
}));

export const bookingRelations = relations(bookings, ({ one }) => ({
  customerId: one(customers, {
    fields: [bookings.customerId],
    references: [customers.id],
  }),
}));
