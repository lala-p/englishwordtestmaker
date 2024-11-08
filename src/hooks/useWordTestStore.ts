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
		answerArr: Array<number>
	}
}

/* eslint-disable no-unused-vars */
type ActionsT = {
	initWordTestStore: () => void
	setCurrentWordTest: (wordTestId: WordTestIdT) => void
	setCurrentAnswer: (questionIndex: number, vocabularyId: VocabularyIdT) => void
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
			usedVocabularyIdSet.add(question.correctAnswer)
			question.wrongAnswers.forEach((answer) => {
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

		console.log({
			current: {
				id: wordTestId,
				vocabularyDictionary: vocabularyDictionary,
				questionArr: questionArr,
				answerArr: new Array(questionArr.length),
			},
		})

		set(() => ({
			current: {
				id: wordTestId,
				vocabularyDictionary: vocabularyDictionary,
				questionArr: questionArr,
				answerArr: new Array(questionArr.length),
			},
		}))
	},
	setCurrentAnswer: (questionIndex: number, vocabularyId: VocabularyIdT) => {
		const newCurrent = get().current
		if (newCurrent === undefined || newCurrent.answerArr.length === 0) {
			throw new Error(`current word test not existed.`)
		}

		newCurrent.answerArr[questionIndex] = vocabularyId
		set(() => ({ current: newCurrent }))
	},
}))

export default useWordTestStore
