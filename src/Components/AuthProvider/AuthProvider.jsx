import {
  GoogleAuthProvider,
  createUserWithEmailAndPassword,
  onAuthStateChanged,
  signInWithEmailAndPassword,
  signInWithPopup,
  signOut,
} from 'firebase/auth';
import PropTypes from 'prop-types';
import { createContext, useEffect, useState } from 'react';
import Auth from '../../firebase/firebase-config';

export const AuthContext = createContext(null);

const AuthProvider = ({ children }) => {
  const [user, setUser] = useState(null);
  const [loading, setLoading] = useState(true);

  const loginGoogle = () => {
    setLoading(false);
    return signInWithPopup(Auth, new GoogleAuthProvider());
  };

  const registerAccountEmailPass = (email, password) => {
    setLoading(false);
    return createUserWithEmailAndPassword(Auth, email, password);
  };

  const loginEmailPass = (email, password) => {
    setLoading(false);
    return signInWithEmailAndPassword(Auth, email, password);
  };

  const signOutFunc = () => {
    setLoading(false);
    return signOut(Auth);
  };

  useEffect(() => {
    const unSubscribe = onAuthStateChanged(Auth, (currentUser) => {
      setUser(currentUser);
      setLoading(false);
    });
    return () => unSubscribe();
  }, []);

  const authInfo = {
    user,
    loading,
    loginGoogle,
    registerAccountEmailPass,
    loginEmailPass,
    signOutFunc,
  };
  return (
    <AuthContext.Provider value={authInfo}>{children}</AuthContext.Provider>
  );
};

AuthProvider.propTypes = {
  children: PropTypes.node,
};

export default AuthProvider;
