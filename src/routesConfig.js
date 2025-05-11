import React from 'react'
import AddStudent from './views/students/AddStudent'
import Attendance from './views/attendance/Attendance'
import MarkAttendance from './views/attendance/MarkAttendance'
import ViewAttendance from './views/attendance/ViewAttendance'
import UpdateAttendance from './views/attendance/UpdateAttendance'
import ViewStudentReport from './views/reports/ViewStudentReport'
import UpdateStudent from './views/reports/UpdateStudent'
import StudentDetails from './views/reports/StudentDetails'
import AttendanceDetails from './views/attendance/AttendanceDetails'
import StudentAttendanceReport from './views/attendance/StudentAttendanceReport'
import Dashboard from './views/dashboard/Dashboard'
import AbsentYesterday from './views/attendance/AbsentYesterday'
import StudentProfile from './views/students/StudentProfile'
import UpdateProfile from './views/profile/UpdateProfile'
import ChangePassword from './views/profile/ChangePassword'
import TestManagement from './views/test/TestManagement'

const routesConfig = [
  {
    path: 'students/add',
    element: AddStudent,
  },
  {
    path: 'attendance',
    element: Attendance,
  },
  {
    path: 'attendance/mark',
    element: MarkAttendance,
  },
  {
    path: 'attendance/view',
    element: ViewAttendance,
  },
  {
    path: 'attendance/update/:id',
    element: UpdateAttendance,
  },
  {
    path: 'reports/view-student',
    element: ViewStudentReport,
  },
  {
    path: 'reports/update-student/:id',
    element: UpdateStudent,
  },
  {
    path: 'reports/student-details/:id',
    element: StudentDetails,
  },
  {
    path: 'attendance/details/:id',
    element: AttendanceDetails,
  },
  {
    path: 'attendance/report/:id',
    element: StudentAttendanceReport,
  },
  {
    path: 'dashboard',
    element: Dashboard,
  },
  {
    path: 'attendance/absent-yesterday',
    element: AbsentYesterday,
  },
  {
    path: 'students/profile/:id',
    element: StudentProfile,
  },
  {
    path: 'profile/update',
    element: UpdateProfile,
  },
  {
    path: 'profile/change-password',
    element: ChangePassword,
  },
  {
    path: 'test-management',
    element: TestManagement,
  },
]

export default routesConfig 