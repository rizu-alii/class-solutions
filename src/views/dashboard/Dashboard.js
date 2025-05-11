import React from 'react'
import {
  CRow, CCol, CCard, CCardBody, CCardHeader, CButton, CWidgetStatsA, CWidgetStatsC
} from '@coreui/react'
import { CChartDoughnut } from '@coreui/react-chartjs'
import { useNavigate } from 'react-router-dom'

const Dashboard = () => {
  const navigate = useNavigate()
  // Dummy data
  const totalStudents = 320
  const totalClasses = 12
  const avgAttendance = 87.5 // percent for this month
  const lowAttendance = 14
  const attendanceDist = [220, 70, 30] // Present, Absent, Leave
  const attendanceLabels = ['Present', 'Absent', 'Leave']
  const attendanceColors = ['#2ecc71', '#e74c3c', '#f1c40f']
  const todayAttendance = 92 // percent present today

  return (
    <div style={{ color: 'white' }}>
      <style>{`
        .neon-glow, .neon-header, .neon-glow * {
          color: white !important;
        }
      `}</style>
      <CRow className="mb-4">
        <CCol xs={12} md={3}>
          <CWidgetStatsC
            className="mb-3 neon-glow"
            color="primary"
            icon={<i className="cil-people" style={{ fontSize: 32 }} />}
            value={totalStudents}
            title="Total Students"
          />
        </CCol>
        <CCol xs={12} md={3}>
          <CWidgetStatsC
            className="mb-3 neon-glow"
            color="info"
            icon={<i className="cil-school" style={{ fontSize: 32 }} />}
            value={totalClasses}
            title="Total Classes"
          />
        </CCol>
        <CCol xs={12} md={3}>
          <CWidgetStatsC
            className="mb-3 neon-glow"
            color="info"
            icon={<i className="cil-chart-pie" style={{ fontSize: 32 }} />}
            value={`${avgAttendance}%`}
            title="Avg Attendance (This Month)"
          />
        </CCol>
        <CCol xs={12} md={3}>
          <CWidgetStatsC
            className="mb-3 neon-glow"
            color="success"
            icon={<i className="cil-check-circle" style={{ fontSize: 32 }} />}
            value={`${todayAttendance}%`}
            title="Today's Attendance"
          />
        </CCol>
      </CRow>
      <CRow className="mb-4">
        <CCol xs={12} md={6}>
          <CCard className="neon-glow">
            <CCardHeader className="neon-header" style={{ color: 'white' }}><b>Attendance Distribution</b></CCardHeader>
            <CCardBody style={{ color: 'white' }}>
              <CChartDoughnut
                data={{
                  labels: attendanceLabels,
                  datasets: [
                    {
                      data: attendanceDist,
                      backgroundColor: attendanceColors,
                    },
                  ],
                }}
                options={{
                  plugins: {
                    legend: { display: true, position: 'bottom' },
                  },
                }}
                style={{ height: 300 }}
              />
            </CCardBody>
          </CCard>
        </CCol>
        <CCol xs={12} md={6}>
          <CCard className="neon-glow">
            <CCardHeader className="neon-header" style={{ color: 'white' }}><b>Quick Actions</b></CCardHeader>
            <CCardBody style={{ color: 'white' }}>
              <CRow className="g-3">
                <CCol xs={12} sm={6}>
                  <CButton color="primary" className="w-100 neon-glow" size="lg" style={{ backgroundColor: '', color: 'white' }} onClick={() => navigate('/attendance')}>
                    Mark Attendance
                  </CButton>
                </CCol>
                <CCol xs={12} sm={6}>
                  <CButton color="success" className="w-100 neon-glow" size="lg" style={{ backgroundColor: '', color: 'white' }} onClick={() => navigate('/students/add')}>
                    Add Student
                  </CButton>
                </CCol>
                <CCol xs={12} sm={6}>
                  <CButton color="info" className="w-100 neon-glow" size="lg" style={{ backgroundColor: '', color: 'white' }} onClick={() => navigate('/attendance/view')}>
                    Generate Report
                  </CButton>
                </CCol>
                <CCol xs={12} sm={6}>
                  <CButton color="warning" className="w-100 neon-glow" size="lg" style={{ backgroundColor: '', color: 'white' }} onClick={() => navigate('/attendance/absent-yesterday')}>
                    Absent Yesterday
                  </CButton>
                </CCol>
              </CRow>
            </CCardBody>
          </CCard>
        </CCol>
      </CRow>
    </div>
  )
}

export default Dashboard
