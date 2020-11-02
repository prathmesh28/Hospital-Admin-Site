import * as React from "react";
import {
    CButton,
    CCard,
    CCardHeader,
    CCardBody,
    CCardFooter,
    CCol,
    CDataTable,
    CRow,
  } from '@coreui/react'
import _ from 'lodash';
import Firebase from '../../firebase'
import DatePicker from 'react-date-picker';
import { v4 as uuidv4 } from 'uuid';
const fields = [
  { key: 'Date', _style: { width: '25%'} },
  { key: 'Weight', _style: { width: '20%'} },
  { key: 'BP', _style: { width: '20%'} },
  { key: 'Remark', _style: { width: '35%'} },
  {
   key: 'Delete',
   label: '',
   _style: { width: '1%' },
   sorter: false,
   filter: false
 }
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
       newid:""
    }
 }
 componentDidMount(){
   id = this.props.id;
   console.log('pre',id)
   Firebase.database().ref('/Users/'+id +'/data/history/').on("value",(item) => {

   const history = _.map( item.val(), (e) => {
      return e.sethistory
   })
   console.log('data',history)
   this.setState({ history })
})


 }




addRow =async()=> {
     
 
     let temp = this.state.Date.toLocaleString()
     let sethistory = { 
        Date: temp, 
        Weight: this.state.Weight, 
        BP: this.state.BP, 
        Remark: this.state.Remark 
      }
     

     let newid = await uuidv4(sethistory)

     this.setState({ Weight:"", BP:"", Remark:"",newid })

     sethistory={...sethistory, newid:this.state.newid }
      console.log(sethistory)
        Firebase.database().ref('/Users/' + id +'/data/history/'+newid).set({
         sethistory
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
                  ),
                  'Delete':
                     (item, index)=>{
                        return (
                        <td className="py-2">

                           <CButton size="sm" color="danger" className="ml-1"
                              onClick={async()=>{

                              // console.log(index)
                                 var r = await window.confirm("Table entry of date: " + item.Date +" will be deleted");
                                 if (r == true) {
                                    let userRef = Firebase.database().ref('Users/' + id +'/data/history/'+item.newid)
                                    userRef.remove()
                                 } else {
                                  
                                 }



                              }}>
                              Delete
                              </CButton>
                        </td>
                        )
                     },

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
                        <input type="text" class="form-control" id="Weight"  placeholder="Weight"
                        value={this.state.Weight} onChange={e => {this.setState({ Weight:e.target.value })}}/>
                     </td>
                     <td>
                        <input type="text" class="form-control" id="BP" placeholder="BP"
                        value={this.state.BP} onChange={e => {this.setState({ BP:e.target.value })}}/>
                     </td>
                     <td>
                     <input type="text" class="form-control" id="Remarks" placeholder="Remarks"
                     value={this.state.Remark} onChange={e => {this.setState({ Remark:e.target.value })}}/>
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
