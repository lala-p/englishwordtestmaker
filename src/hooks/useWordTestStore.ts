import { create } from "zustand"
import Cookies from "js-cookie"

import { QuestionT, WordTestIdT, WordTestT, VocabularyIdT, VocabularyT, StepT } from "../types"
import { myVocabularyList } from "../fetchdata/vocabulary/data"

type StateT = {
	current?: {
		id?: WordTestIdT
		vocabularyDictionary: { [id: VocabularyIdT]: { word: string; meaning: string } }
		stepArr: StepT[]
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
		const wordTestArr: WordTestT[] = JSON.parse(Cookies.get("wordTestArr") ?? "[]")
		const wordTest: WordTestT | undefined = wordTestArr.find((info) => {
			if (info.id == wordTestId) {
				return info
			}
		})
		const questionStorage = localStorage.getItem(wordTestId)

		if (wordTest === undefined || questionStorage === null) {
			throw new Error(`word test id "${wordTestId}" not existed.`)
		}

		const questionArr: QuestionT[] = JSON.parse(questionStorage)

		let vocabularyDataArr: VocabularyT[]
		if (wordTest.VocabularyListId === "helloword") {
			vocabularyDataArr = myVocabularyList.dataArr
		} else {
			const vocabularyStorage = localStorage.getItem(wordTest.VocabularyListId)
			if (vocabularyStorage != null) {
				vocabularyDataArr = JSON.parse(vocabularyStorage)
			} else {
				throw new Error(`vocabulary list id "${wordTest.VocabularyListId}" not existed.`)
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

		const stepArr: StepT[] = questionArr.map<StepT>((q, index) => {
			const step: StepT = {
				id: `step${index + 1}`,
				type: q.type,
				answerIds: q.answerIds,
				correctAnswerId: q.correctAnswerId,
				answerTarget: "",
				answers: [],
				yourAnswer: null,
			}

			switch (q.type) {
				case "word":
					step.answerTarget = vocabularyDictionary[q.correctAnswerId].meaning
					step.answers = q.answerIds.map((id) => {
						return { id, data: vocabularyDictionary[id].word }
					})
					break

				case "meaning":
					step.answerTarget = vocabularyDictionary[q.correctAnswerId].word
					step.answers = q.answerIds.map((id) => {
						return { id, data: vocabularyDictionary[id].meaning }
					})
					break
			}

			return step
		})

		const newAnswerArr = new Array(stepArr.length)
		newAnswerArr.fill(null)

		set(() => ({
			current: {
				id: wordTestId,
				vocabularyDictionary: vocabularyDictionary,
				stepArr: stepArr,
				answerArr: newAnswerArr,
				answerCheckNum: 0,
			},
		}))
	},
	setCurrentAnswer: (questionIndex: number, vocabularyId: VocabularyIdT) => {
		const newCurrent = get().current
		if (newCurrent === undefined || newCurrent.stepArr.length === 0) {
			throw new Error(`current word test not existed.`)
		}

		if (newCurrent.stepArr[questionIndex].yourAnswer === null) {
			newCurrent.answerCheckNum = newCurrent.answerCheckNum + 1
		}
		newCurrent.stepArr[questionIndex].yourAnswer = vocabularyId

		set(() => ({ current: newCurrent }))
	},
	unsetCurrentAnswer: (questionIndex: number) => {
		const newCurrent = get().current
		if (newCurrent === undefined || newCurrent.stepArr.length === 0) {
			throw new Error(`current word test not existed.`)
		}

		if (newCurrent.stepArr[questionIndex].yourAnswer != null) {
			newCurrent.answerCheckNum = newCurrent.answerCheckNum - 1
		}
		newCurrent.stepArr[questionIndex].yourAnswer = null

		set(() => ({ current: newCurrent }))
	},
}))

export default useWordTestStore
