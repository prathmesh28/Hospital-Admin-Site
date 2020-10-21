import * as React from "react";
import {
    CCol,
    CRow,
    CWidgetIcon,
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
    CInputFile
  } from '@coreui/react'
import CIcon from '@coreui/icons-react'
import { freeSet } from '@coreui/icons'
import ReactDOM from "react-dom";
import {
  BrowserRouter as Router,
  Switch,
  Route,
  useParams
} from "react-router-dom";
import { withRouter } from 'react-router-dom'
import Firebase from "../firebase";
import _ from 'lodash';
import { register } from './../serviceWorker';
import Header from './Dashboard/Header'
class UserData extends React.Component{
  state={
    data:{},
    edit:false,
    Disease:'',
    Doctor:''
  }
  componentDidMount(){
    const id = this.props.match.params.id;
    console.log(id)
    Firebase.database().ref('/Users/'+id).once("value",(item) => {
      // console.log(item.val())
      // const users = _.map( item.val(), (e) => {
      //   return e.data 
      // })
      // this.setState({ data:users})
       this.setState({ data:item.val(), Disease: item.val().data['Disease'], Doctor: item.val().data['Doctor']})
     })
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
                          <b>Dob.: </b> {e.Dob}<br/>
                          <b>Gender: </b> {e.Gender}<br/>
                          <b>Phone: </b> {e.Phone}<br/>
                          <b>Address: </b> {e.Address}<br/>
                          <b>Email: </b> {e.Email}<br/>
                          <b>Date Registered: </b> {e.Date}<br/>
                          <b>Last Visit/Next Visit: </b> {e.NextDate}</p>
                        
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
                           
                          </CModalBody>
                          <CModalFooter>
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