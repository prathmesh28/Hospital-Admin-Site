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
import { Link } from "react-router-dom";
import Loader from 'react-loader';

import { toast } from 'react-toastify';
import 'react-toastify/dist/ReactToastify.css';
toast.configure()
const fields = ['Name', { key: 'Phone', Label: 'Phone No' },{ key: 'Type', Label: 'Problem' },'Doctor' , 'timeslot', 'Confirm','Delete']

class Appointment extends React.Component {
  constructor() {
    super();
  
    this.state = {
      showViewer: false,
      data:null
    }
  }
 
  componentDidMount() {
    Firebase.database().ref('Appointments/').on("value", (item) => {
      // console.log(item.val())
      const users = _.map(item.val(), (e) => {
        return e.data
        
      })
      this.setState({ data: users })
      
      
    })
  }


  render() {

    const dataNew = this.state.dataNew
    const dataOld = this.state.dataOld

    const data = this.state.data
    console.log(data);
    
    // const details = this.state.details


    return (
      <>
       <Header/>
       <CCard>
        <CCardBody>
          <CRow className="align-items-center" >
           

            <CCol className="col-xs-12 col-sm-6 col-md-3 col-lg-3">
              <Link to="/Dashboard"><CButton color="info" 
                size="lg">UserData</CButton></Link>
            </CCol>
            
            <CCol className="col-xs-12 col-sm-6 col-md-3 col-lg-3">
              <Link to="/Doctors"><CButton color="info" 
                size="lg">Doctors</CButton></Link>
            </CCol>

            <CCol className="col-xs-12 col-sm-6 col-md-3 col-lg-1">
              <Link to="/data"><CButton color="info" 
                size="lg">Data</CButton></Link>
            </CCol>
            

          </CRow>
          </CCardBody>

      </CCard>

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
                  items={data}
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

                               (item,index)=>(
                                <td>
                                  <CButton
                                  color="primary"
                                  shape="outline"
                                  size="sm"
       
                                  onClick={()=>{
                                    console.log(item,index)
                                     Firebase.database().ref('Appointments/' + item.id+'/data/').update({status:false})
                                  }}>{item.status?'Done':'Panding'}</CButton>
                                </td>
                              ),
                              
                              
                      'Delete':
                      (item, index) => {
                        return (
                          <td className="py-2">

                            <CButton size="sm" color="danger" className="ml-1"
                              onClick={async () => {
                                var r = await window.confirm("Table entry of name: " + item.Name + " will be deleted");
                                if (r === true) {

                                  let userRef = Firebase.database().ref('Appointments/' + item.id)
                                  userRef.remove()
                                }


                              }}>
                              Delete
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
                  items={data}
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
                    (item,index)=>(
                      <td>
                        <CButton
                        color="primary"
                        shape="outline"
                        size="sm"

                        onClick={()=>{
                          console.log(item,index)
                           Firebase.database().ref('Appointments/' + item.id+'/data/').update({status:true})
                        }}>{item.status?'Done':'Panding'}</CButton>
                      </td>
                    ),
                    
                        'Delete':
                      (item, index) => {
                        return (
                          <td className="py-2">

                            <CButton size="sm" color="danger" className="ml-1"
                              onClick={async () => {
                                var r = await window.confirm("Table entry of name: " + item.Name + " will be deleted");
                                if (r === true) {

                                  let userRef = Firebase.database().ref('Appointments/' + item.id)
                                  userRef.remove()
                                }


                              }}>
                              Delete
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
