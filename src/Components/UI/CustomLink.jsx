import PropTypes from 'prop-types';
import { Link } from 'react-router-dom';
const CustomLink = ({ path, state, displayName }) => {
  return (
    <Link
      to={path}
      state={state}
      className={
        'bg-[#F9A51A] text-black py-3 px-7 font-medium font-montserrat rounded transition hover:bg-[#e08b03]'
      }
    >
      {displayName}
    </Link>
  );
};
CustomLink.propTypes = {
  path: PropTypes.string.isRequired,
  state: PropTypes.string.isRequired,
  displayName: PropTypes.string.isRequired,
};
export default CustomLink;
