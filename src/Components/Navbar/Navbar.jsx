import logo from '../../assets/images/logo.png';

const Navbar = () => {
  return (
    <div>
      {/* nav logo  */}
      <div className='logo w-32'>
        <img src={logo} alt='logo' className='w-full' />
      </div>
    </div>
  );
};

export default Navbar;
