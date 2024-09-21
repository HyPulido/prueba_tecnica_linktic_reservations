import { useEffect, useState } from 'react';
import './scss/style.scss'
import "@coreui/coreui-pro/dist/js/coreui.bundle.min.js";
import "@coreui/coreui-pro/dist/css/coreui.min.css";
import "primereact/resources/themes/nova-accent/theme.css";
import "primereact/resources/primereact.min.css";
import { BrowserRouter, Navigate, Route, Routes } from 'react-router-dom';
import SideBar from './layout/SideBar';
import Page404 from './views/pages/page404/Page404';
import { Login } from './views/pages/login/Login';
import { SignUp } from './views/pages/signup/SignUp';
import { useIdleTimer } from 'react-idle-timer'
import { env } from './Utils/Environment';
import * as MarketsmsService from "./services/MarketsmsService";
import { getBaseToken, getToken, userLogout, saveBaseToken, saveToken, verifyRefreshToken } from './Utils/Auth';
import { getDeviceData } from './Utils/BaseApp';
import { ToastContainer } from 'react-toastify';
import LoadingContainer from './components/loading/LoadingContainer';
import ConfirmContainer from './components/confirm/ConfirmContainer';

import { Products } from './views/products/Products';
import { Orders } from './views/orders/Orders';


function App() {



  const [remaining, setRemaining] = useState<number>(0);

  const onIdle = () => {
    var pathname = window.location.pathname;
    const isLoginPage = (pathname === "/login" || pathname === "/signup");
    if (!isLoginPage) {
      userLogout();
    } else {
      console.log("No se debe cerrar por que estoy en el inicio de sesión")
    }
  };

  const onActive = () => {
    // console.log("Usuario activo");
  };

  const onAction = () => {
    var pathname = window.location.pathname;
    const isLoginPage = (pathname === "/login" || pathname === "/signup");

    if (!isLoginPage) {
      try {

        // Se deben actualizar los dos tokens
        const token = getToken();
        const baseToken = getBaseToken();
        if (token === baseToken) {
          if (verifyRefreshToken(token)) {
            MarketsmsService.refreshToken().then((response) => {
              saveBaseToken(response.data.access_token)
              saveToken(response.data.access_token)
            });
          }
        } else {
          if (verifyRefreshToken(token)) {
            MarketsmsService.refreshToken().then((response) => {
              saveToken(response.data.access_token)
            });
          }

          if (verifyRefreshToken(baseToken)) {
            MarketsmsService.refreshBaseToken().then((response) => {
              saveBaseToken(response.data.access_token)
            });
          }
        }

      } catch (error) {
        console.log(error);
        userLogout()
      }

    }
  }

  const { getRemainingTime } = useIdleTimer({
    onIdle,
    onActive,
    onAction,
    timeout: parseInt(env('INACTIVITY_SESSION_TIME')) * 60 * 1000, // 5 minutos
    throttle: 500,
  });

  useEffect(() => {
    if (window.location.pathname !== '/login') {
      const interval = setInterval(() => {
        setRemaining(Math.ceil(getRemainingTime() / 1000));
      }, 500);

      return () => {
        clearInterval(interval);
      };
    }
  }, [getRemainingTime]);

  return (
    <BrowserRouter>
      <LoadingContainer message={""} />
      <ConfirmContainer />
      <ToastContainer />
      <Routes>
        <Route path='/' element={<Navigate to="/login" />} />
        <Route path='/products' element={<SideBar><Products /></SideBar>} />
        <Route path='/orders' element={<SideBar><Orders /></SideBar>} />
        <Route path='/login' element={<Login />} />
        <Route path='/signup' element={<SignUp />} />
        <Route path='/*' element={<SideBar><Page404 /></SideBar>} />
        {/* <Route path='/admin/*' element={<SideBar><Page404 /></SideBar>} /> */}
        <Route path='*' element={<Page404 />} />
      </Routes>
    </BrowserRouter>
  );
}

export default App;