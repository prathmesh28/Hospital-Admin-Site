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
    CTooltip
  } from '@coreui/react'
import Firebase from '../../firebase'
import { v4 as uuidv4 } from 'uuid';
import _ from 'lodash';
import Loader from 'react-loader';

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
      pin:null,
      doctor: "",
      disease: "",
      message: "error",
      PatientType:false,
      doctors:null,
      noEmail:false,
      isDisable:false,
      loading:false

    }
     this.formSubmit = this.formSubmit.bind(this);
  }
  
  notify = (e)=>{  
    toast(e)  
  } 
 


  setTime = () => {
      this.setState({curTime : new Date().toLocaleString()})
  }
  
  componentDidMount(){
    this.setState({loading:true})
    Firebase.database().ref('/Doctors/').on("value",(item) => {
       const doctors = _.map( item.val(), (e) => {
         return e.data.name 
       })

       this.setState({ doctors })
       this.setState({loading:false})
     })
     this.setState({loading:false})
      window.setInterval(function () {
      this.setTime();
    }.bind(this), 1000);
  }
  

  formSubmit = async () => {
    this.setState({loading:true})
        if (this.validateForm(0)) {
          console.log('hi.....')
          this.setState({loading:true})
             //   
                let data ={
                Name:this.state.name,
                Dob:this.state.dob,
                Gender:this.state.gender,
                Phone:this.state.phone,
                Email:this.state.email,
                Address:this.state.address,
                Pin:this.state.pin,
                Doctor:this.state.doctor,
                Disease:this.state.disease,
                Date:new Date().toISOString().substr(0,10)+ ' ' +new Date().toISOString().substr(11,8)        

              }
              let id = await uuidv4(data)
              this.setState({id})
              data={...data, id:this.state.id }
              Firebase.database().ref('/Users/' + id ).set({
                        data
              })
              .then((doc) => {
                this.notify('user added')
                this.setState({
                  loading:false,
                  name: "",
                  dob: null,
                  gender: "",
                  phone: null,
                  email: "",
                  address: "",
                  pin:null,
                  doctor: "",
                  disease: "",
                })
                  
                this.props.parentCallback(false);

              })
              .catch((error) => {
                this.notify(error)
                this.setState({loading:false})
              })
            }
      }

      validateForm() {
        let formIsValid = true;
        this.setState({loading:true})

        if(this.state.noEmail!==true){
          if (/^[a-zA-Z0-9.!#$%&'*+/=?^_`{|}~-]+@[a-zA-Z0-9-]+(?:\.[a-zA-Z0-9-]+)*$/.test(this.state.email))
          {
            
          }
          else{
            this.notify("Please enter a valid email or click on disable email button")
            formIsValid = false;
          }
            
        }
        if (this.state.name=== "" || this.state.name=== null) {
          formIsValid = false;
          this.notify("Please enter full name.")
         
        }
        if (this.state.phone=== "" || this.state.phone=== null) {
          formIsValid = false;
          this.notify("Please enter mobile no.")
         
        }
      
        if (this.state.dob=== "" || this.state.dob=== null) {
          formIsValid = false;
          this.notify("Please enter Date of birth.")
         
        }
        if (this.state.gender=== "" || this.state.gender=== null) {
          formIsValid = false;
          this.notify("Please enter Gender.")
         
        }
        if (this.state.disease=== "" || this.state.disease=== null || this.state.disease=== 'null') {
          formIsValid = false;
          this.notify("Please enter Patient Type.")
         
        }
        if(this.state.pin.length !== 6){
          formIsValid = false;
          this.notify("Please enter a valid pin.")
        }
        var pattern = new RegExp(/^[0-9\b]+$/) 
        if (!pattern.test(this.state.phone)) {
          formIsValid = false;
          this.notify("Please enter a valid phone number.")

        }else if(this.state.phone.length !== 10){
          formIsValid = false;
          this.notify("Please enter valid a phone number.")
        }
        this.setState({loading:false})
        return formIsValid;
        

      }
  
  

      componentWillUnmount() {
        // fix Warning: Can't perform a React state update on an unmounted component
        this.setState = (state,callback)=>{
            return;
        };
    }

    render(){

      const doctors=this.state.doctors
      //Add check internet connection alert
    
  return  (

   
    

<CRow>

        <CCol xs="12" md="12">
          <CCard>
          <Loader loaded={!this.state.loading}>
            <CCardBody>
          

              <CForm className="form-horizontal">
                

                <CFormGroup row>
                  <CCol md="3">
                    <CLabel htmlFor="name">Full name:</CLabel>
                  </CCol>
                  <CCol xs="12" md="9">
                    <CInput id="name" name="text-input" defaultValue={this.state.name} onChange={e => {this.setState({ name:e.target.value })}} placeholder="Enter Full Name" required/>
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
                    <CLabel htmlFor="email-input">Email:</CLabel>
                  </CCol>
                  <CCol xs="12" md="9" style={{display:'flex',flexDirection:'row'}}>
                    <CInput defaultValue={this.state.email} onChange={e => {this.setState({ email:e.target.value })}} type="email" id="email-input" name="email-input" placeholder="Enter Email" autoComplete="email" disabled={this.state.noEmail}/>
                    <CTooltip content="Disable email">
                    <CButton color="info" variant='outline' onClick={()=>{
                      this.setState({ noEmail:!this.state.noEmail,email:"" })}
                      }>X</CButton>
                    </CTooltip>
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
                    <CLabel htmlFor="pin">Pin Code:</CLabel>
                  </CCol>
                  <CCol xs="12" md="9">
                    <CInput defaultValue={this.state.pin} onChange={e => {this.setState({ pin:e.target.value })}} type="tel" id="pin" placeholder="123456" required />
                  </CCol>
                </CFormGroup>




                <CFormGroup row>
                  <CCol md="3">
                    <CLabel htmlFor="select">Doctor:</CLabel>
                  </CCol>
                  {doctors?
                  <CCol xs="12" md="9">
                    <CSelect defaultValue={this.state.doctor} onChange={e => {this.setState({ doctor:e.target.value })}} 
                      custom name="select" id="Doctor select">
                        <option >Please select Doctor</option>
                      {doctors.map((x,y) => <option key={y} value={x}>{x}</option>)}
                    </CSelect>
                  </CCol>:<CCol xs="12" md="9">No Doctor Found</CCol>}
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
                      <option value="Paediatric">Paediatric</option>
                      <option value="Pregnancy">Pregnancy</option>
                      <option value="Other">Other</option>
                    </CSelect>
                  </CCol>
                </CFormGroup>
                <CFormGroup row >
                  <CCol md="3">
                  </CCol>
                  <CCol xs="12" md="9">
                    <CLabel htmlFor="Other">Other:</CLabel>
                    <CInput id="Other" name="text-input" defaultValue={this.state.disease} onChange={e => {this.setState({ disease:e.target.value })}} disabled={this.state.isDisable}/>
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

               


              </CForm>
            </CCardBody>
            <CCardFooter>
              <CButton onClick={this.formSubmit} size="md" color="info" > Submit</CButton>
            </CCardFooter>
            </Loader>
          </CCard>
          </CCol>
          </CRow>
  
  )
}

}
