import * as React from "react";
import {
    CCol,
    CRow,
    CCard,
    CCardHeader,
    CCardBody,
    CButton,
    CModal,
    CModalHeader,
    CModalTitle,
    CModalBody,
    CModalFooter,
    CForm,
    CFormGroup,
    CLabel,
    CInputFile,
    CInput,
    CInputRadio,
    CTextarea
  } from '@coreui/react'
import CIcon from '@coreui/icons-react'
import { freeSet } from '@coreui/icons'

import { withRouter } from 'react-router-dom'
import Firebase from "../../firebase";
import _ from 'lodash';
import Header from '../Dashboard/Header'
import {toast} from 'react-toastify';  
import 'react-toastify/dist/ReactToastify.css'; 
toast.configure()

let id
class UserData extends React.Component{
  state={
    data:{},
    edit:false,
    Disease:'',
    Doctor:'',
    Name:'',
    Dob:'',
    Phone:'',
    Address:''
  }
  componentDidMount(){
    id = this.props.match.params.id;
    console.log(id)
    Firebase.database().ref('/Users/'+id).on("value",(item) => {
   
       this.setState({ 
         data:item.val(), 
         Name: item.val().data['Name'], 
         Dob: item.val().data['Dob'], 
         Phone: item.val().data['Phone'],  
         Address: item.val().data['Address'], 
         Disease: item.val().data['Disease'], 
         Doctor: item.val().data['Doctor']
      })
     })
  }

  formSubmit = () => {
    console.log(this.state.Name)
               Firebase.database().ref('/Users/' + id + '/data/' ).update({
                         Name:this.state.Name
               })
               .then((doc) => {
               //  this.setState({message:'User Added'})
                 this.notify('user Details Updated')
               //  window.location.reload()
               this.setState({edit:false})
               })
               .catch((error) => {
                 this.notify(error)
                 console.error(error);
               })
             
       }
       notify = (e)=>{  
        toast(e)  
      } 
  render(){
    const data = this.state.data
    const Disease = this.state.Disease
    const Doctor = this.state.Doctor
    return(
      <>
      <Header/>
      <CRow style={{margin:10}}>
        <CCol xs="12" sm="12" md="4" lg="4">
          <CCard accentColor="info">
            <CCardHeader>
              <h5> User Details </h5> 
            </CCardHeader>
            {
              _.map( data, (e) => {
                return (
                  <>
                  <CCardBody>
                    <p style={{fontSize:15,lineHeight:2,letterSpacing:1}}><b >Name: </b> {e.Name}<br/>
                    <b>Gender: </b> {e.Gender}<br/>
                    <b>Dob.: </b> {e.Dob}<br/>
                    <b>Address: </b> {e.Address}<br/>
                    <b>Phone: </b> {e.Phone}<br/>
                    <b>Email: </b> {e.Email}<br/>
                    <b>Date Registered: </b> {e.Date}</p>
                  </CCardBody>
                  </>
                )
              })
            }
            
            <CButton  color="info" onClick={() => this.setState({edit:true})} size="md">Edit User Details</CButton>

          </CCard>
          <CModal 
              show={this.state.edit} 
              onClose={() => this.setState({edit:false})}
              color="info"
              closeOnBackdrop={false}
            >
            <CModalHeader closeButton>
              <CIcon size={'lg'} style={{paddingTop:3,}} content={freeSet.cilUser}/>
              <CModalTitle> User Form</CModalTitle>
            </CModalHeader>
            <CModalBody>
              <CForm className="form-horizontal">
                <CFormGroup row>
                  <CCol md="3">
                    <CLabel htmlFor="text-input">Full name:</CLabel>
                  </CCol>
                  <CCol xs="12" md="9">
                    <CInput id="text-input" name="text-input" defaultValue={this.state.Name} onChange={e => {this.setState({ Name:e.target.value })}} placeholder="Enter Full Name" required/>
                  </CCol>
                </CFormGroup>

                <CFormGroup row>
                  <CCol md="3">
                    <CLabel htmlFor="date-input">Date of birth:</CLabel>
                  </CCol>
                  <CCol xs="12" md="9">
                    <CInput defaultValue={this.state.Dob} onChange={e => {this.setState({ Dob:e.target.value })}} type="date" id="date-input" name="date-input" placeholder="date" required/>
                  </CCol>
                </CFormGroup>

               

                <CFormGroup row>
                  <CCol md="3">
                    <CLabel htmlFor="number">Phone No.:</CLabel>
                  </CCol>
                  <CCol xs="12" md="9">
                    <CInput defaultValue={this.state.Phone} onChange={e => {this.setState({ Phone:e.target.value })}} type="tel" id="number" placeholder="9876543210" required />
                  </CCol>
                </CFormGroup>
                

                <CFormGroup row>
                  <CCol md="3">
                    <CLabel htmlFor="textarea-input">Address:</CLabel>
                  </CCol>
                  <CCol xs="12" md="9">
                    <CTextarea 
                      defaultValue={this.state.Address} onChange={e => {this.setState({ Address:e.target.value })}}
                      name="textarea-input" 
                      id="textarea-input" 
                      rows="9"
                      placeholder="User Address..." 
                      required
                    />
                  </CCol>
                </CFormGroup>

              </CForm>
            </CModalBody>
            <CModalFooter>
                <CButton onClick={this.formSubmit} size="md" color="info" > Submit</CButton>
              <CButton color="secondary" onClick={() => this.setState({edit:false})}>Cancel</CButton>
            </CModalFooter>
          </CModal>
        </CCol>

        <CCol xs="12" sm="12" md="8" lg="8">
          <CCard>
            <CCardHeader>
              {Disease}
            </CCardHeader>
            <CCardBody>
              <CForm className="form-horizontal">
              <CFormGroup row>
                  <CLabel col md="3" htmlFor="file-input">File input</CLabel>
                  <CCol xs="12" md="9">
                    <CInputFile id="file-input" name="file-input"/>
                  </CCol>
                  
                </CFormGroup>
                </CForm>
                
            </CCardBody>
          </CCard>
        </CCol>
    </CRow>
    </>
  );
}
}
export default  withRouter(UserData)