import { create } from "zustand"
import Cookies from "js-cookie"

import { QuestionT, WordTestIdT, WordTestInfoT } from "../fetchdata/wordTest"
import { VocabularyIdT, VocabularyT } from "../fetchdata/vocabulary"
import { myVocabularyList } from "../fetchdata/vocabulary/data"

type StateT = {
	current?: {
		id?: WordTestIdT
		vocabularyDictionary: { [id: VocabularyIdT]: { word: string; meaning: string } }
		questionArr: QuestionT[]
		answerArr: Array<VocabularyIdT | null>
		answerCheckNum: number
	}
}

/* eslint-disable no-unused-vars */
type ActionsT = {
	initWordTestStore: () => void
	setCurrentWordTest: (wordTestId: WordTestIdT) => void
	setCurrentAnswer: (questionIndex: number, vocabularyId: VocabularyIdT) => void
	unsetCurrentAnswer: (questionIndex: number) => void
}

const initialState: StateT = {}

const useWordTestStore = create<StateT & ActionsT>((set, get) => ({
	...initialState,
	initWordTestStore: () => {},
	setCurrentWordTest: (wordTestId: WordTestIdT) => {
		const wordTestInfoArr: WordTestInfoT[] = JSON.parse(Cookies.get("wordTestInfoArr") ?? "[]")
		const wordTestInfo: WordTestInfoT | undefined = wordTestInfoArr.find((info) => {
			if (info.id == wordTestId) {
				return info
			}
		})
		const questionStorage = localStorage.getItem(wordTestId)

		if (wordTestInfo === undefined || questionStorage === null) {
			throw new Error(`word test id "${wordTestId}" not existed.`)
		}

		const questionArr: QuestionT[] = JSON.parse(questionStorage)

		let vocabularyDataArr: VocabularyT[]
		if (wordTestInfo.VocabularyListId === "helloword") {
			vocabularyDataArr = myVocabularyList.dataArr
		} else {
			const vocabularyStorage = localStorage.getItem(wordTestInfo.VocabularyListId)
			if (vocabularyStorage != null) {
				vocabularyDataArr = JSON.parse(vocabularyStorage)
			} else {
				throw new Error(`vocabulary list id "${wordTestInfo.VocabularyListId}" not existed.`)
			}
		}

		const usedVocabularyIdSet = new Set<VocabularyIdT>()
		questionArr.forEach((question) => {
			question.answerIds.forEach((answer) => {
				usedVocabularyIdSet.add(answer)
			})
		})

		const usedVocabularyIdArr: VocabularyIdT[] = Array.from(usedVocabularyIdSet)
		const vocabularyDictionary: { [id: VocabularyIdT]: { word: string; meaning: string } } = {}

		vocabularyDataArr.forEach((data) => {
			if (usedVocabularyIdArr.includes(data.id)) {
				vocabularyDictionary[data.id] = {
					word: data.word,
					meaning: data.meaning,
				}
			}
		})

		const newAnswerArr = new Array(questionArr.length)
		newAnswerArr.fill(null)

		set(() => ({
			current: {
				id: wordTestId,
				vocabularyDictionary: vocabularyDictionary,
				questionArr: questionArr,
				answerArr: newAnswerArr,
				answerCheckNum: 0,
			},
		}))
	},
	setCurrentAnswer: (questionIndex: number, vocabularyId: VocabularyIdT) => {
		const newCurrent = get().current
		if (newCurrent === undefined || newCurrent.answerArr.length === 0) {
			throw new Error(`current word test not existed.`)
		}

		if (newCurrent.answerArr[questionIndex] === null) {
			newCurrent.answerCheckNum = newCurrent.answerCheckNum + 1
		}
		newCurrent.answerArr[questionIndex] = vocabularyId

		set(() => ({ current: newCurrent }))
	},
	unsetCurrentAnswer: (questionIndex: number) => {
		const newCurrent = get().current
		if (newCurrent === undefined || newCurrent.answerArr.length === 0) {
			throw new Error(`current word test not existed.`)
		}

		if (newCurrent.answerArr[questionIndex] != null) {
			newCurrent.answerCheckNum = newCurrent.answerCheckNum - 1
		}
		newCurrent.answerArr[questionIndex] = null

		set(() => ({ current: newCurrent }))
	},
}))

export default useWordTestStore
