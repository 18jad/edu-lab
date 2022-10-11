import Admin from "../icons/Admin";
import Instructor from "../icons/Instructor";
import Student from "../icons/Student";
import styles from "../styles/UserSelection.module.scss";

const UserSelection = ({ type }: any) => {
  return (
    <div className={styles.box}>
      {type === "student" ? (
        <Student height='90' />
      ) : type === "admin" ? (
        <Admin height='90' />
      ) : (
        <Instructor height='90' />
      )}
      <p className={styles.userType}>{type}</p>
    </div>
  );
};

export default UserSelection;
