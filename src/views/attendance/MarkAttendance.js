import React, { useState } from 'react'
import { useLocation, useNavigate } from 'react-router-dom'
import {
  CCard,
  CCardBody,
  CCardHeader,
  CCol,
  CRow,
  CTable,
  CTableBody,
  CTableDataCell,
  CTableHead,
  CTableHeaderCell,
  CTableRow,
  CButton,
} from '@coreui/react'

// Dummy students for demo
const dummyStudents = [
  { id: 1, name: 'Ali Raza Raza Raza', rollNo: '101' },
  { id: 2, name: 'Sara Khan', rollNo: '102' },
  { id: 3, name: 'Ahmed Iqbal', rollNo: '103' },
  { id: 4, name: 'Fatima Noor', rollNo: '104' },
  { id: 5, name: 'Bilal Hussain', rollNo: '105' },
]

const MarkAttendance = () => {
  const location = useLocation()
  const navigate = useNavigate()
  const { state } = location
  const [attendance, setAttendance] = useState(() => {
    const initial = {}
    dummyStudents.forEach((s) => (initial[s.id] = 'Present'))
    return initial
  })
  if (!state) {
    // If accessed directly, redirect to attendance page
    navigate('/attendance')
    return null
  }
  const { class: className, section, date } = state

  const handleChange = (studentId, value) => {
    setAttendance((prev) => ({ ...prev, [studentId]: value }))
  }

  const handleSave = () => {
    // Just show a success message or navigate back for demo
    alert('Attendance saved! (Demo only)')
    navigate('/attendance')
  }

  return (
    <CRow className="justify-content-center">
      <CCol xs={12} sm={12} md={12} lg={10}>
        <CCard className="mb-8 neon-glow">
          <CCardHeader className="neon-header">
            <strong>Mark Attendance</strong>
            <div style={{ fontSize: '1rem', fontWeight: 400, marginTop: 8 }}>
              Class: <b>{className}</b> &nbsp; | &nbsp; Section: <b>{section}</b> &nbsp; | &nbsp; Date: <b>{new Date(date).toLocaleDateString()}</b>
            </div>
          </CCardHeader>
          <CCardBody>
            <CTable hover responsive bordered align="middle" className="mb-4">
              <CTableHead>
                <CTableRow>
                  <CTableHeaderCell>Roll No</CTableHeaderCell>
                  <CTableHeaderCell>Name</CTableHeaderCell>
                  <CTableHeaderCell className="text-center">Present</CTableHeaderCell>
                  <CTableHeaderCell className="text-center">Absent</CTableHeaderCell>
                  <CTableHeaderCell className="text-center">Leave</CTableHeaderCell>
                </CTableRow>
              </CTableHead>
              <CTableBody>
                {dummyStudents.map((student) => (
                  <CTableRow key={student.id}>
                    <CTableDataCell>{student.rollNo}</CTableDataCell>
                    <CTableDataCell>{student.name}</CTableDataCell>
                    {["Present", "Absent", "Leave"].map((status) => (
                      <CTableDataCell className="text-center" key={status}>
                        <input
                          type="radio"
                          name={`attendance-${student.id}`}
                          value={status}
                          checked={attendance[student.id] === status}
                          onChange={() => handleChange(student.id, status)}
                          style={{ width: 18, height: 18 }}
                        />
                      </CTableDataCell>
                    ))}
                  </CTableRow>
                ))}
              </CTableBody>
            </CTable>
            <div className="d-flex justify-content-end">
              <CButton color="success" size="lg" onClick={handleSave}>
                Save Changes
              </CButton>
            </div>
          </CCardBody>
        </CCard>
      </CCol>
    </CRow>
  )
}

export default MarkAttendance 