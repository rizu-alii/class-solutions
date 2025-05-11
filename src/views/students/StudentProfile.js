import React from 'react'
import { useParams, useNavigate } from 'react-router-dom'
import { CCard, CCardBody, CCardHeader, CButton, CRow, CCol } from '@coreui/react'

const dummyStudents = [
  { id: 1, name: 'Ali Raza', rollNo: '101', class: '5', section: 'A', fatherName: 'Raza Ahmed', phone: '03001234567' },
  { id: 2, name: 'Sara Khan', rollNo: '102', class: '6', section: 'B', fatherName: 'Khan Ahmed', phone: '03007654321' },
  { id: 3, name: 'Ahmed Iqbal', rollNo: '103', class: '7', section: 'C', fatherName: 'Iqbal Hussain', phone: '03009876543' },
]

const StudentProfile = () => {
  const { id } = useParams()
  const navigate = useNavigate()
  const student = dummyStudents.find(s => s.id === Number(id))

  if (!student) {
    return <div className="text-danger">Student not found.</div>
  }

  return (
    <CRow className="justify-content-center">
      <CCol xs={12} md={8} lg={6}>
        <CCard className="neon-glow">
          <CCardHeader className="neon-header"><strong>Student Profile</strong></CCardHeader>
          <CCardBody>
            <div className="mb-3"><b>Name:</b> {student.name}</div>
            <div className="mb-3"><b>Roll Number:</b> {student.rollNo}</div>
            <div className="mb-3"><b>Class:</b> {student.class}</div>
            <div className="mb-3"><b>Section:</b> {student.section}</div>
            <div className="mb-3"><b>Father Name:</b> {student.fatherName}</div>
            <div className="mb-3"><b>Phone Number:</b> {student.phone}</div>
            <CButton color="secondary" onClick={() => navigate(-1)}>Back</CButton>
          </CCardBody>
        </CCard>
      </CCol>
    </CRow>
  )
}

export default StudentProfile