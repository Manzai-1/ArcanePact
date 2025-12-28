import { Outlet } from 'react-router';
import Header from './Header';
import Footer from './Footer';
import { Web3Provider } from '../providers/Web3Provider';
import '@rainbow-me/rainbowkit/styles.css';
import styles from './layout.module.css';
import { SiteAgreement } from '../features/siteAgreement/SiteAgreement';
import { useState } from 'react';

const AppLayout = () => {
  const [hasAgreed, setHasAgreed] = useState(localStorage.getItem("legalAccepted"));
  const isLegalRoute =
    location.pathname === "/terms" ||
    location.pathname === "/privacy";

  return (
    <>
      <Web3Provider>
        <div className={styles.background}>
          <Header/>
          <main className={styles.main}>
             {(hasAgreed || isLegalRoute)  &&<Outlet/>}
             {(!hasAgreed && !isLegalRoute)&&<SiteAgreement setHasAgreed={setHasAgreed}/>}
          </main>
          <footer className={styles.footer}> <Footer/> </footer>
        </div>
      </Web3Provider>
    </>
  );
};

export default AppLayout;
