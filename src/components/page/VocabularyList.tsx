import { ReactNode, useCallback } from "react"
import { Link, useSearchParams } from "react-router-dom"
import { useQuery, UseQueryResult } from "@tanstack/react-query"

import { Header, MainContainer } from "../common/semantic"
import { getVocabularyList, getVocabularyListT } from "../../fetchdata/vocabulary"
import { Pagination, PaginationLinkNav } from "../common/paginationNav/index,"

const setting = {
	limit: 50,
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
									<tr key={vocabularyData.id} className="hover hover:bg-">
										<td className="text-center w-0">{vocabularyData.id}</td>
										<td className="text-center w-48">{vocabularyData.word}</td>
										<td className="text-left">{vocabularyData.meaning}</td>
										<td className="text-right w-48">
											{vocabularyData.dictionaryLink !== undefined ? (
												<Link to={vocabularyData.dictionaryLink} target="_blank" className="link link-info">
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
			<Header subTitle="Basic Vocabulary List" />
			<MainContainer>
				<div className="max-w-5xl m-auto py-20 flex flex-col gap-12 items-center">
					<TableAndPagination query={vocabularyListQuery} />
				</div>
			</MainContainer>
		</>
	)
}

export default VocabularyList
