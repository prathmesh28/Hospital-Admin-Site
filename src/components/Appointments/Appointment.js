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
  CInput
} from '@coreui/react'
import { withRouter } from 'react-router-dom'
import Firebase from "../../firebase";
import _ from 'lodash';
import Header from '../Dashboard/Header'
import DatePicker from 'react-date-picker';
import { v4 as uuidv4 } from 'uuid';

import { toast } from 'react-toastify';
import 'react-toastify/dist/ReactToastify.css';
toast.configure()







class Appointment extends React.Component {
 
  render() {

    return (
      <>
        <Header />
        <CRow>
          <CCol>
              hi
          </CCol>
        </CRow>
      </>
    );
  }
}
export default withRouter(Appointment)
