"use client";

import { useCurrentUser } from "@/contexts/UserContext";
import { AdminUsersPage } from "@/views/dashboard/AdminUsersPage";
import { useRouter } from "next/navigation";
import { useEffect } from "react";

export default function AdminPage() {
  const { user, loading } = useCurrentUser();
  const router = useRouter();

  useEffect(() => {
    if (!loading && user && user.role !== "admin") {
      router.replace("/home");
    }
  }, [user, loading, router]);

  if (loading) return <p style={{ padding: 32, color: "white" }}>Chargement...</p>;
  if (!user || user.role !== "admin") return null;

  return <AdminUsersPage />;
}