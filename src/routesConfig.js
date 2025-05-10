import React from 'react'
import AddStudent from './views/students/AddStudent'
import Attendance from './views/attendance/Attendance'
import MarkAttendance from './views/attendance/MarkAttendance'

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
]

export default routesConfig 