import { useMemo } from "react"

import useThemeStore from "../../../hooks/useThemeStore"
import useWordTestStore, { StepT } from "../../../hooks/useWordTestStore"

import { Header, MainContainer } from "../../common/semantic"
import { getTypeQuestion } from "../../../commonFun"

const Result = () => {
	const { theme } = useThemeStore()
	const { current } = useWordTestStore()

	const wrongAnswers = useMemo<StepT[]>(() => {
		if (current === undefined) return []

		const wrongAnswer = current.stepArr.filter((step) => {
			return step.correctAnswerId !== step.yourAnswer
		})

		return wrongAnswer
	}, [current])

	if (current === undefined) {
		return (
			<div className="absolute top-1/2 left-1/2 transform -translate-x-1/2 -translate-y-1/2">
				<h1>current word test not existed.</h1>
			</div>
		)
	}

	return (
		<>
			<Header subTitle="Test Result" />
			<MainContainer>
				<div className="max-w-3xl m-auto">
					<div className="text-center font-bold text-7xl md:text-9xl py-60 md:py-72">
						{current.stepArr.length - wrongAnswers.length} / {current.stepArr.length}
					</div>
				</div>

				<div className="text-center">{wrongAnswers.length === 0 ? "🎉 congratulation 🥳" : "▼ wrong answers ▽"}</div>

				<div className={`max-w-3xl m-auto ${wrongAnswers.length !== 0 ? "my-40" : ""} grid gap-32 md:gap-40`}>
					{wrongAnswers.map((answer) => (
						<div className="px-1" key={answer.id}>
							<div className="px-1">
								<span className="font-bold text-xl">Q</span>
								<span className="ml-2">{getTypeQuestion(answer.type)}</span>
								<div className="text-center py-7 md:py-14">{answer.answerTarget}</div>
							</div>
							<div className={`rounded-xl overflow-hidden shadow ${theme == "dark" ? "shadow-gray-600" : ""}`}>
								<div className="bg-error text-slate-950 p-2">
									{answer.yourAnswer !== null ? current.vocabularyDictionary[answer.yourAnswer].word : null}
								</div>
								<div className="p-2">{answer.yourAnswer !== null ? current.vocabularyDictionary[answer.yourAnswer].meaning : null}</div>
							</div>
							<div className={`rounded-xl overflow-hidden mt-3 shadow ${theme == "dark" ? "shadow-gray-600" : ""}`}>
								<div className="bg-success text-slate-950 p-2">{current.vocabularyDictionary[answer.correctAnswerId].word}</div>
								<div className="p-2">{current.vocabularyDictionary[answer.correctAnswerId].meaning}</div>
							</div>
						</div>
					))}
				</div>
			</MainContainer>
		</>
	)
}

export default Result
