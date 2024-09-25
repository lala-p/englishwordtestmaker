import { ReactNode, useCallback } from "react"
import { Link, useSearchParams } from "react-router-dom"
import { useQuery, UseQueryResult } from "@tanstack/react-query"

import { getVocabularyList, getVocabularyListT } from "../../fetchdata/vocabulary"
import { Pagination, PaginationLinkNav } from "../common/paginationNav/index,"

const setting = {
	limit: 20,
}

const VocabularyList = () => {
	const [searchParams] = useSearchParams()
	const pagination = new Pagination(searchParams.get("page"), setting.limit)

	const vocabularyListQuery = useQuery<getVocabularyListT>({
		queryKey: ["getVocabularyList", searchParams.toString()],
		queryFn: () => getVocabularyList({ limit: setting.limit, offset: pagination.getPageOffset(), pagination: true }),
	})

	const TableAndPagination = useCallback(
		(props: { query: UseQueryResult<getVocabularyListT> }): ReactNode => {
			if (props.query.isPending) return "Loading..."

			if (props.query.error || props.query.data === undefined) return "An error has occurred: " + props.query.error.message

			const UrlSearchParams = new URLSearchParams(searchParams.toString())
			pagination.setListTotalCount(props.query.data.pagination?.totalCount ?? 0)

			return (
				<>
					<table className="table">
						<thead className="text-center">
							<tr>
								<th>ID</th>
								<th>word</th>
								<th>meaning</th>
								<th>dictionary</th>
							</tr>
						</thead>
						<tbody>
							{props.query.data.list.map((vocabularyData) => {
								return (
									<tr key={vocabularyData.id} className="hover">
										<td className="text-center w-0">{vocabularyData.id}</td>
										<td className="text-center w-48">{vocabularyData.word}</td>
										<td className="text-left">{vocabularyData.meaning}</td>
										<td className="text-right w-48">
											{vocabularyData.dictionaryLink !== undefined ? (
												<Link to={vocabularyData.dictionaryLink} className="link link-info">
													{vocabularyData.word}
												</Link>
											) : (
												"-"
											)}
										</td>
									</tr>
								)
							})}
						</tbody>
					</table>
					<PaginationLinkNav
						currentPage={pagination.currentPage}
						lastPage={pagination.lastPage}
						pageLimitSize={10}
						makePageLinkFun={(page) => {
							UrlSearchParams.set("page", page.toString())
							return "?" + UrlSearchParams.toString()
						}}
					/>
				</>
			)
		},
		[searchParams],
	)

	return (
		<>
			<h1>VocabularyList</h1>
			<br />
			<br />
			<br />
			<br />
			<br />
			<br />
			<br />
			<br />
			<br />
			<br />
			<br />
			<br />
			<br />
			<br />
			<br />
			<div className="max-w-5xl m-auto flex flex-col gap-12 items-center">
				<TableAndPagination query={vocabularyListQuery} />
			</div>
			<br />
			<br />
			<br />
			<br />
			<br />
			<br />
			<br />
			<br />
			<br />
			<br />
			<br />
			<br />
			<br />
			<br />
			<br />
			<br />
			<br />
			<br />
			<br />
			<br />
			<br />
		</>
	)
}

export default VocabularyList
