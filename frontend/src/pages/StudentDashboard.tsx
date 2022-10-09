import Sidebar from "../components/Sidebar";
import styles from "../styles/AdminDashboard.module.scss";

const StudentDashboard = () => {
  return (
    <div className={styles.wrapper}>
      <Sidebar type='student' />
      <main>
        <p>Student Dashboard</p>
      </main>
    </div>
  );
};

export default StudentDashboard;
