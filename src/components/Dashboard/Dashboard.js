import  React, { useState } from "react";
import Header from './Header'
import Table from './Table'
import {
  CButton,
  CCard,
  CCardBody,
  CCardHeader,
  CCol,
  CModal,
  CModalBody,
  CModalFooter,
  CModalHeader,
  CModalTitle,
  CRow
} from '@coreui/react'
import CIcon from '@coreui/icons-react'
import Form from './Form'
export default function Dashboard() {
  const [info, setInfo] = useState(false)
  
  
  return  (
    <>
     <Header/>
     <CCard>
        <CCardBody>
          <CRow className="align-items-center" >
            
            <CCol col="4" sm="4" md="2" xl className="col-xs-12 col-sm-6 col-md-3 col-lg-3">
              <CButton  color="primary" onClick={() => setInfo(!info)} size="lg">Add new User</CButton>
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
                <CModalTitle>User Form</CModalTitle>
              </CModalHeader>
              <CModalBody>
                <Form/>
              </CModalBody>
              <CModalFooter>
                <CButton color="secondary" onClick={() => setInfo(!info)}>Cancel</CButton>
              </CModalFooter>
            </CModal>

          </CCardBody>
          <div>
            <p>hi</p>
          </div>
    </>
  
  )
}
