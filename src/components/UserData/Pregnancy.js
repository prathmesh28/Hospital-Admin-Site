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
    CDataTable,
    CRow,
  } from '@coreui/react'
import _ from 'lodash';
import Firebase from '../../firebase'
import DatePicker from 'react-date-picker';

const fields = [
  { key: 'Date', _style: { width: '25%'} },
  { key: 'Weight', _style: { width: '20%'} },
  { key: 'BP', _style: { width: '20%'} },
  { key: 'Remark', _style: { width: '35%'} }
]
let id
export default class Pregnancy extends React.Component {

  constructor(props) {
    super(props)
    this.state = { 
       history: null,
       Date:new Date(),
       Weight:"",
       BP:"",
       Remark:"",
    }
 }
 componentDidUpdate(previousProps, previousState) {
   if (previousProps.id !== this.props.id) {
         id = this.props.id;
   console.log(id)
         Firebase.database().ref('/Users/'+id).on("value",(item) => {
   console.log('data',item.val())
      this.setState({ 
        history: item.val().data['history']
     })
    })
      }
}



addRow =()=> {
     
  if (this.state.history=== undefined||this.state.history===null){
     let temp = this.state.Date.toLocaleString()
     let history = [{ Date: temp, Weight: this.state.Weight, BP: this.state.BP, Remark: this.state.Remark }]
     console.log("null",history)
     this.setState({ history:history,Weight:"",BP:"",Remark:"" })

        Firebase.database().ref('/Users/' + id +'/data/').update({
           history
           })
           .then((doc) => {
           //  this.setState({message:'User Added'})
        //   this.notify('user added')
           console.log(doc)
           //window.location.reload()
           })
           .catch((error) => {
         //  this.notify(error)
           console.error(error);
           })

  }else{
     var history = this.state.history
     console.log(this.state.history)
     history.push({ Date: this.state.Date, Weight: this.state.Weight, BP: this.state.BP, Remark: this.state.Remark })
     console.log(history)
     this.setState({history: history,Weight:"",BP:"",Remark:""})


    Firebase.database().ref('/Users/' + id +'/data/').update({
     history
     })
     .then((doc) => {
     //  this.setState({message:'User Added'})
  //   this.notify('user added')
     console.log(doc)
     //window.location.reload()
     })
     .catch((error) => {
   //  this.notify(error)
     console.error(error);
     })

  }
   
}



    render(){
  return  (
    <CRow>
          <CCol>
          <CCard borderColor="info">

        <CCardHeader color="info" style={{textAlign:'center'}}>
        <span className="h5" style={{color:"#fff"}} >Pregnancy Doctor visit</span>


        </CCardHeader>
        <CCardBody>



        <CDataTable
              items={this.state.history}
              fields={fields}
              itemsPerPage={5}
              pagination
              scopedSlots = {{
                'Date':
                (item, index)=>(
                    <td>
                      
                     
                      <DatePicker
                           value={item.Date}
                           format="dd-MM-y"
                           disabled={true}
                        //   onChange={item.Date}
                     />
                    </td>
                  )

              }}
            />
    
                <table id='Data' className="table table-hover ">
               <tbody>
                  <tr>
                     <td>
                     <DatePicker
                           value={this.state.Date}
                           format="dd-MM-y"
                           
                           onChange={(value) => this.setState({Date:value})}
                     />
                     </td>
                     <td>
                        <input type="text" class="form-control" id="report" 
                        defaultValue={this.state.Weight} onChange={e => {this.setState({ Weight:e.target.value })}}/>
                     </td>
                     <td>
                        <input type="text" class="form-control" id="BP"
                        defaultValue={this.state.BP} onChange={e => {this.setState({ BP:e.target.value })}}/>
                     </td>
                     <td>
                     <input type="text" class="form-control" id="Remarks" placeholder="Remarks"
                     defaultValue={this.state.Remark} onChange={e => {this.setState({ Remark:e.target.value })}}/>
                     </td>
                  </tr>
               </tbody>
            </table>




        </CCardBody>
        <CCardFooter>
        <CButton color="info" onClick={()=>this.addRow()}>Add</CButton>

        </CCardFooter>
        </CCard>
  </CCol>
  
  </CRow>
  )
}
}
