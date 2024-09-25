import { VocabularyIdT, VocabularyDataT, vocabularyDataArr } from "./data"

const sleep = (delay: number) => new Promise((resolve) => setTimeout(resolve, delay))

export type { VocabularyIdT, VocabularyDataT }

export interface PaginationT {
	totalCount: number
}

export interface getVocabularyListT {
	list: VocabularyDataT[]
	pagination?: PaginationT
}
export const getVocabularyList = async (params: { limit: number; offset: number; pagination?: boolean }): Promise<getVocabularyListT> => {
	// await sleep(1000)

	let responseData: getVocabularyListT = {
		list: vocabularyDataArr.slice(params.offset, params.offset + params.limit),
	}

	if (params.pagination) {
		responseData.pagination = {
			totalCount: vocabularyDataArr.length,
		}
	}

	return responseData
}
