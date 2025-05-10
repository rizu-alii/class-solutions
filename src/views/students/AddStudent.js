import React, { useState } from 'react'
import {
  CCard,
  CCardBody,
  CCardHeader,
  CCol,
  CForm,
  CFormInput,
  CFormSelect,
  CFormLabel,
  CButton,
  CRow,
  CAlert,
} from '@coreui/react'
import CIcon from '@coreui/icons-react'
import { cilXCircle, cilCheckCircle } from '@coreui/icons'

const AddStudent = () => {
  const [formData, setFormData] = useState({
    studentName: '',
    rollNo: '',
    class: '',
    section: '',
    fatherName: '',
    fatherPhone: '',
  })
  const [showSuccess, setShowSuccess] = useState(false)
  const [showError, setShowError] = useState(false)

  const handleInputChange = (e) => {
    const { name, value } = e.target
    if (name === 'fatherPhone' && value.length > 11) return
    setFormData((prev) => ({
      ...prev,
      [name]: value,
    }))
  }

  const handleSubmit = (e) => {
    e.preventDefault()
    const { studentName, rollNo, class: studentClass, section } = formData
    
    if (!studentName || !rollNo || !studentClass || !section) {
      setShowError(true)
      setTimeout(() => setShowError(false), 3000)
      return
    }

    setShowSuccess(true)
    setTimeout(() => setShowSuccess(false), 3000)
    setFormData({
      studentName: '',
      rollNo: '',
      class: '',
      section: '',
      fatherName: '',
      fatherPhone: '',
    })
  }

  const handleCancel = () => {
    setFormData({
      studentName: '',
      rollNo: '',
      class: '',
      section: '',
      fatherName: '',
      fatherPhone: '',
    })
  }

  return (
    <CRow className="justify-content-center">
      <CCol xs={12} sm={10} md={8} lg={6}>
        <CCard className="mb-6 neon-glow">
          <CCardHeader className="neon-header">
            <strong>Add New Student</strong>
          </CCardHeader>
          <CCardBody>
            {showSuccess && (
              <CAlert color="success" className="d-flex align-items-center">
                <CIcon icon={cilCheckCircle} className="flex-shrink-0 me-2" />  
                Student added successfully!
              </CAlert>
            )}
            {showError && (
              <CAlert color="danger" className="d-flex align-items-center">
                <CIcon icon={cilXCircle} className="flex-shrink-0 me-2" />
                Please fill in all required fields!
              </CAlert>
            )}
            <CForm onSubmit={handleSubmit}>
              <div className="mb-3">
                <CFormLabel htmlFor="studentName">Student Name *</CFormLabel>
                <CFormInput
                  type="text"
                  id="studentName"
                  name="studentName"
                  value={formData.studentName}
                  onChange={handleInputChange}
                  required
                />
              </div>
              <div className="mb-3">
                <CFormLabel htmlFor="rollNo">Roll Number *</CFormLabel>
                <CFormInput
                  type="text"
                  id="rollNo"
                  name="rollNo"
                  value={formData.rollNo}
                  onChange={handleInputChange}
                  required
                />
              </div>
              <div className="mb-3">
                <CFormLabel htmlFor="class">Class *</CFormLabel>
                <CFormSelect
                  id="class"
                  name="class"
                  value={formData.class}
                  onChange={handleInputChange}
                  required
                >
                  <option value="">Select Class</option>
                  {[...Array(12)].map((_, i) => (
                    <option key={i + 1} value={i + 1}>
                      Class {i + 1}
                    </option>
                  ))}
                </CFormSelect>
              </div>
              <div className="mb-3">
                <CFormLabel htmlFor="section">Section *</CFormLabel>
                <CFormSelect
                  id="section"
                  name="section"
                  value={formData.section}
                  onChange={handleInputChange}
                  required
                >
                  <option value="">Select Section</option>
                  {['A', 'B', 'C', 'D'].map((section) => (
                    <option key={section} value={section}>
                      Section {section}
                    </option>
                  ))}
                </CFormSelect>
              </div>
              <div className="mb-3">
                <CFormLabel htmlFor="fatherName">Father's Name</CFormLabel>
                <CFormInput
                  type="text"
                  id="fatherName"
                  name="fatherName"
                  value={formData.fatherName}
                  onChange={handleInputChange}
                />
              </div>
              <div className="mb-3">
                <CFormLabel htmlFor="fatherPhone">Father's Phone Number</CFormLabel>
                <CFormInput
                  type="tel"
                  id="fatherPhone"
                  name="fatherPhone"
                  value={formData.fatherPhone}
                  onChange={handleInputChange}
                  maxLength="11"
                  placeholder="Enter 11 digit phone number"
                />
              </div>
              <div className="d-flex gap-2">
                <CButton color="primary" type="submit">
                  Submit
                </CButton>
                <CButton color="secondary" onClick={handleCancel}>
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

export default AddStudent 