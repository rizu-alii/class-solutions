import React, { useState, useEffect, useRef } from 'react'
import {
  CCard,
  CCardBody,
  CCardHeader,
  CCol,
  CRow,
  CButton,
  CForm,
  CFormLabel,
  CFormCheck,
  CTable,
  CTableBody,
  CTableDataCell,
  CTableHead,
  CTableHeaderCell,
  CTableRow,
  CAlert,
} from '@coreui/react'
import DatePicker from 'react-datepicker'
import 'react-datepicker/dist/react-datepicker.css'
import { useLocation, useNavigate } from 'react-router-dom'
import CIcon from '@coreui/icons-react'
import { cilCalendar } from '@coreui/icons'

// Dummy attendance data generator
const generateAttendance = (start, end) => {
  const dates = []
  let current = new Date(start)
  while (current <= end) {
    dates.push({
      date: new Date(current),
      status: 'present',
    })
    current = new Date(current)
    current.setDate(current.getDate() + 1)
  }
  return dates
}

const CalendarInput = React.forwardRef(({ value, onClick, placeholder, isDark }, ref) => (
  <div style={{ position: 'relative', width: '100%' }}>
    <input
      type="text"
      className={`form-control ${isDark ? 'react-datepicker__input-container-dark' : ''}`}
      value={value}
      onClick={onClick}
      placeholder={placeholder}
      ref={ref}
      style={{ paddingRight: 40 }}
      inputMode="none"
      onKeyDown={e => e.preventDefault()}
      autoComplete="off"
    />
    <span style={{ position: 'absolute', right: 10, top: '50%', transform: 'translateY(-50%)', zIndex: 2, display: 'flex', alignItems: 'center', height: '100%' }}>
      <CIcon icon={cilCalendar} style={{ color: isDark ? '#fff' : '#333', width: 20, height: 20, cursor: 'pointer' }} onClick={onClick} />
    </span>
  </div>
))

const AttendanceDetails = () => {
  const location = useLocation()
  const navigate = useNavigate()
  const student = location.state?.student || {
    id: 1,
    name: 'Student 1',
    rollNo: '101',
    class: '1',
    section: 'A',
  }

  // Theme detection
  const theme = localStorage.getItem('coreui-free-react-admin-template-theme') || 'light'
  const isDark = theme === 'dark'

  // Date/Date Range state
  const [dateType, setDateType] = useState('date')
  const [date, setDate] = useState(new Date())
  const [dateRange, setDateRange] = useState([null, null])
  const [attendance, setAttendance] = useState([])
  const [originalAttendance, setOriginalAttendance] = useState([])
  const [showUpdate, setShowUpdate] = useState(false)
  const [showSuccess, setShowSuccess] = useState(false)

  // Generate dummy attendance data on mount or date change
  useEffect(() => {
    let att = []
    if (dateType === 'date') {
      att = [
        { date, status: 'present' },
      ]
    } else if (dateType === 'range' && dateRange[0] && dateRange[1]) {
      att = generateAttendance(dateRange[0], dateRange[1])
    }
    setAttendance(att)
    setOriginalAttendance(JSON.stringify(att))
    setShowUpdate(false)
  }, [dateType, date, dateRange])

  // Handle attendance status change
  const handleStatusChange = (idx, status) => {
    const updated = attendance.map((row, i) =>
      i === idx ? { ...row, status } : row
    )
    setAttendance(updated)
    setShowUpdate(JSON.stringify(updated) !== originalAttendance)
  }

  // Handle update
  const handleUpdate = () => {
    setShowSuccess(true)
    setShowUpdate(false)
    setOriginalAttendance(JSON.stringify(attendance))
    setTimeout(() => {
      setShowSuccess(false)
      navigate('/attendance/view')
    }, 1000)
  }

  // Handle cancel
  const handleCancel = () => {
    navigate('/attendance/view')
  }

  return (
    <CRow className="justify-content-center">
      <CCol xs={12} md={10} lg={8}>
        <CCard className="mb-6 neon-glow">
          <CCardHeader className="neon-header">
            <strong>Attendance Details</strong>
          </CCardHeader>
          <CCardBody>
            {showSuccess && (
              <CAlert color="success" className="mb-4">Attendance updated successfully!</CAlert>
            )}
            {/* Student Info */}
            <div className="d-flex flex-wrap gap-4 mb-4 align-items-center justify-content-between">
              <div><b>Roll No:</b> {student.rollNo}</div>
              <div><b>Name:</b> {student.name}</div>
              <div><b>Class:</b> {student.class}</div>
              <div><b>Section:</b> {student.section}</div>
            </div>
            {/* Date/Date Range Selection */}
            <CForm className="mb-4">
              <div className="d-flex flex-column gap-2 align-items-start">
                <div className="d-flex flex-column gap-2">
                  <div className="d-flex align-items-center">
                    <CFormCheck
                      type="radio"
                      name="dateType"
                      id="date"
                      label="Date"
                      checked={dateType === 'date'}
                      onChange={() => setDateType('date')}
                      className="me-2"
                    />
                  </div>
                  <div className="d-flex align-items-center">
                    <CFormCheck
                      type="radio"
                      name="dateType"
                      id="range"
                      label="Date Range"
                      checked={dateType === 'range'}
                      onChange={() => setDateType('range')}
                      className="me-2"
                    />
                  </div>
                </div>
                {/* Date Picker */}
                <div style={{ minWidth: 180, marginTop: 8, display: dateType === 'date' ? 'block' : 'none' }}>
                  <DatePicker
                    selected={date}
                    onChange={setDate}
                    disabled={dateType !== 'date'}
                    dateFormat="dd/MM/yyyy"
                    calendarClassName={isDark ? 'react-datepicker-dark' : ''}
                    dayClassName={() => isDark ? 'react-datepicker-day-dark' : ''}
                    popperClassName={isDark ? 'react-datepicker-popper-dark' : ''}
                    maxDate={new Date()}
                    customInput={<CalendarInput isDark={isDark} />}
                    style={{ minWidth: 150 }}
                  />
                </div>
                {/* Date Range Picker */}
                <div style={{ display: dateType === 'range' ? 'flex' : 'none', alignItems: 'center', minWidth: 320, marginTop: 8, width: '100%' }}>
                  <div style={{ flex: 1 }}>
                    <DatePicker
                      selectsStart
                      startDate={dateRange[0]}
                      endDate={dateRange[1]}
                      selected={dateRange[0]}
                      onChange={date => setDateRange([date, dateRange[1]])}
                      disabled={dateType !== 'range'}
                      dateFormat="dd/MM/yyyy"
                      calendarClassName={isDark ? 'react-datepicker-dark' : ''}
                      dayClassName={() => isDark ? 'react-datepicker-day-dark' : ''}
                      popperClassName={isDark ? 'react-datepicker-popper-dark' : ''}
                      maxDate={dateRange[1] || new Date()}
                      placeholderText="Start date"
                      customInput={<CalendarInput isDark={isDark} placeholder="Start date" />}
                    />
                  </div>
                  <span className="mx-2">to</span>
                  <div style={{ flex: 1 }}>
                    <DatePicker
                      selectsEnd
                      startDate={dateRange[0]}
                      endDate={dateRange[1]}
                      selected={dateRange[1]}
                      onChange={date => setDateRange([dateRange[0], date])}
                      disabled={dateType !== 'range'}
                      dateFormat="dd/MM/yyyy"
                      calendarClassName={isDark ? 'react-datepicker-dark' : ''}
                      dayClassName={() => isDark ? 'react-datepicker-day-dark' : ''}
                      popperClassName={isDark ? 'react-datepicker-popper-dark' : ''}
                      minDate={dateRange[0]}
                      maxDate={new Date()}
                      placeholderText="End date"
                      customInput={<CalendarInput isDark={isDark} placeholder="End date" />}
                    />
                  </div>
                </div>
              </div>
            </CForm>
            {/* Attendance Table */}
            <CTable hover responsive bordered align="middle" className="mb-4">
              <CTableHead>
                <CTableRow>
                  <CTableHeaderCell style={{whiteSpace: 'nowrap'}}>Date</CTableHeaderCell>
                  <CTableHeaderCell className="text-center" style={{whiteSpace: 'nowrap'}}>Present</CTableHeaderCell>
                  <CTableHeaderCell className="text-center" style={{whiteSpace: 'nowrap'}}>Absent</CTableHeaderCell>
                  <CTableHeaderCell className="text-center" style={{whiteSpace: 'nowrap'}}>Leave</CTableHeaderCell>
                </CTableRow>
              </CTableHead>
              <CTableBody>
                {attendance.length === 0 ? (
                  <CTableRow>
                    <CTableDataCell colSpan={4} className="text-center text-medium-emphasis">
                      No attendance records found.
                    </CTableDataCell>
                  </CTableRow>
                ) : (
                  attendance.map((row, idx) => (
                    <CTableRow key={idx}>
                      <CTableDataCell style={{whiteSpace: 'nowrap'}}>
                        {row.date.toLocaleDateString('en-GB')}
                      </CTableDataCell>
                      <CTableDataCell className="text-center">
                        <CFormCheck
                          type="radio"
                          name={`status-${idx}`}
                          checked={row.status === 'present'}
                          onChange={() => handleStatusChange(idx, 'present')}
                          color="success"
                        />
                      </CTableDataCell>
                      <CTableDataCell className="text-center">
                        <CFormCheck
                          type="radio"
                          name={`status-${idx}`}
                          checked={row.status === 'absent'}
                          onChange={() => handleStatusChange(idx, 'absent')}
                          color="danger"
                        />
                      </CTableDataCell>
                      <CTableDataCell className="text-center">
                        <CFormCheck
                          type="radio"
                          name={`status-${idx}`}
                          checked={row.status === 'leave'}
                          onChange={() => handleStatusChange(idx, 'leave')}
                          color="info"
                        />
                      </CTableDataCell>
                    </CTableRow>
                  ))
                )}
              </CTableBody>
            </CTable>
            {/* Action Buttons */}
            {showUpdate && (
              <div className="mb-3 d-flex gap-3">
                <CButton color="primary" className="neon-glow" onClick={handleUpdate}>
                  Update
                </CButton>
                <CButton color="secondary" variant="outline" onClick={handleCancel}>
                  Cancel
                </CButton>
              </div>
            )}
            {!showUpdate && (
              <div className="mb-3 d-flex gap-3">
                <CButton color="secondary" variant="outline" onClick={handleCancel}>
                  Back
                </CButton>
              </div>
            )}
          </CCardBody>
        </CCard>
      </CCol>
    </CRow>
  )
}

export default AttendanceDetails 