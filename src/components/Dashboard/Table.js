import React from "react";
import {
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
  CInputGroup,
  CInput,
  CModal,
  CModalHeader,
  CModalTitle,
  CModalBody,
  CModalFooter
} from '@coreui/react'
import CIcon from '@coreui/icons-react'
import Loader from 'react-loader';

import Firebase from '../../firebase'
import _ from 'lodash';
import { freeSet } from '@coreui/icons'
import { withRouter } from 'react-router-dom'
const fields = ['Name','Address', 'Date', 'Disease','Dob','Doctor', 'Email', 'Gender', 'NextDate', 'Phone', 'Account']



class Dashboard extends React.Component {
  constructor() {
    super();
  this.state = { 
    data:null,
  //  details:[],
    info: false,
    email:'',
    password:'',
    id: '',
    loading:false,

  }
  }

  componentDidMount(){
    this.setState({loading:true})

    Firebase.database().ref('/Users/').on("value",(item) => {
         // console.log(item.val())
          const users = _.map( item.val(), (e) => {
            return e.data 
          })
          this.setState({ data:users})
        })

        setTimeout(() => {
          this.setState({loading:false})
         }, 3000);
  }

  UserSignUP = () => {
     Firebase.auth().createUserWithEmailAndPassword(this.state.email, this.state.password)
     .then(async(userCredentials) => {
       await Firebase.database().ref('/Users/'+this.state.id+'/data/').update({ Account:true,Email:this.state.email })
       this.props.history.push(`/User/${this.state.id}`)
     }).catch((error)=>{console.error(error);})
  }
  pageNav=(item)=>{
    this.props.history.push(`/User/${item.id}`)
  }
   toggleDetails = (index) => {
    this.setState({ id:index.id })
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
   // const details = this.state.details
   
    
  return  (
    <>
          <Loader loaded={!this.state.loading}>

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
                <CModalTitle>&nbsp; User Form</CModalTitle>
              </CModalHeader>
              <CModalBody>
              <CCardBody>
                  <CForm>
                    <h4>User Login Details</h4>
                    {/* <p className="text-muted">Sign In to your account</p> */}
                    <CInputGroup className="mb-3">
                      <CInputGroupPrepend>
                        <CInputGroupText>
                          <CIcon content={freeSet.cilUser}/>
                        </CInputGroupText>
                      </CInputGroupPrepend>
       
                      <CInput type="text" value={this.state.email} readOnly={true} />
                    </CInputGroup>
                    <CInputGroup className="mb-4">
                      <CInputGroupPrepend>
                        <CInputGroupText>
                          <CIcon content={freeSet.cilLockLocked} />
                        </CInputGroupText>
                      </CInputGroupPrepend>
           
                      <CInput type="text" value={this.state.password} readOnly={true}/>
                    </CInputGroup>
                    <div>*Please note down email and password</div>
                    <CRow>
                      <CCol xs="6">
                        <CButton color="info" onClick={()=> this.UserSignUP()} className="px-4">Add User</CButton>
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
          <CCard borderColor="info">

            <CCardHeader color="info" style={{textAlign:'center'}}>
            <span className="h5" style={{color:"#fff"}} >Users</span>
              
              
            </CCardHeader>

            <CCardBody>
            {/* <CCol xs="12" sm="6" md="4">
              <CCard color="success" className="text-white text-center">
                <CCardBody>
                  <blockquote className="card-bodyquote">
                    <p>Lorem ipsum dolor sit amet, consectetur adipiscing elit. Integer posuere erat a ante.</p>
                    <footer>Someone famous in <cite title="Source Title">Source Title</cite></footer>
                  </blockquote>
                </CCardBody>
              </CCard>
            </CCol> */}
            <CDataTable
              items={data}
              fields={fields}
              columnFilter
              tableFilter
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
                'Account':
                  (item, index)=>{
                    return (
                      <td className="py-2">
                        <CButton
                          color="info"
                          variant="outline"
                          shape="square"
                          size="sm"
                          onClick={item.Account? ()=>{this.pageNav(item)} : ()=>{this.toggleDetails(item)}}
                        >
                        {item.Account? 'View' : 'Create'}
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
      </Loader>

    </>
  
  )
}
}
export default withRouter(Dashboard);