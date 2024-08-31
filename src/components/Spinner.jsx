import styles from "../assets/styles/Spinner.module.css";
import { Spinner } from "react-bootstrap";

export function SpinnerComponent() {
  return (
    <div className={styles.spinner_wrapper}>
      <Spinner animation="border" role="status">
        <span className="visually-hidden">Loading...</span>
      </Spinner>
    </div>
  );
}
export default SpinnerComponent;
