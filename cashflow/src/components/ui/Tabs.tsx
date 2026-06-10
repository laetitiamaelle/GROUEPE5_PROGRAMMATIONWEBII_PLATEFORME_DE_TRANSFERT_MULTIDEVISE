import type { ReactNode } from "react";
import styles from "./Tabs.module.css";

export type TabItem = {
  id: string;
  label: string;
  content: ReactNode;
};

export type TabsProps = {
  tabs: TabItem[];
  activeId: string;
  onChange: (id: string) => void;
};

export function Tabs({ tabs, activeId, onChange }: TabsProps) {
  const active = tabs.find((t) => t.id === activeId) ?? tabs[0];

  return (
    <div className={styles.root}>
      <div className={styles.list} role="tablist">
        {tabs.map((tab) => (
          <button
            key={tab.id}
            type="button"
            role="tab"
            aria-selected={tab.id === activeId}
            className={[styles.tab, tab.id === activeId ? styles.active : ""].join(" ")}
            onClick={() => onChange(tab.id)}
          >
            {tab.label}
          </button>
        ))}
      </div>
      <div className={styles.panel} role="tabpanel">
        {active?.content}
      </div>
    </div>
  );
}
