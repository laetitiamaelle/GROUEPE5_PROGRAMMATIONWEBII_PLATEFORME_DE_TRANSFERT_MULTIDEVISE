import type { ReactNode } from "react";
import styles from "./DashboardShell.module.css";

type Props = {
  header: ReactNode;
  sidebar: ReactNode;
  children: ReactNode;
};

export function DashboardShell({ header, sidebar, children }: Props) {
  return (
    <div className={styles.shell}>
      {header}
      <div className={styles.body}>
        <div className={styles.sidebarSlot}>{sidebar}</div>
        <div className={styles.mainColumn}>
          <div className={styles.scroll}>{children}</div>
        </div>
      </div>
    </div>
  );
}
