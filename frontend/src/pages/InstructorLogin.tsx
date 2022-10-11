import LoginForm from "../components/LoginForm";
import styles from "../styles/LoginPages.module.scss";

const InstructorLogin = () => {
  return (
    <div className={styles.wrapper}>
      <LoginForm type='Instructor' />
      <p className={styles.warn}>
        *If you are new talk to admin to create an account for you
      </p>
    </div>
  );
};

export default InstructorLogin;
