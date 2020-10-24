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

import Form from './Form'
export default function Dashboard() {
  const [info, setInfo] = useState(false)
  
const [time, setTime] = React.useState(new Date().toLocaleString());
useEffect(()=>{
    window.setInterval(function () {
  setTime(new Date().toLocaleString())
  }, 1000);
})
return  (
    <>
     <Header/>
     <CCard>
        <CCardBody>
          <CRow className="align-items-center" >
            
            <CCol col="4" sm="4" md="2" xl className="col-xs-12 col-sm-6 col-md-3 col-lg-3">
              <CButton color="info" variant='outline' onClick={() => setInfo(!info)} size="lg">Add new User</CButton>
            </CCol>

            <CCol col="3" sm="3" md="2" style={{alignSelf:'flex-end',margin:20}} className="col-xs-12 col-sm-6 col-md-3 col-lg-3">
              {time}            
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
                <Form/>
              </CModalBody>
              <CModalFooter>
                <CButton color="secondary" onClick={() => setInfo(!info)}>Cancel</CButton>
              </CModalFooter>
            </CModal>
          </CCardBody>
    </>
  
  )
}
