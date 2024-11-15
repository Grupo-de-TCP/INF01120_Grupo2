package services;

import models.Balance;
import models.Expense;
import models.User;

import java.util.ArrayList;
import java.util.HashMap;
import java.util.List;
import java.util.Map;

// Serviço para gerenciar os saldos entre os usuários, calculando quem deve quanto a quem
public class BalanceService {
    private Map<String, Map<String, Double>> balanceSheet = new HashMap<>();
    private UserService userService;

    public BalanceService(UserService userService) {
        this.userService = userService;
    }

    public void calculateBalances(List<Expense> expenses) {
        balanceSheet.clear();
    
        // Fase 1: Calcular todas as dívidas iniciais
        for (Expense expense : expenses) {
            // Calcula o valor arredondado por usuário para evitar frações residuais
            double amountPerUser = Math.round((expense.getAmount() / expense.getSplitAmong().size()) * 100.0) / 100.0;
            
            for (User user : expense.getSplitAmong()) {
                if (!user.equals(expense.getPaidBy())) {
                    String payerId = expense.getPaidBy().getId();
                    String debtorId = user.getId();
    
                    balanceSheet.putIfAbsent(debtorId, new HashMap<>());
                    balanceSheet.putIfAbsent(payerId, new HashMap<>());
    
                    // Adiciona a dívida de debtorId para payerId 
                    double currentDebt = balanceSheet.get(debtorId).getOrDefault(payerId, 0.0);
                    balanceSheet.get(debtorId).put(payerId, Math.round((currentDebt + amountPerUser) * 100.0) / 100.0);
                }
            }
        }
    
        // Fase 2: Consolidar as dívidas mútuas
        for (String userId : balanceSheet.keySet()) {
            for (String otherUserId : balanceSheet.get(userId).keySet()) {
                double debt = balanceSheet.get(userId).getOrDefault(otherUserId, 0.0);
                double reverseDebt = balanceSheet.get(otherUserId).getOrDefault(userId, 0.0);
    
                if (debt > 0 && reverseDebt > 0) {
                    if (debt > reverseDebt) {
                        double consolidatedDebt = Math.round((debt - reverseDebt) * 100.0) / 100.0;
                        balanceSheet.get(userId).put(otherUserId, consolidatedDebt);
                        balanceSheet.get(otherUserId).remove(userId);
                    } else if (debt < reverseDebt) {
                        double consolidatedDebt = Math.round((reverseDebt - debt) * 100.0) / 100.0;
                        balanceSheet.get(otherUserId).put(userId, consolidatedDebt);
                        balanceSheet.get(userId).remove(otherUserId);
                    } else {
                        balanceSheet.get(userId).remove(otherUserId);
                        balanceSheet.get(otherUserId).remove(userId);
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
