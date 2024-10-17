import { create } from "zustand"
import { QuestionT, WordTestIdT } from "../fetchdata/wordTest"
import { VocabularyT } from "../fetchdata/vocabulary"

type StateT = {
	current: {
		id?: WordTestIdT
		vocabularyArr: VocabularyT[]
		questionArr: QuestionT[]
		answerArr: Array<number>
	}
}

type ActionsT = {
	initWordTestStore: () => void
}

const initialState: StateT = {
	current: {
		id: undefined,
		vocabularyArr: [],
		questionArr: [],
		answerArr: [],
	},
}

const useWordTestStore = create<StateT & ActionsT>((set) => ({
	...initialState,
	initWordTestStore: () => {},
}))

export default useWordTestStore
