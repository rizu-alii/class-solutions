import React, { useState } from 'react'
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
  CTable,
  CTableBody,
  CTableDataCell,
  CTableHead,
  CTableHeaderCell,
  CTableRow,
  CPagination,
  CPaginationItem,
  CModal,
  CModalHeader,
  CModalBody,
  CModalFooter,
  CAlert,
} from '@coreui/react'
import { useNavigate } from 'react-router-dom'

// Dummy student data
const initialStudents = Array.from({ length: 32 }, (_, i) => ({
  id: i + 1,
  name: `Student ${i + 1}`,
  rollNo: (100 + i).toString(),
  class: ((i % 12) + 1).toString(),
  section: ['A', 'B', 'C', 'D'][i % 4],
}))

const PAGE_SIZE = 10

const ViewStudentReport = () => {
  const [filters, setFilters] = useState({
    name: '',
    rollNo: '',
    class: '',
    section: '',
  })
  const [page, setPage] = useState(1)
  const [students, setStudents] = useState(initialStudents)
  const [deleteId, setDeleteId] = useState(null)
  const [showDeleteModal, setShowDeleteModal] = useState(false)
  const [deleteSuccess, setDeleteSuccess] = useState(false)
  const navigate = useNavigate()

  // Filter students
  const filtered = students.filter((s) => {
    return (
      (!filters.name || s.name.toLowerCase().includes(filters.name.toLowerCase())) &&
      (!filters.rollNo || s.rollNo.includes(filters.rollNo)) &&
      (!filters.class || s.class === filters.class) &&
      (!filters.section || s.section === filters.section)
    )
  })
  const totalPages = Math.ceil(filtered.length / PAGE_SIZE)
  const paginated = filtered.slice((page - 1) * PAGE_SIZE, page * PAGE_SIZE)

  const handleInputChange = (e) => {
    const { name, value } = e.target
    setFilters((prev) => ({ ...prev, [name]: value }))
    setPage(1)
  }

  const handleDelete = (id) => {
    setDeleteId(id)
    setShowDeleteModal(true)
  }

  const confirmDelete = () => {
    setStudents((prev) => prev.filter((s) => s.id !== deleteId))
    setShowDeleteModal(false)
    setDeleteId(null)
    setDeleteSuccess(true)
    setTimeout(() => setDeleteSuccess(false), 2000)
  }

  const cancelDelete = () => {
    setShowDeleteModal(false)
    setDeleteId(null)
  }

  const handleUpdate = (student) => {
    navigate(`/reports/update-student/${student.id}`, { state: { student } })
  }

  const handleViewDetails = (student) => {
    navigate(`/reports/student-details/${student.id}`)
  }

  return (
    <CRow className="justify-content-center">
      <CCol xs={12}>
        <CCard className="mb-6 neon-glow">
          <CCardHeader className="neon-header">
            <strong>View Student Report</strong>
          </CCardHeader>
          <CCardBody>
            {deleteSuccess && <CAlert color="success" className="mb-4">Student deleted successfully!</CAlert>}
            <CForm className="mb-4">
              <CRow className="g-3 align-items-end">
                <CCol md={3}>
                  <CFormInput
                    label="Student Name"
                    name="name"
                    value={filters.name}
                    onChange={handleInputChange}
                    placeholder="Search by name"
                  />
                </CCol>
                <CCol md={2}>
                  <CFormInput
                    label="Roll No"
                    name="rollNo"
                    value={filters.rollNo}
                    onChange={handleInputChange}
                    placeholder="Search by roll no"
                  />
                </CCol>
                <CCol md={2}>
                  <CFormSelect
                    label="Class"
                    name="class"
                    value={filters.class}
                    onChange={handleInputChange}
                  >
                    <option value="">All Classes</option>
                    {[...Array(12)].map((_, i) => (
                      <option key={i + 1} value={String(i + 1)}>
                        Class {i + 1}
                      </option>
                    ))}
                  </CFormSelect>
                </CCol>
                <CCol md={2}>
                  <CFormSelect
                    label="Section"
                    name="section"
                    value={filters.section}
                    onChange={handleInputChange}
                  >
                    <option value="">All Sections</option>
                    {['A', 'B', 'C', 'D'].map((section) => (
                      <option key={section} value={section}>
                        Section {section}
                      </option>
                    ))}
                  </CFormSelect>
                </CCol>
                <CCol md={2}>
                  <CButton color="primary" className="w-100" type="button">
                    Search
                  </CButton>
                </CCol>
              </CRow>
            </CForm>
            <CTable hover responsive bordered align="middle" className="mb-4">
              <CTableHead>
                <CTableRow>
                  <CTableHeaderCell style={{whiteSpace: 'nowrap'}}>Roll No</CTableHeaderCell>
                  <CTableHeaderCell style={{whiteSpace: 'nowrap'}}>Name</CTableHeaderCell>
                  <CTableHeaderCell style={{whiteSpace: 'nowrap'}}>Class</CTableHeaderCell>
                  <CTableHeaderCell style={{whiteSpace: 'nowrap'}}>Section</CTableHeaderCell>
                  <CTableHeaderCell className="text-center" style={{whiteSpace: 'nowrap'}}>Actions</CTableHeaderCell>
                </CTableRow>
              </CTableHead>
              <CTableBody>
                {paginated.length === 0 ? (
                  <CTableRow>
                    <CTableDataCell colSpan={5} className="text-center text-medium-emphasis">
                      No students found.
                    </CTableDataCell>
                  </CTableRow>
                ) : (
                  paginated.map((student) => (
                    <CTableRow key={student.id}>
                      <CTableDataCell style={{whiteSpace: 'nowrap'}}>{student.rollNo}</CTableDataCell>
                      <CTableDataCell style={{whiteSpace: 'nowrap'}}>{student.name}</CTableDataCell>
                      <CTableDataCell style={{whiteSpace: 'nowrap'}}>{student.class}</CTableDataCell>
                      <CTableDataCell style={{whiteSpace: 'nowrap'}}>{student.section}</CTableDataCell>
                      <CTableDataCell className="text-center" style={{width: 1, whiteSpace: 'nowrap'}}>
                        <CButton color="warning" size="sm" className="me-2" onClick={() => handleUpdate(student)}>
                          Update
                        </CButton>
                        <CButton color="success" size="sm" className="me-2" onClick={() => navigate(`/students/profile/${student.id}`)}>
                          View Details
                        </CButton>
                        <CButton color="danger" size="sm" onClick={() => handleDelete(student.id)}>
                          Delete
                        </CButton>
                      </CTableDataCell>
                    </CTableRow>
                  ))
                )}
              </CTableBody>
            </CTable>
            <div className="d-flex justify-content-between align-items-center">
              <div>
                <span className="text-success">Total {filtered.length} records found</span>
              </div>
              <CPagination align="end" aria-label="Student table pagination">
                <CPaginationItem disabled={page === 1} onClick={() => setPage(page - 1)}>
                  Previous
                </CPaginationItem>
                {Array.from({ length: totalPages }, (_, i) => (
                  <CPaginationItem
                    key={i + 1}
                    active={page === i + 1}
                    onClick={() => setPage(i + 1)}
                  >
                    {i + 1}
                  </CPaginationItem>
                ))}
                <CPaginationItem disabled={page === totalPages || totalPages === 0} onClick={() => setPage(page + 1)}>
                  Next
                </CPaginationItem>
              </CPagination>
            </div>
            <CModal visible={showDeleteModal} onClose={cancelDelete} alignment="center">
              <CModalHeader onClose={cancelDelete}>Confirm Delete</CModalHeader>
              <CModalBody>Are you sure you want to delete this student?</CModalBody>
              <CModalFooter>
                <CButton color="danger" onClick={confirmDelete}>Yes</CButton>
                <CButton color="secondary" onClick={cancelDelete}>No</CButton>
              </CModalFooter>
            </CModal>
          </CCardBody>
        </CCard>
      </CCol>
    </CRow>
  )
}

export default ViewStudentReport 