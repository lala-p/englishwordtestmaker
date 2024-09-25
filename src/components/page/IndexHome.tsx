import { Link } from "react-router-dom"

const IndexHome = () => {
	return (
		<>
			<h1>index home</h1>
			<Link to={`/vocabularylist`}>vocabulary list</Link>
		</>
	)
}

export default IndexHome
