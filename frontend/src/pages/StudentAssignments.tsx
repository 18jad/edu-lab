import { useEffect, useState } from "react";
import "react-toastify/dist/ReactToastify.css";
import Sidebar from "../components/Sidebar";
import TableRow from "../components/TableRow";
import { student } from "../hooks/AxiosFetch";
import styles from "../styles/AdminStudentsPage.module.scss";

interface Assignment {
  assignment_id: string;
  assignment_title: string;
  assignment_body: string;
}

interface Assignments {
  assignments: any;
}

const StudentAssignments = () => {
  const [assignments, setAssignments] = useState<Assignment[]>([]);

  useEffect(() => {
    student.get<Assignments>("/assignments").then((response) => {
      let data = response.data;
      setAssignments(data.assignments[0].assignments);
    });
  }, []);

  return (
    <div className={styles.wrapper}>
      <Sidebar type='student' />
      <main>
        <p className={styles.header}>Assignments</p>
        <div className={styles.content}>
          <div className={styles.assignemntstable}>
            <div className={styles.tableInfo}>
              <p>Title</p>
              <p>Content</p>
              <p>Action</p>
            </div>
            {assignments.map((assignment) => (
              <TableRow
                name={assignment.assignment_body}
                title={assignment.assignment_title}
                key={assignment.assignment_id}
                actionId={assignment.assignment_id}
                action='Submit'
              />
            ))}
          </div>
        </div>
      </main>
    </div>
  );
};

export default StudentAssignments;
