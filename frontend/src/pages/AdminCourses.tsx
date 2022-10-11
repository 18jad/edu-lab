import { useEffect, useState } from "react";
import { toast, ToastContainer } from "react-toastify";
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
  const [courseName, setcourseName] = useState<string>("");
  const [courseCode, setcourseCode] = useState<string>("");

  useEffect(() => {
    admin.get<Courses>("/courses").then((response) => {
      let data = response.data;
      setCourses(data.courses);
    });
  }, []);

  const handleSubmit = (e: React.FormEvent<HTMLFormElement>) => {
    e.preventDefault();
    const config = {
      headers: {
        Authorization: `Bearer ${localStorage.getItem("admin_access_token")}`,
      },
    };
    admin
      .post(
        "/add_course",
        {
          name: courseName,
          code: courseCode,
        },
        config,
      )
      .then((response) => {
        let data = response.data,
          success = data.status;
        toast(success ? `✅ ${data.message}` : `❌ ${data.message}`, {
          position: "bottom-right",
          autoClose: 2000,
          hideProgressBar: false,
          closeOnClick: true,
          pauseOnHover: true,
          draggable: true,
          progress: undefined,
          theme: "light",
        });
        if (success) {
          setTimeout(() => {
            window.location.reload();
          }, 2700);
        }
      });
  };

  return (
    <div className={styles.wrapper}>
      <Sidebar type='admin' />
      <main>
        <p className={styles.header}>Courses</p>
        <div className={styles.content}>
          <form className={styles.addStudents} onSubmit={handleSubmit}>
            <p className={styles.addHeader}>Add new course</p>
            <div className={styles.inputContainer}>
              <input
                type='text'
                className={styles.input}
                placeholder='Course name'
                autoComplete='off'
                spellCheck='false'
                onChange={(e: React.ChangeEvent<HTMLInputElement>) =>
                  setcourseName(e.target.value)
                }
                required
              />
              <input
                type='text'
                className={styles.input}
                placeholder='Course code'
                autoComplete='off'
                spellCheck='false'
                onChange={(e: React.ChangeEvent<HTMLInputElement>) =>
                  setcourseCode(e.target.value)
                }
                maxLength={5}
                required
              />
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
      <ToastContainer />
    </div>
  );
};

export default AdminCourses;
