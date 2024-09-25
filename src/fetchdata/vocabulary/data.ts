export type VocabularyIdT = number

export interface VocabularyDataT {
	id: VocabularyIdT
	word: string
	meaning: string
	dictionaryLink?: string
}

export const vocabularyDataArr: VocabularyDataT[] = [
	{
		id: 1,
		word: "asdfa",
		meaning: "asdasdsd",
		dictionaryLink: "https://www.naver.com",
	},
	{
		id: 2,
		word: "12341234",
		meaning: "fasdfasdfasdf",
		dictionaryLink: "https://www.naver.com",
	},
	{
		id: 3,
		word: "12341234",
		meaning: "fasdfasdfasdf",
	},
]
