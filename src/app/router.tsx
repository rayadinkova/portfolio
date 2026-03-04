import { createBrowserRouter } from "react-router-dom"
import App from "./App"
import { RootLayout } from "./layouts/RootLayout"
import { HomePage } from "../pages/home/HomePage"
import { WorkPage } from "../pages/work/WorkPage"
import { ProjectPage } from "../pages/work/ProjectPage"

export const router = createBrowserRouter([
  {
    path: "/",
    element: <App />,
    children: [
      {
        element: <RootLayout />,
        children: [
          { index: true, element: <HomePage /> },
          { path: "work", element: <WorkPage /> },
          { path: "work/:slug", element: <ProjectPage /> },
        ],
      },
    ],
  },
])
