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
const fields = ['Date','Report', 'Prescription', 'Remark']
let id
export default class Others extends React.Component {
  constructor(props) {
    super(props)
    this.state = { 
       history: null,
       Date:new Date(),
       Report:"",
       Prescription:"",
       Remark:"",
       files:null
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

handleChange=(files)=>{
   this.setState({
      files:files
   })
}

handleSave=()=>{
   let bucketName = 'images'
   let file = this.state.files[0] //adding 1 file
 //  var ref = firebase.storage().ref().child(uid+ '/' + imageName)
   let storageRef = Firebase.storage().ref(`${bucketName}/${file.name}`)
   let uploadTask = storageRef.put(file)
   uploadTask.on(Firebase.storage.TaskEvent.STATE_CHANGED,
      ()=>{
         let downloadURL = uploadTask.snapshot.downloadURL
         console.log('check',downloadURL)
      })
}

showImage=()=>{
   let storageRef = Firebase.storage().ref()
   let spaceRef = storageRef.child('images/'+this.state.files[0].name)
   storageRef.child('images/'+this.state.files[0].name).getDownloadURL().then((url)=>{
      console.log(url)
      document.getElementById('new-img').src=url
   })
}

  addRow =()=> {
     
   if (this.state.history=== undefined||this.state.history===null){
      let temp = this.state.Date.toLocaleString()
      let history = [{ Date: temp, Report: this.state.Report, Prescription: this.state.Prescription, Remark: this.state.Remark }]
      console.log("null",history)
      this.setState({ history:history,Report:"",Prescription:"",Remark:"" })

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
      history.push({ Date: this.state.Date, Report: this.state.Report, Prescription: this.state.Prescription, Remark: this.state.Remark })
      console.log(history)
      this.setState({history: history,Report:"",Prescription:"",Remark:""})


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
          <div>
          <CCard borderColor="info">

<CCardHeader color="info" style={{textAlign:'center'}}>
<span className="h5" style={{color:"#fff"}} >Patient chart</span>


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
                        <input type="file" class="form-control-file" id="file1" 
                       // defaultValue={this.state.Report} 
                        onChange={(e)=>{this.handleChange(e.target.files)}}/>
                     </td>
                     <td>
                        <input type="file" class="form-control-file" id="file2"
                        defaultValue={this.state.Prescription} onChange={e => {this.setState({ Prescription:e.target.value })}}/>
                     </td>
                     <td>
                     <input type="text" class="form-control" id="Remarks" placeholder="Remarks"
                     defaultValue={this.state.Remark} onChange={e => {
                        this.setState({ Remark:e.target.value })
                        console.log(e.target.value)
                        }}/>
                     </td>
                  </tr>
               </tbody>
            </table>

      //      use import FileUploader from "react-firebase-file-uploader";
{/* <button onClick={this.handleSave}>Save</button>
<button onClick={this.showImage}>show</button>
<img id="new-img"/> */}
            </CCardBody>
<CCardFooter>
<CButton color="info" onClick={()=>this.addRow()}>Add</CButton>

</CCardFooter>
        </CCard>
        </div>
  </CCol>
  
  </CRow>
  )
}
}
