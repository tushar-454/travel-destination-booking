// import PropTypes from 'prop-types'
import {
  RecaptchaVerifier,
  signInWithPhoneNumber,
  updateProfile,
} from 'firebase/auth';
import { useContext, useState } from 'react';
import { Link, Navigate, useNavigate } from 'react-router-dom';
import swal from 'sweetalert';
import Auth from '../../firebase/firebase-config';
import { AuthContext } from '../AuthProvider/AuthProvider';
import Button from '../UI/Button';
import Input from '../UI/Input';
import InputBtn from '../UI/InputBtn';

const registerInit = {
  name: '',
  photoUrl: '',
  email: '',
  phone: '',
  code: '',
};

const errorInit = {
  name: '',
  photoUrl: '',
  email: '',
  phone: '',
  code: '',
};

const SignupWithPhone = () => {
  const [register, setRegister] = useState({ ...registerInit });
  const [error, setError] = useState({ ...errorInit });
  const navigate = useNavigate();
  const { user, loading } = useContext(AuthContext);

  const handleInput = (e) => {
    const { name, value } = e.target;
    setRegister((prev) => ({ ...prev, [name]: value }));
    setError((prev) => ({ ...prev, [name]: '' }));
  };

  const handlePhoneSignin = (e) => {
    const { email, name, phone, code, photoUrl } = register;
    e.preventDefault();
    window.recaptchaVerifier = new RecaptchaVerifier(Auth, 'send-otp', {
      size: 'invisible',
      callback: () => {},
    });

    signInWithPhoneNumber(Auth, phone, window.recaptchaVerifier)
      .then((confirmationResult) => {
        // SMS sent. Prompt user to type the code from the message, then sign the
        // user in with confirmationResult.confirm(code).
        window.confirmationResult = confirmationResult;

        console.log(confirmationResult);
        console.log('code send done');
        const code = prompt('Enter your verification code');
        if (code) {
          confirmationResult
            .confirm(code)
            .then((currentUser) => {
              updateProfile(currentUser.user, {
                displayName: name,
                photoURL: photoUrl,
              });
              swal('Login successfull', '', 'success');
              navigate('/');
            })
            .catch((error) => {
              // console.log(error.message);
              swal('Error an occure', error.message, 'error');
            });
        }
      })
      .catch((error) => {
        swal('Error an occure', error.message, 'error');
      });
  };

  if (loading) {
    return;
  }

  if (user) {
    return <Navigate to={'/'} replace={true} />;
  }

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
            <form className='space-y-6' onSubmit={handlePhoneSignin}>
              <Input
                id='name'
                label='Enter your name'
                name='name'
                placeholder='jhon dou'
                type='text'
                error={error.name}
                value={register.name}
                handleChange={handleInput}
              />
              <Input
                id='photoUrl'
                label='Provide your Photo Url'
                name='photoUrl'
                placeholder='https://profilephotp.com/myphoto.jpg'
                type='url'
                error={error.photoUrl}
                value={register.photoUrl}
                handleChange={handleInput}
              />
              <Input
                id='email'
                label='Enter your email'
                name='email'
                placeholder='example@yahoo.com'
                type='email'
                error={error.email}
                value={register.email}
                handleChange={handleInput}
              />
              <InputBtn
                htmlFor='phone'
                label='Phone'
                name='phone'
                placeholder='+8801700000000'
                type='tel'
                success={''}
                select={true}
                actionBtn={'Send OPT'}
                error={error.phone}
                value={register.phone}
                handleChange={handleInput}
                id={'send-otp'}
              />
              <InputBtn
                htmlFor='verify'
                label='Verify code'
                name='code'
                placeholder='346743'
                type='text'
                success={''}
                select={false}
                actionBtn={'Verify'}
                error={error.code}
                value={register.code}
                handleChange={handleInput}
              />
              <Button
                displayName='Signin'
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
