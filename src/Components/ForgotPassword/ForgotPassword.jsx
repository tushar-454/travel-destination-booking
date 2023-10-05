/* eslint-disable no-useless-escape */
// import PropTypes from 'prop-types'
import { useContext, useState } from 'react';
import { Link } from 'react-router-dom';
import swal from 'sweetalert';
import { AuthContext } from '../AuthProvider/AuthProvider';
import Button from '../UI/Button';
import Input from '../UI/Input';
const ForgotPassword = () => {
  const [email, setEmail] = useState('');
  const [error, setError] = useState('');
  const { resetPass } = useContext(AuthContext);

  const handleChange = (e) => {
    setEmail(e.target.value);
    setError('');
  };

  const handleReset = (e) => {
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

    resetPass(email)
      .then(() => {
        swal('Reset link send your mail.', 'Please check your mailbox', 'info');
      })
      .catch((error) =>
        swal('Something else', `${error.message} || Please try again`, 'error')
      );
  };

  return (
    <div className='max-w-6xl mx-auto px-4'>
      <div className='w-full flex justify-center'>
        <div className='w-full sm:w-[570px] px-8 md:px-14 py-8 border border-[#ABABAB] rounded-md'>
          {/* forgot password title */}
          <div className='title mb-8'>
            <h1 className='text-2xl font-bold font-montserrat'>
              Reset your password
            </h1>
          </div>
          {/* forgot password form  */}
          <div className='form'>
            <form className='space-y-6' onSubmit={handleReset}>
              <Input
                id='email'
                label='Enter your email'
                name='email'
                placeholder='jhonduo@trqp.fto'
                type='email'
                error={error}
                value={email}
                handleChange={handleChange}
              />
              <Button
                displayName='Reset your password'
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
