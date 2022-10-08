import Sidebar from "../components/Sidebar";
import styles from "../styles/AdminDashboard.module.scss";

const AdminDashboard = () => {
  return (
    <div className={styles.wrapper}>
      <Sidebar type='admin' />
      <main>
        <p>Admin Dashboard</p>
      </main>
    </div>
  );
};

export default AdminDashboard;
