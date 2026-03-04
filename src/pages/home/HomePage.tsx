import { IntroSection } from "./sections/IntroSection"
import { AboutSection } from "./sections/AboutSection"
import { WorkSection } from "./sections/WorkSection"
import { ServicesSection } from "./sections/ServicesSection"
import { HomeStickyHeader } from "../../components/common/HomeStickyHeader"

export function HomePage() {
  return (
    <>
      <HomeStickyHeader />
      <div>
        <IntroSection />
        <AboutSection />
        <WorkSection />
        <ServicesSection />
      </div>
    </>
  )
}
