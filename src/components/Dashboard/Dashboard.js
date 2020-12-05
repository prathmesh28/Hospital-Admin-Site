import  React, { useState, useEffect } from "react";
import Header from './Header'
import Table from './Table'
import {
  CButton,
  CCard,
  CCardBody,
  CCol,
  CModal,
  CModalBody,
  CModalFooter,
  CModalHeader,
  CModalTitle,
  CRow
} from '@coreui/react'
import CIcon from '@coreui/icons-react'
import { freeSet } from '@coreui/icons'
import { Link } from "react-router-dom";

import Form from './Form'

function Dashboard() {
  const [info, setInfo] = useState(false)
  


const [today, setDate] = React.useState(new Date()); // Save the current date to be able to trigger an update

useEffect(() => {
    const timer = setInterval(() => { // Creates an interval which will update the current data every minute
    // This will trigger a rerender every component that uses the useDate hook.
    setDate(new Date());
  }, 1000);
  return () => {
    clearInterval(timer); // Return a funtion to clear the timer so that it will stop being called on unmount
  }
}, []);
return  (
    <>
     <Header/>
     <CCard>
        <CCardBody>
          <CRow className="align-items-center" >
            
            <CCol className="col-xs-12 col-sm-6 col-md-3 col-lg-3">
              <CButton color="info"  onClick={() => setInfo(!info)} size="lg">Add new User</CButton>
            </CCol>

            <CCol className="col-xs-12 col-sm-6 col-md-3 col-lg-3">
              <Link to="/Appointment"><CButton color="info" 
                size="lg">Appointments</CButton></Link>
            </CCol>

            <CCol className="col-xs-12 col-sm-6 col-md-3 col-lg-3">
              <Link to="/Doctors"><CButton color="info" 
                size="lg">Doctors</CButton></Link>
            </CCol>

            <CCol className="col-xs-12 col-sm-6 col-md-3 col-lg-1">
              <Link to="/data"><CButton color="info" 
                size="lg">Data</CButton></Link>
            </CCol>
            
            <CCol style={{alignSelf:'inherit'}} className="col-xs-12 col-sm-6 col-md-3 col-lg-2">
              {today.toLocaleString()}            
            </CCol>

          </CRow>
          </CCardBody>

      </CCard>
      <Table/>
      <CCardBody>
       <CModal 
              show={info} 
              onClose={() => setInfo(!info)}
              color="info"
              closeOnBackdrop={false}
            >
              <CModalHeader closeButton>
              <CIcon size={'lg'} style={{paddingTop:3,}} content={freeSet.cilUser}/>
                <CModalTitle>&nbsp; User Form</CModalTitle>
              </CModalHeader>
              <CModalBody>
                <Form parentCallback = {(childData) => {
                     setInfo(childData)
                }}/>
              </CModalBody>
              <CModalFooter>
                <CButton color="secondary" onClick={() => setInfo(!info)}>Cancel</CButton>
              </CModalFooter>
            </CModal>
          </CCardBody>
    </>
  
  )
}
export default Dashboard