import { afterEach, describe, expect, it, vi } from 'vitest'
import { cleanup, render, screen } from '@testing-library/react'
import '@testing-library/jest-dom/vitest'
import type { Bill } from '@/types/Bill'
import type { User } from '@/types/User'
import { useLineChart } from '@/hooks/useLineChart'
import * as useLineChartModule from '@/hooks/useLineChart'
import { EnergyConpensatedGraphCard } from '@/components/energyConsume/EnergyConpensatedGraphCard'

const user1: User = {
  id: "1",
  code: "USR001",
  name: "João da Silva"
};

const user1Accounts: Bill[] = [
  {
    id: "1",
    economyGD: 150,
    totalValueWithoutGD: 300,
    compensedEnergy: 50,
    energyConsume: 200,
    month: "2023-01-01",
    price: 150,
    averageEnergyConsume: 180,
    pix: "1234567890",
    qrcode: "qrcode1.png",
    pdf: "bill1.pdf",
    userId: user1.id
  },
  {
    id: "2",
    economyGD: 120,
    totalValueWithoutGD: 250,
    compensedEnergy: 40,
    energyConsume: 180,
    month: "2023-02-01",
    price: 130,
    averageEnergyConsume: 170,
    pix: "0987654321",
    qrcode: "qrcode2.png",
    pdf: "bill2.pdf",
    userId: user1.id
  },
];

const user2: User = {
  id: "2",
  code: "USR002",
  name: "Maria Oliveira"
};

const user2Bills: Bill[] = [
  {
    id: "1",
    economyGD: 180,
    totalValueWithoutGD: 350,
    compensedEnergy: 60,
    energyConsume: 220,
    month: "2023-01-01",
    price: 160,
    averageEnergyConsume: 200,
    pix: "5432109876",
    qrcode: "qrcode3.png",
    pdf: "bill3.pdf",
    userId: user2.id
  },
  {
    id: "2",
    economyGD: 130,
    totalValueWithoutGD: 270,
    compensedEnergy: 45,
    energyConsume: 190,
    month: "2023-02-01",
    price: 140,
    averageEnergyConsume: 175,
    pix: "1357902468",
    qrcode: "qrcode4.png",
    pdf: "bill4.pdf",
    userId: user2.id
  },
];

describe('EnergyConsumeGraph suit test', () => {
  afterEach(() => {
    cleanup()
  })

  vi.mock('react-chartjs-2', () => ({
    Line: () => null,
  }));

  it("Should render graph card", () => {
    //ajeitar
    render(
      <EnergyConpensatedGraphCard users={[user1, user2]} bills={[...user2Bills, ...user1Accounts]} />
    )
    //atuar
    const graphCard = screen.getByTestId('card')
    //afirmar
    expect(graphCard).toBeVisible()
  })

  it("Should return the correct data", async () => {
    //ajeitar
    const { data, options } = useLineChart().renderCompensetedEnergyGraph([user1, user2], [...user2Bills, ...user1Accounts])

    const mockRenderEnergyConpensatedGraph = vi.fn().mockReturnValue({
      data,
      options
    })

    vi.spyOn(useLineChartModule, 'useLineChart').mockReturnValue({
      renderCompensetedEnergyGraph: mockRenderEnergyConpensatedGraph,
      renderEnergyConsumeGraph: vi.fn(),
      renderEconomyGDGraph: vi.fn(),
      renderValueWithoutGDGraph: vi.fn(),
    })

    //atuar
    render(
      <EnergyConpensatedGraphCard users={[user1, user2]} bills={[...user2Bills, ...user1Accounts]} />
    )
    //afirmar
    expect(mockRenderEnergyConpensatedGraph).toHaveBeenCalled()
    expect(mockRenderEnergyConpensatedGraph).toHaveReturnedWith({ data, options })
  })
})