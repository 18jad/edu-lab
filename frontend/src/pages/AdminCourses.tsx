import Sidebar from "../components/Sidebar";
import TableRow from "../components/TableRow";
import styles from "../styles/AdminStudentsPage.module.scss";

const AdminCourses = () => {
  return (
    <div className={styles.wrapper}>
      <Sidebar type='admin' />
      <main>
        <p className={styles.header}>Courses</p>
        <div className={styles.content}>
          <form className={styles.addStudents}>
            <p className={styles.addHeader}>Add new course</p>
            <div className={styles.inputContainer}>
              <input
                type='text'
                className={styles.input}
                placeholder='Course name'
                autoComplete='off'
                spellCheck='false'
                required
              />
              <input
                type='text'
                className={styles.input}
                placeholder='Course code'
                autoComplete='off'
                spellCheck='false'
                required
              />
              {/* <input
                type='password'
                className={styles.input}
                placeholder='Password'
                required
              /> */}
            </div>
            <button type='submit' className={styles.addButton}>
              Add student
            </button>
          </form>
          <div className={styles.table}>
            <div className={styles.tableInfo}>
              <p>Code</p>
              <p>Name</p>
            </div>
            <TableRow name='Computer Science' id='MIS302' />
          </div>
        </div>
      </main>
    </div>
  );
};

export default AdminCourses;
