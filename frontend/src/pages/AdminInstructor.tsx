import { useEffect, useState } from "react";
import { toast, ToastContainer } from "react-toastify";
import Sidebar from "../components/Sidebar";
import TableRow from "../components/TableRow";
import { admin } from "../hooks/AxiosFetch";
import styles from "../styles/AdminStudentsPage.module.scss";

interface Instructor {
  _id: string;
  name: string;
  username: string;
  passwrod: string;
}

interface Instructors {
  instructors: Instructor[];
}
interface Course {
  _id: string;
  name: string;
  code: string;
}

interface Courses {
  courses: Course[];
}

const AdminInstructor = () => {
  const [instructors, setInstructors] = useState<Instructor[]>([]);
  const [courses, setCourses] = useState<Course[]>([]);
  const [instructorName, setInstructorName] = useState<string>("");
  const [instructorUsername, setInstructorUsername] = useState<string>("");
  const [instructorPassword, setInstructorPassword] = useState<string>("");
  const [instructorCourse, setInstructorCourse] = useState<string>("");

  useEffect(() => {
    admin.get<Instructors>("/instructors").then((response) => {
      let data = response.data;
      setInstructors(data.instructors);
    });
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
        "/add_instructor",
        {
          name: instructorName,
          username: instructorUsername,
          password: instructorPassword,
          course: instructorCourse,
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
        <p className={styles.header}>Instructors</p>
        <div className={styles.content}>
          <form className={styles.addStudents} onSubmit={handleSubmit}>
            <p className={styles.addHeader}>Add new instructor</p>
            <div className={styles.inputContainer}>
              <input
                type='text'
                className={styles.input}
                placeholder='Full name'
                autoComplete='off'
                spellCheck='false'
                onChange={(e: React.ChangeEvent<HTMLInputElement>) =>
                  setInstructorName(e.target.value)
                }
                required
              />
              <input
                type='text'
                className={styles.input}
                placeholder='Username'
                autoComplete='off'
                spellCheck='false'
                onChange={(e: React.ChangeEvent<HTMLInputElement>) =>
                  setInstructorUsername(e.target.value)
                }
                required
              />
              <input
                type='password'
                className={styles.input}
                placeholder='Password'
                onChange={(e: React.ChangeEvent<HTMLInputElement>) =>
                  setInstructorPassword(e.target.value)
                }
                required
              />
              <select
                title='test'
                className={styles.selectInput}
                onChange={(e) => setInstructorCourse(e.target.value)}>
                <option disabled selected hidden>
                  Assign course
                </option>

                {courses.map((course) => (
                  <option value={course.code} key={course._id}>
                    {course.code} - {course.name}
                  </option>
                ))}
              </select>
            </div>
            <button type='submit' className={styles.addButton}>
              Add instructor
            </button>
          </form>
          <div className={styles.table}>
            <div className={styles.tableInfo}>
              <p>ID</p>
              <p>Name</p>
            </div>
            {instructors.map((instructor) => (
              <TableRow
                name={instructor.name}
                key={instructor._id}
                id={instructor._id.substring(instructor._id.length - 4)}
              />
            ))}
          </div>
        </div>
      </main>
      <ToastContainer />
    </div>
  );
};

export default AdminInstructor;
