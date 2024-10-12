import React, { useEffect, useState } from "react";
import "../../../scss/_custom.scss";
import { Link, useNavigate } from "react-router-dom";
import { customMessage, encrypt, showToastTR } from "../../../Utils/BaseApp";
import * as MarketsmsService from "../../../services/LinkticService";
import { SingUpModel } from "../../../models/SignUp";
import "react-toastify/dist/ReactToastify.css";
import { CButton, CCol, CContainer, CForm, CFormInput, CImage, CRow } from "@coreui/react-pro";
import logoFull from "../../../assets/icons/logo-full.svg";

export interface SignUpProps { }

export const SignUp: React.FC<SignUpProps> = ({ }: SignUpProps) => {
  const [passwordError, setPasswordError] = useState<string | null>(null);
  const [formError, setFormError] = useState(false);
  const [signUp, setSignUp] = useState<SingUpModel | null>(null);
  const navigate = useNavigate()

  useEffect(() => {
    if (signUp) {
      if (signUp.status === 200) {
        showToastTR(customMessage(signUp.code_app), 500, "success");
        setTimeout(() => {
          navigate('/login')
        }, 2000);
      } else {
        showToastTR(customMessage(signUp.code_app), 2000, "error");
      }
    }
  }, [signUp]);


  const [formData, setFormData] = useState({
    first_name: "",
    last_name: "",
    phone_number: "",
    email: "",
    password: "",
    repeat_password: "",
  });

  const handleChange = (event: React.ChangeEvent<HTMLInputElement>) => {
    var { name, value } = event.target;

    if (name === "phoneNumber") {
      value = value.replace(/\D/g, "");
      if (value.length > 3) {
        value = `${value.slice(0, 3)} ${value.slice(3)}`;
      }
      if (value.length > 7) {
        value = `${value.slice(0, 7)} ${value.slice(7)}`;
      }
    }

    setFormData({ ...formData, [name]: value });
    console.log(name);
    console.log(value);
    if ((name === "password" && formData.repeat_password !== "" && formData.repeat_password !== value) || (name === "repeat_password" && formData.password !== value)) {
      setPasswordError("Las contraseñas no coinciden");
      setFormError(true);
    } else {
      setPasswordError(null);
    }
  };


  const handleSubmit = async (event: React.FormEvent) => {
    event.preventDefault();

    const form = event.currentTarget as HTMLFormElement;
    if (!form.checkValidity()) {
      form.reportValidity();
      setFormError(true);
      return;
    }

    if (passwordError) {
      showToastTR("Verificar que las contraseñas coincidan para continuar con el registro", 1000, "error");
      form.reportValidity();
      setFormError(true);
      return;
    }

    try {
      const body = {
        first_name: formData.first_name,
        last_name: formData.last_name,
        email: await encrypt(formData.email),
        phone_number: await encrypt(formData.phone_number.replaceAll(" ", "")),
        password: await encrypt(formData.password),
        phone_area_code: 57,
      };

      const response = await MarketsmsService.signUp(body);
      setSignUp(response);
    } catch (error) {
      console.error("Error al llamar a la API:", error);
    }
  };

  return (
    <>
      <CContainer className="vh-100 d-flex align-items-center" sm={true}>
        <CRow className="shadow-lg">
          <CCol md={6} className="bg-brand-primary p-4">
            <Link className="bg-light-ctm p-2 rounded-pill" to="/">
              <CImage src={logoFull} height={36} />
            </Link>
            <div className="h-100  rounded-end-1 p-3 py-5">
              <div className="d-flex flex-column my-auto py-5">
                <p className="text-center fs-4 fw-small text-light">Nos encanta volverte a ver!</p>
                <p className="text-center mx-auto fs-1 text-light fw-bolder">
                  BIENVENIDO DE NUEVO
                </p>
              </div>
            </div>

          </CCol>
          <CCol md={6} className="bg-light-ctm p-4">
            <h3 className="text-center text-brand-primary mb-5">Registra tu cuenta</h3>
            <CForm
              className="row g-3 needs-validation mt-5"
              noValidate
              validated={formError}
              onSubmit={handleSubmit}
            >
              <CRow xs={{ cols: 1, gutter: 2 }} md={{ cols: 2 }}>
                <CCol xs>
                  <CFormInput
                    type="text"
                    name="first_name"
                    value={formData.first_name}
                    onChange={handleChange}
                    feedbackValid="Luce bien!"
                    feedbackInvalid="Por favor escriba un nombre valido."
                    placeholder="Nombre"
                    required
                  />
                </CCol>
                <CCol xs>
                  <CFormInput
                    type="text"
                    name="last_name"
                    value={formData.last_name}
                    onChange={handleChange}
                    feedbackValid="Luce bien!"
                    feedbackInvalid="Por favor escriba un apellido valido."
                    placeholder="Apellido"
                  />
                </CCol>
                <CCol xs>
                  <CFormInput
                    type="text"
                    name="phone_number"
                    pattern="[3]{1}[0-9]{2}[0-9]{3}[0-9]{4}"
                    maxLength={10}
                    minLength={10}
                    value={formData.phone_number}
                    onChange={handleChange}
                    feedbackValid="Luce bien!"
                    feedbackInvalid="Por favor escriba un número de teléfono valido."
                    placeholder="Número de teléfono"
                    required
                  />
                </CCol>

                <CCol xs>
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
                <CCol xs>
                  <CFormInput
                    type="password"
                    name="password"
                    value={formData.password}
                    onChange={handleChange}
                    feedbackValid="Luce bien!"
                    feedbackInvalid="Por favor escriba una contraseña valida."
                    placeholder="Contraseña"
                    required
                  />
                </CCol>
                <CCol xs>
                  <CFormInput
                    type="password"
                    name="repeat_password"
                    value={formData.repeat_password}
                    onChange={handleChange}
                    feedbackValid={passwordError ? '' : "Luce bien!"}
                    feedbackInvalid={passwordError ?? "Por favor escriba una contraseña valida."}
                    placeholder="Confirmar Contraseña"
                    className={`form-control ${passwordError ? "is-invalid" : ""}`}
                    required
                  />
                </CCol>
              </CRow>

              <CCol md={12} className="p-0">
                <CRow className="mt-3">
                  <CCol className="text-end">
                    <Link className="text-decoration-none fw-bolder text-primary-ctm" to={'/login'}>Ya tengo cuenta, iniciar sesión
                    </Link>
                  </CCol>

                </CRow>
              </CCol>
              <CCol xs={12} className="d-flex mt-5">
                <CButton type="submit" className={`bg-brand-primary  btn-login mx-auto fw-bolder`} >
                  REGISTRARME
                </CButton>
              </CCol>
            </CForm>
          </CCol>
        </CRow>



        {/* <Modal show={showModal} centered>
          <Modal.Body className="py-5">
            <h3 className="text-center">Código de Verificación</h3>
            <p className="text-center fs-4 mt-5">
              Recibiras un código de verificación enviado a tu email{" "}
              <strong>{formData.email}</strong>
            </p>
            <div className="mx-5 my-3 d-flex justify-content-center align-items-center">
              <Form.Control
                type="text"
                maxLength={1}
                name="1"
                className="m-2 border-danger rounded-2 h-100 text-center"
                style={{ width: "50px", fontSize: "30px" }}
                onChange={handleInputChange}
                ref={code_1}
              />
              <Form.Control
                type="text"
                maxLength={1}
                name="2"
                className="m-2 border-danger rounded-2 h-100 text-center"
                style={{ width: "50px", fontSize: "30px" }}
                onChange={handleInputChange}
                ref={code_2}
              />
              <Form.Control
                type="text"
                maxLength={1}
                name="3"
                className="m-2 border-danger rounded-2 h-100 text-center"
                style={{ width: "50px", fontSize: "30px" }}
                onChange={handleInputChange}
                ref={code_3}
              />
              <Form.Control
                type="text"
                maxLength={1}
                name="4"
                className="m-2 border-danger rounded-2 h-100 text-center"
                style={{ width: "50px", fontSize: "30px" }}
                onChange={handleInputChange}
                ref={code_4}
              />
            </div>
            <div className="d-flex justify-content-center">
              <p className="mb-3">Tiempo restante: {`${minutos.toString().padStart(2, '0')}:${segundos.toString().padStart(2, '0')}`}</p>
            </div>
            {!corriendo &&
              <div className="d-flex justify-content-center">
                <CLoadingButton className="btn-primary" onClick={sendCode} timeout={2000} >
                  REENVIAR
                </CLoadingButton>
              </div>
            }
          </Modal.Body>
        </Modal> */}
      </CContainer>
    </>
  );
};
