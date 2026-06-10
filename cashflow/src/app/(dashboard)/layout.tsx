"use client";

import { AppHeader } from "@/components/layout/AppHeader";
import { AppSidebar } from "@/components/layout/AppSidebar";
import { DashboardShell } from "@/components/layout/DashboardShell";
import { ToastProvider } from "@/contexts/ToastContext";

export default function DashboardLayout({ children }: { children: React.ReactNode }) {
  return (
    <ToastProvider>
      <DashboardShell header={<AppHeader />} sidebar={<AppSidebar />}>
        {children}
      </DashboardShell>
    </ToastProvider>
  );
}
