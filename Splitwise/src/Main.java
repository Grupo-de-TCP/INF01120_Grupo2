import models.User;
import models.Group;
import models.Expense;
import models.Balance;
import services.UserService;
import services.GroupService;
import services.ExpenseService;
import services.BalanceService;

import java.util.Arrays;
import java.util.List;

public class Main {
    public static void main(String[] args) {
        // Instanciação dos serviços
        UserService userService = new UserService();
        GroupService groupService = new GroupService();
        ExpenseService expenseService = new ExpenseService();
        BalanceService balanceService = new BalanceService(userService); // Passa o UserService

        // Criação de usuários
        User user1 = new User("1", "Alice");
        User user2 = new User("2", "Bob");
        User user3 = new User("3", "Charlie");

        userService.addUser(user1);
        userService.addUser(user2);
        userService.addUser(user3);

        // Criação de um grupo e adição de membros
        Group group = new Group("g1", "Viagem de Férias", Arrays.asList(user1, user2, user3));
        groupService.createGroup(group);

        // Registro de despesas no grupo
        Expense expense1 = new Expense("e1", 300, user1, Arrays.asList(user1, user2, user3));
        Expense expense2 = new Expense("e2", 150, user2, Arrays.asList(user1, user2));
        Expense expense3 = new Expense("e3", 200, user3, Arrays.asList(user2, user3));

        expenseService.addExpense(expense1);
        expenseService.addExpense(expense2);
        expenseService.addExpense(expense3);

        // Calcula os saldos consolidados para o grupo
        List<Expense> groupExpenses = expenseService.getExpensesByGroup(group);
        balanceService.calculateBalances(groupExpenses);

        // Exibe o balanço consolidado entre os membros
        System.out.println("Balanço consolidado entre os membros do grupo '" + group.getName() + "':");
        for (Balance balance : balanceService.getConsolidatedBalances()) {
            System.out.println(balance.getFromUser().getName() + " deve " + balance.getToUser().getName() + ": " + balance.getAmount());
        }
    }
}
