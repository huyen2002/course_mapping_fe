import MajorDetail from './components/MajorDetail'
import Navbar from './components/Navbar'

function App() {
  return (
    <div className="px-4 py-2">
      <Navbar />
      <main className="px-10 flex gap-10 w-full ">
        <div>
          <h1 className="font-semibold text-primary_color">Tìm kiếm</h1>
          <form className="flex flex-col gap-8 mt-4">
            <div>
              <label
                htmlFor="major_name"
                className="font-montserrat"
              >
                Tên ngành đào tạo
              </label>
              <br />
              <input
                type="text"
                id="major_name"
                className="outline-none border-[1px] border-gray-300 rounded-md px-2 py-1 w-80 focus:border-primary_color "
              />
            </div>
            <div>
              <label
                htmlFor="major_name"
                className="font-montserrat"
              >
                Mã ngành đào tạo
              </label>
              <br />
              <input
                type="text"
                id="major_name"
                className="p-2 outline-none border-[1px] border-gray-300 rounded-md px-2 py-1 w-80 focus:border-primary_color "
              />
            </div>
            <div className="text-sm flex justify-between">
              <button className=" text-primary_color border-button rounded-md px-2 py-1 hover:bg-white_hover">
                Đặt lại
              </button>
              <button
                type="submit"
                className="bg-primary_color text-white rounded-md px-2 py-1 hover:bg-primary_color_hover"
              >
                Tìm kiếm
              </button>
            </div>
          </form>
        </div>
        <div className="flex-1">
          <h1 className="text-2xl text-primary_color font-bold">
            Ngành đào tạo
          </h1>
          <div className="flex flex-col gap-8 mt-4">
            <MajorDetail />
            <MajorDetail />
            <MajorDetail />
          </div>
        </div>
      </main>
    </div>
  )
}

export default App
