import { Link } from "react-router-dom";
import Logo from "../components/Logo";
import UserSelection from "../components/UserSelection";
import styles from "../styles/LandingPage.module.scss";

const LandingPage = () => {
  return (
    <div className={styles.wrapper}>
      <header className={styles.header}>
        <Logo />
      </header>
      <div className={styles.selectionWrapper}>
        <Link to='/dsf' className={styles.link}>
          <UserSelection type='student' />
        </Link>
        <Link to='/dsf' className={styles.link}>
          <UserSelection type='admin' />
        </Link>
        <Link to='/dsf' className={styles.link}>
          <UserSelection type='instructor' />
        </Link>
      </div>
    </div>
  );
};

export default LandingPage;
