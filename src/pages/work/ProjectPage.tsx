import { useParams } from "react-router-dom"

export function ProjectPage() {
  const { slug } = useParams()

  return (
    <div className="p-8">
      <h1 className="text-3xl font-bold">Project</h1>
      <p>Slug: {slug}</p>
    </div>
  )
}
