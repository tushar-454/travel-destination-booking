/* eslint-disable no-useless-escape */
// import PropTypes from 'prop-types'
import { updateProfile } from 'firebase/auth';
import { getDownloadURL, ref, uploadBytes } from 'firebase/storage';
import { useContext, useState } from 'react';
import { FcCellPhone } from 'react-icons/fc';
import { Link, Navigate, useNavigate } from 'react-router-dom';
import swal from 'sweetalert';
import Auth, { storage } from '../../firebase/firebase-config';
import { AuthContext } from '../AuthProvider/AuthProvider';
import Button from '../UI/Button';
import Input from '../UI/Input';
import LoginWith from '../UI/LoginWith';

const registerInit = {
  name: '',
  email: '',
  photoUrl: '',
  password: '',
  confirmPassword: '',
};

const errorInit = {
  name: '',
  email: '',
  photoUrl: '',
  password: '',
  confirmPassword: '',
};

const Signup = () => {
  const [register, setRegister] = useState({ ...registerInit });
  const [error, setError] = useState({ ...errorInit });
  const [photoName, setPhotoName] = useState('');
  const navigate = useNavigate();
  const { loading, user, registerAccountEmailPass } = useContext(AuthContext);

  const handleInput = (e) => {
    const { name, value } = e.target;
    setRegister((prev) => ({ ...prev, [name]: value }));
    setError((prev) => ({ ...prev, [name]: '' }));
  };
  // console.log(profileImg.current);
  const handleProfileUpload = (e) => {
    const { name } = e.target.files[0];
    setPhotoName(name);
    const imagesRef = ref(storage, `images/${name}`);
    // 'file' comes from the Blob or File API
    uploadBytes(imagesRef, e.target.files[0])
      .then(() => {
        getDownloadURL(imagesRef)
          .then((url) => setRegister((prev) => ({ ...prev, photoUrl: url })))
          .catch((error) => swal('Error an occur', error.massage, 'error'));
      })
      .catch((error) => swal('Error an occur', error.massage, 'error'));
  };

  const handleRegister = (e) => {
    e.preventDefault();
    const { name, email, photoUrl, password, confirmPassword } = register;
    if (!name) {
      setError((prev) => ({ ...prev, name: 'Name Required' }));
      return;
    } else if (name.length < 4) {
      setError((prev) => ({
        ...prev,
        name: 'Name have at least 4 charecters.',
      }));
      return;
    }
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

    // if (!photoUrl) {
    //   setError((prev) => ({ ...prev, photoUrl: 'Photo Url Required' }));
    //   return;
    // } else if (
    //   !/^https?:\/\/.*\/.*\.(png|gif|webp|jpeg|jpg)\??.*$/gim.test(photoUrl)
    // ) {
    //   setError((prev) => ({ ...prev, photoUrl: 'Url not valid !' }));
    //   return;
    // }

    if (!password) {
      setError((prev) => ({ ...prev, password: 'Password Required' }));
      return;
    } else if (password.length < 8) {
      setError((prev) => ({
        ...prev,
        password: 'Password must be 8 cherecters.',
      }));
      return;
    } else if (
      !/^(?=.*\d)(?=.*[a-z])(?=.*[A-Z])(?=.*[!@#$%^&*()_+])[0-9a-zA-Z!@#$%^&*()_+]{8,}$/.test(
        password
      )
    ) {
      setError((prev) => ({
        ...prev,
        password:
          'Password must be uppercase, lowercase, number & special character mixed !',
      }));
      return;
    }

    if (!confirmPassword) {
      setError((prev) => ({
        ...prev,
        confirmPassword: 'Confirm password Required',
      }));
      return;
    } else if (password !== confirmPassword) {
      setError((prev) => ({
        ...prev,
        confirmPassword: 'Confirm password and password not matched !',
      }));
      return;
    }

    registerAccountEmailPass(email, password)
      .then(() => {
        updateProfile(Auth.currentUser, {
          displayName: name,
          photoURL: photoUrl,
        })
          .then()
          .catch((error) => swal('Error an occur', error.message, 'error'));
        swal('Account created.', '', 'success');
        setTimeout(() => navigate('/'), 1500);
        setRegister({ ...registerInit });
      })
      .catch((error) => swal('Error an occur', error.message, 'error'));
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
          {/* signup title */}
          <div className='title mb-8'>
            <h1 className='text-2xl font-bold font-montserrat'>
              Create an account
            </h1>
          </div>
          {/* signup form  */}
          <div className='form'>
            <form className='space-y-6' onSubmit={handleRegister}>
              <Input
                id='name'
                label='Enter your full name'
                name='name'
                placeholder='jhon dou'
                type='text'
                error={error.name}
                value={register.name}
                handleChange={handleInput}
              />
              <Input
                id='email'
                label='Enter your email'
                name='email'
                placeholder='jhonduo@trqp.fto'
                type='email'
                error={error.email}
                value={register.email}
                handleChange={handleInput}
              />
              {/* <Input
                id='photoUrl'
                label='Your photo url'
                name='photoUrl'
                placeholder='https://photo.com/myphoto.jpg'
                type='url'
                error={error.photoUrl}
                value={register.photoUrl}
                handleChange={handleInput}
                disable={true}
              /> */}
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
                id='password'
                label='Enter your password'
                name='password'
                placeholder='dfgWEI93$#F'
                type='password'
                toggle={true}
                error={error.password}
                value={register.password}
                handleChange={handleInput}
              />

              <Input
                id='confirmPassword'
                label='Confirm your password'
                name='confirmPassword'
                placeholder='dfgWEI93$#F'
                type='password'
                toggle={true}
                error={error.confirmPassword}
                value={register.confirmPassword}
                handleChange={handleInput}
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
          </div>
        </div>
      </div>
    </div>
  );
};

Signup.propTypes = {};

export default Signup;
