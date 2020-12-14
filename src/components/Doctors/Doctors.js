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
  CModal,
  CModalHeader,
  CModalTitle,
  CModalBody,
  CFormText
} from '@coreui/react'
import { withRouter } from 'react-router-dom'
import Firebase from "../../firebase";
import _ from 'lodash';
import Header from '../Dashboard/Header'
import DatePicker from 'react-date-picker';
import { v4 as uuidv4 } from 'uuid';
import Loader from 'react-loader';

import { toast } from 'react-toastify';
import 'react-toastify/dist/ReactToastify.css';
toast.configure()


// const [info, setInfo] = useState(false)


const fields = [
  { key: 'name', _style: { width: '20%' } },
  {key:  'Phone_No',_style:{width:'20%'} },
  { key: 'gender', _style: { width: '10%' } },
  { key: 'morningworkHours', _style: { width: '20%' } },
  { key: 'eveningworkHours', _style: { width: '20%' } },
  { key: 'specialization', _style: { width: '20%' } },
  { key: 'qualification', _style: { width: '20%' } },
  {
    key: 'show_details',
    label: '',
    _style: { width: '1%' },
    sorter: false,
    filter: false
  }
]


class Doctors extends React.Component {
  
    
  state = {
    showinfo:false,
    details: [],
    data: null,
    name: "",
    specialization: "",
    Phone_No: "",
    qualification: "",
    id: null,
    gender: "",
    MorworkFrom: null,
    MorworkTo: null,
    EvnworkFrom: null,
    EvnworkTo: null

  }
  componentDidMount() {
    Firebase.database().ref('/Doctors/').on("value", (item) => {
      // console.log(item.val())
      const users = _.map(item.val(), (e) => {
        return e.data
      })
      this.setState({ data: users })
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

  notify = (e) => {
    toast(e)
  }

  addRow = async () => {
    if (this.validateForm(0)) {

     
      if(this.state.id===null){
        let id = await uuidv4(data)
        this.setState({id})
      }

      let data = {
        name: this.state.name,
        Phone_No: this.state.Phone_No,
        specialization: this.state.specialization,
        gender: this.state.gender,
        qualification: this.state.qualification,
        MorworkFrom: this.state.MorworkFrom,
        MorworkTo: this.state.MorworkTo,
        EvnworkFrom: this.state.EvnworkFrom,
        EvnworkTo: this.state.EvnworkTo
      }
      
      data = { ...data, id: this.state.id }

      Firebase.database().ref('/Doctors/' + this.state.id).set({
        data
      })
        .then((doc) => {
          this.setState({ showinfo:false,id:null, name: "", Phone_No:"",specialization: "", qualification: "", MorworkFrom: null, MorworkTo: null,EvnworkFrom: null, EvnworkTo: null })

        })
        .catch((error) => {
          console.error(error);
        })
    }

  }
  validateForm() {
    let formIsValid = true;

    if (this.state.name === "" || this.state.name === null) {
      formIsValid = false;
      this.notify("Please enter full name.")
      return
    }
    if (this.state.Phone_No === "" || this.state.Phone_No=== null) {
      formIsValid = false;
      this.notify("Please enter Phone Number .")
      return

    }
    if (this.state.gender === "" || this.state.gender === null) {
      formIsValid = false;
      this.notify("Please enter gender.")
      return
    }
    if (this.state.MorworkFrom === "" || this.state.MorworkFrom === null || this.state.EvnworkFrom === "" || this.state.EvnworkFrom === null) {
      formIsValid = false;
      this.notify("Please enter time(work From).")
      return

    }
    if (this.state.MorworkTo === "" || this.state.MorworkTo === null || this.state.EvnworkTo === "" || this.state.EvnworkTo === null) {
      formIsValid = false;
      this.notify("Please enter time(work To).")
      return
    }
   
  
    if (this.state.specialization === "" || this.state.specialization === null) {
      formIsValid = false;
      this.notify("Please enter specialization of the doctor.")
      return

    }
    if (this.state.qualification === "" || this.state.qualification === null) {
      formIsValid = false;
      this.notify("Please enter qualification of the doctor.")
      return
    }

    return formIsValid;


  }


  render() {
    const data = this.state.data

    return (
      <>
        <Header />
        <CModal 
              show={this.state.showinfo} 
              onClose={() => this.setState({ showinfo:false,id:null, name: "", Phone_No:"",specialization: "", qualification: "", MorworkFrom: null, MorworkTo: null,EvnworkFrom: null, EvnworkTo: null })}
              color="info"
               style={{width:'70vw'}}
              closeOnBackdrop={true}
              size='lg'
              centered={true}
            >
              <CModalHeader closeButton>
              {/* <CIcon size={'lg'} style={{paddingTop:3,}} content={freeSet.cilUser}/> */}
                <CModalTitle> Add Doctor</CModalTitle>
              </CModalHeader>
              <CModalBody>
                <CCardBody>
                   <Loader loaded={!this.state.loading}>
                   <h4>Add Doctor</h4>

<table id='Data' className="table table-hover ">
  <tbody>
    <tr>
    <CFormGroup row>
    <CCol md="2">
    <CLabel htmlFor="name">Dr. Name:</CLabel>
    </CCol>
    <CCol xs="12" md="10">
    <input type="text" className="form-control" id="name" placeholder="Doctor Name" value={this.state.name}
          onChange={e => { this.setState({ name: e.target.value }) }} />
                    <CFormText>Please enter full name</CFormText>
                  </CCol>
    
        
          </CFormGroup>
      
          <CFormGroup row>
    <CCol md="2">
    <CLabel htmlFor="name">Phone No:</CLabel>
    </CCol>
    <CCol xs="12" md="10">
      
      <input type="number" className="form-control" id="Phone_No" placeholder="Phone No." value={this.state.Phone_No}
          onChange={e => { this.setState({ Phone_No: e.target.value }) }} 
          />
          </CCol>
          </CFormGroup>
     

      

        Gender:< br/>

        <CFormGroup variant="custom-radio" inline>
          <CInputRadio defaultValue="male" onChange={e => { this.setState({ gender: e.target.value }) }}
            checked={this.state.gender === "male"}
            custom id="inline-radio1" name="inline-radios" />
          <CLabel variant="custom-checkbox" htmlFor="inline-radio1" >Male</CLabel>
        </CFormGroup>
        <CFormGroup variant="custom-radio" inline>
          <CInputRadio defaultValue="female" onChange={e => { this.setState({ gender: e.target.value }) }}
            checked={this.state.gender === "female"}
            custom id="inline-radio2" name="inline-radios" />
          <CLabel variant="custom-checkbox" htmlFor="inline-radio2">Female</CLabel>
        </CFormGroup>
      
     
      <CFormGroup row>
     
     <CCol md="2">
    <CLabel htmlFor="name"> Morning Working Hours</CLabel>
    </CCol>
    <CCol xs="12" md="10">
        <CInput style={{ backgroundColor: "#fff", color: "#000" }} value={this.state.MorworkFrom} onChange={(e) => this.setState({ MorworkFrom: e.target.value })} type="time" id="" name="time" />
        <CInput style={{ backgroundColor: "#fff", color: "#000" }} value={this.state.MorworkTo} onChange={(e) => this.setState({ MorworkTo: e.target.value })} type="time" id="" name="time" />
</CCol>
</CFormGroup>
<CFormGroup row>
     
     <CCol md="2">
    <CLabel htmlFor="name"> Evening Working Hours</CLabel>
    </CCol>
    <CCol xs="12" md="10">
        <CInput style={{ backgroundColor: "#fff", color: "#000" }} value={this.state.EvnworkFrom} onChange={(e) => this.setState({ EvnworkFrom: e.target.value })} type="time" id="" name="time" />
        <CInput style={{ backgroundColor: "#fff", color: "#000" }} value={this.state.EvnworkTo} onChange={(e) => this.setState({ EvnworkTo: e.target.value })} type="time" id="" name="time" />
</CCol>
</CFormGroup>

<CFormGroup row>
    <CCol md="2">
    <CLabel htmlFor="name">Specialization:</CLabel>
    </CCol>
    <CCol xs="12" md="10">
        <input type="text" className="form-control" id="specialization" placeholder="Specialization" value={this.state.specialization}
          onChange={e => { this.setState({ specialization: e.target.value }) }} />
      
      </CCol>
      </CFormGroup>
      <CFormGroup row>
    <CCol md="2">
    <CLabel htmlFor="name">Qualification:</CLabel>
    </CCol>
    <CCol xs="12" md="10">
        <input type="text" className="form-control" id="qualification" placeholder="qualification" value={this.state.qualification}
          onChange={e => { this.setState({ qualification: e.target.value }) }} />
      </CCol>
      </CFormGroup>
    </tr>
  </tbody>


</table>

                                
                                
<CButton color={'info'} onClick={() => this.addRow()}>ADD</CButton>

                    </Loader>
                   </CCardBody>
              </CModalBody>
              </CModal>
        <CRow>
          <CCol>
            <CCard borderColor="info" style={{ margin: 20 }}>

              <CCardHeader color="info" style={{ textAlign: 'center' }}>
                <span className="h5" style={{ color: "#fff" }} >Doctors</span>

                


              </CCardHeader>
              <CCol className="col-xs-12 col-sm-6 col-md-3 col-lg-3">
              <CButton color="info" onClick={() => this.setState({showinfo:true})} size="lg">Add new Doctor</CButton>
            </CCol>

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
                
                    'morningworkHours':
                      (item, index) => (
                        <td>

                          <CInput style={{ backgroundColor: "#fff", color: "#000" }} value={item.MorworkFrom} readOnly={true} type="time" id="" name="time" />
                          <CInput style={{ backgroundColor: "#fff", color: "#000" }} value={item.MorworkTo} readOnly={true} type="time" id="" name="time" />

                        </td>
                      ),
                      'eveningworkHours':
                      (item, index) => (
                        <td>

                          <CInput style={{ backgroundColor: "#fff", color: "#000" }} value={item.EvnworkFrom} readOnly={true} type="time" id="" name="time" />
                          <CInput style={{ backgroundColor: "#fff", color: "#000" }} value={item.EvnworkTo} readOnly={true} type="time" id="" name="time" />

                        </td>
                      ),
                    'details':
                      (item, index) => {
                        return (
                          <CCollapse show={this.state.details.includes(index)}>
                            <CCardBody>
                              
                                
                               {/* <p className="text-muted">Phone No: {item.Phone_No}</p> */}
                              <CButton size="sm" color={'info'} 
                                onClick={() => {
        
                                  this.setState({
                                    showinfo:true,
                                    name:item.name,
                                    Phone_No:item.Phone_No,
                                    specialization:item.specialization,
                                    gender:item.gender,
                                    qualification:item.qualification,
                                    MorworkFrom:item.MorworkFrom,
                                    MorworkTo:item.MorworkTo,
                                    EvnworkFrom:item.EvnworkFrom,
                                    EvnworkTo:item.EvnworkTo,
                                    id:item.id})
                                  
                                }}
                              >
                                EDIT
                              </CButton>

                              <CButton size="sm" color="danger" className="ml-1"
                                onClick={async() => {
                                  var r = await window.confirm("Table entry of name: " + item.name + " will be deleted");
                                  if (r === true) {
                                    let userRef = Firebase.database().ref('Doctors/' + item.id)
                                    userRef.remove()
                                    console.log(userRef)
                                  }

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
              
                
              
            </CCard>
           
          </CCol>
         
        </CRow>
      </>
    );
  }
}
export default withRouter(Doctors)
