import { auth } from "@clerk/nextjs/server";
import { redirect } from "next/navigation";
import NavBar from "./_components/navbar";

export default function Home() {
  const { userId } = auth();

  if (!userId) {
    redirect("/login");
  }

  return <NavBar />;
}
