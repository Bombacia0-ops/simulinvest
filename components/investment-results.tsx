import { Card, CardContent, CardHeader, CardTitle } from "./ui/card"
import type { CalculationResult } from "./investment-calculator"
import { TrendingUp, Wallet, Target, Coins } from "lucide-react"

interface InvestmentResultsProps {
  result: CalculationResult
}

export function InvestmentResults({ result }: InvestmentResultsProps) {
  const formatCurrency = (value: number) => {
    return new Intl.NumberFormat("fr-FR", {
      style: "currency",
      currency: "EUR",
      minimumFractionDigits: 0,
      maximumFractionDigits: 0,
    }).format(value)
  }

  const formatPercent = (value: number) => {
    return new Intl.NumberFormat("fr-FR", {
      style: "percent",
      minimumFractionDigits: 1,
      maximumFractionDigits: 1,
    }).format(value / 100)
  }

  const metrics = [
    {
      label: "Capital investi",
      value: formatCurrency(result.totalInvested),
      icon: Wallet,
      color: "text-muted-foreground",
    },
    {
      label: "Valeur finale",
      value: formatCurrency(result.finalValue),
      icon: Target,
      color: "text-primary",
    },
    {
      label: "Gain net",
      value: formatCurrency(result.netGain),
      icon: Coins,
      color: "text-primary",
    },
    {
      label: "Rendement total",
      value: formatPercent(result.totalReturn),
      icon: TrendingUp,
      color: "text-primary",
    },
  ]

  return (
    <Card>
      <CardHeader>
        <CardTitle className="text-2xl">Résultats</CardTitle>
      </CardHeader>
      <CardContent>
        <div className="grid grid-cols-2 gap-4">
          {metrics.map((metric) => {
            const Icon = metric.icon
            return (
              <div key={metric.label} className="p-4 rounded-lg bg-muted/50 space-y-2">
                <div className="flex items-center gap-2">
                  <Icon className={`h-4 w-4 ${metric.color}`} />
                  <p className="text-sm text-muted-foreground">{metric.label}</p>
                </div>
                <p className={`text-xl font-bold ${metric.color}`}>{metric.value}</p>
              </div>
            )
          })}
        </div>
      </CardContent>
    </Card>
  )
}
