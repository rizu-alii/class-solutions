// src/mockData.js

// Helper functions for localStorage
function getData(key, fallback) {
  const data = localStorage.getItem(key)
  return data ? JSON.parse(data) : fallback
}
function setData(key, value) {
  localStorage.setItem(key, JSON.stringify(value))
}

// Default data
const defaultTeacher = {
  name: 'John Doe',
  email: 'admin@example.com',
  subject: 'Mathematics',
  profile_picture: null,
}
const defaultStudents = [
  {
    id: 1,
    name: 'Alice Smith',
    roll_no: '101',
    class: '5',
    section: 'A',
    father_name: 'Robert Smith',
    father_phone: '1234567890',
    photo: null,
    behaviour: 'Excellent',
  },
  {
    id: 2,
    name: 'Bob Johnson',
    roll_no: '102',
    class: '5',
    section: 'A',
    father_name: 'Michael Johnson',
    father_phone: '2345678901',
    photo: null,
    behaviour: 'Good',
  },
]
const defaultAttendance = []

// Initialize data if not present
if (!localStorage.getItem('teacher')) setData('teacher', defaultTeacher)
if (!localStorage.getItem('students')) setData('students', defaultStudents)
if (!localStorage.getItem('attendance')) setData('attendance', defaultAttendance)

// Data management functions
export const mockData = {
  // Teacher
  getTeacher: () => getData('teacher', defaultTeacher),
  setTeacher: (teacher) => setData('teacher', teacher),

  // Students
  getStudents: () => getData('students', defaultStudents),
  addStudent: (student) => {
    const students = getData('students', defaultStudents)
    const newId = students.length ? Math.max(...students.map(s => s.id)) + 1 : 1
    const newStudent = { ...student, id: newId }
    students.push(newStudent)
    setData('students', students)
    return newStudent
  },
  updateStudent: (id, updates) => {
    const students = getData('students', defaultStudents)
    const idx = students.findIndex(s => String(s.id) === String(id))
    if (idx !== -1) {
      students[idx] = { ...students[idx], ...updates }
      setData('students', students)
      return students[idx]
    }
    return null
  },
  deleteStudent: (id) => {
    let students = getData('students', defaultStudents)
    students = students.filter(s => String(s.id) !== String(id))
    setData('students', students)
  },
  getStudent: (id) => {
    const students = getData('students', defaultStudents)
    return students.find(s => String(s.id) === String(id))
  },

  // Attendance
  getAttendance: (filters = {}) => {
    let attendance = getData('attendance', defaultAttendance)
    Object.entries(filters).forEach(([key, value]) => {
      if (value) attendance = attendance.filter(a => String(a[key]) === String(value))
    })
    return attendance
  },
  markAttendance: (attendanceData) => {
    let attendance = getData('attendance', defaultAttendance)
    attendance = attendance.filter(a =>
      !attendanceData.some(n => n.student_id === a.student_id && n.date === a.date)
    )
    attendance = attendance.concat(attendanceData)
    setData('attendance', attendance)
  },
} 