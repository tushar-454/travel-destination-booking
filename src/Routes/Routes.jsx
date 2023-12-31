import { createBrowserRouter } from 'react-router-dom';
import ForgotPassword from '../Components/ForgotPassword/ForgotPassword';
import Home from '../Components/Home/Home';
import Login from '../Components/Login/Login';
import Signup from '../Components/Signup/Signup';
import SignupWithPhone from '../Components/SignupWithPhone/SignupWithPhone';
import Layout from './Layout';

const routes = createBrowserRouter([
  {
    path: '/',
    element: <Layout />,
    loader: async () => fetch('/menus.json'),
    children: [
      {
        path: '/',
        element: <Home />,
      },
      {
        path: '/login',
        element: <Login />,
      },
      {
        path: '/signup',
        element: <Signup />,
      },
      {
        path: '/signupwithphone',
        element: <SignupWithPhone />,
      },
      {
        path: '/forgot-password',
        element: <ForgotPassword />,
      },
    ],
  },
]);

export default routes;
