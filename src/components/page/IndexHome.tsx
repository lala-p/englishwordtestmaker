import { Link } from "react-router-dom"

import { Header, MainContainer } from "../common/semantic"

const IndexHome = () => {
	return (
		<>
			<Header />
			<MainContainer>
				<div className="w-full max-w-96 absolute top-1/2 left-1/2 transform -translate-x-1/2 -translate-y-1/2 px-3 flex flex-col gap-4">
					<Link to={`/vocabularylist`} className="btn btn-block glass bg-primary text-primary-content hover:bg-primary hover:bg-opacity-70">
						Word Test With Basic Vocabulary List
					</Link>
					<Link to={`/vocabularylist`} className="btn btn-block glass bg-primary text-primary-content hover:bg-primary hover:bg-opacity-70">
						The Vocabulary List Offered Free
					</Link>
				</div>
			</MainContainer>
		</>
	)
}

export default IndexHome
