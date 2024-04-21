// import your icons

import { ThemeProvider, createTheme } from '@mui/material/styles'
import 'flowbite'
import 'flowbite-react'
import { RouterProvider } from 'react-router-dom'
import { ToastContainer } from 'react-toastify'
import 'react-toastify/dist/ReactToastify.css'
import routers from './constants/routers'

const theme = createTheme({
  palette: {
    primary: {
      main: '#4B9BDB',
    },
  },

  typography: {
    fontFamily: 'Montserrat, sans-serif',
  },
})
function App() {
  return (
    <ThemeProvider theme={theme}>
      <RouterProvider router={routers} />
      <ToastContainer
        position="top-right"
        autoClose={1000}
        hideProgressBar={false}
        newestOnTop={false}
        closeOnClick
        rtl={false}
        pauseOnFocusLoss
        draggable
        pauseOnHover
        theme="light"
      />
      <ToastContainer />
    </ThemeProvider>
  )
}

export default App
