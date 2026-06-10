"use client";

import { ProfileSettingsPage } from "@/views/ProfileSettingsPage";
import { usePushToast } from "@/contexts/ToastContext";

export default function ProfilePage() {
  const pushToast = usePushToast();

  return (
    <ProfileSettingsPage
      onSave={() =>
        pushToast({
          type: "success",
          title: "Profil mis à jour",
          message: "Vos informations ont été enregistrées.",
        })
      }
    />
  );
}
