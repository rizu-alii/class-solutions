// Mock API using localStorage for persistence

// --- Helper functions ---
function getData(key, fallback) {
  const data = localStorage.getItem(key)
  return data ? JSON.parse(data) : fallback
}
function setData(key, value) {
  localStorage.setItem(key, JSON.stringify(value))
}

// --- Sample Data ---
const defaultTeacher = {
  name: 'John Doe',
  email: 'admin@example.com',
  subject: 'Mathematics',
  profile_picture: null,
  password: 'admin123',
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

// --- Initialize Data if not present ---
if (!localStorage.getItem('teacher')) setData('teacher', defaultTeacher)
if (!localStorage.getItem('students')) setData('students', defaultStudents)
if (!localStorage.getItem('attendance')) setData('attendance', defaultAttendance)

// --- Auth APIs ---
export const authAPI = {
  login: async ({ email, password }) => {
    const teacher = getData('teacher', defaultTeacher)
    if (email === teacher.email && password === teacher.password) {
      localStorage.setItem('token', 'mock-token')
      return { data: { token: 'mock-token' } }
    } else {
      const error = { response: { data: { message: 'Invalid credentials' } } }
      throw error
    }
  },
  logout: async () => {
    localStorage.removeItem('token')
    return { data: { message: 'Logged out' } }
  },
}

// --- Teacher APIs ---
export const teacherAPI = {
  getProfile: async () => {
    return { data: getData('teacher', defaultTeacher) }
  },
  updateProfile: async (data) => {
    const teacher = { ...getData('teacher', defaultTeacher), ...Object.fromEntries(data.entries ? data.entries() : Object.entries(data)) }
    setData('teacher', teacher)
    return { data: teacher }
  },
  changePassword: async ({ old_password, new_password }) => {
    const teacher = getData('teacher', defaultTeacher)
    if (old_password !== teacher.password) {
      const error = { response: { data: { message: 'Current password is incorrect' } } }
      throw error
    }
    teacher.password = new_password
    setData('teacher', teacher)
    return { data: { message: 'Password changed' } }
  },
}

// --- Student APIs ---
export const studentAPI = {
  addStudent: async (data) => {
    const students = getData('students', defaultStudents)
    const newId = students.length ? Math.max(...students.map(s => s.id)) + 1 : 1
    const student = { id: newId, ...Object.fromEntries(data.entries ? data.entries() : Object.entries(data)) }
    students.push(student)
    setData('students', students)
    return { data: student }
  },
  getStudents: async (filters = {}) => {
    let students = getData('students', defaultStudents)
    Object.entries(filters).forEach(([key, value]) => {
      if (value) students = students.filter(s => String(s[key]).toLowerCase().includes(String(value).toLowerCase()))
    })
    return { data: students }
  },
  getStudent: async (id) => {
    const students = getData('students', defaultStudents)
    const student = students.find(s => String(s.id) === String(id))
    return { data: student }
  },
  updateStudent: async (id, data) => {
    const students = getData('students', defaultStudents)
    const idx = students.findIndex(s => String(s.id) === String(id))
    if (idx === -1) throw { response: { data: { message: 'Student not found' } } }
    students[idx] = { ...students[idx], ...Object.fromEntries(data.entries ? data.entries() : Object.entries(data)) }
    setData('students', students)
    return { data: students[idx] }
  },
  deleteStudent: async (id) => {
    let students = getData('students', defaultStudents)
    students = students.filter(s => String(s.id) !== String(id))
    setData('students', students)
    return { data: { message: 'Deleted' } }
  },
}

// --- Attendance APIs ---
export const attendanceAPI = {
  markAttendance: async (attendanceData) => {
    let attendance = getData('attendance', defaultAttendance)
    attendance = attendance.filter(a =>
      !attendanceData.some(
        n => n.student_id === a.student_id && n.date === a.date
      )
    )
    attendance = attendance.concat(attendanceData)
    setData('attendance', attendance)
    return { data: { message: 'Attendance marked' } }
  },
  getAttendance: async (filters = {}) => {
    let attendance = getData('attendance', defaultAttendance)
    Object.entries(filters).forEach(([key, value]) => {
      if (value) attendance = attendance.filter(a => String(a[key]) === String(value))
    })
    return { data: attendance }
  },
}

// --- Report APIs ---
export const reportAPI = {
  generateReport: async (studentId) => {
    // Just return a dummy blob for demo
    const blob = new Blob([`Report for student ${studentId}`], { type: 'application/pdf' })
    return { data: blob }
  },
}

export default {} // No default export needed, but keep for compatibility 