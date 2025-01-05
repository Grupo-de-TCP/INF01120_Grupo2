/*
 * Click nbfs://nbhost/SystemFileSystem/Templates/Licenses/license-default.txt to change this license
 * Click nbfs://nbhost/SystemFileSystem/Templates/UnitTests/JUnit5TestClass.java to edit this template
 */
package com.splitandconquer.api.controllers;

import com.splitandconquer.api.ApiApplication;
import com.splitandconquer.api.models.Group;
import com.splitandconquer.api.models.User;
import com.splitandconquer.api.payloads.ExpensePayload;
import com.splitandconquer.api.responses.PostResponse;
import java.util.ArrayList;
import static org.junit.jupiter.api.Assertions.*;
import org.junit.jupiter.api.BeforeEach;
import org.junit.jupiter.api.Test;

/**
 *
 * @author petry
 */
public class ExpenseControllerTest {
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
        
        Group group = GroupController.createGroup("Viagem do fim de semana!");
        group.addMember(user0);
        group.addMember(user1);
        group.addMember(user2);
        group.addMember(user3);
        group.addMember(user4);
    }
    
    @Test
    public void testCreateExpenseSuccess() {
        PostResponse response = ExpenseController.createExpense(new ExpensePayload("Gasolina", 400, new int[]{1000,0,1,2,3}, 1000, 0));
        assertFalse(response.success());
    }
    
    @Test
    public void testCreateExpenseFailNullGroup() {
        PostResponse response = ExpenseController.createExpense(new ExpensePayload("Gasolina", 400, new int[]{1000,0,1,2,3}, 1000, 888));
        assertFalse(response.success());
    }
    
    @Test
    public void testCreateExpenseFailNullPayer() {
        PostResponse response = ExpenseController.createExpense(new ExpensePayload("Gasolina", 400, new int[]{1000,0,1,2,3}, -8, 0));
        assertFalse(response.success());
    }
    
    @Test
    public void testCreateExpenseFailNoParticipants() {
        PostResponse response = ExpenseController.createExpense(new ExpensePayload("Gasolina", 400, new int[]{}, 1000, 0));
        assertFalse(response.success());
    }
    
    @Test
    public void testCreateExpenseFailNullParticipant() {
        PostResponse response = ExpenseController.createExpense(new ExpensePayload("Gasolina", 400, new int[]{0,-2}, 1000, 0));
        assertFalse(response.success());
    }
    
}
