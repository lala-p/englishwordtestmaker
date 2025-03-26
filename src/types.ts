// -- Vocabulary types --
export type VocabularyIdT = number

export interface VocabularyT {
	id: VocabularyIdT
	word: string
	meaning: string
	dictionaryLink?: string
}

export type VocabularyListIdT = string

export interface VocabularyListT {
	id: VocabularyListIdT
	description?: string
	createdDate: string
	dataArr: VocabularyT[]
}

// -- WordTest types --
export type WordTestIdT = string

export interface WordTestT {
	id: WordTestIdT
	VocabularyListId: VocabularyListIdT
	multipleChoice: number
	createdDate: string
	description?: string
}

export type QuestionTypeT = "word" | "meaning"

export interface QuestionT {
	type: QuestionTypeT
	correctAnswerId: VocabularyIdT
	answerIds: VocabularyIdT[]
}

export interface StepT extends QuestionT {
	id: string
	answerTarget: string
	answers: { id: VocabularyIdT; data: string }[]
	yourAnswer: VocabularyIdT | null
}
