import { signOut } from 'firebase/auth';
import { useContext } from 'react';
import { BsSearch } from 'react-icons/bs';
import { Link, useLoaderData, useLocation } from 'react-router-dom';
import swal from 'sweetalert';
import logoBlack from '../../assets/images/logo.png';
import logoWhite from '../../assets/logo.svg';
import Auth from '../../firebase/firebase-config';
import { AuthContext } from '../AuthProvider/AuthProvider';
import Button from '../UI/Button';
import CustomLink from '../UI/CustomLink';

const Navbar = () => {
  const menus = useLoaderData();
  const location = useLocation();
  const { user } = useContext(AuthContext);

  const handleSignout = () => {
    signOut(Auth)
      .then(() => {
        swal('Signout Successfull', '', 'error');
      })
      .catch((error) => console.log(error.message));
  };

  return (
    <div className='flex justify-between items-center py-4'>
      {/* nav logo  */}
      <div className='logo w-32'>
        <Link to={'/'} state={'Travel'}>
          {location.pathname === '/' ? (
            <img src={logoWhite} alt='logo' className='w-full' />
          ) : (
            <img src={logoBlack} alt='logo' className='w-full' />
          )}
        </Link>
      </div>
      {/* nav search box  */}
      <div className='search relative'>
        <BsSearch
          className={`text-xl ${
            location.pathname === '/' ? 'text-white' : 'text-black'
          } absolute top-3 left-2`}
        />
        <input
          type='search'
          name='search'
          id='search'
          placeholder='search your destination'
          className={`bg-[#FFFFFF33] ${
            location.pathname === '/' ? 'text-white' : 'text-black'
          } font-medium py-2 pl-10 pr-3 rounded-md border outline-none`}
        />
      </div>
      {/* nav menus  */}
      <div className='flex gap-5'>
        {menus?.map((menu, index) => (
          <Link
            key={index}
            to={menu.path}
            state={menu.name}
            className={`font-medium font-montserrat ${
              location.pathname === '/' ? 'text-white' : 'text-black'
            }`}
          >
            {menu.name}
          </Link>
        ))}
      </div>
      {/* login button  */}
      <div className='loginButton'>
        {user ? (
          <Button
            displayName='Signout'
            type='button'
            handleClick={handleSignout}
          />
        ) : (
          <CustomLink displayName='Login' path='/login' state='Login' />
        )}
      </div>
    </div>
  );
};

export default Navbar;
