import React from "react";
import {
  CCollapse,
  CButton,
  CCard,
  CCardBody,
  CCardHeader,
  CCol,
  CRow,
  CDataTable,
  CForm,
  CInputGroupPrepend,
  CInputGroupText,
  CBadge,
  CFormGroup,
  CLabel,
  CInputGroup,
  CInput,
  CInputGroupAppend,
  CModal,
  
  CModalHeader,
  CModalTitle,
  CModalBody,
  CModalFooter
} from '@coreui/react'
import CIcon from '@coreui/icons-react'
import usersData from './Data'
import Firebase from '../../firebase'
import _ from 'lodash';
import { withRouter } from "react-router-dom";
import { freeSet } from '@coreui/icons'

  // const fields = [
  //   { key: 'name', _style: { width: '40%'} },
  //   'registered',
  //   { key: 'role', _style: { width: '20%'} },
  //   { key: 'status', _style: { width: '20%'} },
  //   {
  //     key: 'show_details',
  //     label: '',
  //     _style: { width: '1%' },
  //     sorter: false,
  //     filter: false
  //   }
  // ]

  const fields = ['Name','Address', 'Date', 'Disease','Dob','Doctor', 'Email', 'Gender', 'NextDate', 'Phone', 'show_details']


const getBadge = status => {
    switch (status) {
    case 'Active': return 'success'
    case 'Inactive': return 'secondary'
    case 'Pending': return 'warning'
    case 'Banned': return 'danger'
    default: return 'primary'
    }
}

class Dashboard extends React.Component {
  constructor() {
    super();
  this.state = { 
    data:null,
    details:[],
    info: false,
    email:'',
    password:''
  }
  }

  componentDidMount(){
   // history = useHistory()

    Firebase.database().ref('/').once("value",(item) => {
         // console.log(item.val())
          const users = _.map( item.val(), (e) => {
            return e.data 
          })
          this.setState({ data:users})
        })
  }

  UserSignUP=() => {
    
     Firebase.auth().createUserWithEmailAndPassword(this.state.email, this.state.password)
     .then(userCredentials => {
       console.log(userCredentials.user.uid)
    this.props.history.push(`/User/${userCredentials.user.uid}`)
     }).catch((error)=>{console.error(error);})
  }
  
   toggleDetails = (index) => {

    if (index.Email===null||index.Email===""){
      let newDate = new Date()
      let d = newDate.getDate();
      let m = newDate.getMonth() + 1;
      let y = newDate.getFullYear();
      let h = newDate.getHours();
      let mt = newDate.getMinutes();
      let s = newDate.getSeconds();
      let ms = newDate.getMilliseconds();
      let newEmail = index.Name + y+m+d+h+mt+s+ms +'@hospital.com'
      this.setState({info:true, email:newEmail})

    }else{
      this.setState({info:true, email:index.Email})
    }

    var passwordChars = "0123456789ABCDEFGHIJKLMNOPQRSTUVWXYZabcdefghijklmnopqrstuvwxyz#@!%&()/";
    var randPwLen = Math.floor(Math.random() * (10 - 6 + 1)) + 6;
    var randPassword = Array(randPwLen).fill(passwordChars).map(function(x) { return x[Math.floor(Math.random() * x.length)] }).join('');
    this.setState({password:randPassword})
  }


  render(){

    const data = this.state.data
    const details = this.state.details
   
    
  return  (
    <>
    
      <CRow style={{margin:'30px'}}>
      <CCol xs="12" lg="12">
      <CCardBody>
      <CModal 
              show={this.state.info} 
              onClose={() => this.setState({info:false})}
              color="info"
              closeOnBackdrop={false}
            >
              <CModalHeader closeButton>
              <CIcon size={'lg'} style={{paddingTop:3,}} content={freeSet.cilUser}/>
                <CModalTitle> User Form</CModalTitle>
              </CModalHeader>
              <CModalBody>
              <CCardBody>
                  <CForm>
                    <h4>User SignUP</h4>
                    {/* <p className="text-muted">Sign In to your account</p> */}
                    <CInputGroup className="mb-3">
                      <CInputGroupPrepend>
                        <CInputGroupText>
                          <CIcon content={freeSet.cilUser}/>
                        </CInputGroupText>
                      </CInputGroupPrepend>
       
                      <CInput type="text" value={this.state.email}  />
                    </CInputGroup>
                    <CInputGroup className="mb-4">
                      <CInputGroupPrepend>
                        <CInputGroupText>
                          <CIcon content={freeSet.cilLockLocked} />
                        </CInputGroupText>
                      </CInputGroupPrepend>
           
                      <CInput type="text" value={this.state.password} />
                    </CInputGroup>
                    <CRow>
                      <CCol xs="6">
                        <CButton color="primary" onClick={()=> this.UserSignUP()} className="px-4">Login</CButton>
                      </CCol>
                      
                    </CRow>
                  </CForm>
                </CCardBody>
              </CModalBody>
              <CModalFooter>
                <CButton color="secondary" 
                  onClick={() => this.setState({info:false})}
                  >Cancel</CButton>
              </CModalFooter>
            </CModal>

          </CCardBody>
          <CCard>

            <CCardHeader style={{alignSelf:'center'}}>
            <span className="h5" >Users</span>
              
              
            </CCardHeader>

            <CCardBody>
            <CDataTable
              items={data}
              fields={fields}
              columnFilter
              tableFilter
              footer
              itemsPerPageSelect
              itemsPerPage={5}
              hover
              sorter
              pagination
              clickableRows
              onRowClick={(item) => {
              //  this.setState({info:true})
             //   console.log(item.email)
                //history.push(`/users/${item.id}`)
              }}
               scopedSlots = {{
              //   'status':
              //     (item)=>(
              //       <td>
              //         <CBadge color={getBadge(item.status)}>
              //           {item.status}
              //         </CBadge>
              //       </td>
              //     ),
                'show_details':
                  (item, index)=>{
                    return (
                      <td className="py-2">
                        <CButton
                          color="primary"
                          variant="outline"
                          shape="square"
                          size="sm"
                          onClick={()=>{this.toggleDetails(item)}}
                        >
                          {details.includes(index) ? 'View' : 'Create'}
                        </CButton>
                      </td>
                      )
                  },
              //   'details':
              //       (item, index)=>{
              //         return (
              //         <CCollapse show={details.includes(index)}>
              //           <CCardBody>
              //             <h4>
              //               {item.username}
              //             </h4>
              //             <p className="text-muted">User since: {item.Date}</p>
              //             {/* <Link to={{ pathname:"/user", state: { item: 'true' }}} > */}
              //               <CButton size="sm" color="info">
              //                 User Settings
              //               </CButton>
              //             {/* </Link> */}
              //             <CButton size="sm" on color="danger" className="ml-1">
              //               Delete
              //             </CButton>
              //           </CCardBody>
              //         </CCollapse>
              //       )
              //     }
                }}
            />
            </CCardBody>
          </CCard>
        </CCol>

      </CRow>
    </>
  
  )
}
}
export default Dashboard;