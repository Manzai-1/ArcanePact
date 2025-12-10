import styles from './header.module.css';
import Navigation from "../features/navigation/Navigation";
import WalletButton from '../features/wallet/WalletButton';
import Logo from '../components/logo/Logo';

const Header = () => {
  return (
    <div className={styles.header}>
      <div className={styles.left}>
        <Logo />
      </div>
      <div className={styles.center}>
        <Navigation />
      </div>
      <div className={styles.right}>
        <WalletButton />
      </div>
    </div>
  );
};

export default Header;
