import { ReactNode } from "react"

const MainContainer = (props: { children?: ReactNode; className?: string }) => {
	return <main className={`${props.className ?? "pt-16 md:pt-24 px-3"}`}>{props.children}</main>
}
export default MainContainer
