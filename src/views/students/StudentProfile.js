import React, { useState } from 'react'
import { useNavigate } from 'react-router-dom'
import {
  CButton,
  CCard,
  CCardBody,
  CCardHeader,
  CCol,
  CForm,
  CFormInput,
  CFormSelect,
  CFormTextarea,
  CRow,
  CAlert,
  CModal,
  CModalHeader,
  CModalTitle,
  CModalBody,
  CModalFooter,
} from '@coreui/react'

const staticStudent = {
  name: 'Alice Smith',
  roll_no: '101',
  class: '5',
  section: 'A',
  father_name: 'Robert Smith',
  father_phone: '1234567890',
  photo: null,
  behaviour: 'Excellent',
}

const StudentProfile = () => {
  const navigate = useNavigate()
  const [student, setStudent] = useState(staticStudent)
  const [error, setError] = useState('')
  const [success, setSuccess] = useState('')
  const [loading, setLoading] = useState(false)
  const [editMode, setEditMode] = useState(false)
  const [deleteModal, setDeleteModal] = useState(false)

  const handleSubmit = (e) => {
    e.preventDefault()
    setError('')
    setSuccess('')
    setLoading(true)
    setTimeout(() => {
      setSuccess('Student details updated (demo only, not saved)')
      setEditMode(false)
      setLoading(false)
    }, 800)
  }

  const handleDelete = () => {
    setSuccess('Student deleted (demo only, not really deleted)')
    setDeleteModal(false)
    setTimeout(() => navigate('/reports'), 1000)
  }

  const handleFileChange = (e) => {
    const file = e.target.files[0]
    if (file && file.size > 2 * 1024 * 1024) {
      setError('File size should be less than 2MB')
      return
    }
    setStudent({ ...student, photo: file })
  }

  // For demo, just download a text file as a report
  const generateReport = () => {
    const blob = new Blob([
      `Report for ${student.name} (Roll No: ${student.roll_no})\nClass: ${student.class} Section: ${student.section}`
    ], { type: 'text/plain' })
    const url = window.URL.createObjectURL(blob)
    const link = document.createElement('a')
    link.href = url
    link.download = `${student.name}_${student.roll_no}_report.txt`
    document.body.appendChild(link)
    link.click()
    document.body.removeChild(link)
  }

  return (
    <CRow>
      <CCol xs={12}>
        <CCard className="mb-4">
          <CCardHeader className="d-flex justify-content-between align-items-center">
            <strong>Student Profile</strong>
            <div>
              <CButton
                color="primary"
                className="me-2"
                onClick={() => setEditMode(!editMode)}
              >
                {editMode ? 'Cancel Edit' : 'Edit'}
              </CButton>
              <CButton
                color="success"
                className="me-2"
                onClick={generateReport}
              >
                Download Report
              </CButton>
              <CButton
                color="danger"
                onClick={() => setDeleteModal(true)}
              >
                Delete
              </CButton>
            </div>
          </CCardHeader>
          <CCardBody>
            {error && <CAlert color="danger">{error}</CAlert>}
            {success && <CAlert color="success">{success}</CAlert>}
            <CForm onSubmit={handleSubmit}>
              <CRow>
                <CCol md={6} className="mb-3">
                  <CFormInput
                    label="Name"
                    value={student.name}
                    onChange={(e) =>
                      setStudent({ ...student, name: e.target.value })
                    }
                    disabled={!editMode}
                    required
                  />
                </CCol>
                <CCol md={6} className="mb-3">
                  <CFormInput
                    label="Roll Number"
                    value={student.roll_no}
                    onChange={(e) =>
                      setStudent({ ...student, roll_no: e.target.value })
                    }
                    disabled={!editMode}
                    required
                  />
                </CCol>
              </CRow>
              <CRow>
                <CCol md={6} className="mb-3">
                  <CFormSelect
                    label="Class"
                    value={student.class}
                    onChange={(e) =>
                      setStudent({ ...student, class: e.target.value })
                    }
                    disabled={!editMode}
                    required
                  >
                    <option value="">Select Class</option>
                    {[...Array(10)].map((_, i) => (
                      <option key={i + 1} value={i + 1}>
                        Class {i + 1}
                      </option>
                    ))}
                  </CFormSelect>
                </CCol>
                <CCol md={6} className="mb-3">
                  <CFormSelect
                    label="Section"
                    value={student.section}
                    onChange={(e) =>
                      setStudent({ ...student, section: e.target.value })
                    }
                    disabled={!editMode}
                    required
                  >
                    <option value="">Select Section</option>
                    {['A', 'B', 'C', 'D'].map((section) => (
                      <option key={section} value={section}>
                        Section {section}
                      </option>
                    ))}
                  </CFormSelect>
                </CCol>
              </CRow>
              <CRow>
                <CCol md={6} className="mb-3">
                  {editMode ? (
                    <CFormInput
                      type="file"
                      label="Photo"
                      onChange={handleFileChange}
                      accept="image/jpeg,image/png"
                    />
                  ) : (
                    student.photo && (
                      <div>
                        <label className="form-label">Photo</label>
                        <img
                          src={student.photo}
                          alt={student.name}
                          className="img-fluid"
                          style={{ maxHeight: '200px' }}
                        />
                      </div>
                    )
                  )}
                </CCol>
                <CCol md={6} className="mb-3">
                  <CFormTextarea
                    label="Behaviour Notes"
                    value={student.behaviour}
                    onChange={(e) =>
                      setStudent({ ...student, behaviour: e.target.value })
                    }
                    disabled={!editMode}
                    rows={3}
                  />
                </CCol>
              </CRow>
              {editMode && (
                <CRow>
                  <CCol xs={12} className="text-end">
                    <CButton
                      color="primary"
                      type="submit"
                      disabled={loading}
                      className="px-4"
                    >
                      {loading ? 'Saving...' : 'Save Changes'}
                    </CButton>
                  </CCol>
                </CRow>
              )}
            </CForm>
          </CCardBody>
        </CCard>
      </CCol>
      <CModal
        visible={deleteModal}
        onClose={() => setDeleteModal(false)}
      >
        <CModalHeader>
          <CModalTitle>Confirm Delete</CModalTitle>
        </CModalHeader>
        <CModalBody>
          Are you sure you want to delete {student.name}?
        </CModalBody>
        <CModalFooter>
          <CButton
            color="secondary"
            onClick={() => setDeleteModal(false)}
          >
            Cancel
          </CButton>
          <CButton color="danger" onClick={handleDelete}>
            Delete
          </CButton>
        </CModalFooter>
      </CModal>
    </CRow>
  )
}

export default StudentProfile