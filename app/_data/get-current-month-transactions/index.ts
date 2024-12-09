import { db } from "@/app/_lib/prisma";
import { auth } from "@clerk/nextjs/server";
import { endOfMinute, startOfMonth } from "date-fns";

export async function getCurrentMonthTransactions() {
  const { userId } = auth();

  if (!userId) {
    throw new Error("Unauthorized");
  }

  const currentMonthTransactions = await db.transaction.count({
    where: {
      userId,
      createdAt: {
        gte: startOfMonth(new Date()),
        lt: endOfMinute(new Date()),
      },
    },
  });

  return currentMonthTransactions;
}
