import PropTypes from 'prop-types';

const Button = ({ style, displayName, type }) => {
  return (
    <div className='w-full'>
      <button
        type={type}
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
  style: PropTypes.object,
};

export default Button;
