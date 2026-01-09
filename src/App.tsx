import { GravityCard } from "./components/GravityCard"

export default function App() {
  return (
    <main className="min-h-screen bg-zinc-950 text-white flex flex-col items-center justify-center p-10 gap-10">
      <h1 className="text-4xl font-bold mb-8">GravityCard Demo</h1>

      <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
        {/* Card 1 */}
        <GravityCard maxRotation={15}>
          <h3 className="text-xl font-bold">Project Alpha</h3>   {/* front layer */}
          <p className="text-sm text-zinc-400">Interactive UI experiment</p> {/* middle layer */}
          <span className="absolute bottom-2 right-2 text-zinc-500">v1</span> {/* back layer */}
        </GravityCard>

        {/* Card 2 */}
        <GravityCard maxRotation={20}>
          <h3 className="text-xl font-bold">Gravity UI</h3>
          <p className="text-sm text-zinc-400">Physics-based hover motion</p>
          <span className="absolute bottom-2 right-2 text-zinc-500">v2</span>
        </GravityCard>

        {/* Card 3 */}
        <GravityCard maxRotation={10}>
          <h3 className="text-xl font-bold">Next Idea</h3>
          <p className="text-sm text-zinc-400">Design-system ready component</p>
          <span className="absolute bottom-2 right-2 text-zinc-500">v3</span>
        </GravityCard>
      </div>
    </main>
  )
}