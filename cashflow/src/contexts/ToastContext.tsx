"use client";

import {
  createContext,
  useCallback,
  useContext,
  useEffect,
  useState,
  type ReactNode,
} from "react";
import { Toast } from "@/components/ui/Toast";
import type { ToastPayload } from "@/components/ui/Toast";

const TOAST_MS = 4200;

type PushToast = (payload: ToastPayload) => void;

const ToastContext = createContext<PushToast | null>(null);

export function ToastProvider({ children }: { children: ReactNode }) {
  const [toast, setToast] = useState<ToastPayload | null>(null);

  const pushToast = useCallback((payload: ToastPayload) => {
    setToast(payload);
  }, []);

  useEffect(() => {
    if (!toast) return;
    const t = window.setTimeout(() => setToast(null), TOAST_MS);
    return () => window.clearTimeout(t);
  }, [toast]);

  return (
    <ToastContext.Provider value={pushToast}>
      {children}
      {toast ? <Toast {...toast} onClose={() => setToast(null)} /> : null}
    </ToastContext.Provider>
  );
}

export function usePushToast(): PushToast {
  const ctx = useContext(ToastContext);
  if (!ctx) {
    throw new Error("usePushToast doit être utilisé dans un ToastProvider");
  }
  return ctx;
}
