"use client"

import { Card, CardContent, CardHeader, CardTitle } from "./ui/card"
import { Line, LineChart, XAxis, YAxis, CartesianGrid, Tooltip, Legend, ResponsiveContainer } from "recharts"
import type { CalculationResult } from "./investment-calculator"

interface InvestmentChartProps {
  data: CalculationResult["chartData"]
}

export function InvestmentChart({ data }: InvestmentChartProps) {
  const formatCurrency = (value: number) => {
    return new Intl.NumberFormat("fr-FR", {
      style: "currency",
      currency: "EUR",
      minimumFractionDigits: 0,
      maximumFractionDigits: 0,
    }).format(value)
  }

  const sampledData = data.filter((_, index) => index % 1 === 0 || index === data.length - 1)

  const minYear = Math.floor(data[0]?.year || 0)
  const maxYear = Math.ceil(data[data.length - 1]?.year || 0)
  const yearTicks: number[] = []

  // Start from the first year divisible by 5
  const startYear = Math.ceil(minYear / 5) * 5
  for (let year = startYear; year <= maxYear; year += 5) {
    yearTicks.push(year)
  }

  // Always include the first and last year if not already included
  if (!yearTicks.includes(minYear)) {
    yearTicks.unshift(minYear)
  }
  if (!yearTicks.includes(maxYear)) {
    yearTicks.push(maxYear)
  }

  console.log("[v0] Chart rendering with data points:", sampledData.length)
  console.log("[v0] First data point:", sampledData[0])
  console.log("[v0] Last data point:", sampledData[sampledData.length - 1])

  return (
    <Card>
      <CardHeader>
        <CardTitle className="text-2xl">Évolution du capital</CardTitle>
      </CardHeader>
      <CardContent>
        <ResponsiveContainer width="100%" height={400}>
          <LineChart data={sampledData} margin={{ top: 5, right: 5, left: 5, bottom: 30 }}>
            <CartesianGrid strokeDasharray="3 3" className="stroke-muted" />
            <XAxis
              dataKey="year"
              ticks={yearTicks}
              label={{ value: "Années", position: "insideBottom", offset: -5 }}
              className="text-xs"
            />
            <YAxis tickFormatter={(value) => `${(value / 1000).toFixed(0)}k€`} className="text-xs" />
            <Tooltip
              formatter={(value: number) => formatCurrency(value)}
              labelFormatter={(label) => `Année ${Math.round(Number(label))}`}
              contentStyle={{
                backgroundColor: "hsl(var(--card))",
                border: "1px solid hsl(var(--border))",
                borderRadius: "8px",
              }}
            />
            <Legend wrapperStyle={{ paddingTop: "20px" }} />
            <Line
              type="monotone"
              dataKey="totalInvested"
              stroke="#9CA3AF"
              strokeWidth={2}
              name="Capital investi"
              dot={false}
            />
            <Line
              type="monotone"
              dataKey="totalValue"
              stroke="#16A34A"
              strokeWidth={3}
              name="Valeur du portefeuille"
              dot={false}
            />
          </LineChart>
        </ResponsiveContainer>
      </CardContent>
    </Card>
  )
}
