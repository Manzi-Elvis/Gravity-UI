import { GravityCard } from "./components/GravityCard"

export default function App() {
  return (
    <main className="min-h-screen bg-zinc-950 text-white flex items-center justify-center p-10">
      <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
        <GravityCard>
          <CardContent
            title="Project Alpha"
            description="Interactive UI experiment"
          />
        </GravityCard>

        <GravityCard maxRotation={20}>
          <CardContent
            title="Gravity UI"
            description="Physics-based hover motion"
          />
        </GravityCard>

        <GravityCard maxRotation={10}>
          <CardContent
            title="Next Idea"
            description="Design-system ready component"
          />
        </GravityCard>
      </div>
    </main>
  )
}

function CardContent({
  title,
  description,
}: {
  title: string
  description: string
}) {
  return (
    <div className="space-y-2">
      <h3 className="text-xl font-semibold">{title}</h3>
      <p className="text-sm text-zinc-400">{description}</p>
    </div>
  )
}