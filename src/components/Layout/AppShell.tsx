import type { ReactNode } from "react";
import Aurora from "./Aurora";
import Sidebar from "./Sidebar";
import TopBar from "./TopBar";
import MobileNav from "./MobileNav";

export default function AppShell({ children }: { children: ReactNode }) {
  return (
    <div className="relative flex min-h-screen text-ink">
      <Aurora />
      <Sidebar />
      <div className="flex min-w-0 flex-1 flex-col">
        <TopBar />
        <main className="flex-1 px-4 pb-28 pt-4 lg:px-10 lg:pb-12 lg:pt-8">
          <div className="mx-auto w-full max-w-6xl">{children}</div>
        </main>
      </div>
      <MobileNav />
    </div>
  );
}
