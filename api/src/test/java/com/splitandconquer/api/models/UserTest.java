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
public class UserTest {
    private User user;
    private User balanceUser;
    private Balance balance;
    
    @BeforeEach
    public void setUp() {
        this.balanceUser = new User(1, "Ceccato");
        this.balance = new Balance(this.balanceUser, 0);
        
        this.user = new User(0, "Rafael", new ArrayList<Balance>(Arrays.asList(balance)));
        ApiApplication.setLoggedUser(this.user);
    }
    
    @Test
    public void testDividendUpdated() {
        assertTrue(this.user.updateDividend(0, 1, 100.92156f));
    }
    
    @Test
    public void testAddDividend() {
        this.user.updateDividend(0, 1, 100.92156f);
        assertEquals(balance.getDividend(), 100.92f);
    }
    
    @Test
    public void testAddDebt() {
        this.user.updateDividend(1, 0, 100.92156f);
        assertEquals(balance.getDividend(), -100.92f);
    }
    
    @Test
    public void testGetDebt() {
        this.user.updateDividend(0, 1, 100.92156f);
        assertEquals(this.balanceUser.getDebt(), -100.92f);
    }
}
