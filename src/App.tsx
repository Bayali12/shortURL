import { Route, Routes } from 'react-router-dom';

import { Links } from './pages/Links';
import { Home } from './pages/Home';
import { Login } from './pages/Login/Login';
import { Register } from './pages/Register/Register';
import { NotFoundPage } from './pages/NotFoundPage';
import { Layout } from './components/Layout';
import { PrivateRoutes } from './components/PrivateRoute';
import { Notifications } from './components/Notifications';
import { useAppSelector } from './hooks';

function App() {
  const isAuth = useAppSelector((state) => state.auth.isAuth);

  return (
    <>
      <Routes>
        <Route path="/" element={<Layout />}>
          <Route
            element={
              <PrivateRoutes isAuthenticated={isAuth} redirectPath="/login" />
            }>
            <Route path="/" element={<Home />} />
            <Route path="/links" element={<Links />} />
          </Route>
        </Route>
        <Route path="/login" element={<Login />} />
        <Route path="/register" element={<Register />} />
        <Route path="*" element={<NotFoundPage />} />
      </Routes>
      <Notifications />
    </>
  );
}

export default App;
