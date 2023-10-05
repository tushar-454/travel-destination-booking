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
  onChange,
  btnText = 'Verify',
}) => {
  return (
    <div className='flex flex-col gap-2 mt-3'>
      <label htmlFor={htmlFor} className='text-black'>
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
          onChange={onChange}
          placeholder={placeholder}
          className='w-full px-3 py-2 rounded border border-line text-black outline-none transition text-[13px] focus:border-[#F9A51A]'
        />
        <button
          className='px-5 py-2 rounded-tr rounded-br border bg-[#F9A51A]  border-[#F9A51A] text-white text-[13px] -ml-5'
          onClick={handleBtnClick}
        >
          {btnText}
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
  handleBtnClick: PropTypes.func,
  onChange: PropTypes.func,
  btnText: PropTypes.string,
};
export default InputBtn;
