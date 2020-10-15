import * as React from "react";
import { auth } from "../firebase";

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
    auth.signInWithEmailAndPassword(email, password).catch((err) => {
      setPassword("");
      switch (err.code) {
        default:
          setErrorResponse("An unknown error has occured");
      }
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
         backgroundImage: `url("https://fbh.com/wp-content/uploads/2015/06/o-HOSPITAL-HALLWAY-facebook.jpg?__cf_chl_captcha_tk__=7a4b633d4b8d5d9d71d79ed3d46b0cd31ccd2b6a-1602757945-0-AVX4eHkmMjezeMY9JI_JA_RjfKLboZfyXKdaIV6fYlzZNYJGCSeyG3BhDEMVF9_oYuEtf2GS9zfptium0Dc6zeJXrvh-y4TdMtKp3m1xhSd7kZTFbxhkBaJufMkPxXHadshephSQW6lIZIuyjHO39a8QUVbuTsAp5KZP7LlbXKtt1GOgWqEzfdhVCFJG3Q3vHihc1j4oHooHnHq-XZ2u4CvY6pzYp-uOixSCqjOVyl_se5niOByrqD6-Zmgrardb85fuB2vTpedEthdKYa-PirtiySiJR1gFenuPdOkrp5CXdHEGshZrU-Ewhh5cvPQN7zmoAirtdLo-SER2xFHCPPVsw5pt02W19KLXmk4LlQSERoBNLj58NwqW1sQN8I_MIHP95yihNwKp6VSFF2kSm5GAy9t5BvjRvXh0gp-ZiELZhV8P5-uXK4zD-n3ssdL-Iwm3VfqoSxTb-JAqtBHlOm0s_3VFOjGdaer03NCsvOVd0MrE8IK6sUOJECyZ-uGXPUWRT95JnuzMd8xuIuUYpiSlHra424Q65nMQlO07fZBGo7-AML8ru9HirWpRy9y5eA")`,
         height: '100vh',
          backgroundPosition: 'center',
          backgroundRepeat: 'no-repeat',
          backgroundSize: 'cover'
      }}>
        <div className="c-app c-default-layout flex-row align-items-center" style={{
          height: '100%',
    width: '100%',
    backgroundColor: 'rgba(0, 0, 0, 0.5)'}}>
              
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
