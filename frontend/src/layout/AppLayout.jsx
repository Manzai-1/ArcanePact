import { Outlet } from 'react-router';
import Header from './Header';
import Footer from './Footer';

const AppLayout = () => {
  return (
    <>
      <header>
        <Header/>
      </header>
      <main>
        <Outlet/>
      </main>
      <footer>
        <Footer/>
      </footer>
    </>
  );
};

export default AppLayout;
