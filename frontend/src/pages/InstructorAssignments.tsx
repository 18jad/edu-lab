import Sidebar from "../components/Sidebar";
import styles from "../styles/AdminStudentsPage.module.scss";

const InstructorAssignments = () => {
  return (
    <div className={styles.wrapper}>
      <Sidebar type='instructor' />
      <main>
        <p className={styles.header}>Instructors</p>
        <div className={styles.content}>
          <form className={styles.addStudents}>
            <p className={styles.addHeader}>Add new instructor</p>
            <div className={styles.inputContainer}>
              <input
                type='text'
                className={styles.input}
                placeholder='Assignment title'
                autoComplete='off'
                spellCheck='false'
                required
              />

              <textarea
                title='assignmnents body'
                placeholder='Assignment content'></textarea>
              <select title='test' className={styles.selectInput}>
                <option disabled selected hidden>
                  Assign to course
                </option>
                <option value=''>Course 1</option>
                <option value=''>Course 2</option>
                <option value=''>Course 3</option>
                <option value=''>Course 4</option>
              </select>
            </div>
            <button type='submit' className={styles.addButton}>
              Add assignment
            </button>
          </form>
        </div>
      </main>
    </div>
  );
};

export default InstructorAssignments;
