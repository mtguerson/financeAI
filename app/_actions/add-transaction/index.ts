"use server";

import { db } from "@/app/_lib/prisma";
import { auth } from "@clerk/nextjs/server";
import type {
  TransactionCategory,
  TransactionPaymentMethod,
  TransactionType,
} from "@prisma/client";
import { addTransactionSchema } from "./schema";
import { revalidatePath } from "next/cache";

interface AddTransactionParams {
  name: string;
  amount: number;
  type: TransactionType;
  category: TransactionCategory;
  paymentMethod: TransactionPaymentMethod;
  date: Date;
}

export default async function addTransaction(params: AddTransactionParams) {
  addTransactionSchema.parse(params);

  const { userId } = auth();

  if (!userId) {
    throw new Error("Unauthorized");
  }

  await db.transaction.create({ data: { ...params, userId } });

  revalidatePath("/transactions");
}
