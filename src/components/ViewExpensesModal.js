import {Modal, Button, Stack, Badge} from 'react-bootstrap'
import { UNCATEGORIZED_BUDGET_ID, useBudgets } from '../contexts/BudgetsContext'
import {currencyFormatter, dateFormatter} from '../Utils/Utils';

export default function ViewExpensesModal({ budgetId, handleClose }) {
    const { getBudgetExpenses, budgets, deleteBudget, deleteExpense } = useBudgets();

    const expenses = getBudgetExpenses(budgetId)
    const budget =
        UNCATEGORIZED_BUDGET_ID === budgetId
            ? { name: 'UNCATEGORIZED', id: UNCATEGORIZED_BUDGET_ID }
            : budgets.find(b => b.id === budgetId)

    return (
        <Modal show={budgetId != null} onHide={handleClose}>
            <Modal.Header closeButton>
                <Modal.Title>
                    <Stack direction="horizontal" gap="2">
                        <div>{budget?.id === UNCATEGORIZED_BUDGET_ID ? 'Não categorizado' : budget?.name}</div>
                        {budgetId !== UNCATEGORIZED_BUDGET_ID && (
                            <Button
                                onClick={() => {
                                    deleteBudget(budget)
                                    handleClose()
                                }}
                                variant="outline-danger"
                            >
                                Delete
                            </Button>
                        )}
                    </Stack>
                </Modal.Title>
            </Modal.Header>
            <Modal.Body>
                <Stack direction="vertical" gap="3">
                    {expenses.map(expense => (
                        <Stack direction="horizontal" gap="2" key={expense.id} className="d-flex justify-content-between align-items-baseline">
                            <Stack direction="horizontal" className="d-flex align-items-baseline">
                                <div className="me-auto fs-4">{expense.description}</div>
                                <div className="text-muted fs-6 ms-1">{dateFormatter.format(expense.debtDate)}</div>
                            </Stack>
                            <Stack direction="horizontal" gap="2">
                                {expense.debtStatus === "PAID" && (
                                    <Badge pill bg="success">
                                        Pago
                                        <i className="bi bi-bank"></i>
                                    </Badge>
                                )}

                                <div className="fs-5">
                                    {currencyFormatter.format(expense.amount)}
                                </div>
                                <Button
                                    onClick={() => deleteExpense(expense)}
                                    size="sm"
                                    variant="outline-danger"
                                >
                                    &times;
                                </Button>
                            </Stack>
                        </Stack>
                    ))}
                </Stack>
            </Modal.Body>
        </Modal>
    )
}
