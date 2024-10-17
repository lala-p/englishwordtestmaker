import Cookies from "js-cookie"
import { VocabularyIdT, VocabularyListIdT, VocabularyT } from "./vocabulary"
import { dateFormat, randomInt, randomIntArr, sleep } from "../commonFun"
import { myVocabularyList } from "./vocabulary/data"

export type WordTestIdT = string

interface WordTestInfoT {
	id: WordTestIdT
	VocabularyListId: VocabularyListIdT
	multipleChoice: number
	createdDate: string
	description?: string
}

export interface QuestionT {
	type: "word" | "meaning"
	correctAnswer: VocabularyIdT
	wrongAnswer: VocabularyIdT[]
}

interface WordTestT extends WordTestInfoT {
	questionArr: QuestionT[]
}

export const getWordTestInfoArr = async (): Promise<WordTestInfoT[]> => {
	return JSON.parse(Cookies.get("wordTestInfoArr") ?? "[]")
}

export const getWordTestIdArr = async (): Promise<WordTestIdT[]> => {
	const wordTestInfoArr: WordTestInfoT[] = JSON.parse(Cookies.get("wordTestInfoArr") ?? "[]")
	return wordTestInfoArr.map((info) => info.id)
}

export const createWordTest = async (request: {
	id?: WordTestIdT
	vocabularyId: VocabularyListIdT
	multipleChoice: number
	question: number
	description?: string
}): Promise<WordTestIdT> => {
	await sleep(2000)

	const newWordTestInfoArr: WordTestInfoT[] = JSON.parse(Cookies.get("wordTestInfoArr") ?? "[]")
	const wordTestIdArr = newWordTestInfoArr.map((info) => info.id)

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

	const newWordTestInfo: WordTestInfoT = {
		id: newId,
		VocabularyListId: request.vocabularyId,
		multipleChoice: request.multipleChoice,
		createdDate: dateFormat(new Date()),
	}

	if (request.description !== undefined) {
		newWordTestInfo.description = request.description
	}

	let vocabularyDataArr: VocabularyT[]
	if (request.vocabularyId === "helloword") {
		vocabularyDataArr = myVocabularyList.dataArr
	} else {
		const vocabularyStorage = localStorage.getItem(request.vocabularyId)
		if (vocabularyStorage != null) {
			vocabularyDataArr = JSON.parse(vocabularyStorage)
		} else {
			throw new Error(`vocabulary list id "${request.vocabularyId}" not existed.`)
		}
	}

	const questionArr: QuestionT[] = []
	let answerArr: number[]
	for (let i = 0; i < request.question; i++) {
		answerArr = randomIntArr(request.multipleChoice, vocabularyDataArr.length - 1).map((index) => vocabularyDataArr[index].id)

		questionArr.push({
			type: randomInt(1) == 0 ? "word" : "meaning",
			correctAnswer: answerArr[0],
			wrongAnswer: answerArr.slice(1),
		})
	}

	newWordTestInfoArr.push(newWordTestInfo)
	Cookies.set("wordTestInfoArr", JSON.stringify(newWordTestInfoArr))
	localStorage.setItem(newId, JSON.stringify(questionArr))

	return newId
}

export const getWordTest = async (request: { id: WordTestIdT }): Promise<WordTestT> => {
	const wordTestInfoArr: WordTestInfoT[] = JSON.parse(Cookies.get("wordTestInfoArr") ?? "[]")
	const wordTestInfo: WordTestInfoT[] = wordTestInfoArr.filter((info) => info.id === request.id)
	const questionStorage = localStorage.getItem(request.id)

	if (wordTestInfo.length === 1 && questionStorage != null) {
		const questionArr: QuestionT[] = JSON.parse(questionStorage)

		return {
			...wordTestInfo[0],
			questionArr: questionArr,
		}
	} else {
		throw new Error(`word test "${request.id}" not existed.`)
	}
}

export const deleteWordTest = async (request: { id: WordTestIdT }): Promise<boolean> => {
	const wordTestInfoArrBefore: WordTestInfoT[] = JSON.parse(Cookies.get("wordTestInfoArr") ?? "[]")

	Cookies.set("wordTestInfoArr", JSON.stringify(wordTestInfoArrBefore.filter((info) => info.id !== request.id)))
	localStorage.removeItem(request.id)

	const wordTestInfoArrAfter: WordTestInfoT[] = JSON.parse(Cookies.get("wordTestInfoArr") ?? "[]")

	return localStorage.getItem(request.id) === null && wordTestInfoArrAfter.filter((info) => info.id === request.id).length === 0
}
