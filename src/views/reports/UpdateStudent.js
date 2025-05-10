import React, { useState } from 'react'
import { useLocation, useNavigate } from 'react-router-dom'
import {
  CCard,
  CCardBody,
  CCardHeader,
  CCol,
  CRow,
  CForm,
  CFormInput,
  CFormSelect,
  CButton,
  CAlert,
} from '@coreui/react'

const UpdateStudent = () => {
  const location = useLocation()
  const navigate = useNavigate()
  const student = location.state?.student
  const [formData, setFormData] = useState(student || {
    name: '',
    rollNo: '',
    class: '',
    section: '',
  })
  const [showSuccess, setShowSuccess] = useState(false)

  if (!student) {
    navigate('/reports/view-student')
    return null
  }

  const handleInputChange = (e) => {
    const { name, value } = e.target
    setFormData((prev) => ({ ...prev, [name]: value }))
  }

  const handleSubmit = (e) => {
    e.preventDefault()
    setShowSuccess(true)
    setTimeout(() => {
      setShowSuccess(false)
      navigate('/reports/view-student')
    }, 2000)
  }

  return (
    <CRow className="justify-content-center">
      <CCol xs={12} sm={10} md={8} lg={6}>
        <CCard className="mb-6 neon-glow">
          <CCardHeader className="neon-header">
            <strong>Update Student</strong>
          </CCardHeader>
          <CCardBody>
            {showSuccess && <CAlert color="success">Student updated successfully!</CAlert>}
            <CForm onSubmit={handleSubmit}>
              <div className="mb-3">
                <CFormInput
                  label="Student Name"
                  name="name"
                  value={formData.name}
                  onChange={handleInputChange}
                  required
                />
              </div>
              <div className="mb-3">
                <CFormInput
                  label="Roll No"
                  name="rollNo"
                  value={formData.rollNo}
                  onChange={handleInputChange}
                  required
                />
              </div>
              <div className="mb-3">
                <CFormSelect
                  label="Class"
                  name="class"
                  value={formData.class}
                  onChange={handleInputChange}
                  required
                >
                  <option value="">Select Class</option>
                  {[...Array(12)].map((_, i) => (
                    <option key={i + 1} value={String(i + 1)}>
                      Class {i + 1}
                    </option>
                  ))}
                </CFormSelect>
              </div>
              <div className="mb-3">
                <CFormSelect
                  label="Section"
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
              <div className="d-flex gap-2">
                <CButton color="primary" type="submit">
                  Save
                </CButton>
                <CButton color="secondary" onClick={() => navigate('/reports/view-student')}>
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

export default UpdateStudent 