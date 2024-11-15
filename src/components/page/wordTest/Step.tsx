import { Header, MainContainer } from "../../common/semantic"

const Step = () => {
	return (
		<>
			<Header subTitle="Word Test" />
			<MainContainer>
				<div className="max-w-3xl m-auto mt-4 md:mt-8 border-b">
					<div className="ml-2">
						<span className="text-xl font-bold mr-2">Q</span>
						<span className="text-sm md:text-base">What is meaning of this word? / What is the word that has this meaning?</span>
					</div>
					<h1 className="text-center font-bold text-3xl md:text-4xl py-16 md:py-32">english</h1>
				</div>
				<div className="max-w-3xl m-auto flex-wrap mt-12 md:mt-16">
					<button className="w-1/2 h-20 md:h-24 btn btn-ghost rounded-none text-xl">wrong</button>
					<button className="w-1/2 h-20 md:h-24 btn btn-success text-success-content rounded-none text-xl">영어</button>
					<button className="w-1/2 h-20 md:h-24 btn btn-ghost rounded-none text-xl">wrong</button>
					<button className="w-1/2 h-20 md:h-24 btn btn-ghost rounded-none text-xl disabled:btn-ghost" disabled={true}>
						-
					</button>
				</div>
				<div className="max-w-3xl m-auto flex justify-between mt-12 md:mt-16 mb-8">
					<button className="w-1/4 btn btn-ghost">&lsaquo; prev</button>
					<button className="w-1/4 btn bg-slate-200 hover:bg-slate-300 text-slate-900">next &rsaquo;</button>
				</div>
			</MainContainer>
		</>
	)
}

export default Step
