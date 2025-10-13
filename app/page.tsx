import { InvestmentCalculator } from "@/components/investment-calculator"

export default function Home() {
  return (
    <main className="min-h-screen bg-background">
      <div className="container mx-auto px-4 py-8 md:py-12">
        <header className="mb-8 md:mb-12 text-center">
          <h1 className="text-4xl md:text-5xl lg:text-6xl font-bold text-foreground mb-4 text-balance">SimulInvest</h1>
          <p className="text-lg md:text-xl text-muted-foreground max-w-2xl mx-auto text-pretty">
            Visualisez la croissance de votre capital avec les intérêts composés
          </p>
        </header>

        <InvestmentCalculator />
      </div>
    </main>
  )
}
