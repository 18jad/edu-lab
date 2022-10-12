import { useState } from "react";
import { student } from "../hooks/AxiosFetch";
import styles from "../styles/AdminStudentsPage.module.scss";

interface Assignment {
  assignment_id: string;
}

const TableRow = ({ id, name, action, actionId, title }: any) => {
  const [assignmentId, setAssignmentId] = useState<any>(actionId);
  const [hidden, setHidden] = useState<boolean>(true);

  const handleSubmit = () => {
    student
      .post<Assignment>("/submit_assignment", { assignment_id: assignmentId })
      .then((response) => {
        console.log(response);
      });
  };

  return (
    <div className={styles.row}>
      {id ? <p className={styles.rowId}>#{id}</p> : ""}
      {title ? <p className={styles.rowId}>{title}</p> : ""}
      <p
        className={styles.rowName}
        title={name}
        onClick={() => setHidden(!hidden)}>
        {name}
      </p>
      <textarea
        placeholder='name'
        className={styles.textBody}
        readOnly
        onClick={() => setHidden(!hidden)}
        hidden={hidden}>
        {name}
      </textarea>
      {action ? (
        <>
          <input
            type='file'
            name='assigmentSubmit'
            id='assigmentSubmit'
            accept='.txt, .docx'
            onChange={handleSubmit}
            hidden
          />
          <label
            htmlFor='assigmentSubmit'
            className={styles.actionButton}
            onClick={(e) => {
              setAssignmentId(e.currentTarget.getAttribute("data-id"));
            }}
            data-id={actionId}>
            {action}
          </label>
        </>
      ) : (
        ""
      )}
    </div>
  );
};

export default TableRow;
