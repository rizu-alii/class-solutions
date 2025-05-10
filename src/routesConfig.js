import React from 'react'
import AddStudent from './views/students/AddStudent'
import Attendance from './views/attendance/Attendance'
import MarkAttendance from './views/attendance/MarkAttendance'
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