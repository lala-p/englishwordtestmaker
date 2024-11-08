import { QueryClient, QueryClientProvider } from "@tanstack/react-query"
import { createRoot } from "react-dom/client"
import { RouterProvider, createBrowserRouter, createRoutesFromElements, Route } from "react-router-dom"

import "./index.css"
import Root from "./components/page/Root"
import IndexHome from "./components/page/IndexHome"
import VocabularyList from "./components/page/VocabularyList"
import CreateWordTest from "./components/page/wordTest/Create"
import Step from "./components/page/wordTest/Step"

const queryClient = new QueryClient()

const router = createBrowserRouter(
	createRoutesFromElements(
		<Route path="/" element={<Root />} errorElement={<h1>error</h1>}>
			<Route index element={<IndexHome />} />
			<Route path="/vocabularylist/:vocabularylistId?" element={<VocabularyList />} />
			<Route path="/wordtest/create" element={<CreateWordTest />} />

			<Route path="/wordtest/step/:stepNum" element={<Step />} />
		</Route>,
	),
)

createRoot(document.getElementById("root")!).render(
	<QueryClientProvider client={queryClient}>
		<RouterProvider router={router} />
	</QueryClientProvider>,
)
