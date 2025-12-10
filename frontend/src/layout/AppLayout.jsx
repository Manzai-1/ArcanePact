import { Outlet } from 'react-router';
import Header from './Header';
import Footer from './Footer';

const AppLayout = () => {
  return (
    <>
      <header>
        <Header/>
      </header>
      <main className="app-background">
        <Outlet/>
      </main>
      <footer>
        <Footer/>
      </footer>
    </>
  );
};

export default AppLayout;
