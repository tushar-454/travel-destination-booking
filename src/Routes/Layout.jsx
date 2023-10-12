import { Outlet } from 'react-router-dom';
import Navbar from '../Components/Navbar/Navbar';

const Layout = () => {
  return (
    <>
      <header className='z-50'>
        <div className='max-w-6xl mx-auto px-4'>
          <Navbar />
        </div>
      </header>
      {/* outlet content */}
      <Outlet />
    </>
  );
};

export default Layout;
