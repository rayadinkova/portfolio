import { Link } from "react-router-dom"

export function WorkPage() {
  return (
    <div className="p-8">
      <h1 className="text-3xl font-bold">Work</h1>
      <p>This will be your projects grid.</p>

      {/* Placeholder link to test the detail route */}
      <div className="mt-6">
        <Link className="underline" to="/work/example-project">
          Go to example project
        </Link>
      </div>
    </div>
  )
}
