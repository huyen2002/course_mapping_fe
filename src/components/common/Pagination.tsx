const Pagination = ({
  total,
  currentPage,
  size,
  changePage,
}: {
  total: number
  currentPage: number
  size: number
  changePage: (page: number) => void
}) => {
  const totalPages = Math.ceil(total / size)

  console.log('currentPage', currentPage)
  const handlePreviousPage = () => {
    if (currentPage > 1) {
      changePage(currentPage - 1)
    }
  }
  const handleNextPage = () => {
    if (currentPage < totalPages) {
      changePage(currentPage + 1)
    }
  }
  return (
    <div className="float-right flex items-center gap-2">
      <h1>{`Tổng: ${total}`}</h1>
      <nav aria-label="Page navigation example">
        <ul className="flex items-center -space-x-px h-10 text-base">
          <li>
            <button
              onClick={handlePreviousPage}
              className="flex items-center justify-center px-4 h-10 ms-0 leading-tight text-gray-500 bg-white border border-e-0 border-gray-300 rounded-s-lg hover:bg-gray-100 hover:text-gray-700 dark:bg-gray-800 dark:border-gray-700 dark:text-gray-400 dark:hover:bg-gray-700 dark:hover:text-white"
            >
              <span className="sr-only">Previous</span>
              <svg
                className="w-3 h-3 rtl:rotate-180"
                aria-hidden="true"
                xmlns="http://www.w3.org/2000/svg"
                fill="none"
                viewBox="0 0 6 10"
              >
                <path
                  stroke="currentColor"
                  strokeLinecap="round"
                  strokeLinejoin="round"
                  strokeWidth="2"
                  d="M5 1 1 5l4 4"
                />
              </svg>
            </button>
          </li>
          {Array.from({ length: totalPages }, (_, i) => (
            <li key={i}>
              <button
                onClick={() => changePage(i + 1)}
                className={` ${
                  currentPage === i + 1
                    ? 'bg-blue-50 hover:bg-blue-100 hover:text-blue-700 text-blue-600'
                    : 'bg-white hover:bg-gray-100 hover:text-gray-700 text-gray-500'
                }
                flex items-center justify-center px-4 h-10 leading-tight   border border-gray-300`}
              >
                {i + 1}
              </button>
            </li>
          ))}

          <li>
            <button
              onClick={handleNextPage}
              className="flex items-center justify-center px-4 h-10 leading-tight text-gray-500 bg-white border border-gray-300 rounded-e-lg hover:bg-gray-100 hover:text-gray-700 dark:bg-gray-800 dark:border-gray-700 dark:text-gray-400 dark:hover:bg-gray-700 dark:hover:text-white"
            >
              <span className="sr-only">Next</span>
              <svg
                className="w-3 h-3 rtl:rotate-180"
                aria-hidden="true"
                xmlns="http://www.w3.org/2000/svg"
                fill="none"
                viewBox="0 0 6 10"
              >
                <path
                  stroke="currentColor"
                  strokeLinecap="round"
                  strokeLinejoin="round"
                  strokeWidth="2"
                  d="m1 9 4-4-4-4"
                />
              </svg>
            </button>
          </li>
        </ul>
      </nav>
    </div>
  )
}
export default Pagination
