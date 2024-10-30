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

type ActionsT = {
	initWordTestStore: () => void
	setCurrentWordTest: (wordTestId: WordTestIdT) => void
}

const initialState: StateT = {}

const useWordTestStore = create<StateT & ActionsT>((set) => ({
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

		let usedVocabularyIdSet = new Set<VocabularyIdT>()
		questionArr.forEach((question) => {
			usedVocabularyIdSet.add(question.correctAnswer)
			question.wrongAnswers.forEach((answer) => {
				usedVocabularyIdSet.add(answer)
			})
		})

		let usedVocabularyIdArr: VocabularyIdT[] = Array.from(usedVocabularyIdSet)
		let vocabularyDictionary: { [id: VocabularyIdT]: { word: string; meaning: string } } = {}

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
				answerArr: [],
			},
		})

		set(() => ({
			current: {
				id: wordTestId,
				vocabularyDictionary: vocabularyDictionary,
				questionArr: questionArr,
				answerArr: [],
			},
		}))
	},
}))

export default useWordTestStore
