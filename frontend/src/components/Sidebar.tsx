import { Link } from "react-router-dom";
import Courses from "../icons/Courses";
import Instructor from "../icons/Instructor";
import Student from "../icons/Student";
import styles from "../styles/Sidebar.module.scss";

const Sidebar = ({ type }: any) => {
  return (
    <div className={styles.sidebarWrapper}>
      <header>{type}</header>
      {type === "admin" ? (
        <ul className={styles.listBody}>
          <Link to='/admin/dashboard/students' className={styles.listLink}>
            <li className={styles.listBullet}>
              <Student height='30' />
              <span className={styles.listText}>Students</span>
            </li>
          </Link>
          <Link to='/admin/dashboard/instructors' className={styles.listLink}>
            <li className={styles.listBullet}>
              <Instructor height='30' />
              <span className={styles.listText}>Instructors</span>
            </li>
          </Link>
          <Link to='/admin/dashboard/courses' className={styles.listLink}>
            <li className={styles.listBullet}>
              <Courses height='30' />
              <span className={styles.listText}>Courses</span>
            </li>
          </Link>
        </ul>
      ) : type === "instructor" ? (
        <ul className={styles.listBody}>
          <Link to='/instructor/dashboard/students' className={styles.listLink}>
            <li className={styles.listBullet}>
              <Student height='30' />
              <span className={styles.listText}>Students</span>
            </li>
          </Link>
          <Link
            to='/instructor/dashboard/assignments'
            className={styles.listLink}>
            <li className={styles.listBullet}>
              <Student height='30' />
              <span className={styles.listText}>Assignments</span>
            </li>
          </Link>
          <Link
            to='/instructor/dashboard/announcements'
            className={styles.listLink}>
            <li className={styles.listBullet}>
              <Student height='30' />
              <span className={styles.listText}>Announcements</span>
            </li>
          </Link>
        </ul>
      ) : (
        <ul className={styles.listBody}>
          <Link to='/student/dashboard/assignments' className={styles.listLink}>
            <li className={styles.listBullet}>
              <Student height='30' />
              <span className={styles.listText}>Assignments</span>
            </li>
          </Link>
          <Link to='/student/dashboard/courses' className={styles.listLink}>
            <li className={styles.listBullet}>
              <Student height='30' />
              <span className={styles.listText}>Courses</span>
            </li>
          </Link>
        </ul>
      )}
    </div>
  );
};

export default Sidebar;
