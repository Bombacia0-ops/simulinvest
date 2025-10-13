"use client"

import type React from "react"

import { useState } from "react"
import { Card, CardContent, CardHeader, CardTitle } from "./ui/card"
import { Label } from "./ui/label"
import { Input } from "./ui/input"
import { Button } from "./ui/button"
import { Switch } from "./ui/switch"
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "./ui/select"
import type { InvestmentParams } from "./investment-calculator"

interface InvestmentFormProps {
  onCalculate: (params: InvestmentParams) => void
  initialParams: InvestmentParams
}

export function InvestmentForm({ onCalculate, initialParams }: InvestmentFormProps) {
  const [params, setParams] = useState<InvestmentParams>(initialParams)

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault()
    onCalculate(params)
  }

  const updateParam = <K extends keyof InvestmentParams>(key: K, value: InvestmentParams[K]) => {
    setParams((prev) => ({ ...prev, [key]: value }))
  }

  return (
    <Card className="h-full flex flex-col">
      <CardHeader>
        <CardTitle className="text-2xl">Paramètres d'investissement</CardTitle>
      </CardHeader>
      <CardContent className="flex-1">
        <form onSubmit={handleSubmit} className="space-y-6">
          <div className="space-y-2">
            <Label htmlFor="initialAmount">Montant initial (€)</Label>
            <Input
              id="initialAmount"
              type="number"
              min="0"
              step="100"
              value={params.initialAmount}
              onChange={(e) => updateParam("initialAmount", Number(e.target.value))}
            />
          </div>

          <div className="flex items-center justify-between space-x-2">
            <Label htmlFor="hasRecurring" className="cursor-pointer">
              Investissement récurrent
            </Label>
            <Switch
              id="hasRecurring"
              checked={params.hasRecurring}
              onCheckedChange={(checked) => updateParam("hasRecurring", checked)}
            />
          </div>

          {params.hasRecurring && (
            <>
              <div className="space-y-2">
                <Label htmlFor="recurringAmount">Montant récurrent (€)</Label>
                <Input
                  id="recurringAmount"
                  type="number"
                  min="0"
                  step="50"
                  value={params.recurringAmount}
                  onChange={(e) => updateParam("recurringAmount", Number(e.target.value))}
                />
              </div>

              <div className="space-y-2">
                <Label htmlFor="frequency">Fréquence</Label>
                <Select
                  value={params.frequency}
                  onValueChange={(value) => updateParam("frequency", value as InvestmentParams["frequency"])}
                >
                  <SelectTrigger id="frequency">
                    <SelectValue />
                  </SelectTrigger>
                  <SelectContent>
                    <SelectItem value="weekly">Hebdomadaire</SelectItem>
                    <SelectItem value="monthly">Mensuelle</SelectItem>
                    <SelectItem value="quarterly">Trimestrielle</SelectItem>
                  </SelectContent>
                </Select>
              </div>
            </>
          )}

          <div className="space-y-2">
            <Label htmlFor="annualReturn">Rendement annuel moyen (%)</Label>
            <Input
              id="annualReturn"
              type="number"
              min="0"
              max="100"
              step="0.1"
              value={params.annualReturn}
              onChange={(e) => updateParam("annualReturn", Number(e.target.value))}
            />
          </div>

          <div className="space-y-2">
            <Label htmlFor="years">Durée (années)</Label>
            <Input
              id="years"
              type="number"
              min="1"
              max="50"
              value={params.years}
              onChange={(e) => updateParam("years", Number(e.target.value))}
            />
          </div>

          <div className="space-y-2">
            <Label htmlFor="compoundingFrequency">Capitalisation</Label>
            <Select
              value={params.compoundingFrequency}
              onValueChange={(value) =>
                updateParam("compoundingFrequency", value as InvestmentParams["compoundingFrequency"])
              }
            >
              <SelectTrigger id="compoundingFrequency">
                <SelectValue />
              </SelectTrigger>
              <SelectContent>
                <SelectItem value="monthly">Mensuelle</SelectItem>
                <SelectItem value="annually">Annuelle</SelectItem>
              </SelectContent>
            </Select>
          </div>

          <div className="space-y-2">
            <Label htmlFor="managementFees">Frais de gestion (%)</Label>
            <Input
              id="managementFees"
              type="number"
              min="0"
              max="10"
              step="0.1"
              value={params.managementFees}
              onChange={(e) => updateParam("managementFees", Number(e.target.value))}
            />
          </div>

          <Button type="submit" className="w-full" size="lg">
            Calculer
          </Button>
        </form>
      </CardContent>
    </Card>
  )
}
