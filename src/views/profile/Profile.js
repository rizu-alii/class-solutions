import React, { useState } from 'react'
import {
  CButton,
  CCard,
  CCardBody,
  CCardHeader,
  CCol,
  CForm,
  CFormInput,
  CRow,
  CAlert,
  CTabs,
  CNav,
  CNavItem,
  CNavLink,
  CTabContent,
  CTabPane,
} from '@coreui/react'

const staticProfile = {
  name: 'John Doe',
  email: 'admin@example.com',
  phone: '',
  school: '',
  subject: 'Mathematics',
  profile_picture: null,
}

const Profile = ({ tab }) => {
  const [profile, setProfile] = useState(staticProfile)
  const [password, setPassword] = useState({
    old_password: '',
    new_password: '',
    confirm_password: '',
  })
  const [error, setError] = useState('')
  const [success, setSuccess] = useState('')
  const [loading, setLoading] = useState(false)
  const [activeTab, setActiveTab] = useState(tab === 'password' ? 1 : 0)

  const handleProfileSubmit = (e) => {
    e.preventDefault()
    setError('')
    setSuccess('')
    setLoading(true)
    setTimeout(() => {
      setSuccess('Profile updated (demo only, not saved)')
      setLoading(false)
    }, 800)
  }

  const handlePasswordSubmit = (e) => {
    e.preventDefault()
    setError('')
    setSuccess('')
    setLoading(true)
    if (password.new_password !== password.confirm_password) {
      setError('New passwords do not match')
      setLoading(false)
      return
    }
    setTimeout(() => {
      setSuccess('Password changed (demo only, not saved)')
      setPassword({
        old_password: '',
        new_password: '',
        confirm_password: '',
      })
      setLoading(false)
    }, 800)
  }

  const handleFileChange = (e) => {
    const file = e.target.files[0]
    if (file && file.size > 2 * 1024 * 1024) {
      setError('File size should be less than 2MB')
      return
    }
    setProfile({ ...profile, profile_picture: file })
  }

  return (
    <CRow>
      <CCol xs={12}>
        <CCard className="mb-4 neon-glow">
          <CCardHeader>
            <strong>Profile Management</strong>
          </CCardHeader>
          <CCardBody>
            {error && <CAlert color="danger">{error}</CAlert>}
            {success && <CAlert color="success">{success}</CAlert>}
            {tab === 'password' ? (
              <CForm onSubmit={handlePasswordSubmit} className="mt-3">
                <CRow>
                  <CCol xs={12} className="mb-3">
                    <CFormInput
                      type="password"
                      label="Current Password"
                      value={password.old_password}
                      onChange={(e) =>
                        setPassword({
                          ...password,
                          old_password: e.target.value,
                        })
                      }
                      required
                    />
                  </CCol>
                </CRow>
                <CRow>
                  <CCol xs={12} className="mb-3">
                    <CFormInput
                      type="password"
                      label="New Password"
                      value={password.new_password}
                      onChange={(e) =>
                        setPassword({
                          ...password,
                          new_password: e.target.value,
                        })
                      }
                      required
                    />
                  </CCol>
                  <CCol xs={12} className="mb-3">
                    <CFormInput
                      type="password"
                      label="Confirm New Password"
                      value={password.confirm_password}
                      onChange={(e) =>
                        setPassword({
                          ...password,
                          confirm_password: e.target.value,
                        })
                      }
                      required
                    />
                  </CCol>
                </CRow>
                <CRow>
                  <CCol xs={12} className="text-end">
                    <CButton
                      color="primary"
                      type="submit"
                      disabled={loading}
                      className="px-4"
                    >
                      {loading ? 'Changing...' : 'Change Password'}
                    </CButton>
                  </CCol>
                </CRow>
              </CForm>
            ) : (
              <CForm onSubmit={handleProfileSubmit} className="mt-3">
                <CRow>
                  <CCol xs={12} className="mb-3">
                    <CFormInput
                      label="Name"
                      value={profile.name}
                      onChange={(e) => setProfile({ ...profile, name: e.target.value })}
                      required
                    />
                  </CCol>
                  <CCol xs={12} className="mb-3">
                    <CFormInput
                      label="Email"
                      type="email"
                      value={profile.email}
                      onChange={(e) => setProfile({ ...profile, email: e.target.value })}
                      required
                    />
                  </CCol>
                  <CCol xs={12} className="mb-3">
                    <CFormInput
                      label="Phone Number"
                      value={profile.phone}
                      onChange={(e) => setProfile({ ...profile, phone: e.target.value })}
                      required
                    />
                  </CCol>
                  <CCol xs={12} className="mb-3">
                    <CFormInput
                      label="School Name"
                      value={profile.school}
                      onChange={(e) => setProfile({ ...profile, school: e.target.value })}
                      required
                    />
                  </CCol>
                  <CCol xs={12} className="mb-3">
                    <CFormInput
                      label="Subject"
                      value={profile.subject}
                      onChange={(e) => setProfile({ ...profile, subject: e.target.value })}
                      required
                    />
                  </CCol>
                  <CCol xs={12} className="mb-3">
                    <CFormInput
                      type="file"
                      label="Profile Picture"
                      onChange={handleFileChange}
                      accept="image/jpeg,image/png"
                    />
                    <small className="text-medium-emphasis">
                      Max file size: 2MB. Accepted formats: JPEG, PNG
                    </small>
                  </CCol>
                </CRow>
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
              </CForm>
            )}
          </CCardBody>
        </CCard>
      </CCol>
    </CRow>
  )
}

export default Profile 