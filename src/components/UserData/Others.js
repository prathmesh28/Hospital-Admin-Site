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
import FileUploader from "react-firebase-file-uploader";
import { v4 as uuidv4 } from 'uuid';
import {toast} from 'react-toastify';  
import 'react-toastify/dist/ReactToastify.css'; 
toast.configure()

const fields = [
   { key: 'Date', _style: { width: '25%'} },
   { key: 'Report', _style: { width: '20%'} },
   { key: 'Prescription', _style: { width: '20%'} },
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
export default class Others extends React.Component {
  constructor(props) {
    super(props)
    this.state = { 
       history: null,
       Date:new Date(),
       Today:new Date(),
       Report:"",
       Prescription:"",
       Remark:"",
       files:null,

       reportAvatar: "",
       reportIsUploading: false,
       reportProgress: 0,
       reportAvatarURL: "",

       PrescriptionAvatar: "",
       PrescriptionIsUploading: false,
       PrescriptionProgress: 0,
       PrescriptionAvatarURL: "",

      // newid:""

    }
 }
 componentDidMount(){
   id = this.props.id;
   console.log(' check id',this.props)
   Firebase.database().ref('/Users/'+id +'/data/history/').on("value",(item) => {
      console.log('check',id)

      const history = _.map( item.val(), (e) => {
         return e.sethistory
      })
      console.log('data',history)
      this.setState({ history })
   })

   const timer = setInterval(() => { // Creates an interval which will update the current data every minute
      // This will trigger a rerender every component that uses the useDate hook.
      this.setState({Today:new Date()})
      
    }, 1000);
    return () => {
      clearInterval(timer); // Return a funtion to clear the timer so that it will stop being called on unmount
    }
 }

 notify = (e)=>{  
   toast(e)  
 } 

  addRow =async()=> {
     
       let temp = this.state.Date.toLocaleString()



       let NextDate = this.state.Today
       let newtemp = NextDate.toISOString().substr(0, 4) + NextDate.toISOString().substr(5, 2) + NextDate.toISOString().substr(8, 2) + NextDate.toTimeString().substr(0, 2) + NextDate.toTimeString().substr(3, 2) + NextDate.toTimeString().substr(6, 2) 
     //  console.log(newtemp)


      let sethistory = { 
         Date: temp, 
         Report: this.state.Report,
         reportAvatarURL: this.state.reportAvatarURL, 
         Prescription: this.state.Prescription,
         PrescriptionAvatarURL: this.state.PrescriptionAvatarURL, 
         Remark: this.state.Remark 
      }

      //let newid = await uuidv4(sethistory)
      this.setState({ 
        // newid,
         Report:"", 
         Prescription:"",
         Remark:"",
         reportAvatar: "",
         reportIsUploading: false,
         reportProgress: 0,
         reportAvatarURL: "",
         PrescriptionAvatar: "",
         PrescriptionIsUploading: false,
         PrescriptionProgress: 0,
         PrescriptionAvatarURL: "",
       })

      sethistory={...sethistory, newid:newtemp }
     console.log(sethistory)
        Firebase.database().ref('/Users/' + id +'/data/history/'+newtemp).set({
         sethistory
            })
            .then((doc) => {
            this.notify('data added')
            })
            .catch((error) => {
            this.notify(error)
            })
    
}






reportHandleUploadStart = (one) => {
   this.setState({ reportIsUploading: true, reportProgress: 0, Report:one.name })
}
reportHandleProgress = reportProgress => this.setState({ reportProgress });
  reportHandleUploadError = error => {
    this.setState({ reportIsUploading: false });
    console.error(error);
  };
  reportHandleUploadSuccess = filename => {
    this.setState({ reportAvatar: filename, reportProgress: 100, reportIsUploading: false });
    Firebase
      .storage()
      .ref(id+"/report/")
      .child(filename)
      .getDownloadURL()
      .then(url => this.setState({ reportAvatarURL: url }));
  };




  
PrescriptionHandleUploadStart = (one) => {
   this.setState({ PrescriptionIsUploading: true, PrescriptionProgress: 0, Prescription:one.name })
}
PrescriptionHandleProgress = PrescriptionProgress => this.setState({ PrescriptionProgress });
  PrescriptionHandleUploadError = error => {
    this.setState({ PrescriptionIsUploading: false });
    console.error(error);
  };
  PrescriptionHandleUploadSuccess = filename => {
    this.setState({ PrescriptionAvatar: filename, PrescriptionProgress: 100, PrescriptionIsUploading: false });
   
    Firebase
      .storage()
      .ref(id+"/Prescription/")
      .child(filename)
      .getDownloadURL()
      .then(url => this.setState({ PrescriptionAvatarURL: url }));
  };


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
                  ),
                  'Delete':
                     (item, index)=>{
                        return (
                        <td className="py-2">

                           <CButton size="sm" color="danger" className="ml-1"
                              onClick={async()=>{
                                  var r = await window.confirm("Table entry of date: " + item.Date +" will be deleted");
                                 if (r === true) {
                                    let userRef = Firebase.database().ref('Users/' + id +'/data/history/'+item.newid)
                                    userRef.remove()


                                    let imagePathOne = item.reportAvatarURL
                                    let imagePathTwo = item.PrescriptionAvatarURL


                                    _.times(2, (index,item) => {
                                       console.log(index)
                                       let imagePath
                                       index===0?imagePath=imagePathOne:imagePath=imagePathTwo
                                       imagePath = imagePath.replace("%2F","/");
                                       let indexOfEndPath = imagePath.indexOf("?");
                                       imagePath = imagePath.substring(0,indexOfEndPath);
                                       imagePath = imagePath.replace("%2F","/");

                                       let indexPath = imagePath.indexOf("/o/");
                                       imagePath = imagePath.substring(indexPath);
                                       imagePath = imagePath.substring(3);

                                       console.log(imagePath) 
                                       

                                       var storage = Firebase.storage();

                                       var storageRef = storage.ref();

                                       var desertRef = storageRef.child(imagePath);

                                       // Delete the file
                                       desertRef.delete().then(function() {
                                       // File deleted successfully
                                       }).catch(function(error) {
                                          console.log(error)
                                       });

                                      
                                     });

                                    

                                
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
                       
                        {this.state.reportIsUploading && <p>Progress: {this.state.reportProgress}</p>}
                        {this.state.reportAvatarURL && <img alt={"report"} width={50} height={50} src={this.state.reportAvatarURL} />}
                        <FileUploader
                           id="Report"
                           style={{display:'none'}}
                           accept="file_extension"
                           name="reportAvatar"
                           randomizeFilename
                           key={this.state.Report}
                       //    defaultValue={this.state.Report}
                           storageRef={Firebase.storage().ref(id+"/report/")}
                           onUploadStart={this.reportHandleUploadStart}
                           onUploadError={this.reportHandleUploadError}
                           onUploadSuccess={this.reportHandleUploadSuccess}
                           onProgress={this.reportHandleProgress}
                        />
                        <label htmlFor="Report">{this.state.Report===""?"Click to upload":this.state.Report}</label>


                     </td>
                     <td>
                     {this.state.PrescriptionIsUploading && <p>Progress: {this.state.PrescriptionProgress}</p>}
                        {this.state.PrescriptionAvatarURL && <img alt={"Prescription"} width={50} height={50} src={this.state.PrescriptionAvatarURL} />}
                        
                        <FileUploader
                           id="Prescription"
                           style={{display:'none'}}
                           accept="file_extension"
                           name="PrescriptionAvatar"
                           randomizeFilename
                           key={this.state.Prescription}
                      //     defaultValue={this.state.Prescription}
                           storageRef={Firebase.storage().ref(id+"/Prescription/")}
                           onUploadStart={this.PrescriptionHandleUploadStart}
                           onUploadError={this.PrescriptionHandleUploadError}
                           onUploadSuccess={this.PrescriptionHandleUploadSuccess}
                           onProgress={this.PrescriptionHandleProgress}
                        />
                        <label htmlFor="Prescription">{this.state.Prescription===""?"Click to upload":this.state.Prescription}</label>
                     </td>
                     <td>
                     <input type="text" className="form-control" id="Remarks" placeholder="Remarks"
                     value={this.state.Remark} onChange={e => {
                        this.setState({ Remark:e.target.value })
                        console.log(e.target.value)
                        }}/>
                     </td>
                  </tr>
               </tbody>
            </table>


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
