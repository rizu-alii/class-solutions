import React from 'react'
import { Navigate, Route, Routes } from 'react-router-dom'
import { CContainer } from '@coreui/react'

// routes config
import routesConfig from '../routesConfig'

const AppContent = () => {
  return (
    <CContainer className="px-4" lg>
      <Routes>
        {routesConfig.map((route, idx) => {
          return (
            route.element && (
              <Route
                key={idx}
                path={route.path}
                element={<route.element />}
              />
            )
          )
        })}
        <Route path="/" element={<Navigate to="students/add" replace />} />
      </Routes>
    </CContainer>
  )
}

export default AppContent
