import { useMemo } from "react"

import useThemeStore from "../../../hooks/useThemeStore"
import useWordTestStore from "../../../hooks/useWordTestStore"

import { Header, MainContainer } from "../../common/semantic"

const Result = () => {
	const { theme } = useThemeStore()
	const { current } = useWordTestStore()

	const resultData = useMemo<undefined | { score: number }>(() => {
		if (current === undefined) return undefined

		let score: number = 0

		for (let i = 0; i < current.questionArr.length; i++) {
			if (current.questionArr[i].correctAnswerId === current.answerArr[i]) {
				score++
			}
		}

		return { score: score }
	}, [current])

	if (current === undefined || resultData === undefined) {
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
						{resultData.score} / {current.questionArr.length}
					</div>
				</div>

				<div className="text-center">▼ wrong answers ▽</div>

				<div className="max-w-3xl m-auto my-40 grid gap-32 md:gap-40">
					<div className="px-1">
						<div className="px-1">
							<span className="font-bold text-xl">Q</span>
							<span className="ml-2">What is the word that has this meaning?</span>
							<div className="text-center py-7 md:py-14">apple</div>
						</div>
						<div className={`rounded-xl overflow-hidden shadow ${theme == "dark" ? "shadow-gray-600" : ""}`}>
							<div className="bg-error text-slate-950 p-2">word</div>
							<div className="p-2">뜻 하나 / 뜻 둘 / 뜻 셋 </div>
						</div>
						<div className={`rounded-xl overflow-hidden mt-3 shadow ${theme == "dark" ? "shadow-gray-600" : ""}`}>
							<div className="bg-success text-slate-950 p-2">word</div>
							<div className="p-2">뜻 하나 / 뜻 둘 / 뜻 셋 </div>
						</div>
					</div>
					<div className="px-1">
						<div className="px-1">
							<span className="font-bold text-xl">Q</span>
							<span className="ml-2">What is the word that has this meaning?</span>
							<div className="text-center py-7 md:py-14">apple</div>
						</div>
						<div className={`rounded-xl overflow-hidden shadow ${theme == "dark" ? "shadow-gray-600" : ""}`}>
							<div className="bg-error text-slate-950 p-2">word</div>
							<div className="p-2">뜻 하나 / 뜻 둘 / 뜻 셋 </div>
						</div>
						<div className={`rounded-xl overflow-hidden mt-3 shadow ${theme == "dark" ? "shadow-gray-600" : ""}`}>
							<div className="bg-success text-slate-950 p-2">word</div>
							<div className="p-2">뜻 하나 / 뜻 둘 / 뜻 셋 </div>
						</div>
					</div>
				</div>
			</MainContainer>
		</>
	)
}

export default Result
