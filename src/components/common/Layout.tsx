import Navbar from './Navbar'

const Layout = ({ children }: { children: React.ReactNode }) => {
  return (
    <div className=" px-4 py-2 w-full h-full">
      <Navbar />

      {children}
    </div>
  )
}
export default Layout
