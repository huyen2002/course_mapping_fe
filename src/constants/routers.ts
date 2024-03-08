import Layout from '../components/common/Layout'
import Home from '../pages/Home'
import ProgramEducations from '../pages/ProgramEducations'
import Paths from './paths'

const routers = [
  {
    path: Paths.HOME,
    component: Home,
    layout: Layout,
  },
  {
    path: Paths.PROGRAM_EDUCATIONS,
    component: ProgramEducations,
    layout: Layout,
  },
]

export default routers
