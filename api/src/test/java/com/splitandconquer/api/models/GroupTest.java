package com.splitandconquer.api.models;

import com.splitandconquer.api.ApiApplication;
import java.util.ArrayList;
import java.util.Arrays;
import org.junit.jupiter.api.AfterEach;
import org.junit.jupiter.api.AfterAll;
import org.junit.jupiter.api.BeforeEach;
import org.junit.jupiter.api.BeforeAll;
import org.junit.jupiter.api.Test;
import static org.junit.jupiter.api.Assertions.*;

/**
 *
 * @author petry
 */
public class GroupTest {
    private Group group;
    
    @BeforeEach
    public void setUp() {
        User user1 = new User(0, "Ceccato");
        User user2 = new User(1, "Perini");
        User user3 = new User(2, "Pedro");
        User user4 = new User(2, "Rafael");
        
        Expense expense1 = new Expense(0, user1, "Gasolina", 400, new ArrayList<User>(Arrays.asList(user1, user2, user3, user4)));
        Expense expense2 = new Expense(1, user1, "Almoço", 100, new ArrayList<User>(Arrays.asList(user2, user3, user4)));
        Expense expense3 = new Expense(2, user2, "Compras", 150, new ArrayList<User>(Arrays.asList(user1, user2)));
        Expense expense4 = new Expense(3, user3, "Gasolina", 100.923451f, new ArrayList<User>(Arrays.asList(user1)));

        this.group = new Group(0, "Grupo de Teste!");
        this.group.addMember(user1);
        this.group.addMember(user2);
        this.group.addMember(user3);
        this.group.addMember(user4);
        
        this.group.addExpense(expense1);
        this.group.addExpense(expense2);
        this.group.addExpense(expense3);
        this.group.addExpense(expense4);
        
        ApiApplication.setLoggedUser(user1);
    }
    
    @Test
    public void testFindMemberSuccess() {
        User userFound = this.group.findMember(2);
        assertTrue(userFound instanceof User);
    }
    
    @Test
    public void testFindMemberFail() {
        User userFound = this.group.findMember(293);
        assertEquals(userFound, null);
    }
    
    @Test
    public void testGetExpenseSuccess() {
        Expense expenseFound = this.group.getExpense(1);
        assertTrue(expenseFound instanceof Expense);
    }
    
    @Test
    public void testGetExpenseFail() {
        Expense expenseFound = this.group.getExpense(293);
        assertEquals(expenseFound, null);
    }
    
    @Test
    public void testGetDebt() {
        assertEquals(this.group.getDebt(), 175.92f);
    }
    
    @Test
    public void testGetDividend() {
        assertEquals(this.group.getDividend(), 500f);
    }
    
}
