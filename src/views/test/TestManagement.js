import React from 'react'
import { CCard, CCardBody, CCardHeader, CCol, CRow } from '@coreui/react'

const TestManagement = () => {
  return (
    <CRow className="justify-content-center align-items-center min-vh-100">
      <CCol xs={12} md={8} lg={6} xl={5}>
        <CCard className="neon-glow text-center">
          <CCardHeader className="neon-header">
            <h2>Welcome</h2>
          </CCardHeader>
          <CCardBody>
            <p style={{ fontSize: '1.2rem', margin: 0 }}>
              The team is working on the test system.<br />Stay tuned for updates!
            </p>
          </CCardBody>
        </CCard>
      </CCol>
    </CRow>
  )
}

export default TestManagement 