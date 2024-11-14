package services;

import models.Balance;
import models.Expense;
import models.User;
import java.util.ArrayList;
import java.util.List;

//  Serviço para calcular e gerenciar saldos entre membros
public class BalanceService {
    private List<Balance> balances = new ArrayList<>();

    public void calculateBalances(List<Expense> expenses) {
        // Limpa o saldo existente antes de recalcular
        balances.clear();
        for (Expense expense : expenses) {
            double amountPerUser = expense.getAmount() / expense.getSplitAmong().size();
            for (User user : expense.getSplitAmong()) {
                if (!user.equals(expense.getPaidBy())) {
                    balances.add(new Balance(user, expense.getPaidBy(), amountPerUser));
                }
            }
        }
    }

    public List<Balance> getBalances() {
        return balances;
    }
}
