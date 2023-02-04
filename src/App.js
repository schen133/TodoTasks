import styles from "./styles.module.css";
import Todos from "./Todos";

export default function App() {
  return (
    <div className={styles.App}>
      <Todos />
    </div>
  );
}
