import PropTypes from 'prop-types';

const Input = ({ id, label, type, name, placeholder, error }) => {
  return (
    <div className='relative w-full'>
      <label
        htmlFor={id}
        className='block mb-1 font-montserrat text-[#272749] font-medium'
      >
        {label}
      </label>
      <input
        type={type}
        name={name}
        id={id}
        placeholder={placeholder}
        className='w-full outline-none border p-2 border-[#C5C5C5] font-medium font font-montserrat focus:border-[#F9A51A]'
      />
      {error ?? <p className='text-red-500 italic transition'>{error}</p>}
    </div>
  );
};

Input.propTypes = {
  error: PropTypes.string,
  id: PropTypes.string.isRequired,
  label: PropTypes.string.isRequired,
  type: PropTypes.string.isRequired,
  name: PropTypes.string.isRequired,
  placeholder: PropTypes.string.isRequired,
};

export default Input;
