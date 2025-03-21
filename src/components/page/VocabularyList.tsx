import { ReactNode, useCallback, useMemo } from "react"
import { Link, useParams, useSearchParams } from "react-router-dom"
import { useQuery, UseQueryResult } from "@tanstack/react-query"

import { VocabularyT, getVocabularyList } from "../../fetchdata/vocabulary"

import { Header, MainContainer } from "../common/semantic"
import { Pagination, PaginationLinkNav } from "../common/paginationNav/index,"

const setting = {
	pageSize: 50,
}
const VocabularyList = () => {
	const { vocabularylistId } = useParams()
	const [searchParams] = useSearchParams()

	const pagination = useMemo(() => {
		return new Pagination(searchParams.get("page"), setting.pageSize)
	}, [searchParams])

	const vocabularyListQuery = useQuery({
		queryKey: ["getVocabularyList", searchParams.toString()],
		queryFn: () => getVocabularyList({ id: vocabularylistId ?? "helloword", page: pagination.currentPage, pageSize: setting.pageSize }),
	})

	const TableAndPagination = useCallback(
		(props: { query: UseQueryResult<{ dataArr: VocabularyT[]; totalCount: number }> }): ReactNode => {
			if (props.query.isPending) return "Loading..."

			if (props.query.error || props.query.data === undefined) return "An error has occurred: " + props.query.error.message

			const UrlSearchParams = new URLSearchParams(searchParams.toString())
			pagination.setListTotalCount(props.query.data.totalCount)

			return (
				<>
					<table className="table">
						<thead className="text-center">
							<tr>
								<th>NO</th>
								<th>word</th>
								<th>meaning</th>
								<th>dictionary</th>
							</tr>
						</thead>
						<tbody>
							{props.query.data.dataArr.map((vocabularyData) => {
								return (
									<tr key={vocabularyData.id} className="hover">
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
		[searchParams, pagination],
	)

	return (
		<>
			<Header subTitle="Vocabulary List" />
			<MainContainer>
				<div className="max-w-5xl m-auto py-20 flex flex-col gap-12 items-center">
					<TableAndPagination query={vocabularyListQuery} />
				</div>
			</MainContainer>
		</>
	)
}

export default VocabularyList
