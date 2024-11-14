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

    public void updateBalanceSheet(Expense expense) {
        double amountPerUser = expense.getAmount() / expense.getSplitAmong().size();
        for (User user : expense.getSplitAmong()) {
            if (!user.getId().equals(expense.getPaidBy().getId())) {
                balanceSheet.putIfAbsent(user.getId(), new HashMap<>());
                Map<String, Double> balances = balanceSheet.get(user.getId());
                balances.put(expense.getPaidBy().getId(), balances.getOrDefault(expense.getPaidBy().getId(), 0.0) + amountPerUser);
            }
        }
    }

    public List<Balance> getBalances() {
        List<Balance> balances = new ArrayList<>();
        for (Map.Entry<String, Map<String, Double>> entry : balanceSheet.entrySet()) {
            String fromUserId = entry.getKey();
            User fromUser = userService.getUser(fromUserId); // Obtém o usuário devedor
            for (Map.Entry<String, Double> balanceEntry : entry.getValue().entrySet()) {
                String toUserId = balanceEntry.getKey();
                User toUser = userService.getUser(toUserId); // Obtém o usuário credor
                double amount = balanceEntry.getValue();
                balances.add(new Balance(fromUser, toUser, amount));
            }
        }
        return balances;
    }
}
