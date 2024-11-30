import { auth } from "@clerk/nextjs/server";
import NavBar from "../_components/navbar";
import { redirect } from "next/navigation";

export default function SubscriptionPage() {
  const { userId } = auth();

  if (!userId) {
    redirect("/login");
  }

  return <NavBar />;
}
