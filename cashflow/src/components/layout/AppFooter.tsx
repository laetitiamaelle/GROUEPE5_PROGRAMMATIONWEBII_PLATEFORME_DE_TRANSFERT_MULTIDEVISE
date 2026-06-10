import styles from "./AppFooter.module.css";

export function AppFooter() {
  return (
    <footer className={styles.footer}>
      <span>© 2026 Cashflow Inc. All rights reserved.</span>
      <nav className={styles.links} aria-label="Liens pied de page">
        <a href="#terms">Terms of Service</a>
        <a href="#privacy">Privacy Policy</a>
        <a href="#help">Help Center</a>
      </nav>
    </footer>
  );
}
