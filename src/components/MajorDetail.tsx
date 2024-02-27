const MajorDetail = () => {
  return (
    <div className="w-full shadow-md rounded-md p-4 flex flex-col gap-2">
      <h1 className="text-lg font-montserrat font-semibold">
        Công nghệ thông tin
      </h1>
      <div>
        <span>Mã ngành: </span>
        <span>7480201</span>
      </div>
      <div className="flex gap-20">
        <div>
          <a
            href="/"
            className="font-montserrat text-primary_color hover:text-primary_color_hover hover:underline"
          >
            Chương trình đào tạo (120){' '}
          </a>
        </div>
        <div>
          <a
            href="/"
            className="font-montserrat text-primary_color hover:text-primary_color_hover hover:underline"
          >
            Trường đào tạo (50)
          </a>
        </div>
      </div>
    </div>
  )
}
export default MajorDetail
