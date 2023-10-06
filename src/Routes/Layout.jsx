import { Outlet, useLocation } from 'react-router-dom';
import Navbar from '../Components/Navbar/Navbar';

const Layout = () => {
  const location = useLocation();
  return (
    <section
      className={
        location.pathname === '/'
          ? `h-screen bg-[url('/src/assets/images/background.png')] bg-no-repeat bg-cover`
          : `bg-white`
      }
    >
      <div
        className={
          location.pathname === '/' ? 'h-screen bg-[#00000095]' : 'bg-white'
        }
      >
        <header>
          <div className='max-w-6xl mx-auto px-4'>
            <Navbar />
          </div>
        </header>
        {/* outlet content */}
        <Outlet />
      </div>
    </section>
  );
};

export default Layout;
