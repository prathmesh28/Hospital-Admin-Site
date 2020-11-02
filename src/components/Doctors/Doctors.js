import * as React from "react";
import {
    CCol,
    CRow,
    CCard,
    CCardHeader,
    CCardBody,
    CButton,
    CModal,
    CDataTable,
    CBadge,
    CModalHeader,
    CModalTitle,
    CModalBody,
    CModalFooter,
    CForm,
    CCollapse,
    CFormGroup,
    CLabel,
    CInputFile,
    CInput,
    CInputRadio,
    CTextarea,
    CCardFooter
  } from '@coreui/react'
import CIcon from '@coreui/icons-react'
import { freeSet } from '@coreui/icons'
import { withRouter } from 'react-router-dom'
import Firebase from "../../firebase";
import _ from 'lodash';
import Header from '../Dashboard/Header'
import Loader from 'react-loader';
import DatePicker from 'react-date-picker';
import { v4 as uuidv4 } from 'uuid';

import {toast} from 'react-toastify';  
import 'react-toastify/dist/ReactToastify.css'; 
toast.configure()





  const fields = [
    { key: 'name', _style: { width: '40%'} },
    'registered',
    { key: 'gender', _style: { width: '10%'} },
    { key: 'role', _style: { width: '20%'} },
    { key: 'qualification', _style: { width: '20%'} },
    {
      key: 'show_details',
      label: '',
      _style: { width: '1%' },
      sorter: false,
      filter: false
    }
  ]

  
class Doctors extends React.Component{
  state={
    details:[],
    data:null,
    name:"",
    role:"",
    registered:new Date(),
    qualification:"",
    id:"",
    gender: "",
  
  }
  componentDidMount(){
    Firebase.database().ref('/Doctors/').on("value",(item) => {
         // console.log(item.val())
          const users = _.map( item.val(), (e) => {
            return e.data 
          })
          this.setState({ data:users})
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
    this.setState({ details:newDetails })
 //   setDetails(newDetails)
  }
 
  notify = (e)=>{  
    toast(e)  
  } 

  addRow=async()=>{
    if((this.state.gender ==='male'|| this.state.gender === 'female') && this.state.name !=="")
    {
      console.log(this.state.name)
      console.log(this.state.registered.toLocaleString())
      let data ={
          name:this.state.name,
          registered:this.state.registered.toLocaleString(),
          role:this.state.role,
          gender:this.state.gender,
          qualification:this.state.qualification
        }
        let id = await uuidv4(data)
          this.setState({ id, name:"",role:"",qualification:"" })
          data={...data, id:this.state.id }
  
        Firebase.database().ref('/Doctors/' + id ).set({
          data
          })
          .then((doc) => {
          })
          .catch((error) => {
          console.error(error);
          })
    }else{
      this.notify('Enter all details')
    }
   
  }


  render(){
    const data = this.state.data
    
    return(
      <>
      <Header/>
      <CRow>
          <CCol>
          <CCard borderColor="info" style={{margin:20}}>

        <CCardHeader color="info" style={{textAlign:'center'}}>
        <span className="h5" style={{color:"#fff"}} >Doctors</span>


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
      scopedSlots = {{
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
          'registered':
          (item, index)=>(
              <td>
               
               
                <DatePicker
                     value={item.registered}
                     format="dd-MM-y"
                     disabled={true}
                  //   onChange={item.Date}
               />
              </td>
            ),
        'details':
            (item, index)=>{
              return (
              <CCollapse show={this.state.details.includes(index)}>
                <CCardBody>
                  <h4>
                    {item.gender}
                  </h4>
                  <p className="text-muted">User since: {item.registered}</p>
                  
                  <CButton size="sm" color="danger" className="ml-1"
                    onClick={()=>{
                      console.log(item.gender)
                        //  let userRef = Firebase.database().ref('Doctors/' + item.id)
                        //  userRef.remove()
                        // console.log(userRef)

                    }}>
                    Delete
                  </CButton>
                </CCardBody>
              </CCollapse>
            )
          }
      }}
    />
    </CCardBody>
    <CCardFooter>
       <table id='Data' className="table table-hover ">
         <h4>Add Doctor</h4>  
       <tbody>
          <tr>
             <td>
             <input type="text" class="form-control" id="name" placeholder="Doctor Name" value={this.state.name}
                    onChange={e => {this.setState({ name:e.target.value })}}/>
             </td>

             <td>
                 Date Joined<br/>
                <DatePicker
                    value={this.state.registered}
                    format="dd-MM-y"
                    onChange={(value) => this.setState({registered:value})}
                />
             </td>
             <td>
                   Gender:<br/>
                 
                    <CFormGroup variant="custom-radio" inline>
                      <CInputRadio defaultValue="male" onChange={e => {this.setState({ gender:e.target.value })}} 
                        checked={this.state.gender === "male"}
                        custom id="inline-radio1" name="inline-radios" />
                      <CLabel variant="custom-checkbox" htmlFor="inline-radio1" >Male</CLabel>
                    </CFormGroup>
                    <CFormGroup variant="custom-radio" inline>
                      <CInputRadio defaultValue="female" onChange={e => {this.setState({ gender:e.target.value })}} 
                        checked={this.state.gender === "female"}
                        custom id="inline-radio2" name="inline-radios" />
                      <CLabel variant="custom-checkbox" htmlFor="inline-radio2">Female</CLabel>
                    </CFormGroup>
              
             </td>
             <td>
                <input type="text" class="form-control" id="Role"  placeholder="Role" value={this.state.role}
                onChange={e => {this.setState({ role:e.target.value })}}/>
             </td>
             <td>
             <input type="text" class="form-control" id="qualification" placeholder="qualification" value={this.state.qualification}
                onChange={e => {this.setState({ qualification:e.target.value })}}/>
             </td>
          </tr>
       </tbody>
      
       
    </table>
    <CButton color={'info'} onClick={()=>this.addRow()}>ADD</CButton>

    </CCardFooter>
    </CCard>
    </CCol>
    </CRow>
    </>
  );
}
}
export default  withRouter(Doctors)
