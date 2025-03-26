import Cookies from "js-cookie"

import { VocabularyT, VocabularyListIdT, WordTestIdT, WordTestT, QuestionT } from "../types"
import { myVocabularyList } from "./vocabulary/data"
import { dateFormat, randomInt, randomIntArr, sleep } from "../commonFun"

export const createWordTest = async (request: {
	id?: WordTestIdT
	vocabularyListId: VocabularyListIdT
	multipleChoice: number
	question: number
	description?: string
}): Promise<WordTestIdT> => {
	await sleep(1000)

	const newWordTestArr: WordTestT[] = JSON.parse(Cookies.get("wordTestArr") ?? "[]")
	const wordTestIdArr = newWordTestArr.map((info) => info.id)

	let newId = request.id ?? ""
	if (request.id === undefined) {
		do {
			newId = `wordTest${randomInt(9999).toString().padStart(4, "0")}`
		} while (wordTestIdArr.includes(newId))
	} else {
		if (wordTestIdArr.includes(request.id)) {
			throw new Error(`word test id "${newId}" alreay existed.`)
		} else if (localStorage.getItem(request.id) !== null) {
			throw new Error(`storage data id "${newId}" alreay existed.`)
		}
	}

	const newWordTest: WordTestT = {
		id: newId,
		VocabularyListId: request.vocabularyListId,
		multipleChoice: request.multipleChoice,
		createdDate: dateFormat(new Date()),
	}

	if (request.description !== undefined) {
		newWordTest.description = request.description
	}

	let vocabularyDataArr: VocabularyT[]
	if (request.vocabularyListId === "helloword") {
		vocabularyDataArr = myVocabularyList.dataArr
	} else {
		const vocabularyStorage = localStorage.getItem(request.vocabularyListId)
		if (vocabularyStorage != null) {
			vocabularyDataArr = JSON.parse(vocabularyStorage)
		} else {
			throw new Error(`vocabulary list - id "${request.vocabularyListId}" not existed.`)
		}
	}

	const questionArr: QuestionT[] = []
	let answerArr: number[]
	for (let i = 0; i < request.question; i++) {
		answerArr = randomIntArr(request.multipleChoice, vocabularyDataArr.length - 1).map((index) => vocabularyDataArr[index].id)

		questionArr.push({
			type: randomInt(1) == 0 ? "word" : "meaning",
			correctAnswerId: answerArr[randomInt(request.multipleChoice - 1)],
			answerIds: answerArr,
		})
	}

	newWordTestArr.push(newWordTest)
	Cookies.set("wordTestArr", JSON.stringify(newWordTestArr))
	localStorage.setItem(newId, JSON.stringify(questionArr))

	return newId
}

// export const getWordTest = async (request: { id: WordTestIdT }): Promise<WordTestT> => {
// 	const wordTestArr: WordTestT[] = JSON.parse(Cookies.get("wordTestArr") ?? "[]")
// 	const wordTest: WordTestT | undefined = wordTestArr.find((info) => {
// 		if (info.id == request.id) {
// 			return info
// 		}
// 	})
// 	const questionStorage = localStorage.getItem(request.id)

// 	if (wordTest !== undefined && questionStorage !== null) {
// 		return wordTest
// 	} else {
// 		throw new Error(`word test "${request.id}" not existed.`)
// 	}
// }

export const deleteWordTest = async (request: { id: WordTestIdT }): Promise<boolean> => {
	const wordTestArrBefore: WordTestT[] = JSON.parse(Cookies.get("wordTestArr") ?? "[]")

	Cookies.set("wordTestArr", JSON.stringify(wordTestArrBefore.filter((info) => info.id !== request.id)))
	localStorage.removeItem(request.id)

	const wordTestArrAfter: WordTestT[] = JSON.parse(Cookies.get("wordTestArr") ?? "[]")

	return localStorage.getItem(request.id) === null && wordTestArrAfter.filter((info) => info.id === request.id).length === 0
}

// export const getWordTestArr = async (): Promise<WordTestT[]> => {
// 	return JSON.parse(Cookies.get("wordTestArr") ?? "[]")
// }
