import * as React from "react";
import {
    CCol,
    CRow,
    CCard,
    CCardHeader,
    CCardBody,
    CButton,
    CModal,
    CModalHeader,
    CModalTitle,
    CModalBody,
    CModalFooter,
    CForm,
    CFormGroup,
    CLabel,
    CInput,
    CTextarea,
    CSelect
  } from '@coreui/react'
import CIcon from '@coreui/icons-react'
import { freeSet } from '@coreui/icons'
import Paediatric from './Paediatric'
import Pregnancy from './Pregnancy'
import Others from './Others'
import { withRouter } from 'react-router-dom'
import Firebase from "../../firebase";
import _ from 'lodash';
import DateTimePicker from 'react-datetime-picker'
import Header from '../Dashboard/Header'
import Loader from 'react-loader';
import {toast} from 'react-toastify';  
import 'react-toastify/dist/ReactToastify.css'; 
toast.configure()

let id
class UserData extends React.Component{
  state={
    data:{},
    edit:false,
    nextEdit:false, //appointment edit
    diseaseEdit:false,
    Disease:'',
    Doctor:'',
    Name:'',
    Dob:'',
    Phone:'',
    Address:'',
    id:null,
    loading:false,
    Date:null,
    remark:'check',
    doctors:null  //doctor list
  }
  componentDidMount(){
    this.setState({loading:true})
    id = this.props.match.params.id;
    console.log('userdata',id)
    this.setState({id})
    Firebase.database().ref('/Users/'+id).on("value",(item) => {
   
       this.setState({ 
         data:item.val(), 
         Name: item.val().data['Name'], 
         Dob: item.val().data['Dob'], 
         Phone: item.val().data['Phone'],  
         Address: item.val().data['Address'], 
         Disease: item.val().data['Disease'], 
         Doctor: item.val().data['Doctor'],
         Date: item.val().data['NextDate'],
         remark: item.val().data['remark'], 
      })
     })

     Firebase.database().ref('/Doctors/').on("value",(item) => {
      const doctors = _.map( item.val(), (e) => {
        return e.data.name 
      })

      this.setState({ doctors })
    })


     setTimeout(() => {
      this.setState({loading:false})
     }, 3000);
     

  }

  formSubmit = () => {
    this.setState({loading:true})
    if (this.validateForm(0)) {
               Firebase.database().ref('/Users/' + id + '/data/' ).update({
                         Name:this.state.Name,
                         Dob:this.state.Dob,
                         Phone:this.state.Phone,
                         Address:this.state.Address
               })
               .then((doc) => {
               //  this.setState({message:'User Added'})
                 this.notify('user Details Updated')
               //  window.location.reload()
               this.setState({edit:false})
               
               })
               .catch((error) => {
                 this.notify(error)
                 console.error(error);
               })
              } 
              
              setTimeout(() => {
                this.setState({loading:false})
               }, 3000);
       }

       validateForm() {
        let formIsValid = true;

       
        if (this.state.Name=== "" || this.state.Name=== null || this.state.Name=== undefined) {
          formIsValid = false;
          this.notify("Please enter name.")
         
        }
      
        return formIsValid;
        

      }


       notify = (e)=>{  
        toast(e)  
      } 

      submitDisease=()=>{
        this.setState({loading:true})

        Firebase.database().ref('/Users/' + id + '/data/' ).update({
          Disease:this.state.Disease
         
          })
          .then((doc) => {
          //  this.setState({message:'User Added'})
            this.notify('Updated')
            this.setState({diseaseEdit:false})
            setTimeout(() => {
              this.setState({loading:false})
             }, 3000);
          })
          .catch((error) => {
            this.notify(error)
            this.setState({diseaseEdit:false})
            console.error(error);
            setTimeout(() => {
              this.setState({loading:false})
             }, 3000);
          })
      }

      submitDate=()=>{
        this.setState({loading:true})

        console.log(this.state.Date)
        let temp = this.state.Date
        if(temp!==null || temp !== undefined)
        {
          Firebase.database().ref('/Users/' + id + '/data/' ).update({
            
            NextDate:temp,
            remark:this.state.remark
           
            })
            .then((doc) => {
            //  this.setState({message:'User Added'})
              this.notify('Updated')
              this.setState({nextEdit:false})
              setTimeout(() => {
                this.setState({loading:false})
               }, 3000);
            })
            .catch((error) => {
              this.notify(error)
              this.setState({nextEdit:false})
              console.error(error);
              setTimeout(() => {
                this.setState({loading:false})
               }, 3000);
            })

        }else{
          this.notify('enter Date')
          setTimeout(() => {
            this.setState({loading:false})
           }, 3000);
        }
       
      }



  render(){
    const data = this.state.data
    const Disease = this.state.Disease
    const Doctor = this.state.Doctor
    const doctors=this.state.doctors //doctor list



    //for patient type categeries
    let renderData
    if (this.state.Disease === 'Paediatric'){
      renderData= <Paediatric id={id}/>
    }
    else if (this.state.Disease === 'Pregnancy'){
      renderData= <Pregnancy id={this.state.id}/>
    }
    else{
      renderData= <Others id={this.state.id}/>
    }
    
    return(
      <>
      <Header/>
      <Loader loaded={!this.state.loading}>

        {/* user Details section */}
      <CRow style={{margin:10}}>
        <CCol xs="12" sm="12" md="12" lg="3">
          <CCard accentColor="info">
            <CCardHeader>
              <div className="float-left">
                <h5> User Details </h5> 
              </div>
              
              <div  className="float-right">
                <CButton color="primary" size={'sm'} onClick={() => this.setState({edit:true})}>
                  <CIcon content={freeSet.cilPencil}/>
                </CButton>
              </div>
            </CCardHeader>
            {
              _.map( data, (e,index) => {
                return (
                  <>
                  <CCardBody >
                 
                    <p style={{fontSize:15,lineHeight:2,letterSpacing:1}}><b >Name: </b> {e.Name}<br/>
                    <b>Gender: </b> {e.Gender}<br/>
                    <b>Dob.: </b> {e.Dob}<br/>
                    <b>Address: </b> {e.Address}<br/>
                    <b>Phone: </b> {e.Phone}<br/>
                    <b>Email: </b> {e.Email}<br/>
                    <b>Date Registered: </b> {e.Date}</p>
                  </CCardBody>
                  </>
                )
              })
            }
          </CCard>



         

{/* edit user Details */}
          <CModal 
              show={this.state.edit} 
              onClose={() => this.setState({edit:false})}
              color="info"
              closeOnBackdrop={false}
            >
            <CModalHeader closeButton>
              <CIcon size={'lg'} style={{paddingTop:3,}} content={freeSet.cilUser}/>
              <CModalTitle> User Form</CModalTitle>
            </CModalHeader>
            <CModalBody>
              <CForm className="form-horizontal">
                <CFormGroup row>
                  <CCol md="3">
                    <CLabel htmlFor="name">Full name:</CLabel>
                  </CCol>
                  <CCol xs="12" md="9">
                    <CInput id="name" name="text-input" defaultValue={this.state.Name} onChange={e => {this.setState({ Name:e.target.value })}} placeholder="Enter Full Name" required/>
                  </CCol>
                </CFormGroup>

                <CFormGroup row>
                  <CCol md="3">
                    <CLabel htmlFor="date-input">Date of birth:</CLabel>
                  </CCol>
                  <CCol xs="12" md="9">
                    <CInput defaultValue={this.state.Dob} onChange={e => {this.setState({ Dob:e.target.value })}} type="date" id="date-input" name="date-input" placeholder="date" required/>
                  </CCol>
                </CFormGroup>

                <CFormGroup row>
                  <CCol md="3">
                    <CLabel htmlFor="number">Phone No.:</CLabel>
                  </CCol>
                  <CCol xs="12" md="9">
                    <CInput defaultValue={this.state.Phone} onChange={e => {this.setState({ Phone:e.target.value })}} type="tel" id="number" placeholder="9876543210" required />
                  </CCol>
                </CFormGroup>

                <CFormGroup row>
                  <CCol md="3">
                    <CLabel htmlFor="textarea-input">Address:</CLabel>
                  </CCol>
                  <CCol xs="12" md="9">
                    <CTextarea 
                      defaultValue={this.state.Address} onChange={e => {this.setState({ Address:e.target.value })}}
                      name="textarea-input" 
                      id="textarea-input" 
                      rows="9"
                      placeholder="User Address..." 
                      required
                    />
                  </CCol>
                </CFormGroup>

              </CForm>
            </CModalBody>
            <CModalFooter>
                <CButton onClick={this.formSubmit} size="md" color="primary" > Submit</CButton>
              <CButton color="secondary" onClick={() => this.setState({edit:false})}>Cancel</CButton>
            </CModalFooter>
          </CModal>
        </CCol>


{/* next appointment section */}
        <CCol xs="12" sm="12" md="12" lg="9">
        <CCard accentColor="info">
            <CCardHeader  style={{textAlign:'center'}}>
            <div className="float-left">
                <h5> Schedule next appointment </h5> 
              </div>
              
              <div  className="float-right">
                <CButton color="primary" size={'sm'} onClick={() => this.setState({nextEdit:true})}>
                  <CIcon content={freeSet.cilPencil}/>
                </CButton>
              </div>
              
            </CCardHeader>
            <CModalBody>

              {this.state.Date===null ||this.state.Date===undefined?<div>No appointment set</div>:
              <CRow>
                <CCol md="5">
                  <CRow>
                    <CCol md="2" style={{justifyContent:"center"}}>
                      <CLabel  style={{fontSize:16,color:'#000'}}>Date:</CLabel>
                    </CCol>
                    <CCol xs="12" md="10">
                      
                    <CInput style={{backgroundColor:"#fff",color:"#000",fontSize:14}} value={this.state.Date} type="datetime-local" id="date-input" name="date-input" readOnly={true}/>
                    </CCol>
                  </CRow>
                  
                </CCol>
                <CCol xs="12" md="7">
                <CRow>
                    <CCol md="2">
                      <CLabel htmlFor="remarks">Remarks:</CLabel>
                    </CCol>
                    <CCol xs="12" md="10">
                    <p id="remarks" class="border" style={{borderRadius:5,fontSize:16,paddingInlineStart:10,paddingInlineEnd:10}} >{this.state.remark}</p>   
                    </CCol>
                  </CRow>
                       

                </CCol>
              
              </CRow>}
              </CModalBody>


          </CCard>
{/* edit next appointment */}
          <CModal 
              show={this.state.nextEdit} 
              onClose={() => this.setState({nextEdit:false})}
              color="info"
              closeOnBackdrop={false}
            >
            <CModalHeader closeButton>
              <CIcon size={'lg'} style={{paddingTop:3,}} content={freeSet.cilUser}/>
              <CModalTitle> Next Visit</CModalTitle>
            </CModalHeader>
            <CModalBody>
              <CForm className="form-horizontal">

              <CFormGroup row>
                  <CCol md="3">
                    <CLabel htmlFor="date-input">Date :</CLabel>
                  </CCol>
                  <CCol xs="12" md="9">
                  
                  <CInput defaultValue={this.state.Date} type="datetime-local" id="date-input" name="date-input"  min={new Date()} onChange={(e) => this.setState({Date:e.target.value})} required/>
                 
                  </CCol>
                </CFormGroup>


                <CFormGroup row>
                  <CCol md="3">
                    <CLabel htmlFor="name">Remarks:</CLabel>
                  </CCol>
                  <CCol xs="12" md="9">
                  <CTextarea defaultValue={this.state.remark} onChange={e => {this.setState({ remark:e.target.value })}} id="remark" name="text-input" placeholder="" required />
                  </CCol>
                </CFormGroup>

                
             
              </CForm>
            </CModalBody>
            <CModalFooter>
                <CButton size="md" color="primary" onClick={()=>{this.submitDate()}}> Submit</CButton>
              <CButton color="secondary" onClick={() => this.setState({nextEdit:false})}>Cancel</CButton>
            </CModalFooter>
          </CModal>


{/* patient type chart */}

            <CModal 
              show={this.state.diseaseEdit} 
              onClose={() => this.setState({diseaseEdit:false})}
              color="info"
              closeOnBackdrop={false}
            >
            <CModalHeader closeButton>
              <CIcon size={'lg'} style={{paddingTop:3,}} content={freeSet.cilUser}/>
              <CModalTitle> Edit Details</CModalTitle>
            </CModalHeader>
            <CModalBody>
              <CForm className="form-horizontal">

              


              <CFormGroup row>
                  <CCol md="3">
                    <CLabel htmlFor="select">Doctor:</CLabel>
                  </CCol>
                  {doctors?
                  <CCol xs="12" md="9">
                    <CSelect defaultValue={this.state.Doctor} onChange={e => {this.setState({ Doctor:e.target.value })}} 
                      custom name="select" id="Doctor select">
                        <option >Please select Doctor</option>
                      {doctors.map((x,y) => <option key={y} value={x}>{x}</option>)}
                    </CSelect>
                  </CCol>:<CCol xs="12" md="9">No Doctor Found</CCol>}
                </CFormGroup>

                
             
              </CForm>
            </CModalBody>
            <CModalFooter>
                <CButton size="md" color="primary" onClick={()=>{this.submitDisease()}}> 
                  Submit
                </CButton>
              <CButton color="secondary" onClick={() => this.setState({diseaseEdit:false})}>Cancel</CButton>
            </CModalFooter>
          </CModal>


          <CCard accentColor="info">
            <CCardHeader>
             <div className="float-left">
                <h5> Patient Type: &nbsp;{Disease} </h5> 
              </div>

             
              
              <div style={{display:'flex',flexDirection:"row"}} className="float-right">
               <h5 style={{marginInlineEnd:20}}> {Doctor} </h5>

                <CButton color="primary" size={'sm'} onClick={() => this.setState({diseaseEdit:true})}>
                  <CIcon content={freeSet.cilPencil}/>
                </CButton>
              </div>
            </CCardHeader>
            <CCardBody>

            {renderData}
              
                {/* <Data Userid={id} Disease={Disease}/> */}
                
            </CCardBody>
          </CCard>
        </CCol>
    </CRow>
    </Loader>
    </>
  );
}
}
export default  withRouter(UserData)