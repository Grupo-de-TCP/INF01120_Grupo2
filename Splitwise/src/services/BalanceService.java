/* 
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
*/

package services;

import models.Balance;
import models.Expense;
import models.User;

import java.util.ArrayList;
import java.util.HashMap;
import java.util.List;
import java.util.Map;

public class BalanceService {
    private Map<String, Map<String, Double>> balanceSheet = new HashMap<>();
    private UserService userService; // Adicionando UserService

    public BalanceService(UserService userService) {
        this.userService = userService;
    }

    public void calculateBalances(List<Expense> expenses) {
        balanceSheet.clear();

        for (Expense expense : expenses) {
            double amountPerUser = expense.getAmount() / expense.getSplitAmong().size();
            for (User user : expense.getSplitAmong()) {
                if (!user.equals(expense.getPaidBy())) {
                    String payerId = expense.getPaidBy().getId();
                    String debtorId = user.getId();

                    balanceSheet.putIfAbsent(debtorId, new HashMap<>());
                    balanceSheet.putIfAbsent(payerId, new HashMap<>());

                    double currentDebt = balanceSheet.get(debtorId).getOrDefault(payerId, 0.0);
                    balanceSheet.get(debtorId).put(payerId, currentDebt + amountPerUser);
                }
            }
        }

        for (String userId : balanceSheet.keySet()) {
            for (String otherUserId : balanceSheet.get(userId).keySet()) {
                double debt = balanceSheet.get(userId).getOrDefault(otherUserId, 0.0);
                double reverseDebt = balanceSheet.get(otherUserId).getOrDefault(userId, 0.0);

                if (debt > 0 && reverseDebt > 0) {
                    if (debt > reverseDebt) {
                        balanceSheet.get(userId).put(otherUserId, debt - reverseDebt);
                        balanceSheet.get(otherUserId).remove(userId);
                    } else {
                        balanceSheet.get(otherUserId).put(userId, reverseDebt - debt);
                        balanceSheet.get(userId).remove(otherUserId);
                    }
                }
            }
        }
    }

    public List<Balance> getConsolidatedBalances() {
        List<Balance> balances = new ArrayList<>();
        for (String fromUserId : balanceSheet.keySet()) {
            for (Map.Entry<String, Double> entry : balanceSheet.get(fromUserId).entrySet()) {
                String toUserId = entry.getKey();
                double amount = entry.getValue();
                if (amount > 0) {
                    User fromUser = userService.getUser(fromUserId); // Recupera o usuário devedor
                    User toUser = userService.getUser(toUserId); // Recupera o usuário credor
                    balances.add(new Balance(fromUser, toUser, amount));
                }
            }
        }
        return balances;
    }
}

