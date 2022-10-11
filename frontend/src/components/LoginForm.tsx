import { FC } from "react";
import styles from "../styles/LoginForm.module.scss";

interface Form {
  type: string;
}

const LoginForm: FC<Form> = ({ type }) => {
  return (
    <form className={styles.loginForm}>
      <header className={styles.formHeader}>{type}</header>
      <div className={styles.formBody}>
        <div className={styles.inputContainer}>
          <label htmlFor='usernameInput' className={styles.inputLabel}>
            Username
          </label>
          <input
            type='text'
            name='username'
            id='usernameInput'
            className={styles.input}
            required
          />
        </div>
        <div className={styles.inputContainer}>
          <label htmlFor='passwordInput' className={styles.inputLabel}>
            Password
          </label>
          <input
            type='password'
            name='password'
            id='passwordInput'
            className={styles.input}
            required
          />
        </div>
        <button type='submit' className={styles.submitBtn}>
          Login
        </button>
        <span className={styles.loginResult}>Password is uncorrect</span>
      </div>
    </form>
  );
};

export default LoginForm;
