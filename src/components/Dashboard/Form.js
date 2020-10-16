import * as React from "react";
import Header from './Header'
import Table from './Table'
import { Link } from "react-router-dom";

import {
    CButton,
    CCard,
    CCardBody,
    CCardFooter,
    CCardHeader,
    CCol,
    CCollapse,
    CDropdownItem,
    CDropdownMenu,
    CDropdownToggle,
    CFade,
    CForm,
    CFormGroup,
    CFormText,
    CValidFeedback,
    CInvalidFeedback,
    CTextarea,
    CInput,
    CInputFile,
    CInputCheckbox,
    CInputRadio,
    CInputGroup,
    CInputGroupAppend,
    CInputGroupPrepend,
    CDropdown,
    CInputGroupText,
    CLabel,
    CSelect,
    CRow,
    CModal,
    CModalBody,
    CModalFooter,
    CModalHeader,
    CModalTitle,
  } from '@coreui/react'
import CIcon from '@coreui/icons-react'
import Firebase from '../../firebase'
export default class Form extends React.Component {
  constructor(){
    super();
    this.state={
      curTime : new Date().toLocaleString(),
      name: "",
      dob: null,
      gender: "",
      phone: null,
      email: "",
      address: "",
      doctor: "",
      disease: "",
      nextDate: null

    }
     this.formSubmit = this.formSubmit.bind(this);
  }
    

      setTime = () => {
          this.setState({curTime : new Date().toLocaleString()})
      }
      componentWillMount(){
        this.setTime();
      }
      componentDidMount(){
         window.setInterval(function () {
          this.setTime();
        }.bind(this), 1000);

       
      }
      formSubmit() {
      //  event.preventDefault();
        console.log('subbbbbmit')
        let data ={
         Name:this.state.name,
          Dob:this.state.dob,
          Gender:this.state.gender,
          Phone:this.state.phone,
          Email:this.state.email,
          Address:this.state.address,
          Doctor:this.state.address,
          Disease:this.state.disease,
          Date:new Date().toLocaleString(),
          NextDate:this.state.nextDate
        }
        console.log(data)
                Firebase.database().ref('/').push({
                  data
      })
      .then((doc) => {
        window.location.reload()
      })
      .catch((error) => {
    console.error(error);
  })
      }

      componentWillUnmount() {
        // fix Warning: Can't perform a React state update on an unmounted component
        this.setState = (state,callback)=>{
            return;
        };
    }

    render(){

      //Add alert on error
      //Add reset button
    
  return  (

    

<CRow>
        <CCol xs="12" md="12">
          <CCard>
            {/* <CCardHeader>
              Basic Form
              <small> Elements</small>
            </CCardHeader> */}
            <CCardBody>
              <CForm className="form-horizontal">
                

                <CFormGroup row>
                  <CCol md="3">
                    <CLabel htmlFor="text-input">Full name</CLabel>
                  </CCol>
                  <CCol xs="12" md="9">
                    <CInput id="text-input" name="text-input" defaultValue={this.state.name} onChange={e => {this.setState({ name:e.target.value })}} placeholder="Enter Full Name" required/>
                    <CFormText>Please enter full name</CFormText>
                  </CCol>
                </CFormGroup>

                <CFormGroup row>
                  <CCol md="3">
                    <CLabel htmlFor="date-input">Date of birth</CLabel>
                  </CCol>
                  <CCol xs="12" md="9">
                    <CInput defaultValue={this.state.dob} onChange={e => {this.setState({ dob:e.target.value })}} type="date" id="date-input" name="date-input" placeholder="date" required/>
                  </CCol>
                </CFormGroup>

                <CFormGroup row>
                  <CCol md="3">
                    <CLabel>Gender</CLabel>
                  </CCol>
                  <CCol md="9">
                    <CFormGroup variant="custom-radio" inline>
                      <CInputRadio defaultValue="male" onChange={e => {this.setState({ gender:e.target.value })}} 
                        checked={this.state.gender === "male"}
                        custom id="inline-radio1" name="inline-radios" />
                      <CLabel variant="custom-checkbox" htmlFor="inline-radio1">Male</CLabel>
                    </CFormGroup>
                    <CFormGroup variant="custom-radio" inline>
                      <CInputRadio defaultValue="female" onChange={e => {this.setState({ gender:e.target.value })}} 
                        checked={this.state.gender === "female"}
                        custom id="inline-radio2" name="inline-radios" />
                      <CLabel variant="custom-checkbox" htmlFor="inline-radio2">Female</CLabel>
                    </CFormGroup>
                    <CFormGroup variant="custom-radio" inline>
                      <CInputRadio defaultValue="other" onChange={e => {this.setState({ gender:e.target.value })}} 
                        checked={this.state.gender === "other"}
                        custom id="inline-radio3" name="inline-radios" />
                      <CLabel variant="custom-checkbox" htmlFor="inline-radio3">Other</CLabel>
                    </CFormGroup>
                  </CCol>
                </CFormGroup>

                <CFormGroup row>
                  <CCol md="3">
                    <CLabel htmlFor="number">Phone No.</CLabel>
                  </CCol>
                  <CCol xs="12" md="9">
                    <CInput defaultValue={this.state.phone} onChange={e => {this.setState({ phone:e.target.value })}} type="tel" id="number" placeholder="+919876543210" required />
                  </CCol>
                </CFormGroup>

                <CFormGroup row>
                  <CCol md="3">
                    <CLabel htmlFor="email-input">Email Input</CLabel>
                  </CCol>
                  <CCol xs="12" md="9">
                    <CInput defaultValue={this.state.email} onChange={e => {this.setState({ email:e.target.value })}} type="email" id="email-input" name="email-input" placeholder="Enter Email" autoComplete="email"/>
                    <CFormText className="help-block">Please enter your email</CFormText>
                  </CCol>
                </CFormGroup>

                <CFormGroup row>
                  <CCol md="3">
                    <CLabel htmlFor="textarea-input">Address</CLabel>
                  </CCol>
                  <CCol xs="12" md="9">
                    <CTextarea 
                      defaultValue={this.state.address} onChange={e => {this.setState({ address:e.target.value })}}
                      name="textarea-input" 
                      id="textarea-input" 
                      rows="9"
                      placeholder="User Address..." 
                      required
                    />
                  </CCol>
                </CFormGroup>

                <CFormGroup row>
                  <CCol md="3">
                    <CLabel htmlFor="select">Doctor</CLabel>
                  </CCol>
                  <CCol xs="12" md="9">
                    <CSelect defaultValue={this.state.doctor} onChange={e => {this.setState({ doctor:e.target.value })}} 
                      custom name="select" id="select">
                      <option value="0">Please select Doctor</option>
                      <option value="1">Doctor #1</option>
                      <option value="2">Doctor #2</option>
                      <option value="3">Doctor #3</option>
                    </CSelect>
                  </CCol>
                </CFormGroup>

                <CFormGroup row>
                  <CCol md="3">
                    <CLabel htmlFor="select">Disease</CLabel>
                  </CCol>
                  <CCol xs="12" md="9">
                    <CSelect defaultValue={this.state.disease} onChange={e => {this.setState({ disease:e.target.value })}} custom name="select" id="select">
                      <option value="0">Please select Type</option>
                      <option value="1">Type #1</option>
                      <option value="2">Type #2</option>
                      <option value="3">Type #3</option>
                      <option value="3">Other</option>
                    </CSelect>
                  </CCol>
                </CFormGroup>

                <CFormGroup row>
                  <CCol md="3">
                    <CLabel>Date Visited</CLabel>
                  </CCol>
                  <CCol xs="12" md="9">
                    <p className="form-control-static"> {this.state.curTime}</p>
                  </CCol>
                </CFormGroup>

                <CFormGroup row>
                  <CCol md="3">
                    <CLabel htmlFor="date-input">Next Visit</CLabel>
                  </CCol>
                  <CCol xs="12" md="9">
                    <CInput defaultValue={this.state.nextDate} onChange={e => {this.setState({ nextDate:e.target.value })}} type="date" id="date-input" name="date-input" placeholder="date" />
                  </CCol>
                </CFormGroup>


              </CForm>
            </CCardBody>
            <CCardFooter>
              {/* <Link to="/User"> */}
              <CButton onClick={this.formSubmit} size="sm" color="primary" ><CIcon name="cil-scrubber" /> Submit</CButton>
              {/* </Link> */}
              <CButton type="reset" size="sm" color="danger"><CIcon name="cil-ban" /> Reset</CButton>
            </CCardFooter>
          </CCard>
          </CCol>
          </CRow>
  
  )
}

}
