import React, { useState, useEffect } from 'react'
import {
  CCard, CCardBody, CCardHeader, CCol, CRow, CButton, CForm, CFormLabel, CFormCheck, CTable, CTableBody, CTableDataCell, CTableHead, CTableHeaderCell, CTableRow, CAlert, CFormSelect, CFormTextarea
} from '@coreui/react'
import DatePicker from 'react-datepicker'
import 'react-datepicker/dist/react-datepicker.css'
import { useLocation, useNavigate } from 'react-router-dom'
import CIcon from '@coreui/icons-react'
import { cilCalendar, cilPrint } from '@coreui/icons'
import jsPDF from 'jspdf'
import autoTable from 'jspdf-autotable'

// Dummy attendance data generator for a range
const generateAttendance = (start, end) => {
  const dates = []
  let current = new Date(start)
  while (current <= end) {
    // Randomly assign status for demo
    const status = ['present', 'absent', 'leave'][Math.floor(Math.random() * 3)]
    dates.push({ date: new Date(current), status })
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

const StudentAttendanceReport = () => {
  const location = useLocation()
  const navigate = useNavigate()
  const student = location.state?.student || {
    id: 1,
    name: 'Student 1',
    rollNo: '101',
    class: '1',
    section: 'A',
  }
  const theme = localStorage.getItem('coreui-free-react-admin-template-theme') || 'light'
  const isDark = theme === 'dark'

  // Date range state
  const [dateRange, setDateRange] = useState([null, null])
  const [attendance, setAttendance] = useState([])
  const [statusChecks, setStatusChecks] = useState({ present: true, absent: true, leave: true })
  const [alert, setAlert] = useState('')

  // Generate dummy attendance data when range changes
  useEffect(() => {
    if (dateRange[0] && dateRange[1]) {
      const diff = (dateRange[1] - dateRange[0]) / (1000 * 60 * 60 * 24)
      if (diff > 59) {
        setAlert('You can only load up to 60 days at a time.')
        setAttendance([])
      } else {
        setAlert('')
        setAttendance(generateAttendance(dateRange[0], dateRange[1]))
      }
    } else {
      setAttendance([])
      setAlert('')
    }
  }, [dateRange])

  // Filtered attendance by status
  const filteredAttendance = attendance.filter(row => statusChecks[row.status])

  // Group by status for table display
  const grouped = { present: [], absent: [], leave: [] }
  filteredAttendance.forEach(row => grouped[row.status].push(row))

  // Table rows: show present dates, then absent, then leave (if checked)
  const tableRows = []
  if (statusChecks.present) grouped.present.forEach(row => tableRows.push({ ...row, type: 'Present' }))
  if (statusChecks.absent) grouped.absent.forEach(row => tableRows.push({ ...row, type: 'Absent' }))
  if (statusChecks.leave) grouped.leave.forEach(row => tableRows.push({ ...row, type: 'Leave' }))

  // PDF generation handler
  const handleGeneratePDF = () => {
    console.log('PDF generation triggered')
    const doc = new jsPDF()
    // Title - make it more bold and prominent
    doc.setFontSize(22)
    doc.setFont('helvetica', 'bold')
    doc.text('Student Attendance Report', 14, 18)
    // Draw a line below the title
    doc.setLineWidth(0.8)
    doc.line(14, 21, 196, 21)
    doc.setFontSize(12)
    doc.setFont('helvetica', 'normal')
    // Student Details
    let y = 26
    doc.setFont(undefined, 'bold')
    doc.text(`Name:`, 14, y)
    doc.setFont(undefined, 'normal')
    doc.text(student.name, 34, y)
    doc.setFont(undefined, 'bold')
    doc.text(`Roll No:`, 80, y)
    doc.setFont(undefined, 'normal')
    doc.text(student.rollNo, 102, y)
    doc.setFont(undefined, 'bold')
    doc.text(`Class:`, 140, y)
    doc.setFont(undefined, 'normal')
    doc.text(student.class, 158, y)
    y += 8
    doc.setFont(undefined, 'bold')
    doc.text(`Section:`, 14, y)
    doc.setFont(undefined, 'normal')
    doc.text(student.section, 34, y)
    y += 10
    // Academic Description
    doc.setFont(undefined, 'bold')
    doc.text('Academic Description:', 14, y)
    doc.setFont(undefined, 'normal')
    const academicDesc = document.getElementById('academicDesc')?.value || ''
    const splitAcademic = doc.splitTextToSize(academicDesc, 180)
    doc.text(splitAcademic, 14, y + 6)
    y += 6 + splitAcademic.length * 6
    // Behavior Description
    doc.setFont(undefined, 'bold')
    doc.text('Behavior Description:', 14, y)
    doc.setFont(undefined, 'normal')
    const behaviorDesc = document.getElementById('behaviorDesc')?.value || ''
    const splitBehavior = doc.splitTextToSize(behaviorDesc, 180)
    doc.text(splitBehavior, 14, y + 6)
    y += 6 + splitBehavior.length * 6
    // Table
    const tableHead = [[
      'Date', 'Status', 'Date', 'Status', 'Date', 'Status',
    ]]
    const tableBody = groupedRows.map(rowGroup => [
      ...rowGroup.map(row => [
        row.date.toLocaleDateString('en-GB'), row.type
      ]).flat(),
      ...Array.from({ length: 3 - rowGroup.length }).map(() => ['-', '-']).flat(),
    ])
    autoTable(doc, {
      head: tableHead,
      body: tableBody,
      startY: y + 8,
      theme: 'grid',
      headStyles: { fillColor: [41, 128, 185], textColor: 255, fontStyle: 'bold' },
      styles: { fontSize: 10, cellPadding: 2 },
      margin: { left: 8, right: 8 },
      tableWidth: 'auto',
    })
    // Save
    const fileName = `${student.name} (${student.rollNo}) Attendance Report.pdf`
    doc.save(fileName)
  }

  // Table rows: show present dates, then absent, then leave (if checked)
  // Now: group into rows of 3 date/status pairs (6 columns)
  const maxRecords = 60
  const limitedRows = tableRows.slice(0, maxRecords)
  const groupedRows = []
  for (let i = 0; i < limitedRows.length; i += 3) {
    groupedRows.push(limitedRows.slice(i, i + 3))
  }

  return (
    <CRow className="justify-content-center">
      <CCol xs={12} md={10} lg={8}>
        <CCard className="mb-6 neon-glow">
          <CCardHeader className="neon-header">
            <strong>Student Attendance Report</strong>
          </CCardHeader>
          <CCardBody>
            {/* Student Info */}
            <div className="d-flex flex-wrap gap-4 mb-4 align-items-center justify-content-between">
              <div><b>Roll No:</b> {student.rollNo}</div>
              <div><b>Name:</b> {student.name}</div>
              <div><b>Class:</b> {student.class}</div>
              <div><b>Section:</b> {student.section}</div>
            </div>
            {/* Academic & Behavior Description */}
            <div className="mb-4">
              <CFormLabel htmlFor="academicDesc" style={{ color: isDark ? '#fff' : '#222' }}>Academic Description</CFormLabel>
              <CFormTextarea
                id="academicDesc"
                rows={3}
                placeholder="Enter academic description..."
                className="mb-3"
                style={{ resize: 'vertical' }}
              />
              <CFormLabel htmlFor="behaviorDesc" style={{ color: isDark ? '#fff' : '#222' }}>Behavior Description</CFormLabel>
              <CFormTextarea
                id="behaviorDesc"
                rows={3}
                placeholder="Enter behavior description..."
                style={{ resize: 'vertical' }}
              />
            </div>
            {/* Date Range Picker */}
            <CForm className="mb-3">
              <div className="d-flex flex-wrap gap-3 align-items-center mb-2">
                <CFormLabel style={{ color: isDark ? '#fff' : '#222', minWidth: 120 }}>Date Range</CFormLabel>
                <div style={{ minWidth: 320, width: 320 }}>
                  <DatePicker
                    selectsRange
                    startDate={dateRange[0]}
                    endDate={dateRange[1]}
                    onChange={update => setDateRange(update)}
                    dateFormat="dd/MM/yyyy"
                    calendarClassName={isDark ? 'react-datepicker-dark' : ''}
                    dayClassName={() => isDark ? 'react-datepicker-day-dark' : ''}
                    popperClassName={isDark ? 'react-datepicker-popper-dark' : ''}
                    maxDate={new Date()}
                    customInput={<CalendarInput isDark={isDark} placeholder="Select range (max 60 days)" />}
                  />
                </div>
              </div>
              {/* Status Checkboxes */}
              <div className="d-flex flex-wrap gap-4 align-items-center mb-2">
                <CFormCheck
                  type="checkbox"
                  id="present"
                  label="Present"
                  checked={statusChecks.present}
                  onChange={e => setStatusChecks(s => ({ ...s, present: e.target.checked }))}
                  color="success"
                  className="me-2"
                />
                <CFormCheck
                  type="checkbox"
                  id="absent"
                  label="Absent"
                  checked={statusChecks.absent}
                  onChange={e => setStatusChecks(s => ({ ...s, absent: e.target.checked }))}
                  color="danger"
                  className="me-2"
                />
                <CFormCheck
                  type="checkbox"
                  id="leave"
                  label="Leave"
                  checked={statusChecks.leave}
                  onChange={e => setStatusChecks(s => ({ ...s, leave: e.target.checked }))}
                  color="info"
                  className="me-2"
                />
              </div>
            </CForm>
            {alert && <CAlert color="warning">{alert}</CAlert>}
            {/* Attendance Table */}
            <CTable hover responsive bordered align="middle" className="mb-4">
              <CTableHead>
                <CTableRow>
                  <CTableHeaderCell>Date</CTableHeaderCell>
                  <CTableHeaderCell>Status</CTableHeaderCell>
                  <CTableHeaderCell>Date</CTableHeaderCell>
                  <CTableHeaderCell>Status</CTableHeaderCell>
                  <CTableHeaderCell>Date</CTableHeaderCell>
                  <CTableHeaderCell>Status</CTableHeaderCell>
                </CTableRow>
              </CTableHead>
              <CTableBody>
                {groupedRows.length === 0 ? (
                  <CTableRow>
                    <CTableDataCell colSpan={6} className="text-center text-medium-emphasis">
                      No attendance records found.
                    </CTableDataCell>
                  </CTableRow>
                ) : (
                  groupedRows.map((rowGroup, idx) => (
                    <CTableRow key={idx}>
                      {rowGroup.map((row, j) => [
                        <CTableDataCell key={`date-${j}`}>{row.date.toLocaleDateString('en-GB')}</CTableDataCell>,
                        <CTableDataCell key={`status-${j}`}>{row.type}</CTableDataCell>
                      ])}
                      {/* Fill empty cells if less than 3 records in this row */}
                      {Array.from({ length: 3 - rowGroup.length }).map((_, k) => [
                        <CTableDataCell key={`empty-date-${k}`}>-</CTableDataCell>,
                        <CTableDataCell key={`empty-status-${k}`}>-</CTableDataCell>
                      ])}
                    </CTableRow>
                  ))
                )}
              </CTableBody>
            </CTable>
            {/* Generate PDF Button */}
            <div className="d-flex justify-content-end">
              <CButton color="primary" onClick={handleGeneratePDF} className="d-flex align-items-center">
                <CIcon icon={cilPrint} className="me-2" /> Generate PDF
              </CButton>
            </div>
          </CCardBody>
        </CCard>
      </CCol>
    </CRow>
  )
}

export default StudentAttendanceReport 