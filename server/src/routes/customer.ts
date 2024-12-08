/* eslint-disable @typescript-eslint/no-explicit-any */
import express, { Request, Response } from "express";
import { PrismaClient } from "@prisma/client";

const prisma = new PrismaClient();
const CustomerRouter = express.Router();

CustomerRouter.post("/", async (req: Request, res: Response) => {
  const { name, phoneNumber } = req.body;
  try {
    const newCustomer = await prisma.customer.create({
      data: { name, phoneNumber },
    });
    res.status(201).json(newCustomer);
  } catch (error: any) {
    res.status(400).json({ error: error.message });
  }
});

export default CustomerRouter;
