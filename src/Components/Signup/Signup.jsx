// import PropTypes from 'prop-types'

import { FcCellPhone, FcGoogle } from 'react-icons/fc';
import { TfiTwitterAlt } from 'react-icons/tfi';
import { Link } from 'react-router-dom';
import Button from '../UI/Button';
import Input from '../UI/Input';
import LoginWith from '../UI/LoginWith';

const Signup = () => {
  return (
    <div className='max-w-6xl mx-auto px-4'>
      <div className='w-full flex justify-center'>
        <div className='w-full sm:w-[570px] px-8 md:px-14 py-8 border border-[#ABABAB] rounded-md'>
          {/* login title */}
          <div className='title mb-8'>
            <h1 className='text-2xl font-bold font-montserrat'>
              Create an account
            </h1>
          </div>
          {/* login form  */}
          <div className='form'>
            <form className='space-y-6'>
              <Input
                id='name'
                label='Enter your full name'
                name='name'
                placeholder='jhon dou'
                type='text'
                error={''}
              />
              <Input
                id='email'
                label='Enter your email'
                name='email'
                placeholder='jhonduo@trqp.fto'
                type='email'
                error={''}
              />
              <Input
                id='password'
                label='Enter your password'
                name='password'
                placeholder='dfgWEI93$#F'
                type='password'
                error={''}
              />
              <Input
                id='confirmPassword'
                label='Confirm your password'
                name='confirmPassword'
                placeholder='dfgWEI93$#F'
                type='password'
                error={''}
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
              Already have an account?{' '}
              <Link
                to={'/login'}
                className='font-medium font-montserrat underline underline-offset-2 transition hover:underline-offset-4 text-[#F9A51A]'
              >
                Login
              </Link>
            </p>
          </div>
          {/* or divider  */}
          <div className='divider relative w-full flex justify-center items-center'>
            <span className='font-medium bg-white absolute w-fit text-center px-1'>
              Or
            </span>
          </div>
          {/* log in with  */}
          <div className='my-8 space-y-3'>
            <Link to={'/signupwithphone'}>
              <LoginWith
                displayName={'Signup with phone'}
                icon={<FcCellPhone className='text-3xl' />}
              />
            </Link>
            <LoginWith
              displayName={'Login with google'}
              icon={<FcGoogle className='text-3xl' />}
            />
            <LoginWith
              displayName={'Login with twitter'}
              icon={<TfiTwitterAlt className='text-3xl text-[#1976D2]' />}
            />
          </div>
        </div>
      </div>
    </div>
  );
};

Signup.propTypes = {};

export default Signup;
