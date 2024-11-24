import { UserButton } from "@clerk/nextjs";
import { auth } from "@clerk/nextjs/server";
import { dark } from "@clerk/themes";
import { redirect } from "next/navigation";

export default function Home() {
  const { userId } = auth();

  if (!userId) {
    redirect("/login");
  }

  return (
    <div className="flex h-full items-center justify-center">
      <UserButton
        showName
        appearance={{
          baseTheme: dark,
        }}
      />
    </div>
  );
}
