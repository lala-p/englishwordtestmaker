import { useEffect } from "react"
import { useSearchParams, useNavigate } from "react-router-dom"
import { useMutation } from "@tanstack/react-query"

import { createWordTest } from "../../../fetchdata/wordTest"

const setting = {
	vocabularyId: "helloword",
	multipleChoice: 5,
	question: 30,
}

const CreateWordTest = () => {
	const [searchParams] = useSearchParams()
	const navigate = useNavigate()

	const mutation = useMutation({
		mutationFn: () =>
			createWordTest({
				id: searchParams.get("id") ?? undefined,
				vocabularyId: searchParams.get("vocabularyId") ?? setting.vocabularyId,
				multipleChoice: searchParams.get("multipleChoice") === null ? setting.multipleChoice : Number(searchParams.get("multipleChoice")),
				question: searchParams.get("question") === null ? setting.question : Number(searchParams.get("question")),
				description: searchParams.get("description") ?? undefined,
			}),
	})

	useEffect(() => {
		mutation.mutate()
		// eslint-disable-next-line react-hooks/exhaustive-deps
	}, [])

	useEffect(() => {
		if (mutation.isSuccess) {
			navigate("/vocabularylist", { replace: true })
		}
		// eslint-disable-next-line react-hooks/exhaustive-deps
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
