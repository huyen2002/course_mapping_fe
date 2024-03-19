import { DocumentAPIs } from '../constants/APIs'
import { http } from '../server/http'

export const DocumentService = {
  compareTwoDocuments: async (
    firstDocument: string,
    secondDocument: string
  ) => {
    const response = (
      await http.post(DocumentAPIs.COMPARE_TWO_DOCUMENTS, {
        document_1: firstDocument,
        document_2: secondDocument,
      })
    ).data
    return {
      meta: {
        status: response.status,
        message: response.message,
      },
      data: response.data,
    }
  },
}
