import * as React from "react";
import {
  CCol,
  CRow,
  CCard,
  CCardHeader,
  CCardBody,
  CButton,
  CDataTable,
  CCollapse,
  CFormGroup,
  CLabel,
  CInputRadio,
  CCardFooter,
  CInput,
  CTabs,
  CNav,
  CNavItem,
  CNavLink,
  CTabContent,
  CTabPane,
  CImg
} from '@coreui/react'
import { withRouter } from 'react-router-dom'
import Firebase from "../../firebase";
import _ from 'lodash';
import Header from '../Dashboard/Header'
import DatePicker from 'react-date-picker';
import { v4 as uuidv4 } from 'uuid';

import { toast } from 'react-toastify';
import 'react-toastify/dist/ReactToastify.css';
toast.configure()
const fields = ['name', { key: 'phone', Label: 'Phone No' },'Doctor Name' , 'Remarks', 'Confirm']

class Appointment extends React.Component {
  constructor() {
    super();
    this.state = {
     
    
    }
    this.state = {
      showViewer: false
    }
  }
 
  render() {

    const dataNew = this.state.dataNew
    const dataOld = this.state.dataOld

    // const details = this.state.details


    return (
      <>
       <CRow style={{ margin: '30px' }}>
          <CCol xs="12" lg="12">
      <CCard>
      <CTabs activeTab="home">
      <CNav variant="tabs">
        <CNavItem>
          <CNavLink data-tab="home">
          <CCardHeader> 
             Active
            </CCardHeader>
           
          </CNavLink>
        </CNavItem>
        <CNavItem>
          <CNavLink data-tab="profile">
          <CCardHeader> 
          Appointment
            </CCardHeader>
           
          </CNavLink>
        </CNavItem>
      </CNav>
      <CTabContent>
        <CTabPane data-tab="home">
        <CCardBody>
                <CDataTable
                  items={dataNew}
                  fields={fields}
                  columnFilter
                  //tableFilter
                  itemsPerPageSelect
                  itemsPerPage={5}
                  hover
                  sorter
                  pagination

                  scopedSlots={{
  
                    
                    'Confirm':
                      (item, index) => {
                        return (
                          <td className="py-2">

                            <CButton size="sm" color="danger" className="ml-1"
                              onClick={async () => {
                                var r = await window.confirm("Table entry of name: " + item.name + " will be deleted");
                                


                              }}>
                              Confirm
                               </CButton>
                          </td>
                        )
                      },


                  }}>







                </CDataTable>
              </CCardBody>
        </CTabPane>
        <CTabPane data-tab="profile">
        <CCardBody>
                <CDataTable
                  items={dataOld}
                  fields={fields}
                  columnFilter
                  //tableFilter
                  itemsPerPageSelect
                  itemsPerPage={5}
                  hover
                  sorter
                  pagination

                  scopedSlots={{

                    'Confirm':
                      (item, index) => {
                        return (
                          <td className="py-2">

                            <CButton size="sm" color="danger" className="ml-1"
                              onClick={async () => {
                                var r = await window.confirm("Table entry of name: " + item.name + " will be deleted");
                              


                              }}>
                              Confirm
                               </CButton>
                          </td>
                        )
                      },


                  }}>


                </CDataTable>
              </CCardBody>
        </CTabPane>
        
      </CTabContent>
    </CTabs>
    </CCard>
    </CCol>


         
         


        </CRow>

      </>

    )
  }
}
export default withRouter(Appointment)
