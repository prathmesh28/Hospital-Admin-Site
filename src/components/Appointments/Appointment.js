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
const fields = ['Name', { key: 'Phone', Label: 'Phone No' }, { key: 'Type', Label: 'Problem' }, 'Doctor', 'timeslot', {
  key: 'show_details',
  label: '',
  _style: { width: '1%' },
  sorter: false,
  filter: false
}]

class Appointment extends React.Component {
  constructor() {
    super();

    this.state = {
      showViewer: false,
      data: null,
      details: [],
      dataNew:null,
      dataOld:null
    }
  }

  componentDidMount() {
    Firebase.database().ref('Appointments/').on("value", (item) => {
      // console.log(item.val())
    
          const checkUsersNew = _.map(item.val(), (e) => {
      //add && e.data.done==false
         if(e.data.status===true && e.data.cancel===false )
             return e.data
         })
         const usersNew = _.filter(checkUsersNew)
         this.setState({ dataNew: usersNew })
   
         const users = _.map(item.val(), (e) => {
          if(e.data.status===false && e.data.cancel===false)
            return e.data
          })
         const usersOld = _.filter(users)
         this.setState({ dataOld: usersOld })


    })
  }
  toggleDetails = (index) => {

    const position = this.state.details.indexOf(index)
    let newDetails = this.state.details.slice()
    if (position !== -1) {
      newDetails.splice(position, 1)
    } else {
      newDetails = [...this.state.details, index]
    }
    this.setState({ details: newDetails })
    //   setDetails(newDetails)
  }


  render() {

    const dataNew = this.state.dataNew
    const dataOld = this.state.dataOld

    const data = this.state.data
    console.log(data);

    // const details = this.state.details


    return (
      <>
        <Header />
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
                        Appointments
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
                          'show_details':
                            (item, index) => {
                              return (
                                <td className="py-2">
                                  <CButton
                                    color="primary"
                                    variant="outline"
                                    shape="square"
                                    size="sm"
                                    onClick={() => { this.toggleDetails(index) }}
                                  >
                                    {this.state.details.includes(index) ? 'Hide' : 'Show'}
                                  </CButton>
                                </td>
                              )
                            },
                          'details':
                            (item, index) => {
                              return (
                                <CCollapse show={this.state.details.includes(index)}>
                                  <CCardBody>

                                    <CButton
                                      color="primary"
                                      shape="outline"
                                      size="md"

                                      onClick={() => {
                                        console.log(item, index)
                                        Firebase.database().ref('Appointments/' + item.id + '/data/').update({ status: false })
                                      }}>{item.status ? 'Done' : 'Pending'}</CButton>






                                    <CButton size="md" color="danger" className="ml-1"
                                      onClick={async () => {
                                       // var r = await window.confirm("Table entry of name: " + item.Name + " will be deleted");
                                        // if (r === true) {
                                        //   let userRef = Firebase.database().ref('Appointments/' + item.id)
                                        //   userRef.remove()
                                        // }
                                       
                                        var person = prompt("Reason:", "");
                                        if (person == null || person == "") {
                                        //  txt = "User cancelled the prompt.";
                                        } else {
                                          
                                          Firebase.database().ref('Appointments/' + item.id + '/data/').update({
                                            message:person,cancel:true
                                          })
                                            .then((doc) => {
                                    console.log(doc)
                                            })
                                            .catch((error) => {
                                              console.error(error);
                                            })
                                        }
                                       // document.getElementById("demo").innerHTML = txt;


                                      }}>
                                      Delete
                               </CButton>
                                  </CCardBody>
                                </CCollapse>
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
                          'show_details':
                            (item, index) => {
                              return (
                                <td className="py-2">
                                  <CButton
                                    color="primary"
                                    variant="outline"
                                    shape="square"
                                    size="sm"
                                    onClick={() => { this.toggleDetails(index) }}
                                  >
                                    {this.state.details.includes(index) ? 'Hide' : 'Show'}
                                  </CButton>
                                </td>
                              )
                            },
                          'details':
                            (item, index) => {
                              return (
                                <CCollapse show={this.state.details.includes(index)}>
                                  <CCardBody>
                                  

                                    <CButton
                                      color="primary"
                                      shape="outline"
                                      size="md"

                                      onClick={() => {
                                        console.log(item, index)
                                        Firebase.database().ref('Appointments/' + item.id + '/data/').update({ status: true })
                                      }}>{item.status ? 'Done' : 'Panding'}</CButton>






                                    <CButton size="md" color="danger" className="ml-1"
                                       onClick={async () => {
                                     
                                        
                                         var person = prompt("Reason:", "canceled by doctor.");
                                         if (person == null ) {
                                         //  txt = "User cancelled the prompt.";
                                         } else {
                                           
                                           Firebase.database().ref('Appointments/' + item.id + '/data/').update({
                                             message:person,cancel:true
                                           })
                                             .then((doc) => {
                                     console.log(doc)
                                             })
                                             .catch((error) => {
                                               console.error(error);
                                             })
                                         }
 
 


                                      }}>
                                      Delete
                               </CButton>



                                  </CCardBody>
                                </CCollapse>
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
