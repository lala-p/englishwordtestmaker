import PaginationLinkNav from "./PaginationLinkNav"

export class Pagination {
	page: number | string | null
	listLimitSize: number
	currentPage: number
	listTotalCount?: number
	lastPage: number

	constructor(page: number | string | null, listLimitSize: number, listTotalCount?: number) {
		this.listTotalCount = listTotalCount
		this.listLimitSize = listLimitSize
		this.page = page
		this.currentPage = isNaN(Number(this.page)) || Number(this.page) < 1 ? 1 : Number(this.page)
		this.lastPage = 0

		if (listTotalCount !== undefined) {
			this.setListTotalCount(listTotalCount)
		}
	}

	setListTotalCount(listTotalCount: number) {
		this.listTotalCount = listTotalCount
		this.lastPage = Math.ceil(this.listTotalCount / this.listLimitSize)
		this.currentPage = this.currentPage > this.lastPage ? 1 : this.currentPage
	}

	getListStartNo(sort: "ASC" | "DESC" = "DESC"): number | Error {
		if (sort == "ASC") {
			return (this.currentPage - 1) * this.listLimitSize + 1
		} else {
			if (this.listTotalCount === undefined || this.currentPage === undefined) {
				return Error("listTotalCount undefined. Pagination.setListTotalCount(listTotalCount: number)")
			} else {
				return this.listTotalCount - (this.currentPage - 1) * this.listLimitSize
			}
		}
	}

	getPageOffset(): number {
		return (this.currentPage - 1) * this.listLimitSize
	}
}

export { PaginationLinkNav }
