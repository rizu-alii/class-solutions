import React from 'react'
import CIcon from '@coreui/icons-react'
import { cilUserPlus, cilCalendar, cilList, cilSpeedometer } from '@coreui/icons'
import { CNavItem, CNavGroup } from '@coreui/react'

const _nav = [
  {
    component: CNavItem,
    name: 'Dashboard',
    to: '/dashboard',
    icon: <CIcon icon={cilSpeedometer} customClassName="nav-icon" />,
  },
  {
    component: CNavGroup,
    name: 'Attendance',
    icon: <CIcon icon={cilCalendar} customClassName="nav-icon" />,
    items: [
      {
        component: CNavItem,
        name: 'Mark Attendance',
        to: '/attendance',
      },
      {
        component: CNavItem,
        name: 'View Attendance',
        to: '/attendance/view',
      },
    ],
  },
  {
    component: CNavGroup,
    name: 'Student Management',
    icon: <CIcon icon={cilList} customClassName="nav-icon" />,
    items: [
      {
        component: CNavItem,
        name: 'View Student',
        to: '/reports/view-student',
      },
      {
        component: CNavItem,
        name: 'Add Student',
        to: '/students/add',
        icon: <CIcon icon={cilUserPlus} customClassName="nav-icon" />,
      },
    ],
  },
  {
    component: CNavGroup,
    name: 'Profile',
    icon: <CIcon icon={cilUserPlus} customClassName="nav-icon" />,
    items: [
      {
        component: CNavItem,
        name: 'Update Profile',
        to: '/profile/update',
      },
      {
        component: CNavItem,
        name: 'Change Password',
        to: '/profile/change-password',
      },
    ],
  },
  {
    component: CNavItem,
    name: 'Test Management',
    to: '/test-management',
    badge: {
      color: 'info',
      text: 'NEW',
    },
  },
]

export default _nav
