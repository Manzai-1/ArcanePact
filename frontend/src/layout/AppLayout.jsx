import { Outlet } from 'react-router';
import Header from './Header';
import Footer from './Footer';
import { Web3Provider } from '../providers/Web3Provider';
import '@rainbow-me/rainbowkit/styles.css';
import StorageProvider from '../providers/StorageProvider';

const AppLayout = () => {
  return (
    <>
      <Web3Provider>
        <StorageProvider>
        <header>
          <Header/>
        </header>
        <main className="app-background">
          <Outlet/>
        </main>
        <footer>
          <Footer/>
        </footer>
        </StorageProvider>
      </Web3Provider>
    </>
  );
};

export default AppLayout;
