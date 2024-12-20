package com.splitandconquer.api;

import com.splitandconquer.api.controllers.ExpenseController;
import com.splitandconquer.api.controllers.GroupController;
import com.splitandconquer.api.controllers.UserController;
import com.splitandconquer.api.models.Group;
import com.splitandconquer.api.models.User;
import com.splitandconquer.api.payloads.ExpensePayload;
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
        User user0 = UserController.createUser("Você");
        ApiApplication.loggedUser = user0;
        
        User user1 = UserController.createUser("Ceccato");
        User user2 = UserController.createUser("Perini");
        User user3 = UserController.createUser("Pedro");
        User user4 = UserController.createUser("Rafael");
        
        Group group0 = GroupController.createGroup("Viagem do fim de semana!");
        group0.addMember(user0);
        group0.addMember(user1);
        group0.addMember(user2);
        group0.addMember(user3);
        group0.addMember(user4);
        
        ExpenseController.createExpense(new ExpensePayload("Gasolina", 400, new int[]{1000,0,1,2,3}, 1000, 0));
        ExpenseController.createExpense(new ExpensePayload("Almoço", 100, new int[]{1000,0,2,3}, 1, 0));
        ExpenseController.createExpense(new ExpensePayload("Compras", 150, new int[]{1,2,3}, 1000, 0));
        ExpenseController.createExpense(new ExpensePayload("Aposta", 100, new int[]{3}, 1000, 0));
        
        Group group1 = GroupController.createGroup("Churrasco");
        group1.addMember(user0);
        group1.addMember(user2);
        group1.addMember(user3);
        
        ExpenseController.createExpense(new ExpensePayload("Carne", 70, new int[]{1000,1,2}, 1000, 1));
        ExpenseController.createExpense(new ExpensePayload("Bebidas", 50, new int[]{1000,2}, 1, 1));
        
	SpringApplication.run(ApiApplication.class, args);
    }
    
    public static User getLoggedUser() {
        return ApiApplication.loggedUser;
    }
    
    public static void setLoggedUser(User user) {
        ApiApplication.loggedUser = user;
    }
}
