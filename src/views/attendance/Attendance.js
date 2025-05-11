import React, { useState } from 'react'
import {
  CButton,
  CCard,
  CCardBody,
  CCardHeader,
  CCol,
  CForm,
  CFormSelect,
  CRow,
  CAlert,
} from '@coreui/react'
import DatePicker from 'react-datepicker'
import 'react-datepicker/dist/react-datepicker.css'
import { useNavigate } from 'react-router-dom'
import './Attendance.css'

const Attendance = () => {
  const today = new Date()
  const [formData, setFormData] = useState({
    class: '',
    section: '',
    date: today,
  })
  const [showSuccess, setShowSuccess] = useState(false)
  const [showError, setShowError] = useState(false)
  const navigate = useNavigate()

  // Theme detection (CoreUI uses 'coreui-free-react-admin-template-theme' in localStorage)
  const theme = localStorage.getItem('coreui-free-react-admin-template-theme') || 'light'
  const isDark = theme === 'dark'

  const handleInputChange = (e) => {
    const { name, value } = e.target
    setFormData((prev) => ({
      ...prev,
      [name]: value,
    }))
  }

  const handleDateChange = (date) => {
    setFormData((prev) => ({
      ...prev,
      date,
    }))
  }

  const handleSubmit = (e) => {
    e.preventDefault()
    const { class: studentClass, section, date } = formData
    if (!studentClass || !section || !date) {
      setShowError(true)
      setTimeout(() => setShowError(false), 3000)
      return
    }
    // Go to mark attendance page with form data
    navigate('/attendance/mark', { state: { class: studentClass, section, date } })
  }

  // Custom calendar header for DatePicker
  const renderCustomHeader = ({
    date,
    changeMonth,
    decreaseMonth,
    increaseMonth,
    prevMonthButtonDisabled,
    nextMonthButtonDisabled,
  }) => {
    const monthNames = [
      'January', 'February', 'March', 'April', 'May', 'June',
      'July', 'August', 'September', 'October', 'November', 'December'
    ];
    return (
      <div style={{ display: 'flex', justifyContent: 'center', alignItems: 'center', width: '100%', flexWrap: 'wrap' }}>
        <button
          type="button"
          onClick={decreaseMonth}
          disabled={prevMonthButtonDisabled}
          style={{ background: 'none', border: 'none', fontSize: 18, marginRight: 8, color: '#fff', padding: 0 }}
          aria-label="Previous Month"
        >
          {'<'}
        </button>
        <select
          value={date.getMonth()}
          onChange={({ target: { value } }) => changeMonth(Number(value))}
          style={{ fontSize: 16, borderRadius: 4, padding: '2px 8px', margin: '0 8px', background: 'inherit', color: '#fff', border: '1px solid #888' }}
          aria-label="Select Month"
        >
          {monthNames.map((option, index) => (
            <option key={option} value={index}>
              {option}
            </option>
          ))}
        </select>
        <span style={{ fontSize: 16, marginLeft: 4 }}>{date.getFullYear()}</span>
        <button
          type="button"
          onClick={increaseMonth}
          disabled={nextMonthButtonDisabled}
          style={{ background: 'none', border: 'none', fontSize: 18, marginLeft: 8, color: '#fff', padding: 0 }}
          aria-label="Next Month"
        >
          {'>'}
        </button>
      </div>
    );
  }

  return (
    <CRow className="justify-content-center">
      <CCol xs={12} sm={10} md={8} lg={6}>
        <CCard className="mb-6 neon-glow">
          <CCardHeader className="neon-header" style={{ overflow: 'hidden', textOverflow: 'ellipsis', whiteSpace: 'nowrap' }}>
            <strong>Attendance</strong>
          </CCardHeader>
          <CCardBody>
            {showSuccess && (
              <CAlert color="success">Attendance marked successfully!</CAlert>
            )}
            {showError && (
              <CAlert color="danger">Please fill in all fields!</CAlert>
            )}
            <CForm onSubmit={handleSubmit}>
              <div className="mb-3">
                <CFormSelect
                  id="class"
                  name="class"
                  value={formData.class}
                  onChange={handleInputChange}
                  required
                >
                  <option value="">Choose Class</option>
                  {[...Array(12)].map((_, i) => (
                    <option key={i + 1} value={i + 1}>
                      Class {i + 1}
                    </option>
                  ))}
                </CFormSelect>
              </div>
              <div className="mb-4">
                <CFormSelect
                  id="section"
                  name="section"
                  value={formData.section}
                  onChange={handleInputChange}
                  required
                >
                  <option value="">Choose Section</option>
                  {['A', 'B', 'C', 'D'].map((section) => (
                    <option key={section} value={section}>
                      Section {section}
                    </option>
                  ))}
                </CFormSelect>
              </div>
              <div className="mb-4 attendance-calendar-container">
                <DatePicker
                  selected={formData.date}
                  onChange={handleDateChange}
                  maxDate={today}
                  renderCustomHeader={renderCustomHeader}
                  dropdownMode="select"
                  dateFormat="dd/MM/yyyy"
                  className={`form-control ${isDark ? 'react-datepicker__input-container-dark' : ''}`}
                  calendarClassName={isDark ? 'react-datepicker-dark' : ''}
                  dayClassName={() => isDark ? 'react-datepicker-day-dark' : ''}
                  popperClassName={isDark ? 'react-datepicker-popper-dark' : ''}
                  inline
                />
              </div>
              <div className="d-flex justify-content-center">
                <CButton color="warning" type="submit" style={{ minWidth: 200, fontSize: '1.2rem' }}>
                  Mark Attendance
                </CButton>
              </div>
            </CForm>
          </CCardBody>
        </CCard>
      </CCol>
    </CRow>
  )
}

export default Attendance 