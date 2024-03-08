import { BrowserRouter, Route, Routes } from 'react-router-dom'
import routers from './constants/routers'
import NotFound from './pages/NotFound'
// import your icons

function App() {
  return (
    <BrowserRouter>
      {/* <Routes>
        <Route
          path={Paths.HOME}
          element={<Home />}
        />
      </Routes>
      <Routes>
        <Route
          path={Paths.PROGRAM_EDUCATIONS}
          element={<ProgramEducations />}
        />
      </Routes> */}
      <Routes>
        {routers.map((router, index) => {
          const Layout = router.layout
          const Page = router.component
          return (
            <Route
              key={index}
              path={router.path}
              element={<Layout>{Page && <Page />}</Layout>}
            ></Route>
          )
        })}
        <Route
          path="*"
          element={<NotFound />}
        />
      </Routes>
    </BrowserRouter>
  )
}

export default App
