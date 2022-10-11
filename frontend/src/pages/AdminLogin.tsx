import { AxiosResponse } from "axios";
import { useState } from "react";
import { toast, ToastContainer } from "react-toastify";
import "react-toastify/dist/ReactToastify.css";
import { admin } from "../hooks/AxiosFetch";
import styles from "../styles/LoginForm.module.scss";
interface Admin {
  username: string;
  password: string;
}

const handleSubmit = (
  e: React.FormEvent<HTMLFormElement>,
  username: string,
  password: string,
) => {
  e.preventDefault();
  admin
    .post<Admin>("/login", { username, password })
    .then((response: AxiosResponse) => {
      console.log(response.data);
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
        localStorage.setItem(
          "admin_access_token",
          data.authorization.auth_token,
        );
        localStorage.setItem("admin_id", data.admin._id);
        setTimeout(() => {
          window.location.reload();
        }, 2700);
      }
    });
};

const AdminLogin = () => {
  const [username, setUsername] = useState<string>("");
  const [password, setPassword] = useState<string>("");

  return (
    <div className={styles.wrapper}>
      <form
        className={styles.loginForm}
        onSubmit={(e: React.FormEvent<HTMLFormElement>): void =>
          handleSubmit(e, username, password)
        }>
        <header className={styles.formHeader}>Admin</header>
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
              onChange={(e: React.ChangeEvent<HTMLInputElement>) =>
                setUsername(e.target.value)
              }
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
              onChange={(e: React.ChangeEvent<HTMLInputElement>) =>
                setPassword(e.target.value)
              }
              required
            />
          </div>
          <button type='submit' className={styles.submitBtn}>
            Login
          </button>
          <span className={styles.loginResult}>Password is uncorrect</span>
        </div>
      </form>
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

export default AdminLogin;
