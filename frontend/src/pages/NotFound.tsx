import { Link } from "react-router-dom";
import styles from "../styles/NotFound.module.scss";

const NotFound = () => {
  return (
    <div className={styles.wrapper}>
      <p className={styles.notFound}>404 | Not Found </p>
      <Link to='/' className={styles.link}>
        Go back to hompage
      </Link>
    </div>
  );
};

export default NotFound;
