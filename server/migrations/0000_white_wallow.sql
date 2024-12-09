CREATE TABLE IF NOT EXISTS "bookings" (
	"id" integer PRIMARY KEY GENERATED ALWAYS AS IDENTITY (sequence name "bookings_id_seq" INCREMENT BY 1 MINVALUE 1 MAXVALUE 2147483647 START WITH 1 CACHE 1),
	"date" varchar(10) NOT NULL,
	"time" varchar,
	"customer_id" integer NOT NULL,
	"createdAt" time DEFAULT now()
);
--> statement-breakpoint
CREATE TABLE IF NOT EXISTS "customers" (
	"id" integer PRIMARY KEY GENERATED ALWAYS AS IDENTITY (sequence name "customers_id_seq" INCREMENT BY 1 MINVALUE 1 MAXVALUE 2147483647 START WITH 1 CACHE 1),
	"name" varchar(50) NOT NULL,
	"phoneNumber" varchar(10) NOT NULL
);
