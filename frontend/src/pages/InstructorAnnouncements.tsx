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

interface Announcement {
  title: string;
  body: string;
  course: Course;
}

const InstructorAnnouncements = () => {
  const [courses, setCourses] = useState<Course[]>([]);
  const announcementTitleRef = React.createRef<HTMLInputElement>();
  const announcementBodyRef = React.createRef<HTMLTextAreaElement>();
  const courseRef = React.createRef<HTMLSelectElement>();

  useEffect(() => {
    admin.get<Courses>("/courses").then((response) => {
      let data = response.data;
      setCourses(data.courses);
    });
  }, []);

  const handleSubmit = (e: React.FormEvent<HTMLFormElement>) => {
    e.preventDefault();
    let announcement_title = announcementTitleRef?.current?.value;
    let announcement_body = announcementBodyRef?.current?.value;
    let course_id = courseRef?.current?.value;

    instructor
      .post<Announcement>("/create_announcement", {
        announcement_title,
        announcement_body,
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
                placeholder='Announcement title'
                autoComplete='off'
                spellCheck='false'
                ref={announcementTitleRef}
                required
              />

              <textarea
                title='assignmnents body'
                placeholder='Announcement content'
                required
                ref={announcementBodyRef}></textarea>
              <select
                title='test'
                className={styles.selectInput}
                required
                ref={courseRef}>
                <option disabled selected hidden value=''>
                  Announce in course
                </option>
                {courses.map((course) => (
                  <option value={course.code} key={course._id}>
                    {course.code} - {course.name}
                  </option>
                ))}
              </select>
            </div>
            <button type='submit' className={styles.addButton}>
              Add Announcement
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

export default InstructorAnnouncements;
