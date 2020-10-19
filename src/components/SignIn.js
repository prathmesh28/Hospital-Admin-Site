import * as React from "react";
import Firebase from "../firebase";

import {
  CButton,
  CCard,
  CCardBody,
  CCardGroup,
  CCol,
  CContainer,
  CForm,
  CInput,
  CInputGroup,
  CInputGroupPrepend,
  CInputGroupText,
  CRow
} from '@coreui/react'
import CIcon from '@coreui/icons-react'
import Enum from 'enum'
import { freeSet } from '@coreui/icons'
import Bg from '../assets/bg.jpg'
const INPUTS = new Enum(['email',
  'password'])
// enum INPUTS {
//   email,
//   password,
// }

export default function SignIn() {
  const [email, setEmail] = React.useState("");
  const [password, setPassword] = React.useState("");
  const [errorResponse, setErrorResponse] = React.useState("");

  const clearError = () => {
    if (errorResponse != "") {
      setErrorResponse("");
    }
  };

  /**
   * The React.ChangeEvent<HTMLInputElement> is from typescript and just shows
   * what value is getting passed in, so you dont have to remember
   * in this case its a "ChangeEvent" coming from "onChange"
   */
  const updateValue = (
    type: INPUTS,
    e: React.ChangeEvent<HTMLInputElement>
  ) => {
    clearError();
    switch (type) {
      case INPUTS.email:
        setEmail(e.target.value);
        break;
      case INPUTS.password:
        setPassword(e.target.value);
        break;
    }
  };

  const trySignIn = async () => {
    Firebase.auth().signInWithEmailAndPassword(email, password).catch((err) => {
      setPassword("");
      
          setErrorResponse(err.message);
      
    });
  };

  // const trySignUp = async () => {
  //   auth.createUserWithEmailAndPassword(email, password).catch((err) => {
  //     switch (err.code) {
  //       case "auth/email-already-in-use":
  //         setErrorResponse(err.message);
  //         break;
  //       default:
  //         setErrorResponse("An unknown error has occurred");
  //     }
  //   });
  // };

 

  return (
<div 
    style={{
         backgroundImage: `url(${Bg})`,
         height: '100vh',
          backgroundPosition: 'center',
          backgroundRepeat: 'no-repeat',
          backgroundSize: 'cover'
      }}>
        <div className="c-app c-default-layout flex-row align-items-center" 
          style={{
         height: '100%', width: '100%',backgroundColor: 'rgba(0, 0, 0, 0.5)'}}>
              
        <CContainer >
        <CRow className="justify-content-center" >
          <CCol md="8">
            <CCardGroup style={{ zIndex:2,position: "relative" }}>
              <CCard className="p-4">
                <CCardBody>
                  <CForm>
                    <h1>Login</h1>
                    <p className="text-muted">Sign In to your account</p>
                    <CInputGroup className="mb-3">
                      <CInputGroupPrepend>
                        <CInputGroupText>
                          <CIcon content={freeSet.cilUser}/>
                        </CInputGroupText>
                      </CInputGroupPrepend>
       
                      <CInput type="text" value={email} onChange={updateValue.bind(null, INPUTS.email)} placeholder="Username" autoComplete="username" />
                    </CInputGroup>
                    <CInputGroup className="mb-4">
                      <CInputGroupPrepend>
                        <CInputGroupText>
                          <CIcon content={freeSet.cilLockLocked} />
                        </CInputGroupText>
                      </CInputGroupPrepend>
           
                      <CInput type="password" value={password} onChange={updateValue.bind(null, INPUTS.password)} placeholder="Password" autoComplete="current-password" />
                    </CInputGroup>
                    <div className="error_response">{errorResponse}</div>
                    <CRow>
                      <CCol xs="6">
                        <CButton color="primary" onClick={trySignIn} className="px-4">Login</CButton>
                      </CCol>
                      <CCol xs="6" className="text-right">
                        <CButton color="link" className="px-0">Forgot password?</CButton>
                      </CCol>
                    </CRow>
                  </CForm>
                </CCardBody>
              </CCard>
              <CCard className="text-white bg-primary py-5 d-md-down-none" style={{ width: '44%' }}>
                <CCardBody className="text-center">
                  <div>
                    <h2>Admin Sign up</h2>
                    <p>Hospital app admin sign up.</p>
                    {/* <Link to="/register">
                      <CButton color="primary" className="mt-3" active tabIndex={-1}>Register Now!</CButton>
                    </Link> */}
                  </div>
                </CCardBody>
              </CCard>
            </CCardGroup>
          </CCol>
        </CRow>
      </CContainer>
    </div>
    </div>
    // <div className="sign_in">
    //   <span>Email:</span>
    //   <input
    //     type="text"
    //     value={email}
    //     onChange={updateValue.bind(null, INPUTS.email)}
    //   />
    //   <span>Password:</span>
    //   <input
    //     type="password"
    //     value={password}
    //     onChange={updateValue.bind(null, INPUTS.password)}
    //   />
    //   <div className="error_response">{errorResponse}</div>
    //   <button onClick={trySignIn}>Sign in</button>{" "}
    //   {/* <button onClick={trySignUp}>Sign up</button> */}
    // </div>
  );
}
