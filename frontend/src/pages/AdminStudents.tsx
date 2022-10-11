import { useEffect, useState } from "react";
import { toast, ToastContainer } from "react-toastify";
import Sidebar from "../components/Sidebar";
import TableRow from "../components/TableRow";
import { admin } from "../hooks/AxiosFetch";
import styles from "../styles/AdminStudentsPage.module.scss";

interface Student {
  _id: string;
  name: string;
  username: string;
  passwrod: string;
}

interface Students {
  students: Student[];
}

const AdminStudents = () => {
  const [students, setStudents] = useState<Array<Student>>([]);
  const [studentName, setStudentName] = useState<string>("");
  const [studentUsername, setStudentUsername] = useState<string>("");
  const [studentPassword, setStudentPassword] = useState<string>("");

  useEffect(() => {
    admin.get<Students>("/students").then((response) => {
      let data = response.data;
      setStudents(data.students);
    });
  }, []);

  const handleSubmit = (e: React.FormEvent<HTMLFormElement>) => {
    const config = {
      headers: {
        Authorization: `Bearer ${localStorage.getItem("admin_access_token")}`,
      },
    };
    e.preventDefault();
    admin
      .post(
        "/add_student",
        {
          name: studentName,
          username: studentUsername,
          password: studentPassword,
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
        console.log(response);
      });
  };

  return (
    <div className={styles.wrapper}>
      <Sidebar type='admin' />
      <main>
        <p className={styles.header}>Students</p>
        <div className={styles.content}>
          <form
            className={styles.addStudents}
            onSubmit={(e: React.FormEvent<HTMLFormElement>) => {
              handleSubmit(e);
            }}>
            <p className={styles.addHeader}>Add new student</p>
            <div className={styles.inputContainer}>
              <input
                type='text'
                className={styles.input}
                placeholder='Full name'
                autoComplete='off'
                spellCheck='false'
                onChange={(e: React.ChangeEvent<HTMLInputElement>) =>
                  setStudentName(e.target.value)
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
                  setStudentUsername(e.target.value)
                }
                required
              />
              <input
                type='password'
                className={styles.input}
                placeholder='Password'
                onChange={(e: React.ChangeEvent<HTMLInputElement>) =>
                  setStudentPassword(e.target.value)
                }
                required
              />
            </div>
            <button type='submit' className={styles.addButton}>
              Add student
            </button>
          </form>
          <div className={styles.table}>
            <div className={styles.tableInfo}>
              <p>ID</p>
              <p>Name</p>
            </div>
            {students.map((student) => (
              <TableRow
                name={student.name}
                key={student._id}
                id={student._id.substring(student._id.length - 4)}
              />
            ))}
          </div>
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

export default AdminStudents;
