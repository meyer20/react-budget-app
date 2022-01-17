import React, { useContext } from 'react';
import { v4 as uuidV4 } from 'uuid';
import useLocalStorage from '../hooks/UseLocalStorage';

const BudgetsContext = React.createContext();

export const UNCATEGORIZED_BUDGET_ID = 'UNCATEGORIZED';

export function useBudgets() {
    return useContext(BudgetsContext);
}

export const BudgetsProvider = ({ children }) => {
    const [budgets, setBudgets] = useLocalStorage('budgets', []);
    const [expenses, setExpenses] = useLocalStorage('expenses', []);

    function getBudgetExpenses(budgetId) {
        return expenses.filter(expense => expense.budgetId === budgetId);
    }

    function addExpense({ description, amount, budgetId, debtDate, debtStatus }) {
        setExpenses(prevExpenses => {
            return [...prevExpenses, {
                id: uuidV4(),
                description,
                amount,
                budgetId,
                debtDate,
                debtStatus
            }];
        });
    }

    function addBudget({ name, max }) {
        setBudgets(prevBudgets => {
            if (prevBudgets.find(budget => budget.name === name)) {
                return prevBudgets;
            }
            return [...prevBudgets, { id: uuidV4(), name, max }];
        });
    }

    function deleteBudget({ id }) {
        console.log('deleteBudget', id);
        setExpenses(prevExpenses => {
            return prevExpenses.map(expense => {
                if (expense.budgetId !== id) return expense;
                return { ...expense, budgetId: UNCATEGORIZED_BUDGET_ID };
            });
        });

        setBudgets(prevBudgets => {
            return prevBudgets.filter(budget => budget.id !== id);
        });
    }

    function deleteExpense({ id }) {
        setExpenses(prevExpenses => {
            return prevExpenses.filter(expense => expense.id !== id);
        });
    }

    function getExpenseAmountFromBudget({ budgetId }) {
        console.log('getExpenseAmountFromBudget');
        return getBudgetExpenses(budgetId).reduce((total, expense) => total + expense.amount, 0);
    }

    return (
        <BudgetsContext.Provider
            value={{
                budgets,
                expenses,
                getBudgetExpenses,
                addExpense,
                addBudget,
                deleteBudget,
                deleteExpense,
                getExpenseAmountFromBudget
            }}
        >
            {children}
        </BudgetsContext.Provider>
    );
}
