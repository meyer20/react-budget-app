import { useBudgets } from '../contexts/BudgetsContext'
import BudgetCard from './BudgetCard'

export default function TotalAvailableCard() {
    const { expenses, budgets } = useBudgets()
    const max = budgets.reduce((total, budget) => total + budget.max, 0)
    const amount = max - expenses.reduce((total, expense) => total + expense.amount, 0)
    if (max === 0) return null

    return <BudgetCard amount={amount} name="Disponível" gray max={max} hideButtons />
}
