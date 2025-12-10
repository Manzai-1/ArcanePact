import styles from "./logo.module.css";
import logo from '../../assets/logo.png';

const Logo = () => {
  return (
    <div className={styles.logo}>
      <img src={logo} alt="Arcane Pact logo" className={styles.logo}/>
    </div>
  );
}

export default Logo;