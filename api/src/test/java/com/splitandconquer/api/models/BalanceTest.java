package com.splitandconquer.api.models;

import org.junit.jupiter.api.BeforeEach;
import org.junit.jupiter.api.Test;
import static org.junit.jupiter.api.Assertions.*;

/**
 *
 * @author petry
 */
public class BalanceTest {
    private Balance balance;
    
    @BeforeEach
    public void setUp() {
        User user = new User(0, "Pedro");
        this.balance = new Balance(user, 20);
    }
    
    @Test
    public void testUpdateDividend() {
        this.balance.updateDividend(25.5213415f);
        assertEquals(this.balance.getDividend(), 45.52f);
    }
}
