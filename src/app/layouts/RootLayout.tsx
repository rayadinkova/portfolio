import { Outlet } from "react-router-dom"
import { Navbar } from "../../components/nav/Navbar"
import { ScrollToHash } from "../../transitions/ScrollToHash"
import { PageContainer } from "../../components/common/PageContainer"
import { SmoothScrollProvider } from "../../components/common/SmoothScrollProvider"

export function RootLayout() {
  return (
    <div className="min-h-screen">
      <SmoothScrollProvider>
        <ScrollToHash />

        <main>
          <PageContainer>
            <Outlet />
          </PageContainer>
        </main>

        <Navbar />
      </SmoothScrollProvider>
    </div>
  )
}
