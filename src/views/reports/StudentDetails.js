import React from 'react'
import { CCard, CCardBody, CCardHeader, CCol, CRow } from '@coreui/react'

const StudentDetails = () => {
  return (
    <CRow className="justify-content-center">
      <CCol xs={12} sm={10} md={8} lg={6}>
        <CCard className="mb-6 neon-glow">
          <CCardHeader className="neon-header">
            <strong>Student Details</strong>
          </CCardHeader>
          <CCardBody>
            <h2 className="text-center">Welcome</h2>
          </CCardBody>
        </CCard>
      </CCol>
    </CRow>
  )
}

export default StudentDetails 