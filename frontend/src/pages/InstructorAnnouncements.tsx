import Sidebar from "../components/Sidebar";
import styles from "../styles/AdminStudentsPage.module.scss";

const InstructorAnnouncements = () => {
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
                placeholder='Announcement title'
                autoComplete='off'
                spellCheck='false'
                required
              />

              <textarea
                title='assignmnents body'
                placeholder='Announcement content'
                required></textarea>
              <select title='test' className={styles.selectInput} required>
                <option disabled selected hidden value=''>
                  Announce in course
                </option>
                <option value='c'>Course 1</option>
                <option value='a'>Course 2</option>
                <option value='v'>Course 3</option>
                <option value='s'>Course 4</option>
              </select>
            </div>
            <button type='submit' className={styles.addButton}>
              Add Announcement
            </button>
          </form>
        </div>
      </main>
    </div>
  );
};

export default InstructorAnnouncements;
