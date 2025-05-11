import React from 'react'
import { CCard, CCardBody, CCardHeader, CTable, CTableHead, CTableRow, CTableHeaderCell, CTableBody, CTableDataCell, CButton } from '@coreui/react'
import { useNavigate } from 'react-router-dom'

const dummyStudents = [
  { id: 1, name: 'Ali Raza', rollNo: '101', class: '5', section: 'A', attendance: 'Absent' },
  { id: 2, name: 'Sara Khan', rollNo: '102', class: '6', section: 'B', attendance: 'Absent' },
  { id: 3, name: 'Ahmed Iqbal', rollNo: '103', class: '7', section: 'C', attendance: 'Absent' },
]

const AbsentYesterday = () => {
  const navigate = useNavigate()
  return (
    <CCard className="neon-glow">
      <CCardHeader className="neon-header"><strong>Absent Yesterday</strong></CCardHeader>
      <CCardBody>
        <CTable hover responsive bordered align="middle">
          <CTableHead>
            <CTableRow>
              <CTableHeaderCell>Name</CTableHeaderCell>
              <CTableHeaderCell>Roll Number</CTableHeaderCell>
              <CTableHeaderCell>Class</CTableHeaderCell>
              <CTableHeaderCell>Section</CTableHeaderCell>
              <CTableHeaderCell>Attendance</CTableHeaderCell>
              <CTableHeaderCell>Action</CTableHeaderCell>
            </CTableRow>
          </CTableHead>
          <CTableBody>
            {dummyStudents.map((student) => (
              <CTableRow key={student.id}>
                <CTableDataCell>{student.name}</CTableDataCell>
                <CTableDataCell>{student.rollNo}</CTableDataCell>
                <CTableDataCell>{student.class}</CTableDataCell>
                <CTableDataCell>{student.section}</CTableDataCell>
                <CTableDataCell>{student.attendance}</CTableDataCell>
                <CTableDataCell>
                  <CButton color="info" size="sm" onClick={() => navigate(`/students/profile/${student.id}`)}>
                    View Detail
                  </CButton>
                </CTableDataCell>
              </CTableRow>
            ))}
          </CTableBody>
        </CTable>
      </CCardBody>
    </CCard>
  )
}

export default AbsentYesterday 