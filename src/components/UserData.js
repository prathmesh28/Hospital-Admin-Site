import * as React from "react";
import {
    CCardGroup,
    CCardFooter,
    CCol,
    CLink,
    CRow,
    CWidgetProgress,
    CWidgetIcon,
    CWidgetProgressIcon,
    CWidgetSimple,
    CProgress,
    CCard,
    CCardHeader,
    CCardBody,
    CFormGroup,
    CLabel
  } from '@coreui/react'
import CIcon from '@coreui/icons-react'
import { freeSet } from '@coreui/icons'
import { browserHistory } from "react-router";

class UserData extends React.Component{
render(){

  return(
    <CRow>
        <CCol xs="12" sm="12" md="4" lg="4">
            <CCard>
                <CCardBody>
                <CWidgetIcon 
                    //text="income" 
                    header="UserName" color="info">
                    <CIcon size={'lg'} 
                    content={freeSet.cilUser} />
                </CWidgetIcon>
                <CRow >
                  <CCol xs="6" sm="6" md="6" lg="6">
                  </CCol>
                  <CCol xs="6" sm="6" md="6" lg="6">
                  <span className="h6">Age</span>
                  </CCol>
                </CRow>
                {/* loop the row */}
                </CCardBody>
            </CCard>
          
        </CCol>
        <CCol xs="12" sm="12" md="8" lg="8">
        <CCard>
            <CCardHeader>
              Card title
            </CCardHeader>
            <CCardBody>
              Lorem ipsum dolor sit amet, consectetuer adipiscing elit, sed diam nonummy nibh euismod tincidunt ut
              laoreet dolore magna aliquam erat volutpat. Ut wisi enim ad minim veniam, quis nostrud exerci tation
              ullamcorper suscipit lobortis nisl ut aliquip ex ea commodo consequat.
            </CCardBody>
          </CCard>
        </CCol>
    </CRow>
  );
}
}
export default UserData