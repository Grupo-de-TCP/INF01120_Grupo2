package com.splitandconquer.api;

import com.splitandconquer.api.controllers.ExpenseController;
import com.splitandconquer.api.controllers.GroupController;
import com.splitandconquer.api.controllers.UserController;
import com.splitandconquer.api.models.Expense;
import com.splitandconquer.api.models.ExpenseBody;
import com.splitandconquer.api.models.Group;
import com.splitandconquer.api.models.User;
import java.util.Arrays;
import java.util.ArrayList;
import org.springframework.boot.SpringApplication;
import org.springframework.boot.autoconfigure.SpringBootApplication;

/**
 *
 * @author petry
 */
@SpringBootApplication
public class ApiApplication {
    private static User loggedUser = null;
    
    public static void main(String[] args) {
        User user0 = UserController.createUser("Ceccato");
        ApiApplication.loggedUser = user0;

        User user1 = UserController.createUser("Perini");
        User user2 = UserController.createUser("Pedro");
        User user3 = UserController.createUser("Rafael");
        
        Group group = GroupController.createGroup("Viagem do fim de semana!");
        group.addMember(user0);
        group.addMember(user1);
        group.addMember(user2);
        group.addMember(user3);
        
        ExpenseController.createExpense(new ExpenseBody("Gasolina", 400, new int[]{0,1,2,3}, 0, 0));
        ExpenseController.createExpense(new ExpenseBody("Almoço", 100, new int[]{0,2,3}, 1, 0));
        ExpenseController.createExpense(new ExpenseBody("Compras", 150, new int[]{1,2,3}, 0, 0));
        ExpenseController.createExpense(new ExpenseBody("Aposta", 100, new int[]{3}, 0, 0));

	SpringApplication.run(ApiApplication.class, args);
    }
    
    public static User getLoggedUser() {
        return ApiApplication.loggedUser;
    }
    
    public static void setLoggedUser(User user) {
        ApiApplication.loggedUser = user;
    }
}
