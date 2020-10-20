import * as React from "react";
import {
    CCol,
    CRow,
    CWidgetIcon,
    CCard,
    CCardHeader,
    CCardBody,
  } from '@coreui/react'
import CIcon from '@coreui/icons-react'
import { freeSet } from '@coreui/icons'
import ReactDOM from "react-dom";
import {
  BrowserRouter as Router,
  Switch,
  Route,
  useParams
} from "react-router-dom";
import { withRouter } from 'react-router-dom'
import Firebase from "../firebase";

class UserData extends React.Component{
  state={
    data:null
  }
  componentDidMount(){
    const id = this.props.match.params.id;
    console.log(id)
    Firebase.database().ref('/Users/'+id).once("value",(item) => {
      // console.log(item.val())
       this.setState({ data:item.val() })
     })
  }
render(){
const data = this.state.data
  return(
    <CRow style={{margin:10}}>
        <CCol xs="12" sm="12" md="4" lg="4">
                      <CCard accentColor="primary">
                        <CCardHeader>
                         <h5> Full Name </h5> 
                        </CCardHeader>
                        <CCardBody>
                          {console.log(data)}
                          <p><b>Dob:</b> 12 34 45</p>
                        </CCardBody>
                      </CCard>
          
        </CCol>
        <CCol xs="12" sm="12" md="8" lg="8">
        <CCard>
            <CCardHeader>
              Card title
            </CCardHeader>
            <CCardBody>
              Lorem ipsum dolor sit amet, consectetuer adipiscing elit, sed diam nonummy nibh euismod tincidunt ut
              laoreet dolore magna aliquam erat volutpat. Ut wisi enim ad minim veniam, quis nostrud exerci tation
              ullamcorper suscipit lobortis nisl ut aliquip ex ea commodo consequat.
            </CCardBody>
          </CCard>
        </CCol>
    </CRow>
  );
}
}
export default  withRouter(UserData)