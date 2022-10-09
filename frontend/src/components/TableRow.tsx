import styles from "../styles/AdminStudentsPage.module.scss";

const TableRow = ({ id, name, action, actionId, title }: any) => {
  return (
    <div className={styles.row}>
      {id ? <p className={styles.rowId}>#{id}</p> : ""}
      {title ? <p className={styles.rowId}>{title}</p> : ""}
      <p className={styles.rowName} title={name}>
        {name}
      </p>
      {action ? (
        <>
          <input
            type='file'
            name='assigmentSubmit'
            id='assigmentSubmit'
            accept='.txt, .docx'
            hidden
          />
          <label
            htmlFor='assigmentSubmit'
            className={styles.actionButton}
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
