import models.User;
import models.Expense;
import services.UserService;
import services.ExpenseService;
import services.BalanceService;

import java.util.Arrays;

public class Main {
    public static void main(String[] args) {
        UserService userService = new UserService();
        ExpenseService expenseService = new ExpenseService();
        BalanceService balanceService = new BalanceService(userService); // Passa o UserService

        // Criar usuários
        User user1 = new User("1", "Alice");
        User user2 = new User("2", "Bob");
        User user3 = new User("3", "Charlie");
        userService.addUser(user1);
        userService.addUser(user2);
        userService.addUser(user3);

        // Criar despesa
        Expense expense = new Expense("1", 150, user1, Arrays.asList(user1, user2, user3));
        expenseService.addExpense(expense);
        balanceService.updateBalanceSheet(expense);

        // Verificar saldos
        balanceService.getBalances().forEach(balance -> {
            System.out.println(balance.getFromUser().getName() + " owes " + balance.getToUser().getName() + ": " + balance.getAmount());
        });
    }
}
