import { AxiosResponse } from "axios";
import React, { useEffect, useState } from "react";
import { toast, ToastContainer } from "react-toastify";
import "react-toastify/dist/ReactToastify.css";
import Sidebar from "../components/Sidebar";
import { admin, instructor } from "../hooks/AxiosFetch";
import styles from "../styles/AdminStudentsPage.module.scss";

interface Course {
  _id: string;
  name: string;
  code: string;
}

interface Courses {
  courses: Course[];
}

interface Student {
  username: string;
  course: string;
}

const InstructorStudents = () => {
  const usernameRef = React.createRef<HTMLInputElement>();
  const courseRef = React.createRef<HTMLSelectElement>();
  const [courses, setCourses] = useState<Course[]>([]);

  useEffect(() => {
    admin.get<Courses>("/courses").then((response) => {
      let data = response.data;
      setCourses(data.courses);
    });
  }, []);

  const handleSubmit = (e: React.FormEvent<HTMLFormElement>) => {
    e.preventDefault();
    let student_username = usernameRef?.current?.value;
    let course_id = courseRef?.current?.value;

    instructor
      .post<Student>("/assign_students", { student_username, course_id })
      .then((response: AxiosResponse) => {
        console.log(response.data);
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
      <Sidebar type='instructor' />
      <main>
        <p className={styles.header}>Students</p>
        <div className={styles.content}>
          <form
            className={styles.addStudents}
            onSubmit={(e) => {
              handleSubmit(e);
            }}>
            <p className={styles.addHeader}>Add student to a course</p>
            <div className={styles.inputContainer}>
              <input
                type='text'
                className={styles.input}
                placeholder='Student username'
                autoComplete='off'
                spellCheck='false'
                ref={usernameRef}
                required
              />
              <select
                title='Assign course'
                className={styles.selectInput}
                ref={courseRef}>
                <option disabled selected hidden>
                  Select course
                </option>
                {courses.map((course) => (
                  <option value={course.code} key={course._id}>
                    {course.code} - {course.name}
                  </option>
                ))}
              </select>
            </div>
            <button type='submit' className={styles.addButton}>
              Assign
            </button>
          </form>
        </div>
      </main>
      <ToastContainer
        position='bottom-right'
        autoClose={2000}
        hideProgressBar={false}
        newestOnTop
        closeOnClick
        rtl={false}
        pauseOnFocusLoss
        draggable
        pauseOnHover
        theme='light'
      />
    </div>
  );
};

export default InstructorStudents;
