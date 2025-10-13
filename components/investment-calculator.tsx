"use client"

import { useState, useEffect } from "react"
import { InvestmentForm } from "./investment-form"
import { InvestmentChart } from "./investment-chart"
import { InvestmentResults } from "./investment-results"
import { Card } from "./ui/card"

export interface InvestmentParams {
  initialAmount: number
  hasRecurring: boolean
  recurringAmount: number
  frequency: "weekly" | "monthly" | "quarterly"
  annualReturn: number
  years: number
  compoundingFrequency: "monthly" | "annually"
  managementFees: number
}

export interface CalculationResult {
  totalInvested: number
  finalValue: number
  totalReturn: number
  netGain: number
  chartData: Array<{
    year: number
    totalInvested: number
    totalValue: number
  }>
}

export function InvestmentCalculator() {
  const [params, setParams] = useState<InvestmentParams>({
    initialAmount: 10000,
    hasRecurring: true,
    recurringAmount: 500,
    frequency: "monthly",
    annualReturn: 7,
    years: 10,
    compoundingFrequency: "monthly",
    managementFees: 0,
  })

  const [result, setResult] = useState<CalculationResult | null>(null)

  useEffect(() => {
    const calculated = calculateInvestment(params)
    setResult(calculated)
    console.log("[v0] Auto-calculated with data points:", calculated.chartData.length)
    console.log("[v0] Chart data sample:", calculated.chartData.slice(0, 3))
  }, [params])

  const handleCalculate = (newParams: InvestmentParams) => {
    setParams(newParams)
  }

  return (
    <div className="grid lg:grid-cols-2 gap-6 lg:gap-8">
      <div className="flex flex-col space-y-6">
        <InvestmentForm onCalculate={handleCalculate} initialParams={params} />
      </div>

      <div className="space-y-6">
        {result ? (
          <>
            <InvestmentResults result={result} />
            <InvestmentChart data={result.chartData} />
          </>
        ) : (
          <Card className="p-8 flex items-center justify-center min-h-[400px]">
            <p className="text-muted-foreground text-center">
              Ajustez les paramètres et cliquez sur "Calculer" pour voir les résultats
            </p>
          </Card>
        )}
      </div>
    </div>
  )
}

function calculateInvestment(params: InvestmentParams): CalculationResult {
  const {
    initialAmount,
    hasRecurring,
    recurringAmount,
    frequency,
    annualReturn,
    years,
    compoundingFrequency,
    managementFees,
  } = params

  const monthlyRate = (annualReturn - managementFees) / 100 / 12
  const totalMonths = years * 12

  const contributionsPerYear = frequency === "weekly" ? 52 : frequency === "monthly" ? 12 : 4

  const monthsBetweenContributions = 12 / contributionsPerYear

  const chartData: CalculationResult["chartData"] = []
  let currentValue = initialAmount
  let totalInvested = initialAmount

  chartData.push({
    year: 0,
    totalInvested: totalInvested,
    totalValue: currentValue,
  })

  for (let month = 1; month <= totalMonths; month++) {
    // Apply compound interest
    if (compoundingFrequency === "monthly") {
      currentValue = currentValue * (1 + monthlyRate)
    } else if (compoundingFrequency === "annually" && month % 12 === 0) {
      const annualRate = (annualReturn - managementFees) / 100
      currentValue = currentValue * (1 + annualRate)
    }

    // Add recurring contribution
    if (hasRecurring && month % monthsBetweenContributions === 0) {
      currentValue += recurringAmount
      totalInvested += recurringAmount
    }

    // Record data point every month
    chartData.push({
      year: month / 12,
      totalInvested: totalInvested,
      totalValue: currentValue,
    })
  }

  const finalValue = currentValue
  const netGain = finalValue - totalInvested
  const totalReturn = (netGain / totalInvested) * 100

  console.log("[v0] Calculation complete:", {
    totalInvested,
    finalValue,
    netGain,
    dataPoints: chartData.length,
  })

  return {
    totalInvested,
    finalValue,
    totalReturn,
    netGain,
    chartData,
  }
}
