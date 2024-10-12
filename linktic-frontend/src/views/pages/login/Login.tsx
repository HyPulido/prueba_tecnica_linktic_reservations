import React, { useEffect, useState } from "react";
// import "../../../scss/Login.scss";
import "../../../scss/_custom.scss";
import { Link } from "react-router-dom";
import {
  customMessage,
  encrypt,
  showToastTC,
  showToastTR,
} from "../../../Utils/BaseApp";
import * as MarketsmsService from "../../../services/LinkticService";

import "react-toastify/dist/ReactToastify.css";
import { CButton, CCol, CContainer, CForm, CFormCheck, CFormInput, CImage, CRow } from "@coreui/react-pro";
import logoFull from "../../../assets/icons/logo-full.svg";
import { AuthPostModel } from "../../../models/Auth";
import { useNavigate } from "react-router-dom";
import { isUserLogin, saveLogin, saveLoginUser } from "../../../Utils/Auth";
import { useAppDispatch } from "../../../hooks/hooks";
import { startLoading, stopLoading } from "../../../redux/features/loadSlice";
export interface LoginProps { }

export const Login: React.FC<LoginProps> = ({ }: LoginProps) => {
  const [formError, setFormError] = useState(false);


  const [login, setLogin] = useState<AuthPostModel | null>(null);
  const navigate = useNavigate();
  const dispatch = useAppDispatch();

  useEffect(() => {
    if (isUserLogin()) {
      navigate("/reservations");
    }
  }, []);

  useEffect(() => {
    if (login) {
      dispatch(stopLoading());
      if (login.status !== 200) {
        showToastTC(customMessage(login.code_app), 3000, "error");
      } else {
        showToastTR(customMessage(login.code_app), 1000, "success");
        saveLogin(login.data.access_token);
        // getCurrentUser().then((currentUser) => {
        //   // Este código se ejecutará después de que la función `getUser` se haya resuelto
        //   // Imprime la respuesta de la API dentro del then
        //   if (currentUser !== null) {
        //     saveLoginUser(currentUser);
        //     const redirect_path = sessionStorage.getItem('redirect_path');
        //     const path = redirect_path || '/products'; // Si no hay una URL de redirección, redirigir a la página de inicio
        //     sessionStorage.removeItem('redirect_path');
        //     navigate(path);
        //   }
        // });

        const redirect_path = sessionStorage.getItem('redirect_path');
        const path = redirect_path || '/reservations'; // Si no hay una URL de redirección, redirigir a la página de inicio
        sessionStorage.removeItem('redirect_path');
        navigate(path);
      }
    }
  }, [login]);

  const [formData, setFormData] = useState({
    email: "",
    password: "",
  });

  const handleChange = (event: React.ChangeEvent<HTMLInputElement>) => {
    var { name, value } = event.target;
    setFormData({ ...formData, [name]: value });
  };

  const handleSubmit = async (event: React.FormEvent) => {
    event.preventDefault();
    const form = event.currentTarget as HTMLFormElement;
    if (!form.checkValidity()) {
      form.reportValidity();
      setFormError(true);
      return;
    }
    console.log("Start");
    dispatch(startLoading());
    console.log("End");

    try {
      const body = {
        email: await encrypt(formData.email),
        password: await encrypt(formData.password),
      };

      const response = await MarketsmsService.login(body);
      setLogin(response);
    } catch (error) {
      console.error("Error al llamar a la API:", error);
    }
  };

  return (
    <>
      <CContainer className="vh-100 d-flex align-items-center" sm={true} >
        <CRow className="shadow-lg">
          <CCol md={6} className="bg-brand-primary p-4">
            <Link className="bg-light p-3 rounded-pill" to="/">
              <CImage src={logoFull} height={36} />
            </Link>
            <div className="h-100  rounded-end-1 p-3 py-5">
              <div className="d-flex flex-column my-auto py-5">
                <p className="text-center fs-4 fw-small text-light">Nos encanta volverte a ver!</p>
                <p className="text-center mx-auto fs-1 text-light">
                  BIENVENIDO DE NUEVO
                </p>
              </div>
            </div>

          </CCol>
          <CCol md={6} className="bg-light-ctm p-4">
            <h3 className="text-center text-brand-primary mb-5">Ingresa a tu cuenta</h3>
            <CForm
              className="row g-3 needs-validation"
              noValidate
              validated={formError}
              onSubmit={handleSubmit}
            >
              <CCol className="p-0" md={12}>
                <CFormInput
                  type="email"
                  name="email"
                  placeholder="Email"
                  value={formData.email}
                  onChange={handleChange}
                  feedbackValid="Luce bien!"
                  feedbackInvalid="Por favor escriba un correo electrónico valido."
                  id="validationCustom01"
                  required
                />

              </CCol>
              <CCol className="p-0" md={12}>
                <CFormInput
                  type="password"
                  name="password"
                  value={formData.password}
                  onChange={handleChange}
                  feedbackValid="Looks good!"
                  feedbackInvalid="Por favor escriba una contraseña valida."
                  placeholder="Password"
                  required
                />
              </CCol>

              <CCol md={12} className="p-0">
                <CRow className="mt-3">
                  <CCol className="text-end">
                    <Link className="text-decoration-none fw-bolder text-primary-ctm" to={'/signup'}>No tengo cuenta, registrarme
                    </Link>
                  </CCol>

                </CRow>
              </CCol>
              <CCol xs={12} className="d-flex mt-5">
                <CButton type="submit" className="bg-brand-primary btn-login mx-auto fw-bolder">
                  INICIAR SESIÓN
                </CButton>
              </CCol>
            </CForm>
          </CCol>
        </CRow>
      </CContainer>
    </>
  );
};