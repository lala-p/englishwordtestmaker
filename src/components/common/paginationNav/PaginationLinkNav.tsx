import { Link } from "react-router-dom"

const PaginationLinkNav = (props: {
	className?: string
	currentPage: number
	lastPage: number
	pageLimitSize: number
	makePageLinkFun: (page: number) => string
}) => {
	const rowStartPage =
		props.currentPage - (props.currentPage % props.pageLimitSize == 0 ? props.pageLimitSize : props.currentPage % props.pageLimitSize) + 1
	const rowEndPage = props.currentPage + (props.pageLimitSize - (props.currentPage % props.pageLimitSize))
	const isOneRow = props.lastPage <= props.pageLimitSize
	const pageRowArr = Array.from({ length: isOneRow ? props.lastPage : props.pageLimitSize }, (v, i) => rowStartPage + i)

	const scrollTop = () => {
		window.scrollTo(0, 0)
	}

	return (
		<div className={`join ${props.className ?? ""}`}>
			{!isOneRow ? (
				!pageRowArr.includes(1) ? (
					<>
						<Link to={props.makePageLinkFun(1)}>
							<button className="join-item btn text-xs" onClick={scrollTop}>
								first
							</button>
						</Link>
						<Link to={props.makePageLinkFun(rowStartPage - 1)}>
							<button className="join-item btn text-xs" onClick={scrollTop}>
								prev
							</button>
						</Link>
					</>
				) : (
					<>
						<button className="join-item btn text-xs disabled:bg-opacity-5 disabled:border-opacity-100" disabled={true}>
							first
						</button>
						<button className="join-item btn text-xs disabled:bg-opacity-5 disabled:border-opacity-100" disabled={true}>
							prev
						</button>
					</>
				)
			) : null}

			{pageRowArr.map((page) => {
				return (
					<Link key={page} to={props.makePageLinkFun(page)}>
						<button className={`join-item btn ${page == props.currentPage ? "btn-active" : ""}`} onClick={scrollTop}>
							{page}
						</button>
					</Link>
				)
			})}

			{!isOneRow ? (
				!pageRowArr.includes(props.lastPage) ? (
					<>
						<Link to={props.makePageLinkFun(rowEndPage + 1)}>
							<button className="join-item btn text-xs" onClick={scrollTop}>
								next
							</button>
						</Link>
						<Link to={props.makePageLinkFun(props.lastPage)}>
							<button className="join-item btn text-xs" onClick={scrollTop}>
								last
							</button>
						</Link>
					</>
				) : (
					<>
						<button className="join-item btn text-xs disabled:bg-opacity-5 disabled:border-opacity-100" disabled={true}>
							next
						</button>
						<button className="join-item btn text-xs disabled:bg-opacity-5 disabled:border-opacity-100" disabled={true}>
							last
						</button>
					</>
				)
			) : null}
		</div>
	)
}

export default PaginationLinkNav
