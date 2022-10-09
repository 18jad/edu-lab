import Sidebar from "../components/Sidebar";
import TableRow from "../components/TableRow";
import styles from "../styles/AdminStudentsPage.module.scss";

const AdminStudents = () => {
  return (
    <div className={styles.wrapper}>
      <Sidebar type='admin' />
      <main>
        <p className={styles.header}>Students</p>
        <div className={styles.content}>
          <form className={styles.addStudents}>
            <p className={styles.addHeader}>Add new student</p>
            <div className={styles.inputContainer}>
              <input
                type='text'
                className={styles.input}
                placeholder='Full name'
                autoComplete='off'
                spellCheck='false'
                required
              />
              <input
                type='text'
                className={styles.input}
                placeholder='Username'
                autoComplete='off'
                spellCheck='false'
                required
              />
              <input
                type='password'
                className={styles.input}
                placeholder='Password'
                required
              />
            </div>
            <button type='submit' className={styles.addButton}>
              Add student
            </button>
          </form>
          <div className={styles.table}>
            <div className={styles.tableInfo}>
              <p>ID</p>
              <p>Name</p>
            </div>
            <TableRow name='Jad Yahya' id='1' />
          </div>
        </div>
      </main>
    </div>
  );
};

export default AdminStudents;
