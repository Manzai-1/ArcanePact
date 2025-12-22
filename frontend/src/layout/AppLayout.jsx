import { Outlet } from 'react-router';
import Header from './Header';
import Footer from './Footer';
import { Web3Provider } from '../providers/Web3Provider';
import '@rainbow-me/rainbowkit/styles.css';
import styles from './layout.module.css';

const AppLayout = () => {
  return (
    <>
      <Web3Provider>
        <div className={styles.background}>
          <Header/>
          <main className={styles.main}>
            <Outlet/>
          </main>
          <footer className={styles.footer}>
            <Footer/>
          </footer>
        </div>
      </Web3Provider>
    </>
  );
};

export default AppLayout;
