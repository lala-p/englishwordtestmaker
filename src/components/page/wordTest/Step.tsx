import { useParams, useNavigate } from "react-router-dom"

import useWordTestStore from "../../../hooks/useWordTestStore"

const Step = () => {
	const { stepNum } = useParams()
	const navigate = useNavigate()

	const { current } = useWordTestStore()

	if (current === undefined || current) {
		return <></>
	}

	return <></>
}

export default Step
