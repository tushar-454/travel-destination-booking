import PropTypes from 'prop-types';

const LoginWith = ({ icon, displayName, handleClick }) => {
  return (
    <div
      onClick={handleClick}
      className='text-xl font-medium border rounded-full p-2 flex justify-center items-center gap-3 cursor-pointer transition hover:bg-slate-100 active:bg-slate-50 select-none'
    >
      {icon}
      {displayName}
    </div>
  );
};

LoginWith.propTypes = {
  handleClick: PropTypes.func,
  icon: PropTypes.element,
  displayName: PropTypes.string,
};

export default LoginWith;
