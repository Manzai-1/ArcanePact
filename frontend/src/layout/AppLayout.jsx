import { Outlet } from 'react-router';
import Header from './Header';
import Footer from './Footer';
import WalletProvider from '../providers/WalletProvider';


const AppLayout = () => {
  return (
    <>
      <WalletProvider>
        <header>
          <Header/>
        </header>
        <main className="app-background">
          <Outlet/>
        </main>
        <footer>
          <Footer/>
        </footer>
      </WalletProvider>
    </>
  );
};

export default AppLayout;
