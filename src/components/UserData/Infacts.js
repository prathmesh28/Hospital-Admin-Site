import * as React from "react";
import {
    CButton,
    CCard,
    CCardHeader,
    CCardBody,
    CCardFooter,
    CCol,
    CForm,
    CFormGroup,
    CFormText,
    CTextarea,
    CInput,
    CInputRadio,
    CLabel,
    CSelect,
    CRow,
  } from '@coreui/react'
import _ from 'lodash';
import Firebase from '../../firebase'
let weight={
    jan:1,
    feb:null,
    mar:null,
    apr:null,
    may:null,
    jun:null,
    jul:null,
    aug:null,
    sep:null,
    oct:null,
    nov:null,
    dec:null
}
let height={
    jan:null,
    feb:null,
    mar:null,
    apr:null,
    may:null,
    jun:null,
    jul:null,
    aug:null,
    sep:null,
    oct:null,
    nov:null,
    dec:null
}
let remarks={
    jan:null,
    feb:null,
    mar:null,
    apr:null,
    may:null,
    jun:null,
    jul:null,
    aug:null,
    sep:null,
    oct:null,
    nov:null,
    dec:null
}
export default class Infant extends React.Component {

    state={
        height:height,
        weight:weight,
        remarks:remarks
    }
  componentDidMount(){
   
  }

  handleChange = (e,index,name,val) => {
    
     
     
  }
//this working
//   Done=async()=>{
//       console.log('hi')
//       console.log(this.props.Userid)
//       let id = await this.props.Userid
//       Firebase.database().ref('/Users/' + id + '/data/').update({
//        height,weight,remarks
//         })
//         .then((doc) => {
//        console.log('done')
//         })
//         .catch((error) => {
//         //this.notify(error)
//         console.error(error);
//         })
//   }
    render(){
  return  (
      <CRow>
          <CCol>
          <CCard borderColor="info">

        <CCardHeader color="info" style={{textAlign:'center'}}>
        <span className="h5" style={{color:"#fff"}} >One year baby growth chart</span>


        </CCardHeader>

        <CCardBody>
          <div class="table-responsive">
            <table className="table table-hover ">
            <thead>
            <tr>
                <th scope="col">Month</th>
                <th scope="col">Jan</th>
                <th scope="col">Feb</th>
                <th scope="col">Mar</th>
                <th scope="col">Apr</th>
                <th scope="col">May</th>
                <th scope="col">June</th>
                <th scope="col">July</th>
                <th scope="col">Aug</th>
                <th scope="col">Spt</th>
                <th scope="col">Oct</th>
                <th scope="col">Nov</th>
                <th scope="col">Dec</th>
            </tr>
            </thead>
            <tbody>
            <tr>
                <th scope="row">Weight</th>
                
                {_.map( this.state.weight, (e,index) => {
                    return (<td>
                        <input 
                            onChange={(itm) => this.handleChange(e,index, itm.target.value)} 
                            type='text' 
                            className='form-control' 
                            step='1' min="1"
                            value={e}
                        />
                        </td>)})}
            </tr>
            <tr>
                <th scope="row">Height</th>
                
                {_.map( height, (e) => {
                    return (<td>
                        <input 
                            //onChange={(e) => this.handleChange(index, 'qty', e.target.value)} 
                            type='text' 
                            className='form-control' 
                            step='1' min="1"
                            value={e}
                        />
                        </td>)})}
                
            </tr>
            <tr>
                <th scope="row">Remarks</th>
                
                {_.map( remarks, (e) => {
                    return (<td>
                        <input 
                            //onChange={(e) => this.handleChange(index, 'qty', e.target.value)} 
                            type='text' 
                            className='form-control' 
                            step='1' min="1"
                            value={e}
                        />
                        </td>)})}
                
            </tr>
            </tbody>
        </table>
        </div>
        </CCardBody>
        <CCardFooter>
        <CButton color="info" onClick={this.Done}>submit</CButton>

        </CCardFooter>
        </CCard>
  </CCol>
  
  </CRow>
  )
}
}
