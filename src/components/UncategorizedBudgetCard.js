import { UNCATEGORIZED_BUDGET_ID, useBudgets } from '../contexts/BudgetsContext';
import BudgetCard from './BudgetCard';

export default function UncategorizedBudgetCard(props) {
    const { getBudgetExpenses } = useBudgets();
    console.log('getBudgetExpenses(UNCATEGORIZED_BUDGET_ID)', getBudgetExpenses(UNCATEGORIZED_BUDGET_ID));
    const amount = getBudgetExpenses(UNCATEGORIZED_BUDGET_ID).reduce(
        (total, expense) => total + expense.amount,
        0
    );
    if (amount === 0) return null;

    return <BudgetCard amount={amount} name="Não categorizado" gray {...props} />
}
