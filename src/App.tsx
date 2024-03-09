// import your icons

import { RouterProvider } from 'react-router-dom'
import routers from './constants/routers'

function App() {
  return (
    <>
      <RouterProvider router={routers} />
    </>
  )
}

export default App
