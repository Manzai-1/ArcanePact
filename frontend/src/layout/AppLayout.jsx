import { Outlet } from 'react-router';
import Header from './Header';
import Footer from './Footer';
import { Web3Provider } from '../providers/Web3Provider';
import '@rainbow-me/rainbowkit/styles.css';

const AppLayout = () => {
  return (
    <>
      <Web3Provider>
        <div className='app-background'>
          <header>
            <Header/>
          </header>
          <main>
            <Outlet/>
          </main>
          <footer>
            <Footer/>
          </footer>
        </div>
      </Web3Provider>
    </>
  );
};

export default AppLayout;
