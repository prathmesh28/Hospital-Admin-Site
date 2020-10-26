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
import Infant from './Infacts'
import Pregnancy from './Pregnancy'
import Others from './Others'

export default class Data extends React.Component {
state ={
    Disease:null
}
  
    async componentDidUpdate(){
        let id = await this.props.Userid;
        Firebase.database().ref('/Users/'+id+ '/data/Disease/').once("value",(item) => {
           
            this.setState({ Disease:item.val() })
        })
       
  }



    render(){
//   if (this.state.Disease === 'Infant'){
//       return <Infant/>
//   }else if (this.state.Disease=== 'Pregnancy'){
//     return <Pregnancy/>
// }else {
//    return <Others/>
//}



return <div>hi</div>
}
}
