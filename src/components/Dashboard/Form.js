import * as React from "react";
import {
    CButton,
    CCard,
    CCardBody,
    CCardFooter,
    CCol,
    CForm,
    CFormGroup,
    CFormText,
    CTextarea,
    CInput,
    CInputRadio,
    CLabel,
    CSelect,
    CRow,
  } from '@coreui/react'
import CIcon from '@coreui/icons-react'
import Firebase from '../../firebase'
import { freeSet } from '@coreui/icons'
import { v4 as uuidv4 } from 'uuid';
import {toast} from 'react-toastify';  
import 'react-toastify/dist/ReactToastify.css'; 
toast.configure()


export default class Form extends React.Component {
  constructor(){
    super();
    this.state={
      id: '' ,
      curTime : new Date().toLocaleString(),
      name: "",
      dob: null,
      gender: "",
      phone: null,
      email: "",
      address: "",
      doctor: "",
      disease: "",
      nextDate: null,
      message: "error",
      PatientType:false,
    }
     this.formSubmit = this.formSubmit.bind(this);
  }
  
  notify = (e)=>{  
    toast(e)  
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
  

  formSubmit = async () => {
    
   // console.log(this.state.id)
        if (this.validateForm(0)) {
                
             //   
                let data ={
                Name:this.state.name,
                Dob:this.state.dob,
                Gender:this.state.gender,
                Phone:this.state.phone,
                Email:this.state.email,
                Address:this.state.address,
                Doctor:this.state.doctor,
                Disease:this.state.disease,
                Date:new Date().toLocaleString(),
                NextDate:this.state.nextDate,
                isDisable:false
              }
              let id = await uuidv4(data)
              this.setState({id})
              data={...data, id:this.state.id }
              console.log(data)
              Firebase.database().ref('/Users/' + id ).set({
                        data
              })
              .then((doc) => {
              //  this.setState({message:'User Added'})
                this.notify('user added')
                window.location.reload()
              })
              .catch((error) => {
                this.notify(error)
                console.error(error);
              })
            }
      }

      validateForm() {
        let formIsValid = true;

        console.log(this.state.phone)
        if (this.state.phone=== "" || this.state.phone=== null) {
          formIsValid = false;
          this.notify("Please enter your mobile no.")
         
        }
        if (this.state.disease=== "" || this.state.disease=== null || this.state.disease=== 'null') {
          formIsValid = false;
          this.notify("Please enter Patient Type.")
         
        }
        var pattern = new RegExp(/^[0-9\b]+$/) 
        if (!pattern.test(this.state.phone)) {
          formIsValid = false;
          this.notify("Please enter valid phone number.")

        }else if(this.state.phone.length !== 10){
          formIsValid = false;
          this.notify("Please enter valid phone number.")
        }
        return formIsValid;
        

      }
  
  

      componentWillUnmount() {
        // fix Warning: Can't perform a React state update on an unmounted component
        this.setState = (state,callback)=>{
            return;
        };
    }

    render(){

      //Add alert on error
      //Add check internet connection alert
    
  return  (

    

<CRow>

        <CCol xs="12" md="12">
          <CCard>
            <CCardBody>
              <CForm className="form-horizontal">
                

                <CFormGroup row>
                  <CCol md="3">
                    <CLabel htmlFor="text-input">Full name:</CLabel>
                  </CCol>
                  <CCol xs="12" md="9">
                    <CInput id="text-input" name="text-input" defaultValue={this.state.name} onChange={e => {this.setState({ name:e.target.value })}} placeholder="Enter Full Name" required/>
                    <CFormText>Please enter full name</CFormText>
                  </CCol>
                </CFormGroup>

                <CFormGroup row>
                  <CCol md="3">
                    <CLabel htmlFor="date-input">Date of birth:</CLabel>
                  </CCol>
                  <CCol xs="12" md="9">
                    <CInput defaultValue={this.state.dob} max={new Date().toISOString().substr(0,10)} onChange={e => {this.setState({ dob:e.target.value })}} type="date" id="Dob date-input" name="date-input" placeholder="date" required/>
                  </CCol>
                </CFormGroup>

                <CFormGroup row>
                  <CCol md="3">
                    <CLabel>Gender:</CLabel>
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
                    <CLabel htmlFor="number">Phone No.:</CLabel>
                  </CCol>
                  <CCol xs="12" md="9">
                    <CInput defaultValue={this.state.phone} onChange={e => {this.setState({ phone:e.target.value })}} type="tel" id="number" placeholder="9876543210" required />
                  </CCol>
                </CFormGroup>
                <CFormGroup row>
                  <CCol md="3">
                    <CLabel htmlFor="email-input">Email Input:</CLabel>
                  </CCol>
                  <CCol xs="12" md="9">
                    <CInput defaultValue={this.state.email} onChange={e => {this.setState({ email:e.target.value })}} type="email" id="email-input" name="email-input" placeholder="Enter Email" autoComplete="email"/>
                    <CFormText className="help-block">Please enter your email</CFormText>
                  </CCol>
                </CFormGroup>

                <CFormGroup row>
                  <CCol md="3">
                    <CLabel htmlFor="textarea-input">Address:</CLabel>
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
                    <CLabel htmlFor="select">Doctor:</CLabel>
                  </CCol>
                  <CCol xs="12" md="9">
                    <CSelect defaultValue={this.state.doctor} onChange={e => {this.setState({ doctor:e.target.value })}} 
                      custom name="select" id="Doctor select">
                      <option value="0">Please select Doctor</option>
                      <option value="Doctor #1">Doctor #1</option>
                      <option value="Doctor #2">Doctor #2</option>
                      <option value="Doctor #3">Doctor #3</option>
                    </CSelect>
                  </CCol>
                </CFormGroup>
                

                <CFormGroup row>
                  <CCol md="3">
                    <CLabel htmlFor="select">Patient Type:</CLabel>
                  </CCol>
                  <CCol xs="12" md="9">
                    <CSelect defaultValue={this.state.disease} 
                      onChange={e => {
                        e.target.value === 'Other' ?this.setState({isDisable:false}):this.setState({isDisable:true})
                        this.setState({ disease:e.target.value })

                      }} 
                      custom name="select" id="Patient select">
                      <option >Please select Type</option>
                      <option value="Infant">Infant</option>
                      <option value="Pregnancy">Pregnancy</option>
                      <option value="Other">Other</option>
                    </CSelect>
                  </CCol>
                </CFormGroup>
                <CFormGroup row >
                  <CCol md="3">
                  </CCol>
                  <CCol xs="12" md="9">
                    <CLabel htmlFor="select">Other:</CLabel>
                    <CInput id="text-input" name="text-input" defaultValue={this.state.disease} onChange={e => {this.setState({ disease:e.target.value })}} disabled={this.state.isDisable}/>
                  </CCol>
                </CFormGroup>

                <CFormGroup row>
                  <CCol md="3">
                    <CLabel>Date Visited:</CLabel>
                  </CCol>
                  <CCol xs="12" md="9">
                    <p className="form-control-static"> {this.state.curTime}</p>
                  </CCol>
                </CFormGroup>

                <CFormGroup row>
                  <CCol md="3">
                    <CLabel htmlFor="date-input">Next Visit:</CLabel>
                  </CCol>
                  <CCol xs="12" md="9">
                    <CInput defaultValue={this.state.nextDate} min={new Date().toISOString().substr(0,10)} onChange={e => {this.setState({ nextDate:e.target.value })}} type="date" id="Next date-input" name="date-input" placeholder="date" />
                  </CCol>
                </CFormGroup>


              </CForm>
            </CCardBody>
            <CCardFooter>
              <CButton onClick={this.formSubmit} size="md" color="info" > Submit</CButton>
            </CCardFooter>
          </CCard>
          </CCol>
          </CRow>
  
  )
}

}
