import { useEffect } from "react"
import { useSearchParams, useNavigate } from "react-router-dom"
import { useMutation } from "@tanstack/react-query"

import useWordTestStore from "../../../hooks/useWordTestStore"
import { createWordTest } from "../../../fetchdata/wordTest"

const setting = {
	vocabularyListId: "helloword",
	multipleChoice: 5,
	question: 30,
}
const CreateWordTest = () => {
	const [searchParams] = useSearchParams()
	const navigate = useNavigate()

	const { current, setCurrentWordTest } = useWordTestStore()

	const mutation = useMutation({
		mutationFn: async () => {
			const newWordTestId = await createWordTest({
				id: searchParams.get("id") ?? undefined,
				vocabularyListId: searchParams.get("vocabularyListId") ?? setting.vocabularyListId,
				multipleChoice: searchParams.get("multipleChoice") === null ? setting.multipleChoice : Number(searchParams.get("multipleChoice")),
				question: searchParams.get("question") === null ? setting.question : Number(searchParams.get("question")),
				description: searchParams.get("description") ?? undefined,
			})

			setCurrentWordTest(newWordTestId)
		},
	})

	useEffect(() => {
		mutation.mutate()
		// eslint-disable-next-line react-hooks/exhaustive-deps
	}, [])

	useEffect(() => {
		if (mutation.isSuccess) {
			// try {
			// 	navigate("/wordtest/question", { replace: true })
			// } catch (e) {}
		}
	}, [mutation.isSuccess])

	if (mutation.isError) return <>error</>

	return (
		<>
			<div className="absolute top-1/2 left-1/2 transform -translate-x-1/2 -translate-y-1/2">
				<span className=" loading loading-bars loading-lg"></span>
			</div>
		</>
	)
}

export default CreateWordTest
