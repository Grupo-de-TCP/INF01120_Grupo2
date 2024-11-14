package services;

import models.Expense;
import models.Group;
import java.util.ArrayList;
import java.util.List;

//  Serviço para gerenciar despesas
public class ExpenseService {
    private List<Expense> expenses = new ArrayList<>();

    public void addExpense(Expense expense) {
        expenses.add(expense);
    }

    public List<Expense> getExpensesByGroup(Group group) {
        List<Expense> groupExpenses = new ArrayList<>();
        for (Expense expense : expenses) {
            if (group.getMembers().contains(expense.getPaidBy())) {
                groupExpenses.add(expense);
            }
        }
        return groupExpenses;
    }
}
