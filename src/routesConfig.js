import React from 'react'
import AddStudent from './views/students/AddStudent'
import Attendance from './views/attendance/Attendance'
import MarkAttendance from './views/attendance/MarkAttendance'
import ViewAttendance from './views/attendance/ViewAttendance'
import UpdateAttendance from './views/attendance/UpdateAttendance'
import ViewStudentReport from './views/reports/ViewStudentReport'
import UpdateStudent from './views/reports/UpdateStudent'
import StudentDetails from './views/reports/StudentDetails'

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
]

export default routesConfig 