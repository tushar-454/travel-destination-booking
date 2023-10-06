import PropTypes from 'prop-types';

const InputBtn = ({
  htmlFor,
  label,
  type,
  name,
  placeholder,
  error,
  success,
  select = false,
  handleBtnClick,
  handleChange,
  actionBtn,
  id,
}) => {
  return (
    <div className='flex flex-col gap-2 mt-3'>
      <label
        htmlFor={htmlFor}
        className='block mb-1 font-montserrat text-[#272749] font-medium'
      >
        {label}
      </label>
      {select && (
        <select
          name='tel'
          id='tel'
          className='w-full px-3 py-2 rounded border border-line text-black outline-none transition text-[13px] focus:border-black'
        >
          <option value='+88'>+88 (Bangladesh)</option>
        </select>
      )}
      <div className='inputBtnGroup flex'>
        <input
          type={type}
          name={name}
          id={htmlFor}
          onChange={handleChange}
          placeholder={placeholder}
          className='w-full px-3 py-2 rounded border border-line text-black outline-none transition text-[13px] focus:border-[#F9A51A]'
        />
        <button
          id={id}
          className='w-fit px-5 py-2 rounded-tr rounded-br border bg-[#F9A51A]  border-[#F9A51A] text-white text-[13px] -ml-5'
          onClick={handleBtnClick}
        >
          {actionBtn}
        </button>
      </div>
      {error && <p className='text-[12px] text-red-600'>{error}</p>}
      {success && <p className='text-[12px] text-green-600'>{success}</p>}
    </div>
  );
};
InputBtn.propTypes = {
  htmlFor: PropTypes.string.isRequired,
  label: PropTypes.string.isRequired,
  type: PropTypes.string.isRequired,
  name: PropTypes.string.isRequired,
  placeholder: PropTypes.string.isRequired,
  select: PropTypes.bool,
  error: PropTypes.string,
  success: PropTypes.string,
  id: PropTypes.string,
  handleBtnClick: PropTypes.func,
  handleChange: PropTypes.func,
  actionBtn: PropTypes.string.isRequired,
};
export default InputBtn;
