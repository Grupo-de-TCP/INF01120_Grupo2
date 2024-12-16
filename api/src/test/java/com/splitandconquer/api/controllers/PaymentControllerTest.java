/*
 * Click nbfs://nbhost/SystemFileSystem/Templates/Licenses/license-default.txt to change this license
 * Click nbfs://nbhost/SystemFileSystem/Templates/UnitTests/JUnit5TestClass.java to edit this template
 */
package com.splitandconquer.api.controllers;

import com.splitandconquer.api.ApiApplication;
import com.splitandconquer.api.models.Group;
import com.splitandconquer.api.models.User;
import com.splitandconquer.api.payloads.ExpensePayload;
import com.splitandconquer.api.payloads.PaymentPayload;
import com.splitandconquer.api.responses.PostResponse;
import java.util.ArrayList;
import org.junit.jupiter.api.BeforeEach;
import org.junit.jupiter.api.Test;
import static org.junit.jupiter.api.Assertions.*;

/**
 *
 * @author petry
 */
public class PaymentControllerTest {
    
    @BeforeEach
    public void setUp() {
        ApiApplication.setLoggedUser(null);
        UserController.setAllUsers(new ArrayList<User>());
        GroupController.setAllGroups(new ArrayList<Group>());
        
        User user0 = UserController.createUser("Você");
        ApiApplication.setLoggedUser(user0);
        
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
    }
    
    @Test
    public void testCreatePaymentSuccess() {
        PostResponse response = PaymentController.createPayment(new PaymentPayload(1000, 0, 192, 0));
        assertTrue(response.success());
    }
    
    @Test
    public void testCreatePaymentFailNullPayer() {
        PostResponse response = PaymentController.createPayment(new PaymentPayload(929, 1000, 192, 0));
        assertFalse(response.success());
    }
    
    @Test
    public void testCreatePaymentFailNullReceiver() {
        PostResponse response = PaymentController.createPayment(new PaymentPayload(1000, 929, 192, 0));
        assertFalse(response.success());
    }
    
    @Test
    public void testCreatePaymentFailNotLoggedUser() {
        PostResponse response = PaymentController.createPayment(new PaymentPayload(0, 1, 192, 0));
        assertFalse(response.success());
    }
}
