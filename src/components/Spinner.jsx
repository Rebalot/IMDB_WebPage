import styles from "../assets/styles/Spinner.module.css";
import { Spinner } from "react-bootstrap";

export function SpinnerComponent() {
  return (
    <div className={styles.spinner_container}>
      <Spinner animation="border" role="status" />
    </div>
  );
}
export default SpinnerComponent;
