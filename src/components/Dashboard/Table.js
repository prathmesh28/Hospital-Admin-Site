import * as React from "react";
import {
  CButton,
  CCard,
  CCardBody,
  CCardHeader,
  CCol,
  CRow,
  CDataTable,
  CBadge
} from '@coreui/react'
import CIcon from '@coreui/icons-react'
import usersData from './Data'
const fields = ['name','registered', 'role', 'status']
    

const getBadge = status => {
    switch (status) {
    case 'Active': return 'success'
    case 'Inactive': return 'secondary'
    case 'Pending': return 'warning'
    case 'Banned': return 'danger'
    default: return 'primary'
    }
}

export default function Dashboard() {
    
  return  (
    <>
    
      <CRow>
      <CCol xs="12" lg="12">
          <CCard>
            <CCardHeader>
              Users
            </CCardHeader>
            <CCardBody>
            <CDataTable
              items={usersData}
              fields={fields}
              bordered
              itemsPerPage={5}
              pagination
              scopedSlots = {{
                'status':
                  (item)=>(
                    <td>
                      <CBadge color={getBadge(item.status)}>
                        {item.status}
                      </CBadge>
                    </td>
                  )

              }}
            />
            </CCardBody>
          </CCard>
        </CCol>

      </CRow>
    </>
  
  )
}
