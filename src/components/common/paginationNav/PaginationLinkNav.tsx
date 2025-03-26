import { Link } from "react-router-dom"

import { scrollTop } from "../../../commonFun"

// eslint-disable-next-line no-unused-vars
const PaginationLinkNav = (props: { currentPage: number; lastPage: number; pageLimitSize: number; makePageLinkFun: (page: number) => string }) => {
	const rowStartPage =
		props.currentPage - (props.currentPage % props.pageLimitSize == 0 ? props.pageLimitSize : props.currentPage % props.pageLimitSize) + 1
	const isOneRow = props.lastPage <= props.pageLimitSize
	const pageRowArr: Array<number> = Array.from(
		{
			length:
				(isOneRow && props.lastPage != props.pageLimitSize) || props.lastPage < rowStartPage + props.pageLimitSize - 1
					? props.lastPage % props.pageLimitSize
					: props.pageLimitSize,
		},
		(_v, i) => rowStartPage + i,
	)
	const rowEndPage = pageRowArr[pageRowArr.length - 1]

	return (
		<div className={`join`}>
			{!isOneRow ? (
				!pageRowArr.includes(1) ? (
					<>
						<Link to={props.makePageLinkFun(1)}>
							<button className="join-item btn btn-ghost text-xs px-3" onClick={scrollTop}>
								〈〈
							</button>
						</Link>
						<Link to={props.makePageLinkFun(rowStartPage - 1)}>
							<button className="join-item btn btn-ghost text-xs px-3 mr-3" onClick={scrollTop}>
								〈
							</button>
						</Link>
					</>
				) : (
					<>
						<button className="join-item btn btn-ghost text-xs disabled:bg-opacity-0 px-3" disabled={true}>
							〈〈
						</button>
						<button className="join-item btn btn-ghost text-xs disabled:bg-opacity-0 px-3 mr-3" disabled={true}>
							〈
						</button>
					</>
				)
			) : null}

			{pageRowArr.map((page) => {
				if (page == props.currentPage) {
					return (
						<button key={page} className={`join-item btn btn-ghost btn-active`} onClick={scrollTop}>
							{page}
						</button>
					)
				} else {
					return (
						<Link key={page} to={props.makePageLinkFun(page)}>
							<button className={`join-item btn btn-ghost`} onClick={scrollTop}>
								{page}
							</button>
						</Link>
					)
				}
			})}

			{!isOneRow ? (
				!pageRowArr.includes(props.lastPage) ? (
					<>
						<Link to={props.makePageLinkFun(rowEndPage + 1)}>
							<button className="join-item btn btn-ghost text-xs px-3 ml-3" onClick={scrollTop}>
								〉
							</button>
						</Link>
						<Link to={props.makePageLinkFun(props.lastPage)}>
							<button className="join-item btn btn-ghost text-xs px-3" onClick={scrollTop}>
								〉〉
							</button>
						</Link>
					</>
				) : (
					<>
						<button className="join-item btn btn-ghost text-xs disabled:bg-opacity-0 px-3 ml-3" disabled={true}>
							〉
						</button>
						<button className="join-item btn btn-ghost text-xs disabled:bg-opacity-0 px-3" disabled={true}>
							〉〉
						</button>
					</>
				)
			) : null}
		</div>
	)
}

export default PaginationLinkNav
