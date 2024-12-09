import { db } from "../db";
import { customers } from "../schema";

export async function getCustomers(): Promise<
  Array<{
    id: number;
    name: string;
    phoneNumber: string;
  }>
> {
  return db.select().from(customers);
}
