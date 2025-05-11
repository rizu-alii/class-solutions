import React from 'react'
import { CFooter } from '@coreui/react'

const AppFooter = () => {
  return (
    <CFooter className="px-4">
      <div>
        developed by @rizbits
      </div>
      <div className="ms-auto">
        contact us : rizwanali.rizbits@gmail.com
      </div>
    </CFooter>
  )
}

export default React.memo(AppFooter)
