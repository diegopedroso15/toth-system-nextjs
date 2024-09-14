"use client";
import { useRouter } from "next/navigation";
import { Button } from "@nextui-org/react";
import { HomeIcon, BellIcon, Cog8ToothIcon } from "@heroicons/react/24/solid";

export default function Layout({ children }: { children: React.ReactNode }) {
  const router = useRouter();

  return (
    <div className="flex flex-col h-screen mt-10">
      <main className="flex-1 relative">{children}</main>
      <footer className="bg-white shadow-medium shadow-black flex justify-around items-center p-2 mx-5 fixed bottom-5 w-[90%] z-50 rounded-full">
        <Button onClick={() => router.push("/dashboard")} className="bg-transparent">
          <HomeIcon className="h-8 w-8 text-[#5406E2]" />
        </Button>
        <Button onClick={() => router.push("/notifications")} className="bg-transparent">
          <BellIcon className="h-8 w-8 text-[#5406E2]" />
        </Button>
        <Button onClick={() => router.push("/settings")} className="bg-transparent">
          <Cog8ToothIcon className="h-8 w-8 text-[#5406E2]" />
        </Button>
      </footer>
    </div>
  );
}
