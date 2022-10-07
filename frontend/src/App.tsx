import styles from "./App.module.scss";
import Logo from "./components/Logo";
import UserSelection from "./components/UserSelection";

const App = () => {
  return (
    <div className={styles.wrapper}>
      <header className={styles.header}>
        <Logo />
      </header>
      <div className={styles.selectionWrapper}>
        <UserSelection type='student' />
        <UserSelection type='admin' />
        <UserSelection type='instructor' />
      </div>
    </div>
  );
};

export default App;
