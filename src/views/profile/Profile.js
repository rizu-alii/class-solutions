import React, { useState, useRef } from 'react'
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
import CIcon from '@coreui/icons-react'
import './Profile.css'

const staticProfile = {
  name: 'John Doe',
  email: 'admin@example.com',
  phone: '',
  school: '',
  subject: 'Mathematics',
  profile_picture: null,
}

const defaultAvatar = 'https://www.w3schools.com/howto/img_avatar.png'

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
  const [profileImage, setProfileImage] = useState(null)
  const fileInputRef = useRef(null)
  const [showNewPassword, setShowNewPassword] = useState(false)
  const [showConfirmPassword, setShowConfirmPassword] = useState(false)

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

  const handleImageClick = () => {
    fileInputRef.current.click()
  }

  const handleImageChange = (e) => {
    if (e.target.files && e.target.files[0]) {
      setProfileImage(URL.createObjectURL(e.target.files[0]))
    }
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
            {tab !== 'password' && (
              <div style={{ display: 'flex', justifyContent: 'center', marginBottom: 24 }}>
                <div
                  style={{
                    width: 120,
                    height: 120,
                    borderRadius: '50%',
                    overflow: 'hidden',
                    border: '3px solid #4f5d75',
                    cursor: 'pointer',
                    position: 'relative',
                  }}
                  onClick={handleImageClick}
                  title="Click to change profile picture"
                  className="profile-avatar-hover"
                >
                  <img
                    src={profileImage || defaultAvatar}
                    alt="Profile"
                    style={{ width: '100%', height: '100%', objectFit: 'cover' }}
                  />
                  <input
                    type="file"
                    accept="image/*"
                    ref={fileInputRef}
                    style={{ display: 'none' }}
                    onChange={handleImageChange}
                  />
                  <span className="avatar-camera-icon" style={{
                    position: 'absolute',
                    left: 0,
                    top: 0,
                    width: '100%',
                    height: '100%',
                    display: 'flex',
                    alignItems: 'center',
                    justifyContent: 'center',
                    background: 'rgba(0,0,0,0.25)',
                    color: '#fff',
                    opacity: 0,
                    transition: 'opacity 0.2s',
                    fontSize: 32,
                  }}>
                    <span style={{ fontSize: 32 }}>📷</span>
                  </span>
                </div>
              </div>
            )}
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
                    <div style={{ position: 'relative' }}>
                      <CFormInput
                        type={showNewPassword ? 'text' : 'password'}
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
                      <span
                        style={{
                          position: 'absolute',
                          right: 12,
                          top: '70%',
                          transform: 'translateY(-50%)',
                          cursor: 'pointer',
                          zIndex: 2,
                        }}
                        onClick={() => setShowNewPassword((v) => !v)}
                        title={showNewPassword ? 'Hide password' : 'Show password'}
                      >
                        <span style={{ fontSize: 20 }}>
                          {showNewPassword ? '🙈' : '👁️'}
                        </span>
                      </span>
                    </div>
                  </CCol>
                  <CCol xs={12} className="mb-3">
                    <div style={{ position: 'relative' }}>
                      <CFormInput
                        type={showConfirmPassword ? 'text' : 'password'}
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
                      <span
                        style={{
                          position: 'absolute',
                          right: 12,
                          top: '70%',
                          transform: 'translateY(-50%)',
                          cursor: 'pointer',
                          zIndex: 2,
                        }}
                        onClick={() => setShowConfirmPassword((v) => !v)}
                        title={showConfirmPassword ? 'Hide password' : 'Show password'}
                      >
                        <span style={{ fontSize: 20 }}>
                          {showConfirmPassword ? '🙈' : '👁️'}
                        </span>
                      </span>
                    </div>
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