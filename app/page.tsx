import { SignalDashboard } from "@/components/signal-dashboard"

export default function HomePage() {
  return (
    <main className="flex min-h-screen flex-col items-center bg-gray-50 dark:bg-gray-950 py-10">
      <SignalDashboard />
    </main>
  )
}
