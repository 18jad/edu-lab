import Sidebar from "../components/Sidebar";
import styles from "../styles/AdminStudentsPage.module.scss";

const InstructorStudents = () => {
  return (
    <div className={styles.wrapper}>
      <Sidebar type='instructor' />
      <main>
        <p className={styles.header}>Students</p>
        <div className={styles.content}>
          <form className={styles.addStudents}>
            <p className={styles.addHeader}>Add student to a course</p>
            <div className={styles.inputContainer}>
              <input
                type='text'
                className={styles.input}
                placeholder='# Student ID'
                autoComplete='off'
                spellCheck='false'
                required
              />
              <select title='Assign course' className={styles.selectInput}>
                <option disabled selected hidden>
                  Select course
                </option>
                <option value=''>Course 1</option>
                <option value=''>Course 2</option>
                <option value=''>Course 3</option>
                <option value=''>Course 4</option>
              </select>
            </div>
            <button type='submit' className={styles.addButton}>
              Assign
            </button>
          </form>
        </div>
      </main>
    </div>
  );
};

export default InstructorStudents;
