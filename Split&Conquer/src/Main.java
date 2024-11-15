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
        User user1 = new User("1", "Ceccato");
        User user2 = new User("2", "Perini");
        User user3 = new User("3", "Pedro");
        User user4 = new User("4", "Rafael");

        userService.addUser(user1);
        userService.addUser(user2);
        userService.addUser(user3);
        userService.addUser(user4);

        // Criação de um grupo e adição de membros
        Group group = new Group("g1", "Viagem do fim de semana!", Arrays.asList(user1, user2, user3, user4));
        groupService.createGroup(group);

        // Registro de despesas no grupo
        Expense expense1 = new Expense("e1", 400, user1, Arrays.asList(user1, user2, user3, user4)); // gasolina
        Expense expense2 = new Expense("e2", 100, user2, Arrays.asList(user1, user2, user3, user4)); // almoço
        Expense expense3 = new Expense("e3", 50, user3, Arrays.asList(user2, user3, user4)); // compras
        Expense expense4 = new Expense("e4", 25, user2, Arrays.asList(user4)); // Aposta

        expenseService.addExpense(expense1);
        expenseService.addExpense(expense2);
        expenseService.addExpense(expense3);
        expenseService.addExpense(expense4);

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
