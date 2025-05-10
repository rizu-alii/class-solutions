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
  CRow,
  CTable,
  CTableBody,
  CTableDataCell,
  CTableHead,
  CTableHeaderCell,
  CTableRow,
  CAlert,
  CModal,
  CModalHeader,
  CModalTitle,
  CModalBody,
  CModalFooter,
} from '@coreui/react'

const staticStudents = [
  { id: 1, name: 'Alice Smith', roll_no: '101', class: '5', section: 'A', father_name: 'Robert Smith' },
  { id: 2, name: 'Bob Johnson', roll_no: '102', class: '5', section: 'A', father_name: 'Michael Johnson' },
]

const Reports = () => {
  const navigate = useNavigate()
  const [filters, setFilters] = useState({
    roll_no: '',
    name: '',
    class: '',
    section: '',
    father_name: '',
  })
  const [error, setError] = useState('')
  const [success, setSuccess] = useState('')
  const [deleteModal, setDeleteModal] = useState({
    show: false,
    studentId: null,
    studentName: '',
  })

  const handleSearch = (e) => {
    e.preventDefault()
    // No real search, just UI
  }

  const handleReset = () => {
    setFilters({
      roll_no: '',
      name: '',
      class: '',
      section: '',
      father_name: '',
    })
  }

  const handleDelete = () => {
    setSuccess('Student deleted (demo only, not really deleted)')
    setDeleteModal({ show: false, studentId: null, studentName: '' })
  }

  return (
    <CRow>
      <CCol xs={12}>
        <CCard className="mb-4">
          <CCardHeader>
            <strong>Student Reports</strong>
          </CCardHeader>
          <CCardBody>
            <CForm onSubmit={handleSearch}>
              {error && <CAlert color="danger">{error}</CAlert>}
              {success && <CAlert color="success">{success}</CAlert>}
              <CRow className="mb-4">
                <CCol md={4}>
                  <CFormInput
                    label="Roll Number"
                    value={filters.roll_no}
                    onChange={(e) =>
                      setFilters({ ...filters, roll_no: e.target.value })
                    }
                  />
                </CCol>
                <CCol md={4}>
                  <CFormInput
                    label="Name"
                    value={filters.name}
                    onChange={(e) =>
                      setFilters({ ...filters, name: e.target.value })
                    }
                  />
                </CCol>
                <CCol md={4}>
                  <CFormInput
                    label="Father's Name"
                    value={filters.father_name}
                    onChange={(e) =>
                      setFilters({ ...filters, father_name: e.target.value })
                    }
                  />
                </CCol>
              </CRow>
              <CRow className="mb-4">
                <CCol md={6}>
                  <CFormSelect
                    label="Class"
                    value={filters.class}
                    onChange={(e) =>
                      setFilters({ ...filters, class: e.target.value })
                    }
                  >
                    <option value="">All Classes</option>
                    {[...Array(10)].map((_, i) => (
                      <option key={i + 1} value={i + 1}>
                        Class {i + 1}
                      </option>
                    ))}
                  </CFormSelect>
                </CCol>
                <CCol md={6}>
                  <CFormSelect
                    label="Section"
                    value={filters.section}
                    onChange={(e) =>
                      setFilters({ ...filters, section: e.target.value })
                    }
                  >
                    <option value="">All Sections</option>
                    {['A', 'B', 'C', 'D'].map((section) => (
                      <option key={section} value={section}>
                        Section {section}
                      </option>
                    ))}
                  </CFormSelect>
                </CCol>
              </CRow>
              <CRow className="mb-4">
                <CCol xs={12} className="text-end">
                  <CButton
                    color="secondary"
                    className="me-2"
                    onClick={handleReset}
                  >
                    Reset
                  </CButton>
                  <CButton color="primary" type="submit">
                    Search
                  </CButton>
                </CCol>
              </CRow>
            </CForm>
            <CTable hover>
              <CTableHead>
                <CTableRow>
                  <CTableHeaderCell>Roll No</CTableHeaderCell>
                  <CTableHeaderCell>Name</CTableHeaderCell>
                  <CTableHeaderCell>Class</CTableHeaderCell>
                  <CTableHeaderCell>Section</CTableHeaderCell>
                  <CTableHeaderCell>Father's Name</CTableHeaderCell>
                  <CTableHeaderCell>Actions</CTableHeaderCell>
                </CTableRow>
              </CTableHead>
              <CTableBody>
                {staticStudents.map((student) => (
                  <CTableRow key={student.id}>
                    <CTableDataCell>{student.roll_no}</CTableDataCell>
                    <CTableDataCell>{student.name}</CTableDataCell>
                    <CTableDataCell>Class {student.class}</CTableDataCell>
                    <CTableDataCell>Section {student.section}</CTableDataCell>
                    <CTableDataCell>{student.father_name}</CTableDataCell>
                    <CTableDataCell>
                      <CButton
                        color="primary"
                        size="sm"
                        className="me-2"
                        onClick={() => navigate(`/students/${student.id}`)}
                      >
                        View
                      </CButton>
                      <CButton
                        color="danger"
                        size="sm"
                        onClick={() =>
                          setDeleteModal({
                            show: true,
                            studentId: student.id,
                            studentName: student.name,
                          })
                        }
                      >
                        Delete
                      </CButton>
                    </CTableDataCell>
                  </CTableRow>
                ))}
              </CTableBody>
            </CTable>
          </CCardBody>
        </CCard>
      </CCol>
      <CModal
        visible={deleteModal.show}
        onClose={() =>
          setDeleteModal({ show: false, studentId: null, studentName: '' })
        }
      >
        <CModalHeader>
          <CModalTitle>Confirm Delete</CModalTitle>
        </CModalHeader>
        <CModalBody>
          Are you sure you want to delete {deleteModal.studentName}?
        </CModalBody>
        <CModalFooter>
          <CButton
            color="secondary"
            onClick={() =>
              setDeleteModal({ show: false, studentId: null, studentName: '' })
            }
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

export default Reports 