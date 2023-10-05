// import PropTypes from 'prop-types'
import { Link } from 'react-router-dom';
import Button from '../UI/Button';
import Input from '../UI/Input';
import InputBtn from '../UI/InputBtn';
const SignupWithPhone = () => {
  return (
    <div className='max-w-6xl mx-auto px-4'>
      <div className='w-full flex justify-center'>
        <div className='w-full sm:w-[570px] px-8 md:px-14 py-8 border border-[#ABABAB] rounded-md'>
          {/* signupwithphone title */}
          <div className='title mb-8'>
            <h1 className='text-2xl font-bold font-montserrat'>
              Signup with phone number
            </h1>
          </div>
          {/* signupwithphone form  */}
          <div className='form'>
            <form className='space-y-6'>
              <Input
                id='name'
                label='Enter your name'
                name='name'
                placeholder='jhon dou'
                type='text'
                error={''}
              />
              <Input
                id='email'
                label='Enter your email'
                name='email'
                placeholder='example@yahoo.com'
                type='email'
                error={''}
              />
              <InputBtn
                htmlFor='phone'
                label='Phone'
                name='phone'
                placeholder='+8801700000000'
                type='tel'
                error={''}
                success={''}
                select={true}
              />
              <Button
                displayName='Signup'
                type='submit'
                style={{ display: 'block', width: '100%' }}
              />
            </form>
          </div>
          {/* create an account  */}
          <div className='text-center my-8'>
            <p className='font-medium'>
              Don’t have an account?{' '}
              <Link
                to={'/signup'}
                className='font-medium font-montserrat underline underline-offset-2 transition hover:underline-offset-4 text-[#F9A51A]'
              >
                Create an account
              </Link>
            </p>
          </div>
        </div>
      </div>
    </div>
  );
};

SignupWithPhone.propTypes = {};

export default SignupWithPhone;
