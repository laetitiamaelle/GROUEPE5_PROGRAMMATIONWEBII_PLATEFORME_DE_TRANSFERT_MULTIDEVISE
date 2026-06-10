import { Card } from "../components/ui/Card";
import { AppFooter } from "../components/layout/AppFooter";
import styles from "./PlaceholderPage.module.css";

type Props = {
  title: string;
  description: string;
};

export function PlaceholderPage({ title, description }: Props) {
  return (
    <div className={styles.page}>
      <h1 className={styles.title}>{title}</h1>
      <p className={styles.subtitle}>{description}</p>
      <Card>
        <p className={styles.body}>
          Cette section est un espace réservé cohérent avec le design Cashflow. Utilisez la navigation latérale pour
          accéder aux écrans Transfert et Profil reconstruits à partir des maquettes.
        </p>
      </Card>
      <AppFooter />
    </div>
  );
}
