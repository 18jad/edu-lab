import { useEffect, useState } from "react";
import Sidebar from "../components/Sidebar";
import TableRow from "../components/TableRow";
import { student } from "../hooks/AxiosFetch";
import styles from "../styles/AdminStudentsPage.module.scss";

interface Announcement {
  announcement_title: string;
  announcement_body: string;
}

interface Announcements {
  _id: string;
  announcements: Array<any>;
}

const StudentAnnouncements = () => {
  const [announcements, setAnnouncements] = useState<Announcement[]>([]);

  useEffect(() => {
    student.get<Announcements>("/announcements").then((response) => {
      let data = response.data;
      setAnnouncements(data.announcements[0].announcements);
    });
  }, []);

  return (
    <div className={styles.wrapper}>
      <Sidebar type='student' />
      <main>
        <p className={styles.header}>Announcements</p>
        <div className={styles.content}>
          <div className={styles.annTable}>
            <div className={styles.tableInfo}>
              <p>Title</p>
              <p>Body</p>
            </div>
            {announcements.map((announcement, index) => (
              <TableRow
                title={announcement.announcement_title}
                name={announcement.announcement_body}
                key={index}
              />
            ))}
          </div>
        </div>
      </main>
    </div>
  );
};

export default StudentAnnouncements;
