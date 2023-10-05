// import PropTypes from 'prop-types'
import { Link } from 'react-router-dom';
import Button from '../UI/Button';
import Input from '../UI/Input';
const ForgotPassword = () => {
  return (
    <div className='max-w-6xl mx-auto px-4'>
      <div className='w-full flex justify-center'>
        <div className='w-full sm:w-[570px] px-8 md:px-14 py-8 border border-[#ABABAB] rounded-md'>
          {/* login title */}
          <div className='title mb-8'>
            <h1 className='text-2xl font-bold font-montserrat'>
              Reset your password
            </h1>
          </div>
          {/* login form  */}
          <div className='form'>
            <form className='space-y-6'>
              <Input
                id='email'
                label='Enter your email'
                name='email'
                placeholder='jhonduo@trqp.fto'
                type='email'
                error={''}
              />
              <Button
                displayName='Login'
                type='submit'
                style={{ display: 'block', width: '100%' }}
              />
            </form>
          </div>
          {/* goto login  */}
          <div className='text-center my-8'>
            <p className='font-medium'>
              Your password has been reset ?{' '}
              <Link
                to={'/login'}
                className='font-medium font-montserrat underline underline-offset-2 transition hover:underline-offset-4 text-[#F9A51A]'
              >
                Login
              </Link>
            </p>
          </div>
        </div>
      </div>
    </div>
  );
};

ForgotPassword.propTypes = {};

export default ForgotPassword;
