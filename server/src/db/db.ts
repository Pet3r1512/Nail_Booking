import { drizzle } from "drizzle-orm/neon-http";
import { neon } from "@neondatabase/serverless";
import { config } from "dotenv";

config({ path: ".dev.vars" });

const postgresql = neon(process.env.DATABASE_URL!);
export const db = drizzle({ client: postgresql });
