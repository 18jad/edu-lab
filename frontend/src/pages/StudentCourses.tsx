import { useEffect, useState } from "react";
import Sidebar from "../components/Sidebar";
import TableRow from "../components/TableRow";
import { student } from "../hooks/AxiosFetch";
import styles from "../styles/AdminStudentsPage.module.scss";

interface Course {
  _id: string;
  name: string;
  code: string;
}

interface Courses {
  courses: any;
  enrolled_courses: Array<Course>;
}

const StudentCourses = () => {
  const [courses, setCourses] = useState<Course[]>([]);

  useEffect(() => {
    student.get<Courses>("/courses").then((response) => {
      let data = response.data;
      setCourses(data.courses[0].enrolled_courses);
    });
  }, []);

  return (
    <div className={styles.wrapper}>
      <Sidebar type='student' />
      <main>
        <p className={styles.header}>Enrolled Courses</p>
        <div className={styles.content}>
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

export default StudentCourses;
