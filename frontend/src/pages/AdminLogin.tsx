import LoginForm from "../components/LoginForm";
import styles from "../styles/LoginPages.module.scss";

const AdminLogin = () => {
  return (
    <div className={styles.wrapper}>
      <LoginForm type='Admin' />
    </div>
  );
};

export default AdminLogin;
