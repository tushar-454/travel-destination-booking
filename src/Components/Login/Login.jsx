/* eslint-disable no-useless-escape */
import { useContext, useState } from 'react';
import { FcCellPhone, FcGoogle } from 'react-icons/fc';
import { TfiTwitterAlt } from 'react-icons/tfi';
import { Link, useNavigate } from 'react-router-dom';
import swal from 'sweetalert';
import { AuthContext } from '../AuthProvider/AuthProvider';
import Button from '../UI/Button';
import Input from '../UI/Input';
import LoginWith from '../UI/LoginWith';

const loginInit = {
  email: '',
  password: '',
};
const errorInit = {
  email: '',
  password: '',
};

const Login = () => {
  const [login, setLogin] = useState({ ...loginInit });
  const [error, setError] = useState({ ...errorInit });
  const { loginGoogle, loginEmailPass } = useContext(AuthContext);
  const navigate = useNavigate();

  const handleGoogleLogin = () => {
    loginGoogle()
      .then(() => {
        swal('Login successfully', '', 'success');
        navigate('/');
      })
      .catch((error) => swal('Error an ocure', error.massage, 'error'));
  };

  const handleInput = (e) => {
    const { name, value } = e.target;
    setLogin((prev) => ({ ...prev, [name]: value }));
    setError((prev) => ({ ...prev, [name]: '' }));
  };

  const handleLogin = (e) => {
    const { email, password } = login;
    e.preventDefault();
    if (!email) {
      setError((prev) => ({ ...prev, email: 'Email Required.' }));
      return;
    } else if (
      !/^([a-zA-Z0-9_\-\.]+)@([a-zA-Z0-9_\-]+)(\.[a-zA-Z]{2,5}){1,2}$/.test(
        email
      )
    ) {
      setError((prev) => ({ ...prev, email: 'Email not valid !' }));
      return;
    }
    if (!password) {
      setError((prev) => ({ ...prev, password: 'Password Required' }));
      return;
    }
    loginEmailPass(email, password)
      .then(() => {
        swal('Login Successfull.', '', 'success');
        setTimeout(() => navigate('/'), 1500);
        setLogin({ ...loginInit });
      })
      .catch((error) => swal('Error an occur', error.message, 'error'));
  };

  return (
    <div className='max-w-6xl mx-auto px-4'>
      <div className='w-full flex justify-center'>
        <div className='w-full sm:w-[570px] px-8 md:px-14 py-8 border border-[#ABABAB] rounded-md'>
          {/* login title */}
          <div className='title mb-8'>
            <h1 className='text-2xl font-bold font-montserrat'>Login</h1>
          </div>
          {/* login form  */}
          <div className='form'>
            <form className='space-y-6' onSubmit={handleLogin}>
              <Input
                id='email'
                label='Enter your email'
                name='email'
                placeholder='jhonduo@trqp.fto'
                type='email'
                error={error.email}
                value={login.email}
                handleChange={handleInput}
              />
              <Input
                id='password'
                label='Enter your password'
                name='password'
                placeholder='dfgWEI93$#F'
                type='password'
                toggle={true}
                error={error.password}
                value={login.password}
                handleChange={handleInput}
              />
              {/* remember and forgot  */}
              <div className='flex justify-between items-center'>
                <div className='flex gap-1'>
                  <input type='checkbox' name='remember' id='remember' />
                  <label htmlFor='remember' className='font-medium'>
                    Remember me
                  </label>
                </div>
                <div>
                  <Link
                    to={'/forgot-password'}
                    className='font-medium font-montserrat underline underline-offset-2 transition hover:underline-offset-4 text-[#F9A51A]'
                  >
                    Forgot password ?
                  </Link>
                </div>
              </div>
              <Button
                displayName='Login'
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
                displayName={'Signin with phone'}
                icon={<FcCellPhone className='text-3xl' />}
              />
            </Link>
            <LoginWith
              handleClick={handleGoogleLogin}
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

export default Login;
