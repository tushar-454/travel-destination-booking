import { RouterProvider } from 'react-router-dom';
import AuthProvider from './Components/AuthProvider/AuthProvider';
import routes from './Routes/Routes';

function App() {
  return (
    <AuthProvider>
      <RouterProvider router={routes} />;
    </AuthProvider>
  );
}

export default App;
