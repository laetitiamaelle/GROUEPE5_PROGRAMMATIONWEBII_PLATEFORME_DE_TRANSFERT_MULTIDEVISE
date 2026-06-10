"use client";

import { AppHeader } from "@/components/layout/AppHeader";
import { AppSidebar } from "@/components/layout/AppSidebar";
import { DashboardShell } from "@/components/layout/DashboardShell";
import { ToastProvider } from "@/contexts/ToastContext";
import { UserProvider } from "@/contexts/UserContext";

export default function DashboardLayout({ children }: { children: React.ReactNode }) {
  return (
    <UserProvider>
      <ToastProvider>
        <DashboardShell header={<AppHeader />} sidebar={<AppSidebar />}>
          {children}
        </DashboardShell>
      </ToastProvider>
    </UserProvider>
  );
}