import PropTypes from 'prop-types';

const Button = ({ style, displayName, type, id, handleClick }) => {
  return (
    <div className='w-full'>
      <button
        type={type}
        id={id}
        onClick={handleClick}
        className='bg-[#F9A51A] text-black py-3 px-7 font-medium font-montserrat rounded transition hover:bg-[#e08b03]'
        style={style}
      >
        {displayName}
      </button>
    </div>
  );
};

Button.propTypes = {
  type: PropTypes.string.isRequired,
  displayName: PropTypes.string.isRequired,
  id: PropTypes.string,
  style: PropTypes.object,
  handleClick: PropTypes.func,
};

export default Button;
