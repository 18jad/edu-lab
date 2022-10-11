import Beaker from "../icons/Beaker";
import styles from "../styles/Logo.module.scss";

const Logo = () => {
  return (
    <div className={styles.logo_wrapper}>
      <Beaker height='35' />
      Edu Lab
    </div>
  );
};

export default Logo;
