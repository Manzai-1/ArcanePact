import { Outlet } from 'react-router';
import Header from './Header';
import Footer from './Footer';
import { Web3Provider } from '../providers/Web3Provider';
import '@rainbow-me/rainbowkit/styles.css';

const AppLayout = () => {
  return (
    <>
      <Web3Provider>
        <header>
          <Header/>
        </header>
        <main className="app-background">
          <Outlet/>
        </main>
        <footer>
          <Footer/>
        </footer>
      </Web3Provider>
    </>
  );
};

export default AppLayout;
