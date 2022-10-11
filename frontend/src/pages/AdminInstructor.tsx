import Sidebar from "../components/Sidebar";
import TableRow from "../components/TableRow";
import styles from "../styles/AdminStudentsPage.module.scss";

const AdminInstructor = () => {
  return (
    <div className={styles.wrapper}>
      <Sidebar type='admin' />
      <main>
        <p className={styles.header}>Instructors</p>
        <div className={styles.content}>
          <form className={styles.addStudents}>
            <p className={styles.addHeader}>Add new instructor</p>
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
              <select title='test' className={styles.selectInput}>
                <option disabled selected hidden>
                  Assign course
                </option>
                <option value=''>Course 1</option>
                <option value=''>Course 2</option>
                <option value=''>Course 3</option>
                <option value=''>Course 4</option>
              </select>
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

export default AdminInstructor;
