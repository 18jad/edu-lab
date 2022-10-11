import { useEffect, useState } from "react";
import Sidebar from "../components/Sidebar";
import TableRow from "../components/TableRow";
import { admin } from "../hooks/AxiosFetch";
import styles from "../styles/AdminStudentsPage.module.scss";

interface Course {
  _id: string;
  name: string;
  code: string;
}

interface Courses {
  courses: Course[];
}

const AdminCourses = () => {
  const [courses, setCourses] = useState<Course[]>([]);

  useEffect(() => {
    admin.get<Courses>("/courses").then((response) => {
      let data = response.data;
      setCourses(data.courses);
    });
  }, []);

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
              Add Course
            </button>
          </form>
          <div className={styles.table}>
            <div className={styles.tableInfo}>
              <p>Code</p>
              <p>Name</p>
            </div>
            {courses.map((course) => (
              <TableRow name={course.name} key={course._id} id={course.code} />
            ))}
          </div>
        </div>
      </main>
    </div>
  );
};

export default AdminCourses;
