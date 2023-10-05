import PropTypes from 'prop-types';
import { useState } from 'react';
import { HiEye, HiEyeOff } from 'react-icons/hi';
const Input = ({
  id,
  label,
  type,
  name,
  placeholder,
  error,
  value,
  handleChange,
  toggle = false,
}) => {
  const [isShow, setIsShow] = useState(false);
  return (
    <div className='relative w-full'>
      <label
        htmlFor={id}
        className='block mb-1 font-montserrat text-[#272749] font-medium'
      >
        {label}
      </label>
      <div className='relative'>
        <input
          type={isShow ? 'text' : type}
          name={name}
          id={id}
          value={value}
          onChange={handleChange}
          placeholder={placeholder}
          className={`w-full outline-none border p-2 border-[#C5C5C5] font-medium font font-montserrat focus:border-[#F9A51A] ${
            toggle && 'pr-11'
          }`}
        />
        {toggle && (
          <p className='absolute bottom-2 right-2'>
            {isShow ? (
              <HiEyeOff
                onClick={() => setIsShow(!isShow)}
                className='text-3xl text-[#9F9F9F] cursor-pointer select-none'
              />
            ) : (
              <HiEye
                onClick={() => setIsShow(!isShow)}
                className='text-3xl text-[#9F9F9F] cursor-pointer select-none'
              />
            )}
          </p>
        )}
      </div>
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
  value: PropTypes.string,
  handleChange: PropTypes.func,
  toggle: PropTypes.bool,
};

export default Input;
