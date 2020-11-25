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
import {toast} from 'react-toastify';  
import 'react-toastify/dist/ReactToastify.css'; 
toast.configure()

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
    showPassword:false

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


  notify = (e)=>{  
    toast(e)  
  } 
 

  UserSignUP = () => {
    this.setState({loading:true})
     Firebase.auth().createUserWithEmailAndPassword(this.state.email, this.state.password)
     .then(async(userCredentials) => {
      
      let data

      let userRef =Firebase.database().ref('/Users/'+this.state.id)
      await userRef.once("value",(item) => {
        data=item.val()
       })
      userRef.remove()
        data={...data.data,Account:true,Email:this.state.email,id:userCredentials.user.uid}
        console.log(data)

        await Firebase.database().ref('/Users/'+userCredentials.user.uid).update({ data })
        this.props.history.push(`/User/${userCredentials.user.uid}`)

        this.setState({id:userCredentials.user.uid})

        setTimeout(() => {
          this.setState({loading:false})
         }, 3000);

     })
     .catch(error => {
      this.setState({ loading:false })
      this.notify(error.message)
    })
      
  }
  pageNav=(item)=>{
    this.props.history.push(`/User/${item.id}`)
  }
   toggleDetails = (index) => {
    this.setState({ id:index.id })
    if (index.Email===null||index.Email===""){
      
      let name = index.Name.replace(/\s+/g, '')
      let newEmail = name +'@hospital.com'
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
              <Loader loaded={!this.state.loading}>
                  <CForm>
                    <h4>User Login Details</h4>
                    {/* <p className="text-muted">Sign In to your account</p> */}
                    <CInputGroup className="mb-3">
                      <CInputGroupPrepend>
                        <CInputGroupText>
                          <CIcon content={freeSet.cilUser}/>
                        </CInputGroupText>
                      </CInputGroupPrepend>
       
                      <CInput type="text" value={this.state.email} onChange={e=> this.setState({email:e.target.value})} />
                    </CInputGroup>
                    <CInputGroup className="mb-4">
                      <CInputGroupPrepend>
                        <CInputGroupText>
                          <CIcon content={freeSet.cilLockLocked} />
                        </CInputGroupText>
                      </CInputGroupPrepend>
           
                      <CInput type={this.state.showPassword?"text":"password"} value={this.state.password} onChange={e=> this.setState({password:e.target.value})}/>
                    </CInputGroup>
                    <div class="form-check" style={{margin:20}}>
                      <label class="form-check-label">
                        <input class="form-check-input" type="checkbox" onChange={e => {
                          const { checked } = e.target
                          this.setState({
                            showPassword: checked
                          })
                        }} defaultChecked={this.state.showPassword}/>
                        Show Password
                      </label>
                    </div>
                    <CRow>
                      <CCol xs="6">
                        <CButton color="info" onClick={()=> this.UserSignUP()} className="px-4">Add User</CButton>
                      </CCol>
                      
                    </CRow>
                  </CForm>
                  </Loader>
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
              }}
               scopedSlots = {{

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
                  'show_details':
                  (item, index)=>{
                    return (
                      <td className="py-2">
                        <CButton
                          color="primary"
                          variant="outline"
                          shape="square"
                          size="sm"
                          onClick={()=>{this.toggleDetails(index)}}
                        >
                          {this.state.details.includes(index) ? 'Hide' : 'Show'}
                        </CButton>
                      </td>
                      )
                  },
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