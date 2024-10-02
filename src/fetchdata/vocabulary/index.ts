import { VocabularyIdT, VocabularyT, myVocabularyList } from "./data"
import { sleep } from "../../commonFun"

export type { VocabularyIdT, VocabularyT }

export type VocabularyListIdT = string

export const getVocabularyList = async (request: {
	id: VocabularyListIdT
	page: number
	pageSize: number
}): Promise<{ dataArr: VocabularyT[]; totalCount: number }> => {
	await sleep(1000)

	let dataArr: VocabularyT[] = []
	if (request.id == "helloword") {
		dataArr = myVocabularyList.dataArr
	} else {
		const dataArrStorage = localStorage.getItem(request.id)
		if (dataArrStorage !== null) {
			dataArr = JSON.parse(dataArrStorage)
		} else {
			throw new Error(`vocabulary list id "${request.id}" not existed.`)
		}
	}

	const responseData: { dataArr: VocabularyT[]; totalCount: number } = {
		dataArr: dataArr.slice(request.pageSize * (request.page - 1), request.pageSize * request.page),
		totalCount: dataArr.length,
	}

	return responseData
}
