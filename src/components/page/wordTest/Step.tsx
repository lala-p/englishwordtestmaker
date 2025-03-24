import { useMemo, useCallback } from "react"
import { useParams, useNavigate } from "react-router-dom"

import { scrollTop } from "../../../commonFun"

import { QuestionT } from "../../../fetchdata/wordTest"
import { VocabularyIdT } from "../../../fetchdata/vocabulary"

import useWordTestStore from "../../../hooks/useWordTestStore"

import { Header, MainContainer } from "../../common/semantic"
import NotFound from "../NotFound"

interface StepQuestionT {
	question: string
	this: string
	answers: { id: VocabularyIdT; data: string }[]
}

const Step = () => {
	const { step } = useParams()
	const stepNum = Number(step)
	const navigate = useNavigate()

	const { current, setCurrentAnswer, unsetCurrentAnswer } = useWordTestStore()

	const stepQuestion = useMemo<undefined | StepQuestionT>(() => {
		if (current === undefined) return undefined

		const currentQuestion: QuestionT = current.questionArr[stepNum - 1]
		const q: StepQuestionT = { question: "", this: "", answers: [] }

		switch (currentQuestion.type) {
			case "word":
				q.question = "What is the word that has this meaning?"
				q.this = current.vocabularyDictionary[currentQuestion.correctAnswerId].meaning
				q.answers = currentQuestion.answerIds.map((id) => {
					return { id, data: current.vocabularyDictionary[id].word }
				})
				break

			case "meaning":
				q.question = "What is meaning of this word?"
				q.this = current.vocabularyDictionary[currentQuestion.correctAnswerId].word
				q.answers = currentQuestion.answerIds.map((id) => {
					return { id, data: current.vocabularyDictionary[id].meaning }
				})
				break
		}

		return q
		// eslint-disable-next-line react-hooks/exhaustive-deps
	}, [current?.id, step])

	const stepMove = useCallback((to: string) => {
		navigate(to, { replace: true })
		scrollTop()
		// eslint-disable-next-line react-hooks/exhaustive-deps
	}, [])

	if (current === undefined || stepQuestion === undefined) {
		return (
			<div className="absolute top-1/2 left-1/2 transform -translate-x-1/2 -translate-y-1/2">
				<h1>current word test not existed.</h1>
			</div>
		)
	}

	if (isNaN(stepNum) || stepNum < 1 || stepNum > current.questionArr.length) {
		return <NotFound />
	}

	return (
		<>
			<Header subTitle={`Word Test (${stepNum}/${current.questionArr.length})`} />
			<MainContainer>
				<div className="max-w-3xl m-auto mt-4 md:mt-8 px-2">
					<span className="text-xl font-bold mr-3">Step {stepNum}.</span>
					<span className="text-sm md:text-base">{stepQuestion.question}</span>
					<div className="text-center font-bold text-3xl md:text-4xl py-16 md:py-32">{stepQuestion.this}</div>
				</div>

				<div className="max-w-3xl m-auto flex-wrap">
					{stepQuestion.answers.map((answer) => {
						if (current.answerArr[stepNum - 1] === answer.id) {
							return (
								<button
									key={answer.id}
									className="w-full h-20 md:h-24 btn btn-success text-success-content rounded-none text-lg"
									onClick={() => unsetCurrentAnswer(stepNum - 1)}
								>
									{answer.data}
								</button>
							)
						} else {
							return (
								<button
									key={answer.id}
									className="w-full h-20 md:h-24 btn btn-ghost rounded-none text-lg"
									onClick={() => setCurrentAnswer(stepNum - 1, answer.id)}
								>
									{answer.data}
								</button>
							)
						}
					})}
				</div>

				<div className="max-w-3xl m-auto flex justify-between mt-12 md:mt-16 mb-8">
					{stepNum > 1 ? (
						<button className="w-1/4 btn btn-ghost grid justify-items-start" onClick={() => stepMove(`/wordtest/step/${stepNum - 1}`)}>
							Prev
						</button>
					) : (
						<button className="w-1/4 disabled:opacity-0" disabled={true}>
							Prev
						</button>
					)}

					{current.answerCheckNum >= current.questionArr.length ? (
						<button className="w-1/4 btn btn-error grid justify-items-center" onClick={() => stepMove(`/wordtest/result`)}>
							result
						</button>
					) : (
						<button className="w-1/4 disabled:opacity-0" disabled={true}>
							result
						</button>
					)}

					{stepNum < current.questionArr.length && current.answerArr[stepNum - 1] != null ? (
						<button
							className="w-1/4 btn bg-slate-200 hover:bg-slate-300 text-slate-900 grid justify-items-end"
							onClick={() => stepMove(`/wordtest/step/${stepNum + 1}`)}
						>
							Next
						</button>
					) : (
						<button className="w-1/4 disabled:opacity-0" disabled={true}>
							Next
						</button>
					)}
				</div>
			</MainContainer>
		</>
	)
}

export default Step
