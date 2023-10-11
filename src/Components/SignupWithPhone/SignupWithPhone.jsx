// import PropTypes from 'prop-types'
import {
  RecaptchaVerifier,
  signInWithPhoneNumber,
  updateEmail,
  updateProfile,
} from 'firebase/auth';
import { getDownloadURL, ref, uploadBytes } from 'firebase/storage';
import { useContext, useState } from 'react';
import { Link, Navigate, useNavigate } from 'react-router-dom';
import swal from 'sweetalert';
import Auth, { storage } from '../../firebase/firebase-config';
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
  const [photoName, setPhotoName] = useState('');
  const navigate = useNavigate();
  const { user, loading } = useContext(AuthContext);

  const handleInput = (e) => {
    const { name, value } = e.target;
    setRegister((prev) => ({ ...prev, [name]: value }));
    setError((prev) => ({ ...prev, [name]: '' }));
  };

  const handleProfileUpload = (e) => {
    const { name } = e.target.files[0];
    setPhotoName(name);
    const imagesRef = ref(storage, `image/${name}`);
    // 'file' comes from the Blob or File API
    uploadBytes(imagesRef, e.target.files[0])
      .then(() => {
        getDownloadURL(imagesRef)
          .then((url) => {
            setRegister((prev) => ({ ...prev, photoUrl: url }));
          })
          .catch((error) => swal('Error an occur', error.massage, 'error'));
      })
      .catch((error) => swal('Error an occur', error.massage, 'error'));
  };

  const handlePhoneSignin = (e) => {
    const { phone } = register;
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
      })
      .catch((error) => {
        swal('Error an occure', error.message, 'error');
      });
  };

  const handleOptVerify = () => {
    const { email, name, photoUrl, code } = register;
    window.confirmationResult
      .confirm(code)
      .then((currentUser) => {
        updateProfile(currentUser.user, {
          displayName: name,
          photoURL: photoUrl,
        });
        updateEmail(currentUser.user, email).then(() => {});
        swal('Login successfull', '', 'success');
        navigate('/');
      })
      .catch((error) => {
        // console.log(error.message);
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
              <div className='text-[2xl] outline-none border border-[#C5C5C5] px-5 py-2 bg-transparent duration-700 flex-col justify-center items-center block mb-1 font-montserrat text-[#272749] font-medium text-center transition hover:border-[#F9A51A]'>
                <label
                  className='block cursor-pointer text-center'
                  htmlFor='profileImg'
                >
                  Upload Profile Picture
                </label>
                <input
                  className='hidden'
                  type='file'
                  name='photoInput'
                  id='profileImg'
                  onChange={handleProfileUpload}
                  accept='.png, .jpg, .jpeg'
                />
                <p className=' text-green-600 text-[14px] text-center'>
                  {photoName}
                </p>
              </div>
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
                handleBtnClick={handleOptVerify}
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
