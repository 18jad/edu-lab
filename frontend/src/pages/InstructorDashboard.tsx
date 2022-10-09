import Sidebar from "../components/Sidebar";
import styles from "../styles/AdminDashboard.module.scss";

const InstructorDashboard = () => {
  return (
    <div className={styles.wrapper}>
      <Sidebar type='instructor' />
      <main>
        <p>Instructor Dashboard</p>
      </main>
    </div>
  );
};

export default InstructorDashboard;
