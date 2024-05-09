import { useEffect, useState } from 'react'
import { defaultParams } from '../models/QueryParams'

export const useFetchPagination = (
  fetchAPI: any,
  searchParams: any,
  size?: number
) => {
  const [data, setData] = useState<any[]>([])
  const [page, setPage] = useState<number>(defaultParams.page as number)
  const [isFetching, setIsFetching] = useState<boolean>(false)
  const [total, setTotal] = useState<number>(0)

  const fetchData = async () => {
    console.log('search', searchParams)
    try {
      setIsFetching(true)
      const response = await fetchAPI(
        { page: page - 1, size: size || defaultParams.size },
        searchParams
      )
      setTotal(response.meta.total)
      setData([...response.data])
    } catch (error) {
      console.log(error)
    } finally {
      setIsFetching(false)
    }
  }
  const changePage = (page: number) => {
    setPage(page)
  }
  useEffect(() => {
    fetchData()
  }, [page])

  return {
    page,
    data,
    total,
    isFetching,
    changePage,
    fetchData,
  }
}
