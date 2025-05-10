import React, { useState, forwardRef } from 'react'
import { useLocation, useNavigate } from 'react-router-dom'
import {
  CCard,
  CCardBody,
  CCardHeader,
  CCol,
  CRow,
  CForm,
  CFormSelect,
  CButton,
  CAlert,
} from '@coreui/react'
import DatePicker from 'react-datepicker'
import 'react-datepicker/dist/react-datepicker.css'
import CIcon from '@coreui/icons-react'
import { cilCalendar } from '@coreui/icons'

const CalendarInput = forwardRef(({ value, onClick }, ref) => (
  <div className="input-group">
    <input
      type="text"
      className="form-control"
      value={value}
      onClick={onClick}
      ref={ref}
      readOnly
      style={{ cursor: 'pointer', background: 'inherit' }}
    />
    <span className="input-group-text bg-transparent border-start-0" style={{ cursor: 'pointer' }} onClick={onClick}>
      <CIcon icon={cilCalendar} />
    </span>
  </div>
))

const UpdateAttendance = () => {
  const location = useLocation()
  const navigate = useNavigate()
  const student = location.state?.student
  const [date, setDate] = useState(new Date())
  const [attendance, setAttendance] = useState('Present')
  const [showSuccess, setShowSuccess] = useState(false)

  if (!student) {
    navigate('/attendance/view')
    return null
  }

  const handleSubmit = (e) => {
    e.preventDefault()
    setShowSuccess(true)
    setTimeout(() => {
      setShowSuccess(false)
      navigate('/attendance/view')
    }, 2000)
  }

  return (
    <CRow className="justify-content-center">
      <CCol xs={12} sm={10} md={8} lg={6}>
        {showSuccess && <CAlert color="success" className="mb-4">Attendance updated successfully!</CAlert>}
        <CCard className="mb-6 neon-glow">
          <CCardHeader className="neon-header">
            <strong>Update Attendance</strong>
          </CCardHeader>
          <CCardBody>
            <div className="mb-4 update-attendance-info">
              <div className="update-attendance-section">Student Information</div>
              <div className="mb-1">Name: <b>{student.name}</b></div>
              <div className="mb-1">Roll No: <b>{student.rollNo}</b></div>
              <div className="mb-1">Class: <b>{student.class}</b></div>
              <div className="mb-1">Section: <b>{student.section}</b></div>
            </div>
            <div className="mb-4">
              <div className="update-attendance-section">Select Date</div>
              <DatePicker
                selected={date}
                onChange={setDate}
                maxDate={new Date()}
                showMonthDropdown
                showYearDropdown
                dropdownMode="select"
                dateFormat="dd/MM/yyyy"
                calendarClassName={localStorage.getItem('coreui-free-react-admin-template-theme') === 'dark' ? 'react-datepicker-dark' : ''}
                customInput={<CalendarInput />}
              />
            </div>
            <CForm onSubmit={handleSubmit}>
              <div className="mb-3 update-attendance-section">Attendance for: {date.toLocaleDateString()}</div>
              <div className="mb-4">
                <CFormSelect
                  value={attendance}
                  onChange={e => setAttendance(e.target.value)}
                  required
                >
                  <option value="Present">Present</option>
                  <option value="Absent">Absent</option>
                  <option value="Leave">Leave</option>
                </CFormSelect>
              </div>
              <div className="d-flex gap-2">
                <CButton color="primary" type="submit">
                  Save
                </CButton>
                <CButton color="secondary" onClick={() => navigate('/attendance/view')}>
                  Cancel
                </CButton>
              </div>
            </CForm>
          </CCardBody>
        </CCard>
      </CCol>
    </CRow>
  )
}

export default UpdateAttendance 