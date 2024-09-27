import { VocabularyIdT, VocabularyDataT, vocabularyDataArr } from "./data"

const sleep = (delay: number) => new Promise((resolve) => setTimeout(resolve, delay))

export type { VocabularyIdT, VocabularyDataT }

export type VocabularyListIdT = string

export interface PaginationT {
	totalCount: number
}

export interface getVocabularyListT {
	list: VocabularyDataT[]
	pagination?: PaginationT
}
export const getVocabularyList = async (request: {
	// id?: VocabularyListIdT
	limit: number
	offset: number
	pagination?: boolean
}): Promise<getVocabularyListT> => {
	await sleep(1000)

	let responseData: getVocabularyListT = {
		list: vocabularyDataArr.slice(request.offset, request.offset + request.limit),
	}

	if (request.pagination) {
		responseData.pagination = {
			totalCount: vocabularyDataArr.length,
		}
	}

	return responseData
}
