import Sidebar from "../components/Sidebar";
import TableRow from "../components/TableRow";
import styles from "../styles/AdminStudentsPage.module.scss";

const StudentAssignments = () => {
  return (
    <div className={styles.wrapper}>
      <Sidebar type='student' />
      <main>
        <p className={styles.header}>Assignments</p>
        <div className={styles.content}>
          <div className={styles.assignemntstable}>
            <div className={styles.tableInfo}>
              <p>Title</p>
              <p>Content</p>
              <p>Action</p>
            </div>
            <TableRow
              name='Do grid table'
              title='CSS Homework'
              action='Submit'
            />
          </div>
        </div>
      </main>
    </div>
  );
};

export default StudentAssignments;
