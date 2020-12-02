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





const fields = [
  { key: 'name', _style: { width: '20%' } },
  'registered',
  { key: 'gender', _style: { width: '10%' } },
  { key: 'workHours', _style: { width: '20%' } },
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
    details: [],
    data: null,
    name: "",
    specialization: "",
    registered: new Date(),
    qualification: "",
    id: "",
    gender: "",
    workFrom: null,
    workTo: null

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
      console.log(this.state.name)
      console.log(this.state.registered.toLocaleString())
      let data = {
        name: this.state.name,
        registered: this.state.registered.toLocaleString(),
        specialization: this.state.specialization,
        gender: this.state.gender,
        qualification: this.state.qualification,
        workFrom: this.state.workFrom,
        workTo: this.state.workTo
      }
      let id = await uuidv4(data)
      this.setState({ id, name: "", specialization: "", qualification: "", workFrom: null, workTo: null })
      data = { ...data, id: this.state.id }

      Firebase.database().ref('/Doctors/' + id).set({
        data
      })
        .then((doc) => {
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
    if (this.state.registered === "" || this.state.registered === null) {
      formIsValid = false;
      this.notify("Please enter Date of register.")
      return

    }
    if (this.state.gender === "" || this.state.gender === null) {
      formIsValid = false;
      this.notify("Please enter gender.")
      return
    }
    if (this.state.workFrom === "" || this.state.workFrom === null) {
      formIsValid = false;
      this.notify("Please enter time(work From).")
      return

    }
    if (this.state.workTo === "" || this.state.workTo === null) {
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
        <CRow>
          <CCol>
            <CCard borderColor="info" style={{ margin: 20 }}>

              <CCardHeader color="info" style={{ textAlign: 'center' }}>
                <span className="h5" style={{ color: "#fff" }} >Doctors</span>


              </CCardHeader>


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
                    'registered':
                      (item, index) => (
                        <td>


                          <DatePicker
                            value={item.registered}
                            format="dd-MM-y"
                            disabled={true}
                          />
                        </td>
                      ),
                    'workHours':
                      (item, index) => (
                        <td>

                          <CInput style={{ backgroundColor: "#fff", color: "#000" }} value={item.workFrom} readOnly={true} type="time" id="" name="time" />
                          <CInput style={{ backgroundColor: "#fff", color: "#000" }} value={item.workTo} readOnly={true} type="time" id="" name="time" />

                        </td>
                      ),
                    'details':
                      (item, index) => {
                        return (
                          <CCollapse show={this.state.details.includes(index)}>
                            <CCardBody>

                              <p className="text-muted">User since: {item.registered}</p>

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
              <CCardFooter>
                <h4>Add Doctor</h4>

                <table id='Data' className="table table-hover ">
                  <tbody>
                    <tr>
                      <td>
                        <input type="text" className="form-control" id="name" placeholder="Doctor Name" value={this.state.name}
                          onChange={e => { this.setState({ name: e.target.value }) }} />
                      </td>

                      <td>
                        Date Joined<br />
                        <DatePicker
                          value={this.state.registered}
                          format="dd-MM-y"
                          onChange={(value) => this.setState({ registered: value })}
                        />
                      </td>

                      <td>
                        Gender:<br />

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

                      </td>
                      <td>
                        <CInput style={{ backgroundColor: "#fff", color: "#000" }} value={this.state.workFrom} onChange={(e) => this.setState({ workFrom: e.target.value })} type="time" id="" name="time" />
                        <CInput style={{ backgroundColor: "#fff", color: "#000" }} value={this.state.workTo} onChange={(e) => this.setState({ workTo: e.target.value })} type="time" id="" name="time" />

                      </td>
                      <td>
                        <input type="text" className="form-control" id="specialization" placeholder="Specialization" value={this.state.specialization}
                          onChange={e => { this.setState({ specialization: e.target.value }) }} />
                      </td>
                      <td>
                        <input type="text" className="form-control" id="qualification" placeholder="qualification" value={this.state.qualification}
                          onChange={e => { this.setState({ qualification: e.target.value }) }} />
                      </td>
                    </tr>
                  </tbody>


                </table>
                <CButton color={'info'} onClick={() => this.addRow()}>ADD</CButton>

              </CCardFooter>
            </CCard>
          </CCol>
        </CRow>
      </>
    );
  }
}
export default withRouter(Doctors)
