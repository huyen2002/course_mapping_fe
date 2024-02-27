import { useEffect, useState } from 'react'
import { defaultParams } from '../models/QueryParams'

export const useFetchPagination = (fetchAPI: any) => {
  const [data, setData] = useState<any[]>([])
  const [page, setPage] = useState<number>(defaultParams.page)
  const [isFetching, setIsFetching] = useState<boolean>(false)
  const [total, setTotal] = useState<number>(0)

  const fetchData = async () => {
    try {
      setIsFetching(true)
      const response = await fetchAPI({
        page: page - 1,
        size: defaultParams.size,
      })
      setData(response.data)
      setTotal(response.meta.total)
    } catch (e: any) {
      console.log('Error: ' + e)
    } finally {
      setIsFetching(false)
    }
  }
  const changePage = (page: number) => {
    setPage(page)
    fetchData()
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
