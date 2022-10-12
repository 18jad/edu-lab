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

interface Assignment {
  title: string;
  body: string;
  course: Course;
}

const InstructorAssignments = () => {
  const [courses, setCourses] = useState<Course[]>([]);
  const assignmentTitleRef = React.createRef<HTMLInputElement>();
  const assignmentBodyRef = React.createRef<HTMLTextAreaElement>();
  const courseRef = React.createRef<HTMLSelectElement>();

  useEffect(() => {
    admin.get<Courses>("/courses").then((response) => {
      let data = response.data;
      setCourses(data.courses);
    });
  }, []);

  const handleSubmit = (e: React.FormEvent<HTMLFormElement>) => {
    e.preventDefault();
    let assignment_title = assignmentTitleRef?.current?.value;
    let assignment_body = assignmentBodyRef?.current?.value;
    let course_id = courseRef?.current?.value;

    instructor
      .post<Assignment>("/create_assignment", {
        assignment_title,
        assignment_body,
        course_id,
      })
      .then((response: AxiosResponse) => {
        console.log(response.data);
        let data = response.data,
          success = data.status;
        toast(success ? `✅ ${data.message}` : `❌ ${data.message}`, {
          position: "bottom-right",
          autoClose: 2000,
          hideProgressBar: false,
          closeOnClick: true,
          pauseOnHover: false,
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
        <p className={styles.header}>Instructors</p>
        <div className={styles.content}>
          <form
            className={styles.addStudents}
            onSubmit={(e) => {
              handleSubmit(e);
            }}>
            <p className={styles.addHeader}>Add new instructor</p>
            <div className={styles.inputContainer}>
              <input
                type='text'
                className={styles.input}
                placeholder='Assignment title'
                autoComplete='off'
                spellCheck='false'
                ref={assignmentTitleRef}
                required
              />

              <textarea
                title='assignmnents body'
                placeholder='Assignment content'
                ref={assignmentBodyRef}></textarea>
              <select
                title='test'
                className={styles.selectInput}
                ref={courseRef}>
                <option disabled selected hidden>
                  Assign to course
                </option>
                {courses.map((course) => (
                  <option value={course.code} key={course._id}>
                    {course.code} - {course.name}
                  </option>
                ))}
              </select>
            </div>
            <button type='submit' className={styles.addButton}>
              Add assignment
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
        pauseOnFocusLoss={false}
        draggable
        pauseOnHover={false}
        theme='light'
      />
    </div>
  );
};

export default InstructorAssignments;
