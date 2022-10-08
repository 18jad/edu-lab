import styles from "../styles/AdminStudentsPage.module.scss";

const TableRow = ({ id, name }: any) => {
  return (
    <div className={styles.row}>
      <p className={styles.rowId}>#{id}</p>
      <p className={styles.rowName}>{name}</p>
    </div>
  );
};

export default TableRow;
